import { Button, Input } from "antd"
import { useState } from "react"
import { getRoomsBetween } from "./utils/genRoomLists"


const RoomPicker = () => {

  const [room1, setRoom1] = useState('')
  const [room2, setRoom2] = useState('')


  return (
    <div className="RoomPicker" >
      <h1>选房器</h1>
      施工中...
      <Input value={room1} onChange={(e) => setRoom1(e.target.value)} />
      <Input value={room2} onChange={(e) => setRoom2(e.target.value)} />
      <p />
      <p />
      <p />
      <Button onClick={() => {
        console.log(getRoomsBetween(room1, room2))
      }
      } >test</Button>


    </div>
  )
}

export default RoomPicker