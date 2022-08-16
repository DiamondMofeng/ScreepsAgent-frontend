import { isHighwayNeighbour, isHighwayRooms, isCenter9Rooms } from "./utils/filter/ByRoomName"

// export type RuleName =
//   | 'HighwayRooms' | 'CenterRooms' | 'HighwayNeighbour'

//   | 'ActiveRooms' | 'NoviceArea' | 'RespawnArea' | 'NoviceAndRespawnArea' | 'ClaimableRooms'

//   | 'SourceCount' | 'MineralType' | 'ExitDirectionCount' | 'MaxExitCount' | 'MinPlainCount' | 'MaxSwampCount' | 'MaxWallCount';

export const byRoomName: Rule[] = [
  {
    name: 'HighwayRooms',
    description: '过道房,坐标末尾包括0',
    type: 'RoomName',
    filter: isHighwayRooms
  },
  {
    name: 'CenterRooms',
    description: '中心房,坐标末尾同时包括4/5/6',
    type: 'RoomName',
    filter: isCenter9Rooms
  },
  {
    name: 'HighwayNeighbour',
    description: '临近过道',
    type: 'RoomName',
    // uniqueVal: [1, 2, 3],
    filter: isHighwayNeighbour
  },
]


export const byMapStats: Rule[] = [
  {
    name: 'ActiveRooms',
    description: '可用房',
    type: 'MapStats',
  },
  {
    name: 'NoviceArea',
    description: '新手区',
    type: 'MapStats',
  },
  {
    name: 'RespawnArea',
    description: '重生区',
    type: 'MapStats',
  },
  {
    name: 'NoviceAndRespawnArea',
    description: '新手区*和*重生区',
    type: 'MapStats',
  },
  {
    name: 'ClaimableRooms',
    description: '可占领房,仅包括被他人claimed的房间',
    type: 'MapStats',
  },
]

export const byStatic: Rule[] = [
  {
    name: 'SourceCount',
    description: '能源数',
    type: 'Static',
    multiVal: [1, 2],
  },
  {
    name: 'MineralType',
    description: '矿物种类',
    type: 'Static',
    multiVal: ['O', 'H', 'U', 'K', 'L', 'Z', 'X'],
  },
  {
    name: 'ExitDirectionCount',
    description: '出口方向数',
    type: 'Static',
    multiVal: [1, 2, 3, 4],
  },
  {
    name: 'MaxExitCount',
    description: '最大出口格总数',
    type: 'Static',
    freeVal: true,
  },
  {
    name: 'MinPlainCount',
    description: '最小平原数',
    type: 'Static',
    freeVal: true,
  },
  {
    name: 'MaxSwampCount',
    description: '最大沼泽数',
    type: 'Static',
    freeVal: true,
  },
  {
    name: 'MaxWallCount',
    description: '最大墙壁数',
    type: 'Static',
    freeVal: true,
  }



  // export const bySimpleRoomObjects: Rule[] = [
  //   {
  //     name: '2SourcesRooms',
  //     description: '双矿房',
  //   },
  //   {
  //     name: 'SimpleLegacyRooms',
  //     description: '简单遗产房:房间里有别人建筑',
  //   },
  // ]

  // export const byDetailedRoomObjects: Rule[] = [
  //   {
  //     name: 'RichLegacyRooms',
  //     description: '富裕遗产房,定义?',
  //   },
  // ]

]

let allRules: Rule[] = []
allRules = allRules.concat(byRoomName)
allRules = allRules.concat(byMapStats)
// allRules = allRules.concat(byStatic)

export default allRules
