import React from "react";

import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import RoomImage, { SimpleRoomObjects } from "./ResultView/RoomImage";


const ROOM_IMAGE_SIZE = 100 //default size is 150

const getExitCountFromPerDirection = (value: string): number => Object.values(JSON.parse(value) as { [direction: string]: number }).reduce((acc, cur) => acc + cur, 0)



const ResultViewTable = ({ dataSource }: {
  dataSource: RoomInfo[]
}) => {

  console.log(dataSource)

  interface data extends RoomInfo {
    key: number,

    //extra
    // shardRoom: string,
  }

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
      width: ROOM_IMAGE_SIZE + 50,
      render: (_, record) => {
        const SimpleRoomObjects: SimpleRoomObjects = {
          controller: JSON.parse(record.controllerPosition as any),
          mineral: JSON.parse(record.mineralPosition as any),
          source: JSON.parse(record.sourcePosition as any),
        }
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
      filterSearch: true,
      filters: ['WN', 'WS', 'EN', 'ES']
        .map(val => ({ text: val, value: val, key: val })),
      onFilter: (value: any, record) => value.split('').every((v: string) => record.room.includes(v)),
    },
    {
      title: 'Shard',
      dataIndex: 'shard',
      key: 'shard',
      filters: [0, 1, 2, 3]
        .map(no => ({ text: 'shard' + no, value: 'shard' + no, key: 'shard' + no })),
      onFilter: (value: any, record) => record.shard === value,
    },
    {
      title: 'Source',
      dataIndex: 'sourceCount',
      key: 'sourceCount',
      filters: [0, 1, 2, 3]
        .map(type => ({ text: type, value: type, key: type })),
      onFilter: (value: any, record) => record.sourceCount === value,
      sorter: (a, b) => a.sourceCount - b.sourceCount,
    },
    {
      title: 'MineralType',
      dataIndex: 'mineralType',
      key: 'mineralType',
      filters: ['O', 'H', 'U', 'K', 'L', 'Z', 'X']
        .map(type => ({ text: type, value: type, key: type })),
      onFilter: (value: any, record) => record.mineralType.indexOf(value) === 0,
    },
    {
      title: '地形数据',
      children: [
        {
          title: '出口方向数',
          dataIndex: 'terrainExitDirectionCount',
          key: 'terrainExitDirectionCount',
          sorter: (a, b) => a.sourceCount - b.sourceCount,
        },
        {
          title: '出口格总数',
          dataIndex: 'terrainExitPerDirection',
          key: 'terrainExitPerDirection',
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
      <Table
        columns={columns}
        dataSource={dataSource as any}
        scroll={{ x: 1500, y: 550 }}
        rowKey={record => record.shard + record.room}
      />
    </div>

  )
}

export default ResultViewTable;