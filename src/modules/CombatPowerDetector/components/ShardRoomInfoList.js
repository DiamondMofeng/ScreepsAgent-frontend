import RoomInfo from "./RoomInfo"

const ShardRoomInfoList = ({ shardName, shardRoomsObjects }) => {

  if (Object.keys(shardRoomsObjects).length === 0) {
    return null
  }

  return (
    <div className="shard-room-info-list">
      <h2>{shardName}</h2>
      {
        Object.keys(shardRoomsObjects).map(roomName => {
          return (
            <RoomInfo key={`${shardName}/${roomName}`} roomName={roomName} shard={shardName} roomObjects={shardRoomsObjects[roomName]} />
          )
        })
      }
    </div>
  )




}


export default ShardRoomInfoList