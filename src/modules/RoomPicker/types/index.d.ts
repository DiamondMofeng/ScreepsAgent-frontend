
type AvailableshardNumber = '0' | '1' | '2' | '3'
type ShardName = `shard${AvailableshardNumber}`

type RoomName = string

type RoomsByShard = {
    [K in ShardName]?: RoomName[];
}



/**
 * Rule 
 * 
 * uniqueVal: 多选一
 * multipleVal: 多选多
 * freeVal: 自由输入，后面自己解析
 */

type RuleType = 'RoomName' | 'MapStats' | 'Static'

type RuleName =
    | 'HighwayRooms' | 'CenterRooms' | 'HighwayNeighbour'

    | 'ActiveRooms' | 'NoviceArea' | 'RespawnArea' | 'NoviceAndRespawnArea' | 'ClaimableRooms'

    | 'SourceCount' | 'MineralType' | 'ExitDirectionCount' | 'MaxExitCount' | 'MinPlainCount' | 'MaxSwampCount' | 'MaxWallCount';

type Rule = {
    // id: string;
    name: RuleName;
    description: string;

    type: RuleType

    disabled?: boolean;

    uniqueVal?: any[];
    multiVal?: any[];
    freeVal?: any;

    filter?: (any: any) => boolean
}

type FilterMap = {
    [K in RuleName]?: (...args: any[]) => boolean;
}


type AllShardMapStats = {
    [K in ShardName]?: MapStats;
}

type MapStats = {
    [roomName: RoomName]: RoomStats
}

// interface Stats {
//     roomName?: RoomName;
// }

interface RoomStats {
    isPowerEnabled?: boolean;
    minerals0?: Minerals0;
    novice?: number;
    own?: Own;
    respawnArea?: number;
    sign?: Sign;
    status: "normal" | "out of borders"
}

interface Minerals0 {
    density: string;
    type?: string;
}

interface Own {
    level: number;
    user: string;
}

interface Sign {
    datetime: number;
    text: string;
    time: number;
    user: string;
}



type AllShardRoomsInfo = {
    [K in ShardName]?: RoomsInfo;
}

type RoomsInfo = {
    [roomName: RoomName]: RoomInfo;
}


interface RoomInfo {
    room: string;
    shard: string;
    sourceCount: number;
    mineralType: string;

    controllerPosition: Json<Position[]>;
    mineralPosition: Json<Position[]>;
    sourcePosition: Json<Position[]>;

    terrainExitDirectionCount: number;
    terrainExitPerDirection: Json<ExitPerDirection>
    // terrainExitPerDirection: string; //JSON

    terrainPlainCount: number;
    terrainSwampCount: number;
    terrainWallCount: number;

}

type ExitPerDirection = {
    [direction: string]: number;
}

type Position = [x: number, y: number];




