// BasicModal.js

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ChromePicker } from 'react-color';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 20,
  height: '50%',
};

const BasicModal = ({ open, onClose, codeDatas, onProductRegistered, selectedProduct, onEditProduct }) => {
  let springUrl = process.env.REACT_APP_SPRING_URL;
  const handleClose = () => onClose();
  const [selectedOption, setSelectedOption] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [price, setPrice] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);


  useEffect(() => {
    if (selectedProduct) {
      setSelectedOption(selectedProduct.filterCat);
      setColor(selectedProduct.color);
      setPrice(selectedProduct.price);
      setName(selectedProduct.name);
    }
  }, [selectedProduct]);

  const options = Array.isArray(codeDatas) ? codeDatas : [];

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    const selectedData = options.find(data => data.filterCat === selectedOption) || options[0];
  
    setSelectedOption(selectedData.filterCat);
  };
  

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleProductRegistration = () => {
    const selectedData = options.find(data => data.filterCat === selectedOption);

  if (!selectedData) {
    console.error('Selected data not found.');
    return;
  }

  const addData = {
    filterCat: selectedOption,
    filterName: selectedData.filterName,
    name: name, 
    price: parseInt(price),
    color: color,
  };

    axios.post(springUrl + '/shop/add', addData)
      .then(response => {
        alert("상품등록 완료하였습니다.");
        onProductRegistered(addData);
        handleClose();

        setName('');
        setPrice('');
        setColor('#ffffff');
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  };

  const handleProductEdit = () => {
    const selectedData = options.find(data => data.filterCat === selectedOption);
    const editedData = {
      num: selectedProduct.num,
      filterCat: selectedOption,
      filterName: selectedData.filterName,
      name: name, 
      price: parseInt(price),
      color: color,
    };

    axios.post(`${springUrl}/shop/update?num=${editedData.num}`, editedData)
      .then(response => {
        console.log("response",response);
        alert("상품 수정 완료하였습니다.");
        onEditProduct(editedData);
        handleClose();
  
        setName('');
        setPrice('');
        setColor('#ffffff');
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  };

  const closeModal = () => {
    const confirmed = window.confirm('정말 취소하시겠습니까?');
    if (confirmed) {
      alert("취소되었습니다.");
      onClose();
    }
  };


  return (
    <Modal
      open={open}
      //onClose={closeModal}
    >
      <Box sx={style}>
        <div className="modal-content">
          <h2>{selectedProduct ? '상품 수정 창' : '상품 등록 창'}</h2>
          <div className="form-group">
            <label>카테고리: </label>
            <select value={selectedOption} onChange={handleSelectChange}>
              {options.map((data, idx) => (
                <option key={idx} value={data.filterCat}>
                  {data.filterName}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>상품명 : </label>
            <input type="text" id="productName" value={name} onChange={(e) => setName(e.target.value)} />
            <br /><br />
            <label htmlFor="price">가격 : </label>
            <input type="number" id="price" name="price" placeholder="숫자만 입력" value={price} onChange={(e) => setPrice(e.target.value)} />
            <br /><br />
            <label onClick={togglePicker} style={{ cursor: 'pointer' }}>색상 :</label>
            <div>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  border: '1px solid black'
                }}
              ></div>
              {showPicker && (
                <ChromePicker
                  color={color}
                  onChange={handleColorChange}
                />
              )}
              <p>색상 HEX코드: {color}</p>
            </div>
          </div>
          <br /><br />
          <button onClick={selectedProduct ? handleProductEdit : handleProductRegistration}>{selectedProduct ? '상품 수정' : '상품 등록'}</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </Box>
    </Modal>
  );
};

export default BasicModal;
