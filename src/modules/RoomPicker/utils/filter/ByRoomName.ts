/*

## Filter by room name ( 由房间名过滤 ) :   

| rule                 | 参数  | 效果                    |
| -------------------- | ----- | ----------------------- |
| ignoreHighwayRooms   | -     | 忽略过道房              |
| ignoreCenterRooms    | -     | 忽略过滤掉中心9房       |
| onlyHighwayNeighbour | -     | 仅保留离过道1格近的房间 |

*/


// export function filter_byRoomName(rooms, ruleSet) {

//   const ruleToFilter = {
//     "ignoreHighwayRooms": ignoreHighwayRooms,
//     "ignoreCenter9Rooms": ignoreCenter9Rooms,
//     "onlyHighwayNeighbour": onlyHighwayNeighbour,
//   }
//   const filters = ruleSet.map(rule => ruleToFilter[rule])
//   const filteredRooms = filters.reduce((acc, filter) => acc.filter(filter), rooms)
//   return filteredRooms

// }

/**
 * 判断是否为高速房间 
 * 依据：坐标结尾是否含有0
 * @param {String} roomName 
 * @returns {Boolean}
 */
export function isHighwayRooms(roomName) {
  const reg_isHighway = /.*0$|.*0[NnSs].*/
  return roomName.match(reg_isHighway) !== null
}

/**
 * 忽略中心9房
 * 依据：坐标末尾同时包含4-6
 * @param {String} roomName 
 * @returns {Boolean}
 */
export function isCenter9Rooms(roomName) {
  const reg_isCenter9 = /[WwNn]\d*[456][NnSs]\d*[456]/
  return roomName.match(reg_isCenter9) !== null
}

/**
 * 仅保留过道邻居房
 * 依据：坐标末尾包含1/9
 * @param {String} roomName 
 * @param {Number} range
 * @returns 
 */
export function isHighwayNeighbour(roomName: string, range: number) {
  let reg_range: string;
  switch (range) {
    case 1:
      reg_range = '91'
      break;
    case 2:
      reg_range = '8912'
      break;
    case 3:
      reg_range = '789123'
      break;
    default:
      reg_range = '91'
      break;
  }

  // /.*[19]$|.*[19][NnSs].*/
  const reg_isHighwayNeighbour = new RegExp(`.*[${reg_range}]$|.*[${reg_range}][NnSs].*`, 'i')
  return roomName.match(reg_isHighwayNeighbour) !== null
}

const exports = {}

export default exports