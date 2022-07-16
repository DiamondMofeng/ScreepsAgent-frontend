
import React, { useState, useEffect } from 'react'

import Notification from './components/agentHost/Notification'

import LoginForm from './components/agentHost/LoginForm'

import agentService from './services/agentService'

import './App.css'
import AgentList from './components/agentHost/AgentList'


const App = () => {

  const [user, setUser] = useState(null)
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      agentService.setToken(loggedUser.loginTOKEN)
    }
  }, [])




  const Header = () => {
    return (
      <div>
        <h1>Mofeng的Screeps信息收集代理</h1>
        <p>原理仿照ScreepsPlus,注册并登记信息后即可在grafana网站使用自己的memory数据制作可视化图表</p>
        <p>参见<a href='https://blog.mofengfeng.com/2022/03/21/mofeng%e7%9a%84screeps%e4%bf%a1%e6%81%af%e3%80%81%e5%9b%be%e8%a1%a8%e4%bb%a3%e7%90%86%e4%bd%bf%e7%94%a8%e6%8c%87%e5%8d%97/'
          target='_blank' rel="noreferrer">
          使用方法</a></p>
        <p><a href='http://grafana.mofengfeng.com/dashboard/snapshot/4M6WcC1hnAzwn4kgGxD3Mg2ZeRgCuEYd?orgId=16&refresh=5m'
          target='_blank' rel="noreferrer">
          示例图表</a></p>
        <p>注意！！所用数据库字段的数据类型经第一次保存数据后无法改变,否则将导致无法存入数据。
          而且,难以识别多重嵌套的js对象,所以不建议使用多重嵌套。
        </p>
        <a href='http://grafana.mofengfeng.com/login'
          target='_blank' rel="noreferrer">前往Mofeng的Grafana图表网站</a>
      </div>
    )
  }



  if (!user) {
    return (

      <div>
        <Header />


        <Notification notice={notice} />
        <LoginForm setNotice={setNotice} user={user} setUser={setUser} />


      </div>

    )
  }

  else {
    return (
      <div>
        <Header />


        <Notification notice={notice} />
        <LoginForm setNotice={setNotice} user={user} setUser={setUser} />
        <AgentList setNotice={setNotice} user={user} />
        <p/>
        <p>出问题在screeps群里@Mofeng</p>
      </div>
    )
  }




}

export default App;
