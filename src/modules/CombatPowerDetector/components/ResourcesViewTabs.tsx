import React from "react";
import { useState } from "react";

import { Radio } from "antd"
import ResourcesView from "./ResourcesView";

/*
example:

Tabs
- ALL
- shard0
  - ALL
  - W12N16
    - energy  : 123
    - power   : 234
- shard3
  - ALL
  - E28N3
  - E28N4


*/

type Resources = {
  [resourceType: string]: number
}

type ShardResources = {
  [roomName: string]: Resources
}

type AllShardResources = {
  [K in ShardName]: ShardResources
}




const ResourcesViewTabs = ({ allShardResources }: {
  allShardResources: AllShardResources
}) => {
  const [shard, setShard] = useState<ShardName | 'ALL'>('ALL')
  const [room, setRoom] = useState('ALL')

  const sumResources = (resourcesList: Resources[]): Resources => {
    const result = {} as Resources
    for (const resources of resourcesList) {
      for (const resourceType in resources) {
        if (!result[resourceType]) {
          result[resourceType] = 0
        }
        result[resourceType] += resources[resourceType]
      }
    }
    return result
  }


  const getSelectedResources = (shard: ShardName | 'ALL', room: string): Resources => {
    if (shard === 'ALL') {
      const res = sumResources(
        Object.values(allShardResources)
          .map(shardResources =>
            Object.values(shardResources)
          )
          .flat()
      )
      return res
    }
    if (room === 'ALL') {
      return sumResources(Object.values(allShardResources[shard]))
    }

    return allShardResources[shard][room]
  }



  return (
    <div className="resources-view-tabs">
      <Radio.Group defaultValue="ALL"
        value={shard}
        //  buttonStyle="solid"
        onChange={(e) => { setShard(e.target.value); setRoom('ALL') }}
      >
        <Radio.Button value="ALL">ALL</Radio.Button>
        {
          Object.keys(allShardResources).map(shardName => (
            <Radio.Button key={shardName} value={shardName}>{shardName}</Radio.Button>
          ))
        }
      </Radio.Group>
      <br />
      <Radio.Group defaultValue="ALL"
        value={room}
        //  buttonStyle="solid"
        onChange={(e) => setRoom(e.target.value)}
      >
        {
          shard === 'ALL' ? null : (
            <>
              <Radio.Button value="ALL">ALL</Radio.Button>
              {
                Object.keys(allShardResources[shard]).map(roomName => (
                  <Radio.Button key={roomName} value={roomName}>{roomName}</Radio.Button>
                ))
              }
            </>
          )
        }
      </Radio.Group>

      <ResourcesView resources={getSelectedResources(shard, room)} />
    </div>

  )

}

export default ResourcesViewTabs