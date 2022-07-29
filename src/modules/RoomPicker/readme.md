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

| rule                 | 参数  | 效果                    |
| -------------------- | ----- | ----------------------- |
| ignoreHighwayRooms   | -     | 忽略过道房              |
| ignoreCenterRooms    | -     | 忽略过滤掉中心9房       |
| x range from highway | range | 仅保留离过道n格近的房间 |

## Filter by map stats ( 由 map stats 过滤 )：

    注： map stats (statName) 包括：
    - none0 
        - status: "normal"
        - [novice]: timestamp when expire
        - [respawnArea]: timestamp when expired
        - [openTime]: timestamp when open 
        - [isPowerEnabled] : is power enabled
        - [sign]: 
            - user: userID
            - text: sign text
            - time: timestamp when signed
        - [own]: 
            - user: userID
            - level: RCL

    - owner0
        - same as none0

    - claim0
        - same as none0
    
    - mineral0
        - same as none0
        - [minerals0]:
            - type: "L"
            - density: 3 

    - energyControl8    /180/1440
        - same as none0
        - [energyControl8]:
            - array:
                - user: userID
                - value: energyControl8
                
    - 剩下的不写了


| rule                          | 参数      | 效果                    |
| --------------------          | -----     | ----------------------- |
| onlyOpenRooms                 | -         | 忽略未开放房间           |
| ignoreNoviceOrRespawnArea     | bool[2]   | 忽略新手区或重生区房间      |
| onlyNoviceOrRespawnArea       | bool[2]   | 仅保留新手或重生区房间      |
| onlyClaimableRooms            | range     | 仅保留无主房间(是否需要区分reserve?) |
| onlyMineralTypes                | type[ ]   | 仅保留选定的几种mineralType |



## Filter by simple room objects:  
通过简单的room objects进行过滤

| rule                          | 参数  | 效果                     |
| --------------------          | ----- | ----------------------- |
| only2SourcesRooms             | -     | 仅保留双矿房             |
| onlySimpleLegacyRooms         | -     | 仅保留有他人建筑的房间    |
|                               | -     |                         |
|                               | -     |                         |
|                               | -     |                         |
|                               | -     |                         |


## Filter by detailed room objects:  
通过详细的room objects进行过滤

| rule                          | 参数  | 效果                     |
| --------------------          | ----- | ----------------------- |
| onlyRichLegacyRooms           | -     | 仅保留遗产丰富的房间（定义？）|
|                               | -     |                         |
|                               | -     |                         |
|                               | -     |                         |
|                               | -     |                         |

## Filter by room terrain:
结合房间地形进行过滤

| rule                          | 参数  | 效果                     |
| --------------------          | ----- | ----------------------- |
| maxExitDirections             | [1-4] | 仅保留出口方向≤[n]的房间  |
| maxExits                      | [1-4] | 仅保留出口数量≤[n]的房间  |
| minWalkable                   | number| 仅保留可行走块≤[n]的房间 |
|                               | -     |                         |
|                               | -     |                         |
|                               | -     |                         |






