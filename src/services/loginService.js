import axios from 'axios'
import C from '../utils/consts'


const baseUrl = C.baseUrl + '/api/login'

/**
 * 
 * @param {Object} loginInfo 
 * @returns {Object} {
 * message:xxx,
 * user:{
 * name:xxx,loginTOKEN:xxx
 * }
 * }
 */
const login = async (loginInfo) => {
  const response = await axios.post(baseUrl, loginInfo)
  return response.data
}



const loginService = { login }

export default loginService