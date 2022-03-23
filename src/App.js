
import React, { useState, useEffect } from 'react'

import Notification from './components/Notification'

import SubmitForm from './components/SubmitForm'
import LoginForm from './components/LoginForm'

import agentService from './services/agentService'
import AgentList from './components/AgentList'


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







  if (!user) {
    return (

      <div>
        <h1>Mofeng的Screeps信息收集代理</h1>
        <p>原理仿照ScreepsPlus,注册并登记信息后即可在grafana网站使用自己的memory数据制作可视化图表</p>
        <p>参见<a href='https://blog.mofengfeng.com/2022/03/21/mofeng%e7%9a%84screeps%e4%bf%a1%e6%81%af%e3%80%81%e5%9b%be%e8%a1%a8%e4%bb%a3%e7%90%86%e4%bd%bf%e7%94%a8%e6%8c%87%e5%8d%97/'>使用方法</a></p>

        <a href='http://grafana.mofengfeng.com'>前往Mofeng的Grafana图表网站</a>


        <Notification notice={notice} />
        <LoginForm setNotice={setNotice} user={user} setUser={setUser} />


      </div>

    )
  }

  else {
    return (
      <div>
        <h1>Mofeng的Screeps信息收集代理</h1>
        <p>原理仿照ScreepsPlus,注册并登记信息后即可在grafana网站使用自己的memory数据制作可视化图表</p>
        <p>参见<a href='https://blog.mofengfeng.com/2022/03/21/mofeng%e7%9a%84screeps%e4%bf%a1%e6%81%af%e3%80%81%e5%9b%be%e8%a1%a8%e4%bb%a3%e7%90%86%e4%bd%bf%e7%94%a8%e6%8c%87%e5%8d%97/'>使用方法</a></p>

        <a href='http://grafana.mofengfeng.com'>前往Mofeng的Grafana图表网站</a>


        <Notification notice={notice} />
        <LoginForm setNotice={setNotice} user={user} setUser={setUser} />
        {/* <SubmitForm setNotice={setNotice} user={user} /> */}
        <AgentList setNotice={setNotice} user={user} />

        <p>懒得写更新信息和删除按钮了。可以联系我手删</p>
      </div>
    )
  }




}

export default App;
