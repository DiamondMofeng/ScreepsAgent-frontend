import React, { useEffect } from "react"
import { getRoomsBetween, getRoomsInRange } from "../utils/genRoomLists"

import { Select, Input, Button, Space, Form } from "antd"
// const { Option } = Select

//TODO 应当更好的使用form hook，日后再改

type InputTypes = 'all' | 'range' | 'between'
const inputTypes: InputTypes[] = ['all', 'range', 'between']
const inputTypesDesc: { [key in InputTypes]: string } = {
  all: 'All',
  range: 'n Range from rooms',
  between: 'Between ... to ...',
}

type InputedRooms = {
  shard: string;
  type: InputTypes;
  rooms?: string[];
  range?: number
}

const reg_roomName = /^[WE]\d+[NS]\d+$/

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
          throw new Error('between must have exactly 2 rooms')  //这里就作为Error了
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


const InputRooms = ({ setRoomsByShard }) => {

  const [inputList, setInputList] = React.useState<InputedRooms[]>([])  //用于保存 输入的房间列表,留给useEffect解析为RoomsByShard

  const [form] = Form.useForm()

  const [shard, setShard] = React.useState<ShardName>(shards[0])
  const [type, setType] = React.useState<InputTypes>(inputTypes[0])
  const [range, setRange] = React.useState<number | undefined>(undefined)
  const [roomsInput, setRoomsInput] = React.useState<string[] | undefined>(undefined)  //用于between,range中接受手动输入的rooms

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

  const formLayout = {
    labelCol: {
      span: 1,
    },
    wrapperCol: {
      span: 16,
    },
  };


  const handleTypeChange = (val: InputTypes) => {
    setType(val)
    setRange(val === 'range' ? 1 : undefined)
    setRoomsInput(val !== 'all' ? [] : undefined)
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const newInputList = [...inputList]
    const newInput: InputedRooms = {
      shard,
      type,
      rooms: roomsInput,
      range,
    }
    newInputList.push(newInput)
    setInputList(newInputList)
  }


  return (
    <div className="rooms-input">
      <h1>输入房间</h1>

      <Form form={form} {...formLayout} onFinish={onFinish} initialValues={{
        shard: shards[0],
        type: inputTypes[0],
      }}
      >
        <Button htmlType="submit" type="primary">提交</Button>
        <Form.Item name="shard" label="shard" rules={[{ required: true }]}>
          <Select onChange={(val) => setShard(val as ShardName)} value={shard} defaultValue={shards[0]}>
            {shards.map(shard => (
              <Select.Option key={shard} value={shard}>{shard}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="type" label="type" rules={[{ required: true }]}>
          <Select onChange={handleTypeChange} value={type} defaultValue={inputTypes[0]}>
            {inputTypes.map(type => (
              <Select.Option key={type} value={type}>{inputTypesDesc[type]}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        {type === 'range' && (
          <>
            <Form.Item name="range" label="range" rules={[{ required: true }]}>
              <Input type="number" value={range} min={1} max={50} onChange={e => setRange(Number(e.target.value))} />
            </Form.Item>
            <Form.Item
              name="rooms"
              label="rooms"
              rules={[{
                required: true,
                validator: (_, value: string) => {
                  // if (value.length === 0) {
                  //   return Promise.reject('please input rooms')
                  // }
                  if (value.replace(/[\r\n]/g, "").replace(/[，]/g, ",").split(',').some((room: string) => !reg_roomName.test(room))) {
                    return Promise.reject('including invalid room name')
                  }
                  return Promise.resolve()
                }
              }]} >
              <Input.TextArea value={roomsInput} placeholder={'房间列表,用逗号分隔\n如:W12N16,E28N3,E44S59'} onChange={e => setRoomsInput(e.target.value.split(','))} />
            </Form.Item>
          </>
        )}
        {type === 'between' && (
          <Form.Item
            name="rooms"
            label="rooms"
            rules={[{
              required: true,
              validator: (_, value) => {
                if (value.length !== 2) {
                  return Promise.reject('between must have exactly 2 rooms')
                }
                return Promise.resolve()
              }
            }]}
          >
            <Input.Group compact>
              <Input value={roomsInput?.[0]} placeholder={'room1'} onChange={e => setRoomsInput([e.target.value, roomsInput![1]])} />
              <Input value={roomsInput?.[1]} placeholder={'room2'} onChange={e => setRoomsInput([roomsInput![0], e.target.value])} />
            </Input.Group>
          </Form.Item>
        )}




      </Form>



      {/* <Row>
        <Col span={2}>
          <Button onClick={() => {
            const newInput = { shard, type, rooms: roomsInput, range }
            setInputList([...inputList, newInput])
            console.log(newInput)
            // setRooms(parseInputList(newInputList))
          }
          }>添加</Button>
        </Col>
        <Col span={2}>
          <Select onSelect={(val: ShardName) => setShard(val)} defaultValue={shards[0]}>
            {shards.map(shard => <Select.Option key={shard} value={shard}>{shard}</Select.Option>)}
          </Select>
        </Col>
        <Col span={3}>
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

      </Row> */}

      {inputList.length > 0 &&
        <Space>
          <table style={{ border: '1px solid #ccc', }}>
            <thead><tr style={{ textAlign: "center" }}>
              {/* {
                Object.keys(inputList[0]).map(k =>
                  <td key={k}>{k}</td>
                )
              } */}
              <td>shard</td>
              <td>type</td>
              <td>range</td>
              <td>rooms</td>
            </tr></thead>
            <tbody>
              {
                inputList.map((input, index) => {
                  return (

                    <tr className={"ipt"} key={index} style={{
                      textAlign: "center",
                      borderRadius: '5px',
                      padding: '5px',
                      margin: '5px',
                      backgroundColor: '#ffffff'
                    }} >
                      <td className="input-table-td">{input.shard}</td>
                      <td className="input-table-td">{input.type}</td>
                      <td className="input-table-td">{input?.range ?? '---'}</td>
                      <td className="input-table-td">{input?.rooms?.join(',') ?? '---'}</td>
                      <td className="input-table-td">
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
        </Space>
      }
    </div>
  )
}

export default InputRooms

