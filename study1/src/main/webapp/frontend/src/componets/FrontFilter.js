import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicModal from './BasicModal';


const FrontFilter = () => {
  let springUrl = process.env.REACT_APP_SPRING_URL;
  const [datas, setDatas] = useState();
  const [chkItems, setChkItems] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filteringTime, setFilteringTime] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  
  const getDatas = () => {
    axios.get(springUrl + "/shop/data").then(res => {
       setDatas(res.data);
       setFilterData(res.data);
    }).catch((err) => {
      console.log("error:", err);
    });
  }

  const makeFilter = (checked, item) => {
    if (checked) {
      const updatedChkItems = [...chkItems, item];
      setChkItems(updatedChkItems);
    } else {
      const updatedChkItems = chkItems.filter((el) => el !== item);
      setChkItems(updatedChkItems);
    }
  };

  const handleInputChange = (e) => {
    setSearchVal(e.target.value);
  };

  const searchFilter = () => {
    // datas가 없으면 필터링을 진행하지 않음
    if (!datas) {
      return;
    }

    // 시작 시간 기록
    const start = window.performance.now();

    const filteredDataByCheckbox = datas.filter(data => chkItems.includes(data.filtercat));
    const filteredDataBySearch = filteredDataByCheckbox.filter(data => {
      return data.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setFilterData(filteredDataBySearch);


    const end = window.performance.now(); // 측정 종료
    const time = end - start;
    setFilteringTime(time);

    }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div style={{ border: '1px solid red', width: '30%', height: '100%' }}>
      <p>FrontEnd로만 처리할 필터링</p>

      <div style={{ height: '10%' }}>
        <input
          type="checkbox"
          id="S"
          name="type"
          value="상의"
          onChange={(e) => makeFilter(e.target.checked, "S")}
        />
        <label htmlFor="S">상의</label>
        <input
          type="checkbox"
          id="P"
          name="type"
          value="하의"
          onChange={(e) => makeFilter(e.target.checked, "P")}
        />
        <label htmlFor="S">하의</label>
        <input
          type="checkbox"
          id="F"
          name="type"
          value="신발"
          onChange={(e) => makeFilter(e.target.checked, "F")}
        />
        <label htmlFor="S">신발</label>
        <br/>
        <input type="text" id="search" value={searchVal} onChange={handleInputChange} placeholder="검색창"/>
      </div>
      <button style={{ margin: '10px', width: '150px' }} onClick={searchFilter}>필터링</button>

      <div className="data" style={{ border: "1px solid black" }}>
      <div style={{display:'flex',flexDirection:'row-reverse',padding:'5px 5px 0 0'}}><button>상품등록</button></div>
       {/* <p>필터링 시간 : {filteringTime} ms</p> */}
        {filterData && filterData.map((data, idx) => (
          <ul key={data.filtercode}>
            <li data-cat={data.filtercat}>상품명: {data.name} || 품목: {data.filterName} <br />가격: {data.price} || 색상: {data.color}</li>
          </ul>
        ))
        }
      </div>
    </div>
  );
};

export default FrontFilter;
