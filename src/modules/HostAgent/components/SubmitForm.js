import { Input, Switch, Select, Space, message, Row, Col } from "antd"
import { useState } from "react"
import agentService from '../services/agentService'

const { Option } = Select;

const PRE_WIDTH = 3
const AFTER_WIDTH = 21

const AgentAddForm = ({ user, setAgents, agents }) => {


  const [token, setToken] = useState('')
  const [shard, setShard] = useState('shard3')
  const [path, setPath] = useState('stats')

  const [private_enable, setPrivate_enable] = useState(false)

  const [private_url, setPrivate_url] = useState('')
  const [private_username, setPrivate_username] = useState('')
  const [private_password, setPrivate_password] = useState('')

  const [private_url_prefix, setPrivate_url_prefix] = useState('http://')

  const [isOnTesting, setIsOnTesting] = useState(false)


  const handleAddAgent = async (event) => {
    event.preventDefault()

    //防止空数据
    if (private_enable === true && (private_url === '' || private_username === '' || private_password === '')) {
      message.error('请填写完整的私服配置')
      return
    }
    if (private_enable === false && (token === '' || shard === '')) {
      message.error(`官服token、shard不可以为空`)
      return
    }

    //节流
    if (isOnTesting) {
      return
    }
    setIsOnTesting(true)

    try {
      const newAgent =
      {
        token: token,
        shard: shard,
        path: path,
        username: user.name,
        loginTOKEN: user.loginTOKEN,
      }
      if (private_enable) {
        Object.assign(newAgent, {
          private_enable: true,

          private_url: private_url_prefix + private_url,
          private_username: private_username,
          private_password: private_password,
        })
      }


      const response = await agentService.create(newAgent)

      setAgents(agents.concat(response))

      message.success('用户代理添加成功')

    }
    catch (e) {
      // console.log(e.response)
      let errMsg = e?.response?.data?.message ?? `用户代理添加失败！`
      message.error(errMsg)
    }

    setIsOnTesting(false)

  }



  return (
    <>
      <div className="agent-list" style={{ width: "50%" }}>

        <form onSubmit={handleAddAgent} >
          <Row>
            <Col span={PRE_WIDTH}>token:</Col>
            <Col span={AFTER_WIDTH}>
              <Input.Password
                value={token}
                name="Token"
                onChange={({ target }) => setToken(target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col span={PRE_WIDTH}>shard:</Col>
            <Col span={AFTER_WIDTH}>
              <Input
                type="text"
                value={shard}
                name="shard"
                onChange={({ target }) => setShard(target.value)}
              // placeholder={"私服可以为空"}
              />
            </Col>
          </Row>
          <Row>
            <Col span={PRE_WIDTH}>path:</Col>
            <Col span={AFTER_WIDTH}>
              <Input
                type="text"
                value={path}
                name="Path"
                onChange={({ target }) => setPath(target.value)}
              // placeholder={"Memory.{path}"}
              />
            </Col>
          </Row>
          <p />
          私服<Switch
            checked={private_enable}
            onChange={setPrivate_enable}
          />
          <p />

          <div className="privateServerInfo">
            {
              private_enable
                ? <>
                  <Row>
                    <Col span={PRE_WIDTH}>URL:</Col>
                    <Col span={AFTER_WIDTH}><Input
                      value={private_url}
                      onChange={({ target }) => { setPrivate_url(target.value); }}
                      addonBefore={(
                        <Select onChange={(e) => setPrivate_url_prefix(e)} defaultValue="http://" className="select-before">
                          <Option value="http://">http://</Option>
                          <Option value="https://">https://</Option>
                        </Select>
                      )}
                      placeholder={"ip:端口,如mofengfeng.com:21025"}
                    />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={PRE_WIDTH}>username:</Col>
                    <Col span={AFTER_WIDTH}>
                      <Input
                        value={private_username}
                        onChange={({ target }) => setPrivate_username(target.value)}
                        placeholder={"用户名/邮箱均可"}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={PRE_WIDTH}>password:</Col>
                    <Col span={AFTER_WIDTH}>
                      <Input.Password
                        value={private_password}
                        onChange={({ target }) => setPrivate_password(target.value)}
                        placeholder={"私服设置的密码"}
                      />
                    </Col>
                  </Row>

                </>
                : null
            }
          </div>

          <button type="submit" disabled={isOnTesting} >{isOnTesting ? "测试中..." : "测试并保存"}</button>
          {/* </Row> */}
        </form>
      </div>
    </>
  )
}

export default AgentAddForm
