//api from screeps.com

import axios from 'axios'
import C from '../../../utils/consts'
// import { ScreepsAPI } from 'screeps-api'

const corsPrefix = C.corsUrl + '/'
const corsOfficialUrl = corsPrefix + 'https://screeps.com/api/'



// ============================================================
// USER API
export const user_find = async (playername = undefined, id = undefined) => {
  if (playername === undefined && id === undefined) {
    throw new Error('playername or id must be defined')
  }

  const response = await axios.get(corsOfficialUrl + 'user/find', {
    params: {
      username: playername,
      id: id
    }
  })
  return response.data["user"]["_id"]
}

export const user_rooms = async (id) => {
  const response = await axios.get(corsOfficialUrl + 'user/rooms', {
    params: {
      id: id
    }
  })
  return response.data['shards']
}


// ============================================================
// ROOM API
export const room_objects = async (room = undefined, shard = undefined) => {
  if (room === undefined || shard === undefined) {
    throw new Error('roomname and shard must be defined')
  }

  const response = await axios.get(corsOfficialUrl + 'game/room-objects', {
    params: {
      room: room,
      shard: shard
    }
  })
  return response.data['objects']
}

const officialService = {
  user_find,
  user_rooms,

  room_objects
}

export default officialService