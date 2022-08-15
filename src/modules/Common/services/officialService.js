//api from screeps.com

import axios from 'axios'
import C from '../../../utils/consts'
// import { ScreepsAPI } from 'screeps-api'

const corsPrefix = C.corsUrl + '/'
const corsOfficialUrl = corsPrefix + 'https://screeps.com/api/'

const xToken = 'X-Token'

const headers = {
  'X-Username': 'foobar',
}
export const setToken = (token) => {
  headers[xToken] = token
}

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
  return response.data["user"]
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
// MAP API

/**
 * 
 * @param {string[]} rooms 
 * @param {string} shard 
 * @param {string} statName
 */
export const map_stats = async (rooms, shard, statName = 'claim0') => {

  if (rooms === undefined || shard === undefined) {
    throw new Error('rooms and shard must be defined')
  }

  if (!headers[xToken]) {
    throw new Error('token must be set using setToken()')
  }

  const payload = {
    rooms: rooms,
    shard: shard,
    statName: statName
  }

  const response = await axios.post(corsOfficialUrl + 'game/map-stats', payload, {
    headers: headers,
  })
  return response.data

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
  setToken,

  user_find,
  user_rooms,

  map_stats,

  room_objects,
}

export default officialService