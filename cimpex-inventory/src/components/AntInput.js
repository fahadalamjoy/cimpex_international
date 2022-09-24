import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Select } from "antd";
import React from "react";

const AntInput = () => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "product"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing first name",
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
                <Form.Item
                  {...restField}
                  name={[name, "unit"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing last name",
                    },
                  ]}
                >
                  <Input placeholder="Unit Price" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "sold"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing last name",
                    },
                  ]}
                >
                  <Input placeholder="Unit Sold" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "total"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing last name",
                    },
                  ]}
                >
                  <Input placeholder="Total" />
                </Form.Item>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AntInput;
