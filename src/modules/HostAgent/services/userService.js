import axios from 'axios'
import C from '../../../utils/consts'


const baseUrl = C.baseUrl + '/api/user'


const register = async (loginInfo) => {
  const response = await axios.post(baseUrl, loginInfo)
  return response.data
}



const userService = { register }

export default userService