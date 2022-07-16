
import axios from 'axios'
import C from '../../../utils/consts'

const baseUrl = C.baseUrl + '/api/agents'

let token = null
const setToken = newToken => { token = newToken }

/**
 * 
 * @param {Object} newAgent 
 * @returns 成功添加的agent OBJ
 */
const create = async (newAgent) => {
  const config = { headers: { Authorization: token }, validityState: (status) => status < 500 }
  const response = await axios.post(baseUrl, newAgent, config)
  return response.data
}

/**
 * 若正常，应返回{
 * ok:1,
 * data:xxx
 * }
 * 否则返回
 * {
 *   "error": "unauthorized"
 * }
 * @param {*} newAgent 
 * @returns 
 */
const test = async (newAgent) => {
  const testUrl = `https://screeps.com/api/user/memory?_token=${newAgent.token}&shard=${newAgent.shard}&path=${newAgent.path}`
  const response = await axios.get(testUrl)
  return response
}

/**
 * 
 * @param {Object} user {name: , loginTOKEN:}
 * @returns 
 */
const queryByUser = async (user) => {
  const queryUrl = `${baseUrl}?username=${user.name}&loginTOKEN=${user.loginTOKEN}`
  const response = await axios.get(queryUrl)
  console.log('query res', response.data)
  return response.data
}

/**
 * 摆烂了，用post删吧
 * @param {Object} deleteInfo
 * @returns 
 */
const removeByInfo = async (deleteInfo) => {
  const config = { headers: { Authorization: token } }

  const removeUrl = `${C.baseUrl}/api/deleteAgent`
  const response = await axios.post(removeUrl, deleteInfo, config)
  return response.data
}


const agentService = {
  test, create, queryByUser, removeByInfo,
  setToken
}

export default agentService