import React, { useEffect, useState } from 'react';
import axios from 'axios';



const FrontFilter = () => {

     let springUrl = process.env.REACT_APP_SPRING_URL;
    const [datas,setDatas]=useState();
    const [chkItems,setChkItems]=useState([]);

    const getDatas=()=>{
    axios.get(springUrl+"/shop/getDatas").then(res=>{
        setDatas(res.data);
    }).catch((err)=>{
        console.log("error:",err);
    });
    }

    const makeFilter = (checked, item) => {
        if (checked) {
          const updatedChkItems = [...chkItems, item];
          setChkItems(updatedChkItems);
          console.log("checked:", updatedChkItems);
        } else {
          const updatedChkItems = chkItems.filter((el) => el !== item);
          setChkItems(updatedChkItems);
          console.log("unchecked:", updatedChkItems);
        }
    };
      
    const searchFilter = ()=> {

    }

      useEffect(() => {
        // getDatas는 다른 곳에서 정의한 함수로 가정합니다.
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
        </div>
        <button style={{margin:'10px',width:'150px'}} onClick={searchFilter}>필터링</button>

        <div className="data" style={{border:"1px solid black"}}>
        {datas&&datas.map((data,idx)=>(
        <ul key={data.filtercode}>
            <li  data-cat={data.filtercat}>상품명 : {data.name}<br/> 품목 : {data.filtername} <br/>가격 : {data.price}</li>
        </ul>
        ))
        }
        </div>
        </div>  
    );
};

export default FrontFilter;