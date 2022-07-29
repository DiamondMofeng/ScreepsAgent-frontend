
const reg_parseRoomName = /([WwEe])(\d+)([NnSs])(\d+)/

/**
 * 解析房间名
 * @param {String} roomName 
 * @returns [ E/W , 坐标:int , N/S , 坐标:int ]
 */
export function parseRoomName(roomName) {
  let res = reg_parseRoomName.exec(roomName)
  if ((res instanceof Array) === false || res.length !== 5) {
    throw new Error(`要解析的房间名${roomName}有误`)
  }
  res[2] = parseInt(res[2])
  res[4] = parseInt(res[4])
  return res.slice(1)
}

/**
 * 获取两个对角房之间的所有房间
 * @param {String} fromRoom 
 * @param {String} toRoom 
 * @returns 
 */
export function getRoomsBetween(fromRoom, toRoom) {
  let rooms = []
  // 处理房间参数为方便使用的格式
  fromRoom = parseRoomName(fromRoom)
  toRoom = parseRoomName(toRoom)

  // 生成房间列表
  // 半截半截生成

  // 前半截
  let pres = []
  if (fromRoom[0] === toRoom[0]) {
    for (let we = Math.min(fromRoom[1], toRoom[1]); we <= Math.max(fromRoom[1], toRoom[1]); we++) {
      pres.push(fromRoom[0] + String(we))
    }
  }
  else {
    for (let we1 = fromRoom[1]; we1 >= 0; we1 -= 1) {
      pres.push(fromRoom[0] + String(we1))
    }
    for (let we2 = 0; we2 <= toRoom[1]; we2++) {
      pres.push(toRoom[0] + String(we2))
    }
  }
  // 后半截
  for (let pre of pres) {

    if (fromRoom[2] === toRoom[2]) {
      for (let i = Math.min(fromRoom[3], toRoom[3]); i <= Math.max(fromRoom[3], toRoom[3]); i++) {
        rooms.push(pre + (fromRoom[2] + String(i)))
      }
    }
    else {

      for (let ns = 0; ns <= fromRoom[3]; ns++) {
        rooms.push(pre + (fromRoom[2] + String(ns)))
      }
      for (let ns = 0; ns <= toRoom[3]; ns++) {
        rooms.push(pre + (toRoom[2] + String(ns)))
      }
    }
  }


  rooms = rooms.map(roomName => roomName.toUpperCase())

  return [...new Set(rooms)]
  // return uniq(rooms)
}


const exports = {
  parseRoomName,
  getRoomsBetween
}

export default exports