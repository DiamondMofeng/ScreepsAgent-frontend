import React from "react"


/**
 * 
 * @param {Object} notice
 * @notice {string} msg 
 * @returns 
 */
const Notification = ({ notice }) => {
  //type:normal / error
  if (notice === null) {
    return null
  }

  const message = notice.msg
  const type = notice.type

  const style_normalMsg = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const style_errorMsg = { ...style_normalMsg, color: 'red' }

  if (message) {
    if (type === 'error') {
      return (
        <div style={style_errorMsg}>
          <p>{message}</p>
        </div>
      )
    }
    else return (
      <div style={style_normalMsg}>
        <p>{message}</p>
      </div>
    )

  }
  else return null
}

export default Notification