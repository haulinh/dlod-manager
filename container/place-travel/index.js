import { Button, Drawer, Form, Input, InputNumber, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apiPlaceTravel from '../../api-dlod/place-travel';
import Layout from '../../base/Layout';

export default function PlaceTravelContainer() {
  const [data, setData] = useState([]);
  const [idEdit, setIdEdit] = useState('');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchPlaceTravel = async () => {
    const result = await apiPlaceTravel.getPlaceTravels();
    setData(result);
  };

  useEffect(() => {
    fetchPlaceTravel();
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
    await axios.patch(`http://[::1]:3001/place-travels/${idEdit}`, values);
    fetchPlaceTravel();
  };

  const onCreate = async (values) => {
    await axios.post(`http://[::1]:3001/place-travels`, values);
    fetchPlaceTravel();
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
            <Form.Item name='star' label='Star'>
              <InputNumber />
            </Form.Item>
            <Form.Item name='district' label='District'>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image'>
              <Input />
            </Form.Item>
            <Form.Item name='review' label='Review'>
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
            <Form.Item name='star' label='Star'>
              <InputNumber />
            </Form.Item>
            <Form.Item name='district' label='District'>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image'>
              <Input />
            </Form.Item>
            <Form.Item name='review' label='Review'>
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
