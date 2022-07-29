import "./RoomInfo.css"

import { useRef } from "react";
import { roomImgUrlPrefix } from "../../../utils/consts"

import { Popover, Statistic } from "antd";
import ResourcesView from "./ResourcesView";

import { staticImgUrlPrefix } from "../../../utils/consts";





/**
 * 展示单个房间的信息
 */
const RoomInfo = (props) => {
  const { roomName, shard, roomObjects } = props;

  const roomInfoRef = useRef()
  const imgRef = useRef()
  const canvasRef = useRef()

  //* Component Did Mount





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

    "road": "#808080",
    "default": "#d3d3d3",

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






  const getControllerLevel = () => {
    let controller = roomObjects.find(obj => obj.type === "controller")
    return controller?.level ?? 0
  }

  const getMineralType = () => {
    let mineral = roomObjects.find(obj => obj.type === "mineral")
    return mineral?.mineralType ?? "none"
  }

  const getAvgWallHits = (raw = false) => {
    let wallHits = 0;
    let wallNums = 0;
    for (let obj of roomObjects) {
      if (["constructedWall", 'rampart'].includes(obj.type)) {
        wallHits += obj.hits;
        wallNums++;
      }
    }
    let res = wallHits / wallNums;
    if (raw) {
      return res;
    }

    if (res > 1e6) {
      return `${(res / 1e6).toFixed(2)}M`
    }
    if (res > 1e3) {
      return `${(res / 1e3).toFixed(2)}K`
    }
    return res;

  }

  const getResources = () => {
    let resources = {};
    for (let obj of roomObjects) {
      if (["storage", "terminal", "factory"].includes(obj.type)) {
        for (let resName in obj.store) {
          if (resources[resName] === undefined) {
            resources[resName] = 0;
          }
          resources[resName] += obj.store[resName];
        }
      }
    }
    return resources;
  }


  const PopoverContent = () => {
    return (
      <div className="room-info-popover" style={{ width: "500px" }}>
        <h1>{`${shard}/${roomName}`}</h1>
        <Statistic title="平均墙厚度" value={getAvgWallHits()} />
        <ResourcesView resources={getResources()} />

      </div>
    )
  }

  const onImgLoad = () => {
    let img = imgRef.current
    let canvas = canvasRef.current
    canvas.width = img.width
    canvas.height = img.height
    canvas.style.opacity = "1"  //实现渐入效果
    let ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

    drawRoomObjects(ctx, canvas.height, canvas.width)

  }

  return (
    <div className="room-info" ref={roomInfoRef} >
      <Popover trigger='hover' placement="bottom" content={<PopoverContent />}>
        <img src={`${roomImgUrlPrefix}/${shard}/${roomName}.png`}
          alt={`${shard}/${roomName}`}
          ref={imgRef}
          style={{ display: 'none' }}
          onLoad={onImgLoad}
          onError={(e) => console.log('image error', e)}


        />
        <canvas className="room-info-canvas" height={0} width={0} ref={canvasRef} style={{}} />
        <a href={`https://screeps.com/a/#!/room/${shard}/${roomName}`} target='_blank' rel="noreferrer">
          <p style={{ textAlign: "center" }}>
            {` ${roomName} `}
            <img
              src={`${staticImgUrlPrefix}/mineral-icons/${getMineralType()}.png`}
              alt={getMineralType()}
              style={{ verticalAlign: "-9.5%" }}
            />
            {` RCL ${getControllerLevel()} `}
          </p>




        </a>
      </Popover>
    </div>
  )
}




export default RoomInfo;