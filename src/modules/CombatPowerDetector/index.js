import { useState } from "react"

import officialService from "../Common/services/officialService"

import Overview from "./components/Overview"
import { Input, message, Progress, Skeleton } from "antd"
import ShardsRoomInfoList from "./components/ShardsRoomInfoList"



const stage12Progress = [10, 10]


const CombatPowerDetector = () => {


  const [onQuery, setOnQuery] = useState(false)

  const [playerName, setPlayerName] = useState("")
  // const [userID, setUserID] = useState("")
  const [userBadge, setUserBandge] = useState(null)
  const [userRooms, setUserRooms] = useState({})

  const [roomObjectsByShard, setRoomObjectsByShard] = useState({})

  const [stage, setStage] = useState(0)
  //0: 初始
  //1: 查询用户id中
  //2: 查询用户房间列表中
  //3: 查询用户房间具体信息中
  //4: 完成

  const [progress, setProgress] = useState(0)
  const [isShowProgress, setIsShowProgress] = useState(false)

  const [isShowResult, setIsShowResult] = useState(false)

  // const progressPerRoom = (100 - stage12Progress[0] - stage12Progress[1]) / Object.values(getRoomCountsByShard(userRooms)).reduce((sum, cur) => sum + cur, 0)


  const reset = () => {
    setUserBandge(null)
    setUserRooms({})
    setRoomObjectsByShard({})
    setStage(0)
    setProgress(0)
  }



  function getRoomCountsByShard(shardRooms) {
    const roomCounts = {}
    for (let shardName in shardRooms) {
      roomCounts[shardName] = shardRooms[shardName].length
    }
    return roomCounts
  }

  // const queryRoomObjectsFromRooms_sync = async (rooms) => {
  //   setOnQuery(true)
  //   const _roomObjectsByShard = {}

  //   for (const shardName in rooms) {
  //     _roomObjectsByShard[shardName] = {}
  //     for (const room of rooms[shardName]) {
  //       _roomObjectsByShard[shardName][room] = await officialService.room_objects(room, shardName)
  //     }
  //   }
  //   setRoomObjectsByShard(_roomObjectsByShard)
  //   setOnQuery(false)
  //   return _roomObjectsByShard
  // }

  const queryRoomObjectsFromRooms_thenSet_async = async (rooms) => {
    // setOnQuery(true)  //放这没用
    // let asyncCounts = Object.values(getRoomCountsByShard(rooms)).reduce((sum, cur) => sum + cur, 0)
    const _roomObjectsByShard = {}
    const promiseList = []

    const fetchRoomObjAndUpdateRes = async (room, shardName) => {
      // const roomObjs = await officialService.room_objects(room, shardName)

      // console.log('roomObjectsByShard[shardName]: ', roomObjectsByShard[shardName]);
      _roomObjectsByShard[shardName][room] = await officialService.room_objects(room, shardName)


    }


    for (const shardName in rooms) {
      _roomObjectsByShard[shardName] = {}
      for (const room of rooms[shardName]) {
        promiseList.push(fetchRoomObjAndUpdateRes(room, shardName))
      }
    }

    //TODO 未做异常处理

    function onAllSettled() {
      setStage(4)

      setTimeout(() => {
        setOnQuery(false)
        setIsShowProgress(false)

      }, 3000);
    }

    function allProgress(proms, progress_cb) {
      let d = 0;
      progress_cb(0);
      for (const p of proms) {
        // eslint-disable-next-line no-loop-func
        p.then(() => {
          d++;
          progress_cb((d * 100) / proms.length);
          if (d === proms.length) {
            onAllSettled();
          }
        });
      }
      return Promise.all(proms);
    }

    allProgress(promiseList, (progress) => {
      //计算进度
      let stage12Progress_sum = stage12Progress[0] + stage12Progress[1];
      let stage3TotalProgress = 100 - stage12Progress_sum
      let newProgress = progress / 100 * stage3TotalProgress + stage12Progress_sum
      setProgress(Math.round(newProgress))
    }).then(
      () => {
        setRoomObjectsByShard(_roomObjectsByShard)
      }
    )

    return _roomObjectsByShard

  }


  const main2 = async (playerName) => {
    setOnQuery(true)

    reset()
    setIsShowProgress(true)

    officialService.user_find(playerName)
      .then(res => {

        setStage(2)
        // console.log("stage2")

        setProgress(stage12Progress[1])

        let userID = res['_id']
        // setUserID(userID)
        setUserBandge(res['badge'])

        return officialService.user_rooms(userID)
      }).catch(() => { message.error(`获取${playerName}的 ID失败!`) })

      .then(userRooms => {
        setUserRooms(userRooms)
        setStage(3)
        // console.log("stage3")

        return queryRoomObjectsFromRooms_thenSet_async(userRooms)
      }).catch(() => { message.error(`获取${playerName}的 房间列表失败!`) })

      .then(roomObjectsByShard => {
        // console.log('roomObjectsByShard: ', roomObjectsByShard);
        setRoomObjectsByShard(roomObjectsByShard)
      })

      .finally(() => {
        //放到queryRoomObjectsFromRooms_thenSet_async里面了
      })



  }



  return (
    <div className="CombatPowerDetector">
      <h1>战斗力探测器</h1>
      <p>施工中...</p>

      <Input title="要查询的玩家名" onChange={({ target }) => setPlayerName(target.value)} style={{ width: "200px" }}></Input>

      <button onClick={async () => { await main2(playerName) }} disabled={onQuery || playerName.length === 0}>
        {onQuery ? "查询中" : "查询"}
      </button>
      {
        isShowProgress
          ? <Progress percent={progress} />
          : null
      }
      <p />
      {
        [1, 2, 3].includes(stage)
          ? <Skeleton active />
          : null
      }
      {
        [4].includes(stage)
          ?
          <>
            <Overview playerName={playerName} badge={userBadge} allShardsRoomsObjects={roomObjectsByShard} />
          </>
          : null
      }
      {
        [3, 4].includes(stage)
          ?
          <>
            <ShardsRoomInfoList allShardRoomsObjects={roomObjectsByShard} />
          </>
          : null
      }



    </div>
  )
}


export default CombatPowerDetector

