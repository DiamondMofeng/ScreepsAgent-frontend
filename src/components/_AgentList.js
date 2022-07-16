import React, { useEffect, useState } from "react"

import SubmitForm from './SubmitForm'

import agentService from "../services/agentService"
import DeleteButton from "./DeleteButton"


/**
 * 输入agents，仅做显示功能你
 * @param {} user 
 */
const AgentList = ({ user, setNotice }) => {
  // console.log("user", user)


  const [agents, setAgents] = useState([])


  useEffect(() => {

    console.log("getting user's agents info", user)
    agentService
      .queryByUser(user)
      // .then(res => console.log(res))
      .then(res => setAgents(res))

  }
    , [user])




  return (
    <div>
      <SubmitForm setNotice={setNotice} user={user}
        agents={agents} setAgents={setAgents} />

      <table border="1">
        <tr>
          <th>username</th>
          <th>token</th>
          <th>shard</th>
          <th>path</th>
          <th>操作</th>
        </tr>
        {
          agents.map(agent => (
            <tr>
              <td>{agent.username}</td>
              <td>{agent.token}</td>
              <td>{agent.shard}</td>
              <td>{agent.path}</td>
              <td><DeleteButton agentToDelete={agent} user={user} agents={agents} setAgents={setAgents} setNotice={setNotice} /></td>
            </tr>
          ))
        }
      </table>
      {agents.length === 0 && <div>未查询到可用代理</div>}
    </div>
  )


}



export default AgentList