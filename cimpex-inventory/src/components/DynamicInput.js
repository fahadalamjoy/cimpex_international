import React, { useState,useEffect } from 'react'
import { Button, Form, Input, message, Modal, Select, Table } from "antd";


const DynamicInput = ({set_a_Total,a_total}) => {


  const[a_unitPrice,set_a_UnitPrice] = useState()
  const[a_unitSold,set_a_UnitSold] = useState()
  // const[a_total,set_a_Total] = useState()
    
  const a_unitChange =(e)=>{
    set_a_UnitPrice(e.target.value)
  }
  const a_soldChange =(e)=>{
    set_a_UnitSold(e.target.value)
  }

  useEffect(() => {
    set_a_Total(a_unitPrice*a_unitSold)
  }, [a_unitPrice,a_unitSold]);

    return (
        <div className='add-border'>
          <Form.Item 
              name="another_product"
              label="Please Select Another Product"
              rules={[
                {
                  required: true,
                  message: "Please Select Product",
                },
              ]}
            >
              <Select mode="multiple">
                <Select.Option value="2F">2F</Select.Option>
                <Select.Option value="4F">4F</Select.Option>
                <Select.Option value="6F">6F</Select.Option>
                <Select.Option value="12F">12F</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="a_unit_price" label="Unit Price">
              <Input onChange={a_unitChange}/>
            </Form.Item>
            <Form.Item name="a_unit_sold" label="Unit Sold">
              <Input onChange={a_soldChange}/>
            </Form.Item>
            <Form.Item name="a_total" label="A Total">
              {console.log(a_total)}
              <Input value={a_total}/>
            </Form.Item>
      </div>
    )
}

export default DynamicInput