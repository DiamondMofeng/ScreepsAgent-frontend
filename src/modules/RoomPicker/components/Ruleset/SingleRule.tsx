


import React, { useEffect } from "react"
import { useReducer } from "react"

import { Checkbox, Select, Input, Popover, Row, Col } from "antd"


export enum IGNORE_OR_ONLY {
  IGNORE = 0,
  ONLY = 1
}

const { IGNORE, ONLY } = IGNORE_OR_ONLY

export type ActiveRule = {
  ruleName: Rule["name"],
  type: RuleType,
  enabled: boolean,
  ignoreOrOnly: IGNORE_OR_ONLY
  val?: any,
}




/**
 * rule由3个部分组成：
 * 1. checkbox: 是否启用
 * 2. select: ignore/only
 * 3. 可选: value
 */

/**
 * singleRule操作对ActiveRules的影响：
 * 1. 如果是启用的，则添加到activeRules中
 * 2. 如果是禁用的，则从activeRules中移除
 * 3. 如果是更改的，则更新activeRules中的对应rule
 * 
 */



const SingleRule = ({ rule, activeRules, setActiveRules }: {
  rule: Rule,
  activeRules: ActiveRule[],
  setActiveRules: React.Dispatch<React.SetStateAction<ActiveRule[]>>
}) => {


  const initialActiveRule: ActiveRule = {
    ruleName: rule.name,
    type: rule.type,
    enabled: false,
    ignoreOrOnly: IGNORE,
    val: undefined,
  };

  // type DispatcherActionTypes = 'enable' | 'disable' | 'changeIgnoreOrOnly' | 'changeVal';

  // type ValType = 'uniqueVal' | 'multiVal' | 'freeVal'

  type DispatcherAction =
    | {
      type: 'enable' | 'disable',
    }
    | {
      type: 'changeIgnoreOrOnly',
      ignoreOrOnly: IGNORE_OR_ONLY,
    }
    | {
      type: 'changeVal',
      // valType: ValType,
      val: any,
    }

  const reducer = (state: ActiveRule, action: DispatcherAction) => {
    const newAvtiveRule = { ...state };
    switch (action.type) {
      case 'enable':
        newAvtiveRule.enabled = true;
        // setActiveRules(activeRules => [...activeRules, newAvtiveRule]);
        break;
      case 'disable':
        newAvtiveRule.enabled = false;
        // setActiveRules(activeRules => activeRules.filter(activeRule => activeRule.ruleName !== newAvtiveRule.ruleName));
        break;
      case 'changeIgnoreOrOnly':
        newAvtiveRule.ignoreOrOnly = action.ignoreOrOnly;
        // setActiveRules(activeRules => activeRules.map(activeRule => activeRule.ruleName === newAvtiveRule.ruleName ? newAvtiveRule : activeRule));
        break;
      case 'changeVal':
        newAvtiveRule.val = action.val;
        // setActiveRules(activeRules => activeRules.map(activeRule => activeRule.ruleName === newAvtiveRule.ruleName ? newAvtiveRule : activeRule));
        break;
      default:
        console.log('unknown action!!');
    };
    return newAvtiveRule;
  }

  const [activeRule, updateActiveRule] = useReducer(reducer, initialActiveRule);

  useEffect(() => {
    const otherActiveRules = activeRules.filter(otherRule => otherRule.ruleName !== activeRule.ruleName);
    if (!activeRule.enabled) {
      setActiveRules(otherActiveRules);
    } else {
      setActiveRules([...otherActiveRules, activeRule]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRule])

  return (
    <div className="single-rule">
      <Row style={{ width: "75%" }}>
        <Col span={2}>
          <Checkbox
            checked={activeRule.enabled}
            onChange={() => {
              if (activeRule.enabled) {
                updateActiveRule({ type: 'disable' });
              } else {
                updateActiveRule({ type: 'enable' });
              }
            }}
          >
            {activeRule.enabled ? 'Enabled' : 'Disabled'}
          </Checkbox>
        </Col>
        <Col span={2}>
          <Select
            onSelect={(val: IGNORE_OR_ONLY) => {
              updateActiveRule({ type: 'changeIgnoreOrOnly', ignoreOrOnly: val })
            }}
            disabled={!activeRule.enabled}
            defaultValue={IGNORE}>
            <Select.Option value={ONLY}>only</Select.Option>
            <Select.Option value={IGNORE}>ignore</Select.Option>
          </Select>
        </Col>
        <Col span={3}>
          <Popover content={rule?.description} placement='top'>

            < span > {rule.name} </span>
          </Popover>
        </Col>
        <Col span={8}>
          {
            rule.uniqueVal
              ?
              <Select
                disabled={!activeRule.enabled}
                defaultValue={rule.uniqueVal[0]}
                onSelect={(val) => {
                  updateActiveRule({ type: 'changeVal', val: val })
                }}
              >
                {rule.uniqueVal.map(v => <Select.Option key={v} value={v}>{v}</Select.Option>)}
              </Select>
              : null
          }
          {
            rule.multiVal
              ?
              <Checkbox.Group
                disabled={!activeRule.enabled}
                onChange={(val) => {
                  console.log(val)
                  updateActiveRule({ type: 'changeVal', val: val })
                  // updateActiveRule({ type: 'changeVal', valType: 'uniqueVal', val: val })
                }}
              >
                {rule.multiVal.map(v => <Checkbox key={v} value={v}>{v}</Checkbox>)}
              </Checkbox.Group>
              : null
          }
          {
            rule.freeVal
            &&
            <Input
              type='number'
              value={activeRule.val}
              min={0}
              disabled={!activeRule.enabled}
              onChange={(e) => {
                let val = e.target.value
                // console.log(val)
                //检查是否仅有数字
                if (/^[^.\d]+$/.test(val)) {
                  return;
                }
                // console.log('passed')
                // const num = Number(val)
                // if (Number.isNaN(num)) {
                //   return
                // }
                // if (num === 0) {
                //   val = "0"
                // }
                updateActiveRule({ type: 'changeVal', val: val })
              }}

            />
          }
        </Col>
      </Row>

    </div >
  )
}

export default SingleRule

