// ## Filter by static stats：
//  ( 由 服务器缓存的静态数据 过滤 )  

// | rule                  | 参数    | 效果                        |
// | --------------------- | ------- | --------------------------- |
// | sourceCount           | n       | 能源数                      |
// | mineralTypes          | type[ ] | 仅保留选定的几种mineralType |
// | maxExitDirectionCount | 1-4     | 最大出口方向数              |
// | minExitCount          | n       | 最小出口格总数              |
// | minPlainCount         | n       | 最小平原数                  |
// | maxSwampCount         | n       | 最小沼泽数                  |
// | maxWallCount          | n       | 最小墙壁数                  |

//@ts-ignore
import { ActiveRule } from "../../components/Ruleset/SingleRule.tsx";
//@ts-ignore
import { getFilters } from "./common.ts";

const filterMap = {
  ActiveRoom: isActiveRoom,
  NoviceArea: isNoviceArea,
  RespawnArea: isRespawnArea,
  NoviceAndRespawnArea: isNoviceAndRespawnArea,
}

export function filterByMapStats(roomsByShard: RoomsByShard, rules: ActiveRule[], allShardMapstats: AllShardMapStats): RoomsByShard {
  const filteredRoomsByShard: RoomsByShard = {};

  const filters = getFilters(rules, filterMap);

  Object.keys(roomsByShard).forEach(shard => {
    filteredRoomsByShard[shard] = roomsByShard[shard].filter((roomName: RoomName) => {
      return filters.every((filter) => filter(roomName, allShardMapstats[shard][roomName]))
    })
  });

  return filteredRoomsByShard;
}

export function isActiveRoom(roomName: RoomName, roomStats: RoomStats) {
  return roomStats.status === "normal"
}

export function isNoviceArea(roomName: RoomName, roomStats: RoomStats) {
  // if (mapStats.status === undefined) {
  //   return false
  // }
  return new Date().getDate() > (roomStats?.novice ?? 0)
}

export function isRespawnArea(roomName: RoomName, roomStats: RoomStats) {
  return new Date().getDate() > (roomStats?.respawnArea ?? 0)
}

export function isNoviceAndRespawnArea(roomName: RoomName, roomStats: RoomStats) {
  return isNoviceArea(roomName, roomStats) && isRespawnArea(roomName, roomStats)
}

