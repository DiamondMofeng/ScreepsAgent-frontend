


import { useState } from "react"
import React from "react"

import { Checkbox, Select, Input, Popover } from "antd"
import { IGNORE, ONLY } from "../../utils/C"



/**
 * role由3个部分组成：
 * 1. checkbox: 是否启用
 * 2. select: ignore/only
 * 3. 可选: value
 */


const SingleRule = ({ rule, val, setVal }: {
  rule: Rule,
  val: any,
  setVal: (val: any) => void
}) => {
  const [enabled, setEnabled] = useState(false)
  const [ignoreOrOnly, setIgnoreOrOnly] = useState(ONLY)
  const [args, setArgs] = useState<any>(undefined)

  return (
    <div className="single-rule">
      <Popover content={rule?.description || '123'}>
        <Checkbox checked={enabled} onChange={() => setEnabled(!enabled)} >
          {enabled ? 'Enabled' : 'Disabled'}
        </Checkbox>
        <Select onSelect={(val) => setIgnoreOrOnly(val)} disabled={!enabled}>
          <Select.Option value={ONLY}>only</Select.Option>
          <Select.Option value={IGNORE}>ignore</Select.Option>
        </Select>
        < span > {rule.name} </span>
        {
          rule.uniqueVal
            ?
            <Select onSelect={(val) => setArgs(val)} disabled={!enabled}>
              {rule.uniqueVal.map(v => <Select.Option key={v} value={v}>{v}</Select.Option>)}
            </Select>
            : null
        }
        {
          rule.multiVal
            ?
            <Checkbox.Group onChange={(val) => setArgs(val)} disabled={!enabled}>
              {rule.multiVal.map(v => <Checkbox key={v} value={v}>{v}</Checkbox>)}
            </Checkbox.Group>
            : null
        }
        {
          rule.freeVal
            ?
            <Input onChange={(e) => setArgs(e.target.value)} disabled={!enabled} />
            : null
        }




      </Popover>
    </div >
  )
}

export default SingleRule

