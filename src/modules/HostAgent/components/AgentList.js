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
const AgentList = ({ user }) => {
  // console.log("user", user)


  const [agents, setAgents] = useState([])


  useEffect(() => {

    // console.log("getting user's agents info", user)
    agentService
      .queryByUser(user)
      // .then(res => console.log(res))
      .then(res => setAgents(res.map(agent => ({ ...agent, private_enable: agent['private_enable'] === true ? 'Yes' : 'No' }))))

  }
    , [user])




  return (
    <div>

      <SubmitForm user={user}
        agents={agents} setAgents={setAgents} />

      {agents.length === 0 && <div>未查询到可用代理</div>}
      <Space>
        <Table dataSource={agents}>
          <ColumnGroup title={"基本信息"}>
            {["token",
              "path",
              "shard",
            ].map(key => (
              <Column title={key} dataIndex={key} key={key} align='center' />))}
          </ColumnGroup>
          <ColumnGroup title={"私服信息"}>
            {["private_enable",
              "private_url",
              "private_username",
              "private_password"
            ].map(key => (
              <Column title={key} dataIndex={key} key={key} align='center' />))}
          </ColumnGroup>
          <Column title={"操作"} align="center"
            dataIndex="id"
            key="id"
            render={(id) => (
              <>
                <DeleteButton idToDelete={id} agents={agents} setAgents={setAgents}>删除</DeleteButton>
              </>
            )}
          />

        </Table>

      </Space>
    </div >
  )


}



export default AgentList