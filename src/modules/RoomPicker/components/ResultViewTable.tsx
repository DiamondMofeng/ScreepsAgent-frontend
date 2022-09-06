import React, { useState } from "react";

import { Switch, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import RoomImage, { SimpleRoomObjects } from "./ResultView/RoomImage";
import { decodeJson, Json } from "../../../utils/typed-json";




const ROOM_IMAGE_SIZE = 150 //default size is 150

const getExitCountFromPerDirection = (value: Json<ExitPerDirection>): number => Object.values(decodeJson(value)).reduce((acc, cur) => acc + cur, 0)



const ResultViewTable = ({ dataSource }: {
  dataSource: RoomInfo[]
}) => {

  // console.log(dataSource)

  interface data extends RoomInfo {
    key: number,

    //extra
    // shardRoom: string,
  }

  const [isShowRoomImage, setIsShowRoomImage] = useState(true)


  dataSource = dataSource.map((item, index) => {
    return {
      ...item,
      key: index,
      // shardRoom: `${item.shard}-${item.room}`
    }
  })


  const columns: ColumnsType<data> = [
    {
      title: 'RoomImage',
      dataIndex: '',
      key: 'RoomImage',
      width: ROOM_IMAGE_SIZE + 25,
      render: (_, record) => {
        const SimpleRoomObjects: SimpleRoomObjects = {
          controller: decodeJson(record.controllerPosition),
          mineral: decodeJson(record.mineralPosition),
          source: decodeJson(record.sourcePosition),
        }
        console.log('SimpleRoomObjects: ', SimpleRoomObjects);
        return <RoomImage
          roomName={record.room}
          shard={record.shard}
          simpleObjects={SimpleRoomObjects}
          height={ROOM_IMAGE_SIZE}
          width={ROOM_IMAGE_SIZE}
        />
      }

    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
      width: 100,
      // filterSearch: true,
      filters: ['WN', 'WS', 'EN', 'ES']
        .map(val => ({ text: val, value: val, key: val })),
      onFilter: (value: any, record) => value.split('').every((v: string) => record.room.includes(v)),
      render: (_, record) =>
        <a
          href={`https://screeps.com/a/#!/room/${record.shard}/${record.room}`}
          target="_blank"
          rel="noopener noreferrer"
        >{record.room}</a>
    },
    {
      title: 'Shard',
      dataIndex: 'shard',
      key: 'shard',
      width: 100,
      filters: [0, 1, 2, 3]
        .map(no => ({ text: 'shard' + no, value: 'shard' + no, key: 'shard' + no })),
      onFilter: (value: any, record) => record.shard === value,
    },
    {
      title: 'Source',
      dataIndex: 'sourceCount',
      key: 'sourceCount',
      width: 100,
      filters: [0, 1, 2, 3]
        .map(type => ({ text: type, value: type, key: type })),
      onFilter: (value: any, record) => record.sourceCount === value,
      sorter: (a, b) => a.sourceCount - b.sourceCount,
    },
    {
      title: 'MineralType',
      dataIndex: 'mineralType',
      key: 'mineralType',
      width: 125,
      filters: ['O', 'H', 'U', 'K', 'L', 'Z', 'X']
        .map(type => ({ text: type, value: type, key: type })),
      onFilter: (value: any, record) => record.mineralType.indexOf(value) === 0,
    },
    {
      title: '地形数据',
      width: 250,
      children: [
        {
          title: '出口方向数',
          dataIndex: 'terrainExitDirectionCount',
          key: 'terrainExitDirectionCount',
          // width: 125,
          sorter: (a, b) => a.terrainExitDirectionCount - b.terrainExitDirectionCount,
        },
        {
          title: '出口格总数',
          dataIndex: 'terrainExitPerDirection',
          key: 'terrainExitPerDirection',
          // width: 125,
          render: (value) => (
            <span>
              {getExitCountFromPerDirection(value)}
            </span>
          ),
          sorter: (a, b) => getExitCountFromPerDirection(a.terrainExitPerDirection) - getExitCountFromPerDirection(b.terrainExitPerDirection),

        }
      ]
    },


  ]



  return (

    <div className="result-view-table">
      <Switch checked={isShowRoomImage} onChange={(e) => setIsShowRoomImage(e)} /> 显示房间图片
      <Table
        columns={isShowRoomImage ? [...columns] : columns.slice(1)}
        dataSource={dataSource as any}
        scroll={{ x: 1300, y: 550 }}
        rowKey={record => record.shard + record.room}
        tableLayout={'auto'}
      />
    </div>

  )
}

export default ResultViewTable;