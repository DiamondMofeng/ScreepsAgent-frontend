import { message } from "antd";
import React from "react";
import agentService from "../services/agentService";

const DeleteButton = ({ agentToDelete, user, agents, setAgents }) => {

  const handleDelete = async () => {
    const deleteInfo = {
      username: agentToDelete.username,
      loginTOKEN: user.loginTOKEN,
      token: agentToDelete.token,
      shard: agentToDelete.shard,
      path: agentToDelete.path

    }
    console.log("deleteInfo", deleteInfo)
    try {
      await agentService.removeByInfo(deleteInfo)
      // const res = await agentService.removeByInfo(deleteInfo)
      message.success("删除成功")
      // console.log(agents)
      // console.log(agents.filter(a =>
      //   a.token !== agentToDelete.token ||
      //   a.shard !== agentToDelete.shard ||
      //   a.path !== agentToDelete.path))

      setAgents(agents.filter(a =>
        a.token !== agentToDelete.token ||
        a.shard !== agentToDelete.shard ||
        a.path !== agentToDelete.path
      ))
    }
    catch (err) {
      message.error('删除失败')
    }



  }


  return (
    <button onClick={handleDelete}>删除</button>
  )

}

export default DeleteButton