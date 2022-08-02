/**
 * 
 rule	参数	效果
onlyOpenRooms	-	忽略未开放房间
ignoreNoviceOrRespawnArea	bool[2]	忽略新手区或重生区房间
onlyNoviceOrRespawnArea	bool[2]	仅保留新手或重生区房间
onlyClaimableRooms	range	仅保留无主房间(是否需要区分reserve?)
onlyMineralTypes	type[ ]	仅保留选定的几种mineralType
 */


// export function filter_byMapStats(rooms, ruleSet) {
//   const ruleToFilter = {
//     "onlyOpenRooms": onlyOpenRooms,
//     "ignoreNoviceOrRespawnArea": ignoreNoviceOrRespawnArea,
//     "onlyNoviceOrRespawnArea": onlyNoviceOrRespawnArea,
//     "onlyClaimableRooms": onlyClaimableRooms,
//     "onlyMineralTypes": onlyMineralTypes,
//   }
//   const filters = ruleSet.map(rule => ruleToFilter[rule])
//   const filteredRooms = filters.reduce((acc, filter) => acc.filter(filter), rooms)
//   return filteredRooms


// }

// export function onlyOpenRooms(roomName) {
    