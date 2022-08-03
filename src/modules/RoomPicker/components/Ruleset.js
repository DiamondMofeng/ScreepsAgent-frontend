import SingleRule from "./Ruleset/SingleRule.tsx"

import Rules from '../config_rules.ts'




const Ruleset = () => {
  return (
    <div className="ruleset">
      <h1>规则集</h1>
      {
        Rules.map((r, index) =>
          <SingleRule rule={r} key={r.name} />
        )
      }
    </div>
  )
}

export default Ruleset