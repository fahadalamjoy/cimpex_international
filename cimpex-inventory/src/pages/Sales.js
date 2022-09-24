import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined, EditOutlined, EyeOutlined,PrinterOutlined  } from "@ant-design/icons";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Modal, Radio, Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {  useNavigate } from "react-router-dom";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import DropSearch from "../components/DropSearch";
import InputField from "../components/InputField";
import DynamicInput from "../components/DynamicInput";
// import AntInput from "../components/AntInput";

export default function Sales() {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisbility, setAddEditModalVisbility] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [printItem, setPrintItem] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [printBillModalVisbility, setPrintBillModalVisbility] = useState(false);

  const [addNew,setAddNew] =useState(false)
  const [buttonVisible,setButtonVisible] =useState(true)

  const[unitPrice,setUnitPrice] = useState()
  const[unitSold,setUnitSold] = useState()
  const[total,setTotal] = useState()

  const[a_total,set_a_Total] = useState()
  console.log(`a_total = ${a_total}`)

  console.log(`total value: ${unitPrice*unitSold}`)
  console.log(`unit price ${unitPrice}`)
  console.log(`unit price ${unitSold}`)

  const [search, setSearch] = useState("");
  const [value, setValue] = React.useState('customer');
  const searchData = {
    search,value
  }

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const componentRef = useRef();
  
  const getAllItmes = () => {
    console.log(searchData)
    dispatch({ type: "showLoading" });
     axios
      .post(`/api/search/?name=${search}`,searchData)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        console.log(response.data);
        const data = response.data;
        data.reverse();
        setItemsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/sale/delete-sale", { itemId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Item deleted successfully");
        getAllItmes();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrrong");
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisbility(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              deleteItem(record);
            }}
          />
          <Link to={`/find-id/${record._id}`}>
            <PrinterOutlined 
              className="mx-2"
              onClick={() => {
                setSelectedBill(record);
                setPrintBillModalVisbility(true);
                setPrintItem(record);
              }}
            />
          </Link>
        </div>
      ),
    },
    {
      title: "Invoice No",
      dataIndex: "invoice_no",
    },
    
    {
      title: "ID",
      dataIndex: "id",
      
    },
    
    {
      title: "Customer Name",
      dataIndex: "customer_name",
    },

    {
      title: "Product",
      dataIndex: "selected_product",
      
    },
    
    {
      title: "Unit Price",
      dataIndex: "unit_price",
    },
    {
      title: "Unit Sold",
      dataIndex: "unit_sold",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Contact",
      dataIndex: "customer_number",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    
    {
      title: "Inventory Location",
      dataIndex: "i_location",
    },

    {
      title: "Shipping Date",
      dataIndex: "shipping_date",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setSelectedKeys([]);
                confirm({ closeDropdown: true });
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.delivery.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Payment",
      dataIndex: "payment",
      
      
    },
    
    {
      title: "Delivery Charge",
      dataIndex: "d_charge",
    },
    {
      title: "Advance",
      dataIndex: "advance",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "A_Product",
      dataIndex: "another_product",
    },
    
    {
      title: "Unit Price",
      dataIndex: "a_unit_price",
    },
    {
      title: "Unit Sold",
      dataIndex: "a_unit_sold",
    },
    {
      title: "A_Total",
      dataIndex: "a_total",
    },
    {
      title: "Sales By",
      dataIndex: "sale_by",
    },
    
    {
      title: "Comments",
      dataIndex: "comments",
    },

    
  ];

  useEffect(() => {
    getAllItmes();
  }, [search]);

  useEffect(() => {
    setTotal(unitPrice*unitSold)
  }, [unitPrice,unitSold]);


  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if (editingItem === null) {
      axios
        .post("/api/sale/add-sale", {...values,total:total,a_total:a_total})
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added successfully");
          setAddEditModalVisbility(false);
          getAllItmes();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("something went wrong");
          console.log(error);
        });
    } else {
      axios
        .post("/api/sale/edit-sale", { ...values,total:total,a_total:a_total, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item edited successfully");
          setEditingItem(null);
          setAddEditModalVisbility(false);
          getAllItmes();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("something went wrong");
          console.log(error);
        });
    }
  };

  

  function refreshPage() {
    window.location.reload(false);
  }

  const unitChange =(e)=>{
    setUnitPrice(e.target.value)
  }
  const soldChange =(e)=>{
    setUnitSold(e.target.value)
  }

  



  // Page layout section wuth Table, Modal
  return (
    <DefaultLayout>
      <div className="search-div">
        <DropSearch
          className="input-search"
          setValue={setValue}
          value={value}
        />
        <InputField className="input-class" setSearch={setSearch} />
        <Button type="primary" className="reset" onClick={refreshPage}>
          RESET
        </Button>
      </div>
      <div className="d-flex justify-content-between add-sell">
        <Button
          type="primary"
          className=""
          onClick={() => setAddEditModalVisbility(true)}
        >
          Add Sell
        </Button>
      </div>
      {/* <form onSubmit={onSearch}>
        <button>Click me</button>
      </form> */}
      <Table
        id="salesDataTable"
        columns={columns}
        dataSource={itemsData}
        bordered
      />

      {addEditModalVisbility && (
        <Modal
          id="printInvoiceModal"
          className="scrool"
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalVisbility(false);
          }}
          visible={addEditModalVisbility}
          title={`${editingItem !== null ? "Edit Item" : "Add New Item"}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="invoice_no"
              label="Invoice No"
              rules={[
                {
                  required: true,
                  message: "Please type Invoice No:",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="id"
              label="ID"
              rules={[
                {
                  required: true,
                  message: "Please type ID",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="customer_name"
              label="Customer Name"
              rules={[
                {
                  required: true,
                  message: "Please type Customer Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="selected_product"
              label="Select Product"
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
            <Form.Item name="unit_price" label="Unit Price">
              <Input onChange={unitChange} />
            </Form.Item>
            <Form.Item name="unit_sold" label="Unit Sold">
              <Input onChange={soldChange} />
            </Form.Item>
            <Form.Item name="total" label="Total">
              {console.log(total)}
              <Input value={total} />
            </Form.Item>
            {/* <AntInput /> */}

            <div>
              {buttonVisible && (
                <Button
                  className="add-another-product"
                  onClick={() => {
                    setAddNew(!addNew);
                    // setButtonVisible(false)
                  }}
                  type="primary"
                >
                  Add Another Product
                </Button>
              )}
              {/* <Button
            className="add-another-product"
              onClick={() => {
                setAddNew(!addNew)
                setButtonVisible(false)
              }}
              type="primary"
            >
              Add Another Product
            </Button> */}
            </div>
            {addNew && (
              <DynamicInput a_total={a_total} set_a_Total={set_a_Total} />
            )}

            <Form.Item name="customer_number" label="Contact Number">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>

            <Form.Item name="d_charge" label="Delivery Charge">
              <Input />
            </Form.Item>
            <Form.Item name="advance" label="Advance">
              <Input />
            </Form.Item>
            <Form.Item name="discount" label="Discount">
              <Input />
            </Form.Item>
            <Form.Item name="i_location" label="Select Inventory Location">
              <Select>
                <Select.Option value="Dhaka">Dhaka</Select.Option>
                <Select.Option value="Sylhet">Sylhet</Select.Option>
                <Select.Option value="Habiganj">Habiganj</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="shipping_date" label="Shipping Date">
              <Input />
            </Form.Item>
            <Form.Item name="payment" label="Payment Status">
              <Select>
                <Select.Option value="Paid">Paid</Select.Option>
                <Select.Option value="Due">Due</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="delivery" label="Payment Mode">
              <Select>
                <Select.Option value="Cash">Cash</Select.Option>
                <Select.Option value="Bank">Bank </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="sale_by" label="Sales By">
              <Radio.Group>
                <Radio value="Boss"> Boss </Radio>
                <Radio value="মুরুববী"> মুরুববী </Radio>
                <Radio value="চাচচু"> চাচচু </Radio>
                <Radio value="রাকিব"> রাকিব </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="comments" label="Add Details or Comments">
              <Input />
            </Form.Item>
            <div className="d flex justify-content-end">
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}
