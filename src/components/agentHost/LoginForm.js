import { Input } from "antd"


import React, { useState } from "react"
import agentService from '../../services/agentService'
import loginService from '../../services/loginService'
import userService from '../../services/userService'



const LoginForm = ({ user, setUser, setNotice }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)


    try {
      const newLogin =
      {
        username: username,
        password: password,
      }



      const res = await loginService.login(newLogin)
      const user = res.user
      console.log('user: ', user);

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      agentService.setToken(user.loginTOKEN)

      setNotice({ msg: `You have successfully login`, type: '' })
      setTimeout(() => {
        setNotice(null)
      }, 10000)


      // blogAddRef.current.toggleVisibility()
    }
    catch (e) {
      console.log('login failed')
      setNotice({ msg: `登陆失败！无效的用户名或密码`, type: 'error' })
      setTimeout(() => {
        setNotice(null)
      }, 10000)
    }
  }


  const handleLogoff = (user, setUser) => {
    const handler = () => {
      console.log(user.name, 'is logging off')
      window.localStorage.removeItem('loggedUser')
      setUser(null)
      console.log('log off succ')
    }
    return handler
  }


  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      const newUser =
      {
        username: username,
        password: password,
      }

      if (password.length < 4) {
        setNotice({ msg: `注册失败！密码过短`, type: 'error' })
        setTimeout(() => {
          setNotice(null)
        }, 10000)
        return
      }
      // console.log('1')
      // const res = await userService.register(newUser)
      await userService.register(newUser)

      setNotice({ msg: `注册成功！`, type: '' })
      setTimeout(() => {
        setNotice(null)
      }, 10000)


      // blogAddRef.current.toggleVisibility()
    }
    catch (e) {
      console.log('create failed')
      setNotice({ msg: `注册失败！无效的用户名或密码`, type: 'error' })
      setTimeout(() => {
        setNotice(null)
      }, 10000)
    }
  }



  if (user === null) {
    return (
      <div>
        <h2>登陆或注册</h2>
        <form >
          <div>
            username
            <Input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              placeholder={"用户名"}
            />
          </div>
          <div>
            password
            <Input.Password
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder={"密码"}
            />

          </div>
          <button onClick={handleLogin}>登录</button>
          <button onClick={handleRegister}>注册</button>
        </form>



      </div>

    )
  }
  else {
    return (
      <div>
        <p>Current user: {user.name} </p>
        <button onClick={handleLogoff(user, setUser)}>Log Off  </button>
      </div>
    )
  }
}

export default LoginForm
