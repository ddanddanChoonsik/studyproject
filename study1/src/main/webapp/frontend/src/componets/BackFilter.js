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

  // 클릭한 상품 정보를 저장하는 상태
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 클릭한 li의 데이터를 저장하는 상태
  const [selectedLiData, setSelectedLiData] = useState(null);

  // 모달 열기/닫기
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    // alert로 데이터 보여주기 (data-num도 포함)
    //alert(`상품번호: ${selectedData.num}\n상품명: ${selectedData.name}\n품목: ${selectedData.filter_name}\n가격: ${selectedData.price}`);
    // 선택한 상품 정보를 저장
    setSelectedProduct(selectedData);
    // 클릭한 li의 데이터 저장
    setSelectedLiData(selectedData);
  };

  const handleProductRegistered = (newProduct) => {
    setDatas((prevDatas) => [...prevDatas, newProduct]);
  };

  // BasicModal에서 상품 수정 시 호출되는 함수
  const handleEditProduct = (editedProduct) => {
    // 상품 수정 처리
    // editedProduct에는 모달에서 수정한 내용이 담겨 있을 것입니다.
    // 여기에서 실제로 서버에 수정 요청을 보낼 수 있습니다.
    console.log("상품 수정 데이터:", editedProduct);

    // 모달 닫기
    setOpen(false);
  };

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
            <input type="checkbox" id={data.filter_cat} name="type" value={data.filter_name} onChange={(e) => makeFilter(e.target.checked, data.filter_cat)} />
            <label htmlFor={data.filter_cat}>{data.filter_name}</label>
          </div>
        ))}
        <br />
        <input type="text" id="search" value={searchVal} onChange={handleInputChange} placeholder="검색창" />
      </div>
      <button style={{ margin: '10px', width: '150px' }} onClick={searchFilter}>필터링</button>

      <div className="data" style={{ border: "1px solid black" }}>
        <div style={{ display: 'flex', flexDirection: 'row', padding: '5px 5px 0 0', justifyContent: 'flex-end' }}>
          <button onClick={handleOpen} style={{ marginRight: '5px' }}>상품등록</button>
          <button onClick={() => setOpen(true)}>상품수정</button>
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
            <li data-num={data.num}>{data.name}( 품목 : {data.filter_name} )<br />가격 : {data.price} 색상 : {data.color}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default BackFilter;
