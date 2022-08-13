import React from 'react';
//@ts-ignore
import { filterByRoomName } from '../utils/filter/ByRoomName.ts';
//@ts-ignore
// import InputedRoomsInfo from './InputedRoomsInfo.tsx';
//@ts-ignore
import { ActiveRule } from './Ruleset/SingleRule.tsx';
//@ts-ignore
// import gameService from '../services/gamedataService.tsx';
//@ts-ignore
import { filterByMapStats } from '../utils/filter/ByMapStats.ts';

/**
 * Block View,List(Table) View,Map View
 * 
 */


/**
 * 
 * 工具人，用于把数据转换成可用的数据，然后交给ResultView
 * 
 * @returns 
 */
const ResultViewWarpper = ({ roomsByShard, activeRules }: {
  roomsByShard: RoomsByShard,
  activeRules: ActiveRule[]
}) => {

  const [results, setResults] = React.useState(undefined)

  //先把数据过滤一遍
  const getFiltedData = async () => {
    //1. ByRoomName
    const roomsByShard_filteredByRoomName = filterByRoomName(roomsByShard, activeRules)
    // console.log(roomsByShard_filteredByRoomName);

    //2. ByMapStats
    const roomsByShard_filteredByMapStats = await filterByMapStats(roomsByShard_filteredByRoomName, activeRules)
    console.log(roomsByShard_filteredByMapStats);
    //3. ByStatic Data From Server

  }

  return (
    <>
      <button onClick={getFiltedData}>查询</button>
      <ResultView />
    </>
  )






}

const ResultView = ({ }: {
}) => {


  return (
    <div className="ResultView">
      没做完呢
    </div>
  )


}

export default ResultViewWarpper;
