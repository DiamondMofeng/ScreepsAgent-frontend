/**
 * Rule 
 * 
 * uniqueVal: 多选一
 * multipleVal: 多选多
 * freeVal: 自由输入，后面自己解析
 */
interface Rule {
    // id: string;
    name: string;
    description: string;
    // icon: string;
    // color: string;
    uniqueVal?: any[];
    multiVal?: any[];
    freeVal?: any;
}

