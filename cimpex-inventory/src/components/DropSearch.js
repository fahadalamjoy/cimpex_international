import * as React from 'react';

const DropSearch = ({setValue,value}) => {

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };

  return (
    <div>
      <label>
        Search Feilds
        <select className='selected' value={value} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="invoice_no">Invoice ID</option>
          <option value="contact">Contact</option>
          <option value="payments">Payments</option>
          <option value="address">Address</option>
        </select>
      </label>

    </div>
  );
};

export default DropSearch;