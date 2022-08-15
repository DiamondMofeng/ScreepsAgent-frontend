// ## Filter by map stats
//  ( 由 map-stats 过滤)

//  | rule                 | 参数 | 效果         |
//  | -------------------- | ---- | ------------ |
//  | ActiveRoom           | -    | 可用房       |
//  | NoviceArea           | -    | 新手房       |
//  | RespawnArea          | -    | 重生房       |
//  | NoviceAndRespawnArea | -    | 新手和重生房 |

import { ActiveRule } from "../../components/Ruleset/SingleRule";
import gamedataService from "../../services/gamedataService";
import { getFilters } from "./common";

const filterMap: FilterMap = {
  ActiveRooms: isActiveRoom,
  NoviceArea: isNoviceArea,
  RespawnArea: isRespawnArea,
  NoviceAndRespawnArea: isNoviceOrRespawnArea,
}

export async function filterByMapStats(roomsByShard: RoomsByShard, rules: ActiveRule[]): Promise<RoomsByShard> {

  const filters = getFilters(rules, filterMap);
  if (!filters.length) {
    return roomsByShard
  }

  const allShardMapstats: AllShardMapStats = await gamedataService.getAllShardMapStats(roomsByShard);

  return Object.fromEntries(Object.entries(roomsByShard).map(
    ([shard, rooms]) =>
      [shard, rooms.filter(roomName => filters.every((filter) => filter(roomName, allShardMapstats[shard][roomName])))]
  ))


}

export function isActiveRoom(roomName: RoomName, roomStats: RoomStats) {
  return roomStats.status === "normal"
}

export function isNoviceArea(roomName: RoomName, roomStats: RoomStats) {
  return new Date().getTime() < (roomStats?.novice ?? 0)
}

export function isRespawnArea(roomName: RoomName, roomStats: RoomStats) {
  return new Date().getTime() < (roomStats?.respawnArea ?? 0)
}

export function isNoviceOrRespawnArea(roomName: RoomName, roomStats: RoomStats) {
  return isNoviceArea(roomName, roomStats) || isRespawnArea(roomName, roomStats)
}

