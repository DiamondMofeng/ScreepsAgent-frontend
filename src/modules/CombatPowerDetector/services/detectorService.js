
import axios from 'axios'
import C from '../../../utils/consts'

const baseUrl = C.baseUrl + '/api/power-detector'

/**
 * 
 * @param {String} playername - 要查询的玩家名
 * @returns 
 */
export const query = async (playername) => {
  const queryUrl = `${baseUrl}`
  const response = await axios.get(queryUrl, { params: { playername: playername } })
  return response.data
}