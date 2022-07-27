

const OverallInfo = ({ playerName, roomObjects }) => {


  const roomCounts = {}
  for (let shardName in roomObjects) {
    roomCounts[shardName] = Object.keys(roomObjects[shardName]).length
  }
  return (
    <div className="overall-info">
      <h1>
        {playerName}
      </h1>
      <p>房间总数：{Object.values(roomCounts).reduce((sum, cur) => sum + cur, 0)}</p>
    </div>
  )





}

export default OverallInfo

