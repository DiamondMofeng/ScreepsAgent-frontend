
import axios from 'axios'
import C from '../../../utils/consts'
// import { ScreepsAPI } from 'screeps-api'

const baseUrl = C.baseUrl + '/api/power-detector'

// const corsPrefix = C.corsUrl + '/'
// const corsOfficialUrl = corsPrefix + 'screeps.com/api/'

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
