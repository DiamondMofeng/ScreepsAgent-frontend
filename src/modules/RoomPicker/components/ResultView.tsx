import React from 'react';
import { filterByRoomName } from '../utils/filter/ByRoomName';
// import InputedRoomsInfo from './InputedRoomsInfo';
import { ActiveRule } from './Ruleset/SingleRule';
// import gameService from '../services/gamedataService';
import { filterByMapStats } from '../utils/filter/ByMapStats';
import gamedataService from '../services/gamedataService';
import ResultViewTable from './ResultViewTable';

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

  const [results, setResults] = React.useState<any[]>([])

  //先把数据过滤一遍
  const getFiltedData = async () => {
    //1. ByRoomName
    const roomsByShard_filteredByRoomName = filterByRoomName(roomsByShard, activeRules)
    console.log("roomsByShard_filteredByRoomName", roomsByShard_filteredByRoomName);

    //2. ByMapStats
    const roomsByShard_filteredByMapStats = await filterByMapStats(roomsByShard_filteredByRoomName, activeRules)
    console.log('roomsByShard_filteredByMapStats: ', roomsByShard_filteredByMapStats);

    //3. ByStatic Data From Server
    // const roomsByShard_filteredByStaticData = await filterByStaticData(roomsByShard_filteredByMapStats, activeRules)
    const allShardRoomsInfo = await gamedataService.getAllShardRoomsInfo(roomsByShard_filteredByMapStats, activeRules) as AllShardRoomsInfo
    setResults(flatDataThenTrans(allShardRoomsInfo))


  }

  /**
   * 展平成RoomInfo数组。处理放后面表格里
   * @param data 
   * @returns 
   */
  function flatDataThenTrans(data: AllShardRoomsInfo): RoomInfo[] {
    const flattedData = Object.values(data).map(shardRoomsInfo => Object.values(shardRoomsInfo)).flat()
    const camelCaseData = flattedData.map(roomInfo => Object.fromEntries(
      Object.entries(roomInfo).map(([key, value]) => [snakeCasetoCamel(key), value])
    ))
    return camelCaseData
  }

  function snakeCasetoCamel(str) {
    return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
      return $1 + $2.toUpperCase();
    });
  }


  return (
    <>
      <button onClick={getFiltedData}>查询</button>
      {/* <button onClick={test}>test</button> */}
      <ResultView data={results} />
    </>
  )






}

const ResultView = ({ data }: {
  data: any
}) => {

  type ResultViewType = "Table"

  if (!data?.length) {
    return <div>没有数据</div>
  }



  // const columns = Object.keys(data[0]).map(key => {
  //   return {
  //     title: key,
  //     dataIndex: key,
  //     key: key
  //   }
  // })


  return (
    <div className="ResultView">
      没做完呢
      <ResultViewTable dataSource={data} />;
    </div>
  )


}

export default ResultViewWarpper;
