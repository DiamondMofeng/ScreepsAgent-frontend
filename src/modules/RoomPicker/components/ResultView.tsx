import React, { useState } from 'react';
import { filterByRoomName } from '../utils/filter/ByRoomName';
import { ActiveRule } from './Ruleset/SingleRule';
import { filterByMapStats } from '../utils/filter/ByMapStats';
import gamedataService from '../services/gamedataService';
import ResultViewTable from './ResultViewTable';
import { Button, Skeleton, Spin } from 'antd';

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

  const [onLoading, setOnLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  //先把数据过滤一遍
  const getFiltedData = async () => {

    setOnLoading(true)

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
    setOnLoading(false)


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
      <Button onClick={getFiltedData} disabled={onLoading}>查询</Button>
      {
        onLoading &&
        <>
          <Spin spinning={onLoading} />
          <Skeleton />
        </>
      }

      {/* <button onClick={test}>test</button> */}
      <ResultView data={results} />
    </>
  )






}

const ResultView = ({ data }: {
  data: any
}) => {

  // type ResultViewType = "Table" | "Map" | "Card"

  if (!data?.length) {
    return <div>没有数据</div>
  }




  return (
    <div className="ResultView">
      没做完呢
      <br />
      找遗产功能由于破坏平衡已被禁用
      <ResultViewTable dataSource={data} />;
    </div>
  )


}

export default ResultViewWarpper;
