import { Statistic } from "antd"


let resMap = {
  "基础资源": {
    "default": ["energy", "power", "ops"],
  },

  "lab资源": {
    "green": ["LH"]
  }
}

const ResourcesView = ({ resources }) => {


  return (
    <div className="resources-view">
      {
        Object.keys(resources).map(resType => (
          <Statistic key={resType} title={resType} value={resources[resType]} />
        ))
      }
    </div>
  )
}

export default ResourcesView