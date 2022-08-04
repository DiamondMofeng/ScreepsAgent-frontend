import React from "react"
import { useState } from "react"
import { getRoomsBetween } from "./utils/genRoomLists"



import Ruleset from "./components/Ruleset"

//@ts-ignore
import InputRooms from "./components/Input_Rooms.tsx"
//@ts-ignore
import InputedRoomsInfo from "./components/InputedRoomsInfo.tsx"

const shards = ['shard0', 'shard1', 'shard2', 'shard3']

const RoomPicker = () => {

  const [roomsByShard, setRoomsByShard] = useState(Object.fromEntries(shards.map(shard => [shard, []])))

  return (
    <div className="RoomPicker" >
      <h1>选房器</h1>
      施工中...
      <InputRooms setRoomsByShard={setRoomsByShard} />
      <InputedRoomsInfo roomsByShard={roomsByShard} />
      <Ruleset />
      


    </div>
  )
}


// var fakeRule = {
//   name: 'ruleName',
//   description: 'ruleDescription',

// }


export default RoomPicker