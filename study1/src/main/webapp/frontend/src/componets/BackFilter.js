// BackFilter.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicModal from './BasicModal';

const BackFilter = () => {
  let springUrl = process.env.REACT_APP_SPRING_URL;
  const [datas, setDatas] = useState();
  const [chkItems, setChkItems] = useState([]);
  const [filteringTime, setFilteringTime] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const [codeDatas, setCodeDatas] = useState();
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 클릭한 상품 정보를 저장하는 상태
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 클릭한 li의 데이터를 저장하는 상태
  const [selectedLiData, setSelectedLiData] = useState(null);

  // 모달 열기/닫기
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setSelectedProduct(null);

  }
  
  const handleClose = () => {
    setSelectedLiData(null);
    setOpen(false);
  }

  const getDatas = () => {
    axios.get(springUrl + "/shop/data")
      .then(res => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const getCodes = () => {
    axios.get(springUrl + "/shop/shopcode")
      .then(res => {
        setCodeDatas(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const handleInputChange = (e) => {
    setSearchVal(e.target.value);
  };

  const makeFilter = (checked, item) => {
    if (checked) {
      const updatedChkItems = [...chkItems, item];
      setChkItems(updatedChkItems);
    } else {
      const updatedChkItems = chkItems.filter((el) => el !== item);
      setChkItems(updatedChkItems);
    }
  };

  const searchFilter = () => {
    const start = window.performance.now();
    axios.get(springUrl + "/shop/filter", {
      params: { filter: chkItems.join(","), search: searchVal }
    })
      .then(res => {
        const end = window.performance.now();
        const time = end - start;
        setFilteringTime(time);
        setDatas(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  // 클릭한 상품 정보를 저장하는 함수
  const handleLiClick = (selectedData) => {
    console.log("선택한 상품 정보를 저장",selectedData);
    setSelectedProduct(selectedData);
    // 클릭한 li의 데이터 저장
    setSelectedLiData(selectedData);
  };

  const handleProductRegistered = (newProduct) => {
    setDatas((prevDatas) => [...prevDatas, newProduct]);
  };

  const handleEditProduct = (editedProduct) => {
    setOpen(false);
    setSelectedLiData(null);
    getDatas();
  };

  const productDelete = () =>{
    if (!isConfirmed) { 
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
      setIsConfirmed(confirmed); 
      if (confirmed && selectedLiData  &&selectedLiData.num  !== undefined) {
        const numToDelete = selectedLiData.num;
        axios.delete(`${springUrl}/shop/delete?num=${numToDelete}`)
        .then(response => {
          alert("삭제 완료하였습니다");
          getDatas();
        })
        .catch(error => {
          console.error('에러 발생:', error);
        });
      }else {
        alert("삭제 취소되었습니다.");
        setSelectedLiData(null);
      }
    } 
  }

  useEffect(() => {
    getDatas();
    getCodes();
  }, []);

  return (
    <div style={{ border: '1px solid blue', width: '30%', height: '100%' }}>
      <p>Backend로 처리할 필터링</p>
      <div style={{ height: '10%' }}>
        {codeDatas && codeDatas.map((data, idx) => (
          <div key={idx}>
            <input type="checkbox" id={data.filterCat} name="type" value={data.filterName} onChange={(e) => makeFilter(e.target.checked, data.filterCat)} />
            <label htmlFor={data.filterCat}>{data.filterName}</label>
          </div>
        ))}
        <br />
        <input type="text" id="search" value={searchVal} onChange={handleInputChange} placeholder="검색창" />
      </div>
      <button style={{ margin: '10px', width: '150px' }} onClick={searchFilter}>필터링</button>

      <div className="data" style={{ border: "1px solid black" }}>
        <div style={{ display: 'flex', flexDirection: 'row', padding: '5px 5px 0 0', justifyContent: 'flex-end' }}>
        {!selectedLiData && <button onClick={handleOpen} style={{ marginRight: '5px' }}>상품등록</button>}
          {selectedLiData ? (
           <>
            <button onClick={() => setOpen(true)} style={{ marginRight: '5px' }}>상품수정</button>
            <button onClick={productDelete} style={{ marginRight: '5px' }}>상품삭제</button>
            <button onClick={() => setSelectedLiData(null)}>선택 해제</button>
          </>
           ) : null}
        </div>

        <BasicModal
          open={open}
          onClose={handleClose}
          codeDatas={codeDatas}
          onProductRegistered={handleProductRegistered}
          selectedProduct={selectedProduct}
          onEditProduct={handleEditProduct}
        />

        {datas && datas.map((data, idx) => (
          <ul
            key={data.filtercode}
            onClick={() => handleLiClick(data)}
            style={{ backgroundColor: selectedLiData && selectedLiData.num === data.num ? 'yellow' : 'transparent' }}
          >
            <li data-num={data.num}>{data.name}( 품목 : {data.filterName} )<br />가격 : {data.price} 색상 : {data.color}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default BackFilter;
