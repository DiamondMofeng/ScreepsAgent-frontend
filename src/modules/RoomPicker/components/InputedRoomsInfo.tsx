import React from "react"

const InputedRoomsInfo: React.FC<{
  roomsByShard: RoomsByShard
}> = ({ roomsByShard }) => {

  const shards = Object.keys(roomsByShard)

  const roomsPerShard = Object.fromEntries(shards.map(shard => [shard, roomsByShard[shard].length]))
  const totalRooms = Object.values(roomsPerShard).reduce((a, b) => a + b, 0)

  return (
    <div className="inputed-rooms-info">
      <p>总房间数：{totalRooms}</p>
      <p>每个shard的房间数:</p>
      <ul>
        {shards.map(shard => (
          <li key={`roomsCountOf${shard}`}>
            {shard}: {roomsPerShard[shard]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InputedRoomsInfo