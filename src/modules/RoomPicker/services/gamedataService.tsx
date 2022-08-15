import axios from "axios"
import { baseUrl } from "../../../utils/consts"
import officialService from "../../Common/services/officialService"
import { ActiveRule } from "../components/Ruleset/SingleRule"


export const temp_token = async (): Promise<string> => {
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

  const tempToken = await temp_token()
  officialService.setToken(tempToken)

  const getShardMapStats = async (rooms, shard) => {
    return [shard, (await officialService.map_stats(rooms, shard))?.stats]
  }

  const allShardMapStats = Object.fromEntries(await Promise.all(Object.entries(roomsByShard).map(([shard, rooms]) => getShardMapStats(rooms, shard))))

  return allShardMapStats
}

export async function rooms_info(rooms: RoomName[], shard: ShardName, rules: undefined = undefined) {
  const res = await axios.post(baseUrl + '/api/gamedata/rooms-info', { rooms, shard, rules })
  // console.log('res : ', res);

  return res.data
}


export const getAllShardRoomsInfo = async (roomsByShard: RoomsByShard, rules: ActiveRule[]): Promise<AllShardRoomsInfo> => {
  Object.entries(roomsByShard).forEach(([shard, rooms]) => {
    if (rooms.length === 0) {
      delete roomsByShard[shard]
    }
  })

  const getShardRoomsInfo = async (rooms: RoomName[], shard, rules) => {
    return [shard, await rooms_info(rooms, shard, rules)]
  }

  const AllShardRoomsInfo = Object.fromEntries(await Promise.all(Object.entries(roomsByShard)
    .map(([shard, rooms]) => getShardRoomsInfo(rooms, shard, rules))))

  return AllShardRoomsInfo

}

const gamedataService = {
  getTempToken: temp_token,
  getAllShardMapStats,
  getAllShardRoomsInfo

}

export default gamedataService

