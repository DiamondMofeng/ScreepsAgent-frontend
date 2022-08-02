export const byRoomName: Rule[] = [
  {
    name: 'HighwayRooms',
    description: '过道房,坐标末尾包括0',
  },
  {
    name: 'CenterRooms',
    description: '中心房,坐标末尾同时包括4/5/6',
  },
  {
    name: 'HighwayNeighbour',
    description: '临近过道.参数为与过道最大距离',
    uniqueVal: [1, 2, 3],
  },
]


export const byMapStats: Rule[] = [
  {
    name: 'ActiveRooms',
    description: '可用房',
  },
  {
    name: 'NoviceArea',
    description: '新手区',
  },
  {
    name: 'RespawnArea',
    description: '重生区',
  },
  {
    name: 'NoviceOrRespawnArea',
    description: '新手区*和*重生区',
  },
  {
    name: 'ClaimableRooms',
    description: '可占领房,不区分reserve和claimed',
  },
  {
    name: 'MineralTypes',
    description: '房间的矿物类型',
    multiVal: [
      'X',
      'O', 'H',
      'U', 'Z', 'L', 'K',
    ]
  },
]

export const bySimpleRoomObjects: Rule[] = [
  {
    name: '2SourcesRooms',
    description: '双矿房',
  },
  {
    name: 'SimpleLegacyRooms',
    description: '简单遗产房:房间里有别人建筑',
  },
]

export const byDetailedRoomObjects: Rule[] = [
  {
    name: 'RichLegacyRooms',
    description: '富裕遗产房,定义?',
  },
]

export const byRoomTerrain: Rule[] = [
]

let allRules: Rule[] = []
allRules = allRules.concat(byRoomName)
allRules = allRules.concat(byMapStats)
allRules = allRules.concat(bySimpleRoomObjects)
allRules = allRules.concat(byDetailedRoomObjects)
allRules = allRules.concat(byRoomTerrain)

export default allRules
