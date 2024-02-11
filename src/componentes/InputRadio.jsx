import React, { useState, useEffect } from 'react';
import './InputRadio.css'

const InputRadio = ({ tipoSlider, onSelectionChange, onChangeProp, instantSalesParametro }) => {
  const [instantSales, setInstantSales] = useState(instantSalesParametro || false);

  // Si initialValue cambia, actualiza el estado instantSales
  useEffect(() => {
    setInstantSales(instantSalesParametro);
  }, [instantSalesParametro]);
  
  const handleOptionChange = () => {
    setInstantSales(!instantSales);
    onSelectionChange && onSelectionChange(!instantSales ? 'si' : 'no');
  };

  const handleOnChange = (event) => {
    handleOptionChange();
    onChangeProp && onChangeProp(event);
  };

  const [claseSlider, setClaseSlider] = useState('slider round');
  useEffect(() => {
    console.log("Tipo de slider: ", tipoSlider)
    if(tipoSlider=="bandera"){
      setClaseSlider("slider sliderBandera round")
    }else{
      setClaseSlider("slider sliderColores round")
    }
  }, [tipoSlider])

  return (
    <div className="instant-sales-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={instantSales}
          onChange={handleOnChange}
        />
        <span className={claseSlider}></span>
      </label>
    </div>
  );
};

export default InputRadio;