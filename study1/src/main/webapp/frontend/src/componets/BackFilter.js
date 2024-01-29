import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackFilter = () => {

    let springUrl = process.env.REACT_APP_SPRING_URL;
    const [datas,setDatas]=useState();
    const [chkItems,setChkItems]=useState([]);
    const [filteringTime, setFilteringTime] = useState(0);
    const [searchVal, setSearchVal] = useState('');
    
    const getDatas=()=>{
    axios.get(springUrl+"/shop/data").then(res=>{
        console.log("res",res);
        setDatas(res.data);
    }).catch((err)=>{
        console.log("error:",err);
    });
    }
    
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
        }).then(res => {
        
      const end = window.performance.now();
      const time = end - start;
      // 상태 업데이트
      setFilteringTime(time);
      setDatas(res.data);

        }).catch((err) => {
            console.log("error:", err);
        });

    };
      
      useEffect(() => {
        getDatas();
      }, []);
      
      return (
        <div style={{ border: '1px solid blue', width: '30%', height: '100%' }}>
          <p>Backend로 처리할 필터링</p>
         
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
        <button style={{margin:'10px',width:'150px'}} onClick={searchFilter}>필터링</button>

        <div className="data" style={{border:"1px solid black"}}>
        <p>필터링 시간 : {filteringTime} ms</p>
        {datas&&datas.map((data,idx)=>(
        <ul key={data.filtercode}>
            <li>상품명 : {data.name}<br/> 품목 : {data.filtername} <br/>가격 : {data.price}</li>
        </ul>
        ))
        }
        </div>
        </div>
    );
};

export default BackFilter;