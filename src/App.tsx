import './App.css';

import { useState } from 'react'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Menu, Layout, theme } from 'antd';

//import custom data
import { menuItems } from './data/menuItems'

import Client from './screens/Client'
import Operator from './screens/Operator'
import Analytics from './screens/Analytics'
import FAQ from './screens/FAQ'
import Support from './screens/Support'
import ClientAnal from './screens/ClientAnal'
import OperatorAnal from './screens/OperatorAnal'
import Traffic from './screens/Traffic'
import Withdrawal from './screens/Withdrawal'

const { Content, Sider } = Layout;

function App() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          style={{
            background: '#fff',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={menuItems} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200, marginTop:30, padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 80,
                margin: 0,
                minHeight: 600,
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route exact path='/' element={ <Analytics/> }/>
                <Route path='/client' element={ <Client/> }/>
                <Route path='/operator' element={ <Operator/> }/>
                <Route path='/faq' element={ <FAQ/> }/>
                <Route path='/analytics' element={ <Analytics/> }/>
                <Route path='/support' element={ <Support/> }/>
                <Route path='/clientAnal' element={ <ClientAnal/> }/>
                <Route path='/operatorAnal' element={ <OperatorAnal/> }/>
                <Route path='/traffic' element={ <Traffic/> }/>
                <Route path='/withdrawal' element={ <Withdrawal/>} />
              </Routes>
            </Content>
        </Layout>
      </Layout>
    </BrowserRouter>       
  )
}

export default App
