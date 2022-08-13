import axios from "axios"
import { baseUrl } from "../../../utils/consts"
import officialService from "../../Common/services/officialService"
import { ActiveRule } from "../components/Ruleset/SingleRule"


export const getTempToken = async (): Promise<string> => {
  const response = await axios.get(baseUrl + '/api/gamedata/temp-token')
  return response.data.token
}

export const getAllShardMapStats = async (roomsByShard: RoomsByShard) => {

  Object.keys(roomsByShard).forEach(shard => {
    if (roomsByShard[shard].length === 0) {
      delete roomsByShard[shard]
    }
  })

  if (Object.keys(roomsByShard).length === 0) {
    return {}
  }

  const tempToken = await getTempToken()
  officialService.setToken(tempToken)

  const getShardMapStats = async (rooms, shard) => {
    return [shard, (await officialService.map_stats(rooms, shard))?.stats]
  }

  const allShardMapStats = Object.fromEntries(await Promise.all(Object.entries(roomsByShard).map(([shard, rooms]) => getShardMapStats(rooms, shard))))

  return allShardMapStats
}


export const queryByRooms = async (roomsByShard: RoomsByShard, rules: ActiveRule[]) => {
  /**
   * 1. 根据房间名过滤房间
   * 2. 根据map-stats过滤房间
   */

}

const gamedataService = {
  getTempToken,
  getAllShardMapStats,
  queryByRooms,

}

export default gamedataService

