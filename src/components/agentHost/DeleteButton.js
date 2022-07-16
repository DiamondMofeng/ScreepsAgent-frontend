import React from "react";
import agentService from "../../services/agentService";

const DeleteButton = ({ agentToDelete, user, agents, setAgents, setNotice }) => {

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
      setNotice({
        type: "success",
        msg: `已删除`
      })
      setTimeout(() => {
        setNotice(null)
      }, 10000)
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
      setNotice({
        type: "error",
        msg: `删除失败`
      })
      setTimeout(() => {
        setNotice(null)
      }, 10000)
    }



  }


  return (
    <button onClick={handleDelete}>删除</button>
  )

}

export default DeleteButton