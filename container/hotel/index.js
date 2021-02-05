import { Button, Drawer, Form, Input, InputNumber, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apiHotel from '../../api-dlod/hotel';
import Layout from '../../base/Layout';

export default function HotelContainer() {
  const [data, setData] = useState([]);
  const [idEdit, setIdEdit] = useState('');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchHotel = async () => {
    const result = await apiHotel.getHotels();
    setData(result);
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const showDrawer = (id) => {
    setIdEdit(id);
    const value = data.find((item) => item.id === id);
    form.setFieldsValue({
      name: value.name,
      price: value.price,
      star: value.star,
      review: value.review,
    });
    setVisible(true);
  };

  const showDrawerCreate = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'star',
      key: 'star',
      dataIndex: 'star',
    },
    {
      title: 'review',
      key: 'review',
      dataIndex: 'review',
    },
    {
      title: 'address',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: 'image',
      key: 'image',
      dataIndex: 'image',
      render: (value, record, idx) => {
        return <img style={{ width: '64px', height: '64px' }} src={value} />;
      },
    },
    {
      title: 'edit',
      key: 'edit',
      render: (value, record, idx) => {
        return <Button onClick={() => showDrawer(record.id)}>Edit</Button>;
      },
    },
  ];

  const onFinish = async (values) => {
    await axios.patch(`http://[::1]:3001/hotels/${idEdit}`, values);
    fetchHotel();
  };

  const onCreate = async (values) => {
    await axios.post(`http://[::1]:3001/hotels`, values);
    fetchHotel();
  };

  return (
    <Layout onCreate={showDrawerCreate}>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
      />
      <Drawer
        title='Multi-level drawer'
        width={520}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {idEdit ? (
          <Form
            onFinish={onFinish}
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout='horizontal'
          >
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
              <InputNumber />
            </Form.Item>
            <Form.Item name='star' label='Star'>
              <InputNumber />
            </Form.Item>
            <Form.Item name='review' label='Review'>
              <Input />
            </Form.Item>
            <Form.Item name='address' label='Address'>
              <Input />
            </Form.Item>
            <Form.Item name='district' label='District'>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image'>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit'>Save</Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            onFinish={onCreate}
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout='horizontal'
          >
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
              <InputNumber />
            </Form.Item>
            <Form.Item name='star' label='Star'>
              <InputNumber />
            </Form.Item>
            <Form.Item name='review' label='Review'>
              <Input />
            </Form.Item>
            <Form.Item name='address' label='Address'>
              <Input />
            </Form.Item>
            <Form.Item name='district' label='District'>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image'>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit'>Save</Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </Layout>
  );
}
