import React from "react"
import { useState } from "react"
import { getRoomsBetween } from "./utils/genRoomLists"

//@ts-ignore
import Ruleset from "./components/Ruleset/Ruleset.tsx"

//@ts-ignore
import InputRooms from "./components/Input_Rooms_new.tsx"
//@ts-ignore
import InputedRoomsInfo from "./components/InputedRoomsInfo.tsx"
//@ts-ignore
import ResultView from "./components/ResultView.tsx"
import { ActiveRule } from "./components/Ruleset/SingleRule"

const shards = ['shard0', 'shard1', 'shard2', 'shard3']

const RoomPicker = () => {

  const [roomsByShard, setRoomsByShard] = useState(Object.fromEntries(shards.map(shard => [shard, []])))
  const [activeRules, setActiveRules] = useState<ActiveRule[]>([])

  return (
    <div className="RoomPicker" >
      <h1>选房器</h1>
      施工中...
      <InputRooms setRoomsByShard={setRoomsByShard} />
      <InputedRoomsInfo roomsByShard={roomsByShard} />
      <Ruleset activeRules={activeRules} setActiveRules={setActiveRules} />

      <ResultView roomsByShard={roomsByShard} activeRules={activeRules} />

    </div>
  )
}




export default RoomPicker