import { Button, message } from "antd";
import React from "react";
import agentService from "../services/agentService";

const DeleteButton = ({ idToDelete, agents, setAgents }) => {

  const handleDelete = async () => {
    console.log("idToDelete", idToDelete);
    try {
      await agentService.removeByID(idToDelete)
      // const res = await agentService.removeByInfo(deleteInfo)
      message.success("删除成功")
      // console.log(agents)

      setAgents(agents.filter(a => a.id !== idToDelete))
    }
    catch (e) {
      console.log(e)
      message.error('删除失败')
    }



  }


  return (
    <Button onClick={handleDelete}>删除</Button>
  )

}

export default DeleteButton