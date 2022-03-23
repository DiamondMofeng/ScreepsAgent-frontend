import React, { useState } from "react"
import agentService from '../services/agentService'



const AgentAddForm = ({ user, setNotice, setAgents, agents }) => {

  const [token, setToken] = useState('')
  const [shard, setShard] = useState('')
  const [path, setPath] = useState('')

  const handleAddAgent = async (event) => {
    event.preventDefault()


    try {
      const newAgent =
      {
        token: token,
        shard: shard,
        path: path,
        username: user.name,
        loginTOKEN: user.loginTOKEN,
      }

      // try {
      //   const testRes = await agentService.test(newAgent)
      //   console.log(testRes)
      // }
      // catch {
      //   setNotice({ msg: `获取memory测试失败！`, type: 'error' })
      //   setTimeout(() => {
      //     setNotice(null)
      //   }, 10000)
      //   return
      // }


      const response = await agentService.create(newAgent)
      console.log('response: ', response);
      console.log('create succ')
      setAgents(agents.concat(response))

      setNotice({ msg: `用户代理添加成功！`, type: '' })
      setTimeout(() => {
        setNotice(null)
      }, 10000)


      // blogAddRef.current.toggleVisibility()
    }
    catch (e) {
      console.log('create failed')
      setNotice({ msg: `用户代理添加失败！`, type: 'error' })
      setTimeout(() => {
        setNotice(null)
      }, 10000)
    }
  }

  return (
    <div>

      <form onSubmit={handleAddAgent}>
        <div>Token:
          <input
            type="text"
            value={token}
            name="Token"
            onChange={({ target }) => setToken(target.value)}
          />
        </div>
        <div>Shard:
          <input
            type="text"
            value={shard}
            name="shard"
            onChange={({ target }) => setShard(target.value)}
          />
        </div>
        <div>Path:
          <input
            type="text"
            value={path}
            name="Path"
            onChange={({ target }) => setPath(target.value)}
          />
        </div>


        <button type="submit">测试并保存</button>

      </form>
    </div>
  )
}

export default AgentAddForm
