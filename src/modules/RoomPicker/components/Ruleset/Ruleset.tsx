import React from "react"
import SingleRule, { ActiveRule } from "./SingleRule"

import Rules from '../../config_rules'





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