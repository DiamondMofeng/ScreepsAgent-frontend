/*

## Filter by room name ( 由房间名过滤 ) :   

| rule                 | 参数  | 效果                    |
| -------------------- | ----- | ----------------------- |
| ignoreHighwayRooms   | -     | 忽略过道房              |
| ignoreCenterRooms    | -     | 忽略过滤掉中心9房       |
| onlyHighwayNeighbour | -     | 仅保留离过道1格近的房间 |

*/


export function filter_byRoomName(rooms, ruleSet) {

  const ruleToFilter = {
    "ignoreHighwayRooms": ignoreHighwayRooms,
    "ignoreCenter9Rooms": ignoreCenter9Rooms,
    "onlyHighwayNeighbour": onlyHighwayNeighbour,

  }
  const filters = ruleSet.map(rule => ruleToFilter[rule])
  const filteredRooms = filters.reduce((acc, filter) => acc.filter(filter), rooms)
  return filteredRooms

}

/**
 * 忽略高速房间 
 * 依据：坐标结尾是否含有0
 * @param {String} roomName 
 * @returns {Boolean}
 */
export function ignoreHighwayRooms(roomName) {
  const reg_isHighway = /.*0$|.*0[NnSs].*/
  return roomName.match(reg_isHighway) === null
}

/**
 * 忽略中心9房
 * 依据：坐标末尾同时包含4-6
 * @param {String} roomName 
 * @returns {Boolean}
 */
export function ignoreCenter9Rooms(roomName) {
  const reg_isCenter9 = /[WwNn]\d*[456][NnSs]\d*[456]/
  return roomName.match(reg_isCenter9) === null
}

/**
 * 仅保留过道邻居房
 * 依据：坐标末尾包含1/9
 * @param {String} roomName 
 * @returns 
 */
export function onlyHighwayNeighbour(roomName) {
  const reg_isHighwayNeighbour = /.*[19]$|.*[19][NnSs].*/
  return roomName.match(reg_isHighwayNeighbour) !== null
}


export default filter_byRoomName