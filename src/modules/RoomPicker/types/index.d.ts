
type AvailableshardNumber = '0' | '1' | '2' | '3'
type ShardName = `shard${AvailableshardNumber}`

type RoomName = string

type RoomsByShard = {
    [K in ShardName]: RoomName[];
}



/**
 * Rule 
 * 
 * uniqueVal: 多选一
 * multipleVal: 多选多
 * freeVal: 自由输入，后面自己解析
 */

type RuleType = 'RoomName' | 'MapStats' | 'Static'

type Rule = {
    // id: string;
    name: string;
    description: string;

    type: RuleType

    uniqueVal?: any[];
    multiVal?: any[];
    freeVal?: any;

    filter?: Function
}

interface Rule_ByRoomName extends Rule {

}



