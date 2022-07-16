import React, { useEffect, useState } from "react"

import SubmitForm from './SubmitForm'

import agentService from "../services/agentService"
import DeleteButton from "./DeleteButton"
import { Space, Table } from "antd"
const { ColumnGroup, Column } = Table


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
      .then(res => setAgents(res.map(agent => ({ ...agent, private_enable: agent['private_enable'] ? 'Yes' : 'No' }))))

  }
    , [user])




  return (
    <div>

      <SubmitForm setNotice={setNotice} user={user}
        agents={agents} setAgents={setAgents} />

      {agents.length === 0 && <div>未查询到可用代理</div>}
      <Space>
        <Table dataSource={agents}>
          <ColumnGroup title={"基本信息"} >
            {/* <Column title={"username"} dataIndex={"username"} key={"username"} /> */}
            <Column title={"token"} dataIndex={"token"} key={"token"} />
            <Column title={"path"} dataIndex={"path"} key={"path"} />
            <Column title={"shard"} dataIndex={"shard"} key={"shard"} />
          </ColumnGroup>
          <ColumnGroup title={"私服信息"}>
            <Column title={"private_enable"} dataIndex={"private_enable"} key={"private_enable"} />
            <Column title={"private_url"} dataIndex={"private_url"} key={"private_url"} />
            <Column title={"private_username"} dataIndex={"private_username"} key={"private_username"} />
            <Column title={"private_password"} dataIndex={"private_password"} key={"private_password"} />
          </ColumnGroup>
          <ColumnGroup title={"操作"}>
            <Column title={"删除"}>
              {/* <DeleteButton agentToDelete={} */}
              {/* TODO DELETE BUTTON */}
            </Column>

          </ColumnGroup>
        </Table>

      </Space>
    </div >
  )


}



export default AgentList