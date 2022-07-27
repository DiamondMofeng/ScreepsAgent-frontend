
import { useEffect, useRef } from "react";
import { roomImgUrlPrefix } from "../../../utils/consts"


const style_RoomInfo = {
  display: "inline-block",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  // width: "100%",
  // height: "100%",
  // backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: "5px",
  padding: "10px",
  boxSizing: "border-box",
  // position: "absolute",
  // top: "0",
  // left: "0",
  zIndex: "100",
  overflow: "hidden",
  pointerEvents: "none",
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
  OUserSelect: "none",
}



/**
 * 展示单个房间的信息
 */
const RoomInfo = (props) => {
  const { roomName, shard, roomObjects } = props;

  const roomInfoRef = useRef()
  const imgRef = useRef()
  const canvasRef = useRef()

  //* Component Did Mount
  //绑定悬浮效果
  useEffect(() => {
    const roomInfoDiv = roomInfoRef.current


  }, [])


  useEffect(() => {

  }, [roomObjects])



  const COLORS = {

    "tower": "#ff0000",

    "rampart": "#6495ed",
    "constructedWall": "#0000ff",

    // "storage": "#00ff00",
    // "terminal": "#0000ff",

    "controller": "#ff00ff",
    // "link": "#00ffff",
    "source": "#ffff00",
    // "observer": "#ff00ff",
    // "powerSpawn": "#ffffff",


    "default": "#808080",

  }

  const gameMapSideLength = 50;
  //* canvas


  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Number} canvasH 
   * @param {Number} canvasW 
   */
  const drawRoomObjects = (ctx, canvasH, canvasW) => {

    const hRate = canvasH / gameMapSideLength;
    const wRate = canvasW / gameMapSideLength;

    for (let obj of roomObjects) {
      const { x, y, type } = obj;
      const color = COLORS[type] ?? COLORS["default"];
      ctx.fillStyle = color;
      ctx.fillRect(x * wRate, y * hRate, wRate, hRate);
    }
  }

  const onImgLoad = () => {
    let img = imgRef.current
    let canvas = canvasRef.current
    canvas.width = img.width
    canvas.height = img.height
    let ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

    drawRoomObjects(ctx, canvas.height, canvas.width)

  }


  return (
    <div className="room-info" ref={roomInfoRef} style={style_RoomInfo}>
      <img src={`${roomImgUrlPrefix}/${shard}/${roomName}.png`} alt={`${shard}/${roomName}`}
        ref={imgRef} style={{ display: 'none' }}
        onLoad={() => onImgLoad()} 
        />
      <canvas height={0} width={0} ref={canvasRef} />
      <p>{roomName}</p>
    </div>
  )
}

export default RoomInfo;