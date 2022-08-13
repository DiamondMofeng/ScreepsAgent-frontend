# Room picker

rule sets:

## 选择总范围：

    预期效果:   
    - shard1 / all  
    - shard2 / range 10 from ['W1N1','W2N2'] 
    

- 选择shard
  -  all
  -  range x from [ ]
     - range
     - from room list



## Filter by room name ( 由房间名过滤 ) :   

| rule             | 参数                 | 效果              |
| ---------------- | -------------------- | ----------------- |
| highwayRooms     | -                    | 过道房            |
| centerRooms      | -                    | 过滤掉中心9房     |
| highwayNeighbour | -                    | 离过道1格近的房间 |
| <!--             | x range from highway | range             | 仅保留离过道n格近的房间 | --> |

## Filter by map stats
 ( 由 map-stats 过滤)

 | rule                 | 参数 | 效果         |
 | -------------------- | ---- | ------------ |
 | activeRoom           | -    | 可用房       |
 | noviceArea           | -    | 新手房       |
 | respawnArea          | -    | 重生房       |
 | noviceAndRespawnArea | -    | 新手和重生房 |


## Filter by static stats：
 ( 由 服务器缓存的静态数据 过滤 )   
静态数据包括：  
<!-- - room_status - 不是很静态 -->
- source_count
- mineral_type
- terrain_exit_direction_count
- terrain_exit_per_direction
- terrain_plain_count
- terrain_swamp_count
- terrain_wall_count 

    
| rule                  | 参数    | 效果                        |
| --------------------- | ------- | --------------------------- |
| minSourceCount        | n       | 最小能源数                  |
| certainMineralTypes   | type[ ] | 仅保留选定的几种mineralType |
| maxExitDirectionCount | 1-4     | 最大出口方向数              |
| minExitCount          | n       | 最小出口格总数              |
| minPlainCount         | n       | 最小平原数                  |
| maxSwampCount         | n       | 最小沼泽数                  |
| maxWallCount          | n       | 最小墙壁数                  |



## Filter by simple room objects:  
通过简单的room objects进行过滤

| rule                  | 参数 | 效果                           |
| --------------------- | ---- | ------------------------------ |
| onlySimpleLegacyRooms | -    | 仅保留有他人建筑的房间         |
| onlyRichLegacyRooms   | -    | 仅保留遗产丰富的房间（定义？） |
|                       | -    |                                |
|                       | -    |                                |
|                       | -    |                                |








