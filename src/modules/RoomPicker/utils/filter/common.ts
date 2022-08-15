import { ActiveRule, IGNORE_OR_ONLY } from "../../components/Ruleset/SingleRule";


export const getFilters = (rules: ActiveRule[], filterMap) => {
  const filters = rules.filter(rule => Object.keys(filterMap).includes(rule.ruleName))
    .map(rule =>
      function (roomName, ...args) {
        return rule.ignoreOrOnly === IGNORE_OR_ONLY.ONLY
          ? filterMap[rule.ruleName](roomName, ...args)
          : !(filterMap[rule.ruleName](roomName, ...args))
      });
  return filters;
}
