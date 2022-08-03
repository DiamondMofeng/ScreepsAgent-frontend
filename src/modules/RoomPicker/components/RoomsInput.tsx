import React, { useEffect } from "react"
import { getRoomsBetween, getRoomsInRange } from "../utils/genRoomLists"

import { Select, Input, Button, Popover, Row, Col } from "antd"

type InputTypes = 'all' | 'range' | 'between'
const inputTypes: InputTypes[] = ['all', 'range', 'between']
const inputTypesDesc: { [key in InputTypes]: string } = {
  all: 'All',
  range: 'n Range from rooms',
  between: 'Between ... to ...'
}

type InputedRooms = {
  shard: string;
  type: InputTypes;
  rooms?: string[];
  range?: number
}





const farestRoomSite = {
  "shard0": 90,
  "shard1": 60,
  "shard2": 60,
  "shard3": 60,
}

const shards: ShardName[] = ['shard0', 'shard1', 'shard2', 'shard3']

const parseInputList = (inputList: InputedRooms[]): RoomsByShard => {
  const result = Object.fromEntries(shards.map(shard => [shard, [] as string[]])) as RoomsByShard
  for (const input of inputList) {
    switch (input.type) {
      case 'all':
        const TL = `W${farestRoomSite[input.shard]}N${farestRoomSite[input.shard]}`
        const BR = `E${farestRoomSite[input.shard]}S${farestRoomSite[input.shard]}`
        result[input.shard] = result[input.shard].concat(getRoomsBetween(TL, BR))
        break;
      case 'range':
        input.rooms!.forEach(room => {
          result[input.shard] = result[input.shard].concat(getRoomsInRange(room, input.range!))
        })
        break;
      case 'between':
        if (input.rooms!.length !== 2) {
          throw new Error('between must have exactly 2 rooms')
        }
        result[input.shard] = result[input.shard].concat(getRoomsBetween(input.rooms![0], input.rooms![1]))
        break
      default:
        break;
    }
  }
  
  for (const shardName in result) {
    result[shardName] = Array.from(new Set(result[shardName]))  //uniq
  }
  return result


}


//* ////////////////////component//////////////////////


const RoomsInput = ({ setRoomsByShard }) => {

  const [inputList, setInputList] = React.useState<InputedRooms[]>([])  //用于保存 输入的房间列表,留给useEffect解析为RoomsByShard

  const [shard, setShard] = React.useState<ShardName>('shard3')
  const [type, setType] = React.useState<'all' | 'range' | 'between'>('all')
  const [range, setRange] = React.useState<number | undefined>(1)
  const [roomsInput, setRoomsInput] = React.useState<string[] | undefined>([])  //用于between,range中接受手动输入的rooms

  useEffect(() => {
    setRoomsByShard(parseInputList(inputList))

  }, [inputList, setRoomsByShard])



  /**
   * 选shard
   * 选type
   * all: null
   * range: rooms,range
   * between: rooms
   */

  const handleTypeChange = (val: InputTypes) => {
    setType(val)
    setRange(val === 'range' ? 1 : undefined)
    setRoomsInput(val === 'all' ? undefined : [])
  }

  return (
    <div className="rooms-input">
      <h1>输入房间</h1>

      <Row>
        <Col span={2}>
          <Button onClick={() => {
            const newInputList = [...inputList, { shard, type, rooms: roomsInput, range }]
            setInputList(newInputList)
            // setRooms(parseInputList(newInputList))
          }
          }>添加</Button>
        </Col>
        <Col span={2}>
          <Select onSelect={(val: ShardName) => setShard(val)} defaultValue={shards[0]}>
            {shards.map(shard => <Select.Option key={shard} value={shard}>{shard}</Select.Option>)}
          </Select>
        </Col>
        <Col span={2}>
          <Popover content={inputTypesDesc[type]}>
            <Select onSelect={handleTypeChange} defaultValue={inputTypes[0]}>
              {inputTypes.map(type => <Select.Option key={type} value={type}>{type}</Select.Option>)}
            </Select>
          </Popover>
        </Col>
        <Col span={2}>
          {
            // type === 'all'
            //   ? null
            //   :
          }
          {
            type === 'range' &&
            <>
              <Input type="number" value={range} onChange={e => setRange(Number(e.target.value))} />
              <Input type="text" value={roomsInput} onChange={e => setRoomsInput(e.target.value.split(','))} />
            </>
          }
          {
            type === 'between' &&
            <>
              <Input type="text" value={roomsInput} onChange={e => setRoomsInput(e.target.value.split(','))} />
            </>

          }
        </Col>

      </Row>
      <table>
        <tbody>

          {
            inputList.map((input, index) => {
              return (

                <tr className={"ipt"} >
                  <td>{input.shard}</td>
                  <td>{input.type}</td>
                  <td>{input.rooms}</td>
                  <td>{input.range}</td>
                  <td>
                    <Button onClick={() => {
                      const newInputList = [...inputList]
                      newInputList.splice(index, 1)
                      setInputList(newInputList)
                    }}>删除</Button>
                  </td>
                </tr>


              )
            })}
        </tbody>

      </table>

    </div>
  )
}

export default RoomsInput
