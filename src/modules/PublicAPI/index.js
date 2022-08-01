
const APIs = [
  {
    name: '星门寻路',
    describe: '查询两个位置之间的星门路径',
    path: '/api/portals/find_route',
    method: 'GET',
    params: {
      from: 'shard0_W1N1',
      to: 'shard3_W2N2',
    },
    sampleURL: 'http://api-screeps.mofengfeng.com/api/portals/find_route?from=shard0_W1N1&to=shard3_W2N2',

  }
]

const APIInfo = ({ api }) => {
  return (
    <div className="api-info">
      <h2>{api.name}</h2>
      <p>{api.describe}</p>
      <p>path: {api.path}</p>
      <p>method: {api.method}</p>
      <p>示例: <a href={api.sampleURL} >{api.sampleURL}</a></p>
    </div>
  )
}


const PublicAPI = () => {
  return (
    <div className="public-api">
      {
        APIs.map(api =>
          <APIInfo api={api} />
        )
      }
    </div>
  );
}

export default PublicAPI;