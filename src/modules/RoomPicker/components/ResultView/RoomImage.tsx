import React from "react";
import { useRef } from "react";
import { roomImgUrlPrefix } from "../../../../utils/consts";

export type SimpleRoomObjects = {
  [type: string]: Position[]
}


const COLORS = {
  "source": "#ffff00",
  "controller": "#ff00ff",
  "mineral": "#00ff00",
  "default": "#d3d3d3",
}

const gameMapSideLength = 50;


const RoomImage = ({ roomName, shard, simpleObjects, height, width }:
  {
    roomName: string,
    shard: string,
    simpleObjects: SimpleRoomObjects,
    height?: number,
    width?: number,
  }) => {

  console.log('simpleObjects: ', simpleObjects);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const drawSimpleRoomObjects = (ctx, canvasH, canvasW) => {

    const hRate = canvasH / gameMapSideLength;
    const wRate = canvasW / gameMapSideLength;

    for (let type of Object.keys(simpleObjects)) {
      for (let [x, y] of simpleObjects[type]) {
        const color = COLORS[type] ?? COLORS["default"];
        ctx.fillStyle = color;
        ctx.fillRect(x * wRate, y * hRate, wRate, hRate);
        console.log('drawed', x, y, type);
      }
    }
  }


  const onImgLoad = () => {
    let img = imgRef.current!
    let canvas = canvasRef.current!

    img.height = height ?? img.height;
    img.width = width ?? img.width;

    canvas.width = img.width
    canvas.height = img.height
    canvas.style.opacity = "1"  //实现渐入效果
    let ctx = canvas.getContext("2d")!
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

    drawSimpleRoomObjects(ctx, canvas.height, canvas.width)

  }

  return (<>
    <img src={`${roomImgUrlPrefix}/${shard}/${roomName}.png`}
      alt={`${shard}/${roomName}`}
      ref={imgRef}
      style={{ display: 'none' }}
      onLoad={onImgLoad}
    // onError={(e) => console.log('image error', e)}
    />
    <canvas className="room-info-canvas" height={0} width={0} ref={canvasRef} style={{}} />
  </>
  )
}

export default RoomImage;