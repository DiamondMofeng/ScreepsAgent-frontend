import Badge from "../../Common/components/Badge"


const OverallInfo = ({ playerName, badge, allShardsRoomsObjects }) => {


  const roomCountsByShard = {}
  for (let shardName in allShardsRoomsObjects) {
    roomCountsByShard[shardName] = Object.keys(allShardsRoomsObjects[shardName]).length
  }

  //资源信息
  //各房
  const resourceCountsByShardRoom = {}
  for (let shardName in allShardsRoomsObjects) {
    resourceCountsByShardRoom[shardName] = {}
    for (let roomName in allShardsRoomsObjects[shardName]) {
      const roomObjects = allShardsRoomsObjects[shardName][roomName]
      const roomResources = {}
      for (let obj of Object.values(roomObjects)) {

        if (["storage", "terminal", "factory"].includes(obj?.type)) {
          for (let resourceName in obj?.store) {
            if (!roomResources[resourceName]) {
              roomResources[resourceName] = 0
            }
            roomResources[resourceName] += obj.store[resourceName]
          }
        }
      }
      resourceCountsByShardRoom[shardName][roomName] = roomResources
    }
  }
  //各shard
  const resourceCountsByShard = {}

  for (let shardName in resourceCountsByShardRoom) {
    resourceCountsByShard[shardName] = {}
    for (let roomName in resourceCountsByShardRoom[shardName]) {
      for (let resourceName in resourceCountsByShardRoom[shardName][roomName]) {
        if (!resourceCountsByShard[shardName][resourceName]) {
          resourceCountsByShard[shardName][resourceName] = 0
        }
        resourceCountsByShard[shardName][resourceName] += resourceCountsByShardRoom[shardName][roomName][resourceName]
      }
    }
  }
  //总资源
  const resourceCounts = {}
  for (let shardName in resourceCountsByShard) {
    for (let resourceName in resourceCountsByShard[shardName]) {
      if (!resourceCounts[resourceName]) {
        resourceCounts[resourceName] = 0
      }
      resourceCounts[resourceName] += resourceCountsByShard[shardName][resourceName]
    }
  }







  return (
    <div className="overall-info">
      <h1>
        {playerName}
      </h1>
      <Badge badge={badge} />
      <p>房间总数：{Object.values(roomCountsByShard).reduce((sum, cur) => sum + cur, 0)}</p>
      <p>资源总量:{JSON.stringify(resourceCounts).toString()}</p>
    </div>
  )





}

export default OverallInfo

