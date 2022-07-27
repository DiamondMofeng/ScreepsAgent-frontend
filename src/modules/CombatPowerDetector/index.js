import { useState } from "react"

import officialService from "../Common/services/officialService"

import OverallInfo from "./components/OverallInfo"
import RoomInfo from "./components/RoomInfo"
import { Input, message } from "antd"
import ShardRoomInfoList from "./components/ShardRoomInfoList"

const CombatPowerDetector = () => {




  const [onQuery, setOnQuery] = useState(false)

  const [playerName, setPlayerName] = useState("")
  const [userID, setUserID] = useState("")
  const [userRooms, setUserRooms] = useState({})

  const [roomObjectsByShard, setRoomObjectsByShard] = useState({})



  const getRoomCountsByShard = (shardRooms) => {
    const roomCounts = {}
    for (let shardName in shardRooms) {
      roomCounts[shardName] = shardRooms[shardName].length
    }
    return roomCounts
  }

  const queryRoomObjectsFromRooms_sync = async (rooms) => {
    setOnQuery(true)
    const _roomObjectsByShard = {}

    for (const shardName in rooms) {
      _roomObjectsByShard[shardName] = {}
      for (const room of rooms[shardName]) {
        _roomObjectsByShard[shardName][room] = await officialService.room_objects(room, shardName)
      }
    }
    setRoomObjectsByShard(_roomObjectsByShard)
    setOnQuery(false)
    return _roomObjectsByShard
  }

  const queryRoomObjectsFromRooms_thenSet_async = async (rooms) => {
    setOnQuery(true)
    let asyncCounts = Object.values(getRoomCountsByShard(rooms)).reduce((sum, cur) => sum + cur, 0)
    const _roomObjectsByShard = {}

    for (const shardName in rooms) {
      _roomObjectsByShard[shardName] = {}
      for (const room of rooms[shardName]) {

        officialService.room_objects(room, shardName)
          .then(res =>
            _roomObjectsByShard[shardName][room] = res)
          .catch(_ => {
            console.log(`${shardName}/${room} 出错了`);
            //TODO 出错了，考虑加入failed或重新查询
          })
          // eslint-disable-next-line no-loop-func
          .finally(_ => {
            asyncCounts -= 1
            if (asyncCounts === 0) {
              setOnQuery(false)
              setRoomObjectsByShard(_roomObjectsByShard)

              console.log("可以，没问题")
            }
          }
          )
      }
    }
    return _roomObjectsByShard

  }

  const main = async (playerName) => {
    const newUserID = await officialService.user_find(playerName)
    setUserID(newUserID)
    const newUserRooms = await officialService.user_rooms(newUserID)
    setUserRooms(newUserRooms)

    const newRoomObjectsByShard = await queryRoomObjectsFromRooms_thenSet_async(newUserRooms)
    console.log('newRoomObjectsByShard: ', newRoomObjectsByShard);
    // setRoomObjectsByShard(newRoomObjectsByShard)
  }

  const main2 = async (playerName) => {
    officialService.user_find(playerName)
      .then(userID => {
        setUserID(userID)
        return officialService.user_rooms(userID)
      }).catch(err => { message.error(`获取${playerName}的 ID失败!`) })
      .then(userRooms => {
        setUserRooms(userRooms)
        return queryRoomObjectsFromRooms_thenSet_async(userRooms)
      }).catch(err => { message.error(`获取${playerName}的 房间列表失败!`) })
      .then(roomObjectsByShard => {
        setRoomObjectsByShard(roomObjectsByShard)
      })
  }

  return (
    <div className="CombatPowerDetector">
      <h1>战斗力探测器</h1>
      施工中...

      <Input title="要查询的玩家名" onChange={({ target }) => setPlayerName(target.value)}></Input>


      <button onClick={async () => await main2(playerName)}>走一遍流程</button>



      {/* <RoomInfo roomName="W17N15" shard="shard3" roomObjects={W12N16roomObjects} /> */}
      <OverallInfo playerName={playerName} roomObjects={roomObjectsByShard} />
      {
        Object.keys(roomObjectsByShard).map(shardName => (
          <ShardRoomInfoList
            key={shardName}
            shardName={shardName}
            shardRoomsObjects={roomObjectsByShard[shardName]}
          />
        ))
      }
    </div>
  )
}

export default CombatPowerDetector

