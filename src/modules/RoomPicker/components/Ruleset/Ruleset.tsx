import React from "react"
import { useState } from "react"
//@ts-ignore
import SingleRule, { ActiveRule } from "./SingleRule.tsx"

//@ts-ignore
import Rules from '../../config_rules.tsx'





const Ruleset = ({ activeRules, setActiveRules }: {
  activeRules:ActiveRule[],
  setActiveRules: React.Dispatch<React.SetStateAction<ActiveRule[]>>
}) => {

  console.log('activeRules: ', activeRules);

  return (
    <div className="ruleset">
      <h1>规则集</h1>
      {
        Rules.map((rule: Rule) =>
          <SingleRule key={rule.name}
            rule={rule}
            activeRules={activeRules}
            setActiveRules={setActiveRules}
          />
        )
      }
    </div>
  )
}

export default Ruleset