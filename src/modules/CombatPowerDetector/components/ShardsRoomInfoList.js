import RoomInfo from "./RoomInfo"

import { Collapse } from "antd"
const { Panel } = Collapse

const ShardsRoomInfoList = ({ allShardRoomsObjects }) => {

  const shards = Object.keys(allShardRoomsObjects)  //方便后续使用
  const roomsIn = {}
  for (const shard of shards) {
    roomsIn[shard] = Object.keys(allShardRoomsObjects[shard])
  }


  if (shards.length === 0) {
    return null
  }

  return (
    <div className="shard-room-info-list">
      <Collapse defaultActiveKey={shards} >
        {shards.map(shardName =>
          roomsIn[shardName].length === 0
            ? null
            : (
              <Panel key={shardName} header={`${shardName} : ${Object.keys(roomsIn[shardName]).length} rooms`} >
                {roomsIn[shardName].map(roomName => (
                  <RoomInfo key={roomName} roomName={roomName} shard={shardName} roomObjects={allShardRoomsObjects[shardName][roomName]} />
                ))}
              </Panel>
            ))}
      </Collapse>
    </div>
  )




}


export default ShardsRoomInfoList