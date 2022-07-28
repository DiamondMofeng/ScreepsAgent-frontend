import { useEffect, useRef } from "react"
import { renderBadge } from "../utils/bange"

// mofeng's badge, for test
// let badge = { "type": 14, "color1": "#ffffff", "color2": "#919be8", "color3": "#fcb6fd", "param": 80, "flip": false }

const Badge = ({ badge }) => {
  const badgeCanvasRef = useRef()

  useEffect(() => {
    if (!badge) {
      return
    }
    const canvas = badgeCanvasRef.current
    renderBadge(canvas, badge)
  }, [badge])



  return (<canvas className="user-badge" ref={badgeCanvasRef} >you should not see this</canvas>)
}

export default Badge