import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as LayoutAnt, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import React from 'react';

const { Header, Sider, Content } = LayoutAnt;

export default function Layout(props) {
  const router = useRouter();
  return (
    <LayoutAnt style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible>
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item
            key='1'
            icon={<UserOutlined />}
            onClick={() => router.push('/hotel')}
          >
            Hotel
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<VideoCameraOutlined />}
            onClick={() => router.push('/place-travel')}
          >
            Place Travel
          </Menu.Item>
          <Menu.Item
            key='3'
            icon={<UploadOutlined />}
            onClick={() => router.push('/restaurant')}
          >
            Restaurant
          </Menu.Item>
        </Menu>
      </Sider>
      <LayoutAnt className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(MenuFoldOutlined, {
            className: 'trigger',
          })}
          <Button onClick={props.onCreate}>Create</Button>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </LayoutAnt>
    </LayoutAnt>
  );
}
