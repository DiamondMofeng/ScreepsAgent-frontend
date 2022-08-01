import './App.css'
import { Layout, Menu, } from 'antd';
import { Link, Route, Routes } from 'react-router-dom'
import HostAgent from './modules/HostAgent';
import Home from './modules/Home';
import About from './modules/About';
import CombatPowerDetector from './modules/CombatPowerDetector';
import RoomPicker from './modules/RoomPicker';
import PublicAPI from './modules/PublicAPI';

const { Header, Content, Footer } = Layout;




const App = () => {
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[window.location.hash.substring(2)]}
            items={[{
              key: '',
              label: (
                <Link to='/' >首页</Link>
              )
            },
            {
              key: 'host-agent',
              label: (
                <Link to='/host-agent' >图表代理</Link>
              )
            },
            {
              key: 'room-picker',
              label: (
                <Link to='/room-picker' >选房器</Link>
              )
            },
            {
              key: 'combat-power-detector',
              label: (
                <Link to='/combat-power-detector' >战斗力探测器</Link>
              )
            },
            {
              key: 'PublicAPI',
              label: (
                <Link to='/PublicAPI' >PublicAPI</Link>
              )
            },
            {
              key: 'about',
              label: (
                <Link to='/about' >关于</Link>
              )
            },
            ]}

          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/host-agent' element={<HostAgent />} />
            <Route path='/room-picker' element={<RoomPicker />} />
            <Route path='/combat-power-detector' element={<CombatPowerDetector />} />
            <Route path='/PublicAPI' element={<PublicAPI />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Mofeng ©2022 Powered by Ant Design</Footer>



      </Layout>

    </>
  )
};

export default App;



