
export const baseUrl = 'http://api-screeps.mofengfeng.com'
// export const baseUrl= 'http://127.0.0.1:5000'

export const corsUrl = 'https://mofeng-cors-anywhere.herokuapp.com'

export const roomImgUrlPrefix = 'https://d3os7yery2usni.cloudfront.net/map';//https://d3os7yery2usni.cloudfront.net/map/shard3/W19N14.png

export const staticImgUrlPrefix = 'https://s3.amazonaws.com/static.screeps.com/upload';//https://s3.amazonaws.com/static.screeps.com/upload/mineral-icons/L.png

// https://github.com/screepers/screeps-snippets/blob/master/src/globals/JavaScript/resourceColors.js
export const RES_COLORS = {
  H: '#989898',
  O: '#989898',
  U: '#48C5E5',
  L: '#24D490',
  K: '#9269EC',
  Z: '#D9B478',
  X: '#F26D6F',
  energy: '#FEE476',
  battery: '#FEE476',
  power: '#F1243A',

  reductant: '#989898',
  oxidant: '#989898',
  utrium_bar: '#48C5E5',
  lemergium_bar: '#24D490',
  keanium_bar: '#9269EC',
  zynthium_bar: '#D9B478',
  purifier: '#F26D6F',

  OH: '#B4B4B4',
  ZK: '#B4B4B4',
  UL: '#B4B4B4',
  G: '#FFFFFF',

  ghodium_melt: '#FFFFFF',
  composite: '#FFFFFF',
  crystal: '#FFFFFF',
  liquid: '#FFFFFF',

  UH: '#50D7F9',
  UO: '#50D7F9',
  KH: '#A071FF',
  KO: '#A071FF',
  LH: '#00F4A2',
  LO: '#00F4A2',
  ZH: '#FDD388',
  ZO: '#FDD388',
  GH: '#FFFFFF',
  GO: '#FFFFFF',

  UH2O: '#50D7F9',
  UHO2: '#50D7F9',
  KH2O: '#A071FF',
  KHO2: '#A071FF',
  LH2O: '#00F4A2',
  LHO2: '#00F4A2',
  ZH2O: '#FDD388',
  ZHO2: '#FDD388',
  GH2O: '#FFFFFF',
  GHO2: '#FFFFFF',

  XUH2O: '#50D7F9',
  XUHO2: '#50D7F9',
  XKH2O: '#A071FF',
  XKHO2: '#A071FF',
  XLH2O: '#00F4A2',
  XLHO2: '#00F4A2',
  XZH2O: '#FDD388',
  XZHO2: '#FDD388',
  XGH2O: '#FFFFFF',
  XGHO2: '#FFFFFF',


  metal: '#956F5C',
  alloy: '#956F5C',
  tube: '#956F5C',
  fixtures: '#956F5C',
  frame: '#956F5C',
  hydraulics: '#956F5C',
  machine: '#956F5C',

  biomass: '#84B012',
  cell: '#84B012',
  phlegm: '#84B012',
  tissue: '#84B012',
  muscle: '#84B012',
  organoid: '#84B012',
  organism: '#84B012',

  silicon: '#4DA7E5',
  wire: '#4DA7E5',
  switch: '#4DA7E5',
  transistor: '#4DA7E5',
  microchip: '#4DA7E5',
  circuit: '#4DA7E5',
  device: '#4DA7E5',

  mist: '#DA6BF5',
  condensate: '#DA6BF5',
  concentrate: '#DA6BF5',
  extract: '#DA6BF5',
  spirit: '#DA6BF5',
  emanation: '#DA6BF5',
  essence: '#DA6BF5'
}



export const gameConstants = {
  RESOURCE_ENERGY: "energy",
  RESOURCE_POWER: "power",

  RESOURCE_HYDROGEN: "H",
  RESOURCE_OXYGEN: "O",
  RESOURCE_UTRIUM: "U",
  RESOURCE_LEMERGIUM: "L",
  RESOURCE_KEANIUM: "K",
  RESOURCE_ZYNTHIUM: "Z",
  RESOURCE_CATALYST: "X",
  RESOURCE_GHODIUM: "G",

  RESOURCE_SILICON: 'silicon',
  RESOURCE_METAL: 'metal',
  RESOURCE_BIOMASS: 'biomass',
  RESOURCE_MIST: 'mist',

  RESOURCE_HYDROXIDE: "OH",
  RESOURCE_ZYNTHIUM_KEANITE: "ZK",
  RESOURCE_UTRIUM_LEMERGITE: "UL",

  RESOURCE_UTRIUM_HYDRIDE: "UH",
  RESOURCE_UTRIUM_OXIDE: "UO",
  RESOURCE_KEANIUM_HYDRIDE: "KH",
  RESOURCE_KEANIUM_OXIDE: "KO",
  RESOURCE_LEMERGIUM_HYDRIDE: "LH",
  RESOURCE_LEMERGIUM_OXIDE: "LO",
  RESOURCE_ZYNTHIUM_HYDRIDE: "ZH",
  RESOURCE_ZYNTHIUM_OXIDE: "ZO",
  RESOURCE_GHODIUM_HYDRIDE: "GH",
  RESOURCE_GHODIUM_OXIDE: "GO",

  RESOURCE_UTRIUM_ACID: "UH2O",
  RESOURCE_UTRIUM_ALKALIDE: "UHO2",
  RESOURCE_KEANIUM_ACID: "KH2O",
  RESOURCE_KEANIUM_ALKALIDE: "KHO2",
  RESOURCE_LEMERGIUM_ACID: "LH2O",
  RESOURCE_LEMERGIUM_ALKALIDE: "LHO2",
  RESOURCE_ZYNTHIUM_ACID: "ZH2O",
  RESOURCE_ZYNTHIUM_ALKALIDE: "ZHO2",
  RESOURCE_GHODIUM_ACID: "GH2O",
  RESOURCE_GHODIUM_ALKALIDE: "GHO2",

  RESOURCE_CATALYZED_UTRIUM_ACID: "XUH2O",
  RESOURCE_CATALYZED_UTRIUM_ALKALIDE: "XUHO2",
  RESOURCE_CATALYZED_KEANIUM_ACID: "XKH2O",
  RESOURCE_CATALYZED_KEANIUM_ALKALIDE: "XKHO2",
  RESOURCE_CATALYZED_LEMERGIUM_ACID: "XLH2O",
  RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE: "XLHO2",
  RESOURCE_CATALYZED_ZYNTHIUM_ACID: "XZH2O",
  RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE: "XZHO2",
  RESOURCE_CATALYZED_GHODIUM_ACID: "XGH2O",
  RESOURCE_CATALYZED_GHODIUM_ALKALIDE: "XGHO2",

  RESOURCE_OPS: "ops",

  RESOURCE_UTRIUM_BAR: 'utrium_bar',
  RESOURCE_LEMERGIUM_BAR: 'lemergium_bar',
  RESOURCE_ZYNTHIUM_BAR: 'zynthium_bar',
  RESOURCE_KEANIUM_BAR: 'keanium_bar',
  RESOURCE_GHODIUM_MELT: 'ghodium_melt',
  RESOURCE_OXIDANT: 'oxidant',
  RESOURCE_REDUCTANT: 'reductant',
  RESOURCE_PURIFIER: 'purifier',
  RESOURCE_BATTERY: 'battery',

  RESOURCE_COMPOSITE: 'composite',
  RESOURCE_CRYSTAL: 'crystal',
  RESOURCE_LIQUID: 'liquid',

  RESOURCE_WIRE: 'wire',
  RESOURCE_SWITCH: 'switch',
  RESOURCE_TRANSISTOR: 'transistor',
  RESOURCE_MICROCHIP: 'microchip',
  RESOURCE_CIRCUIT: 'circuit',
  RESOURCE_DEVICE: 'device',

  RESOURCE_CELL: 'cell',
  RESOURCE_PHLEGM: 'phlegm',
  RESOURCE_TISSUE: 'tissue',
  RESOURCE_MUSCLE: 'muscle',
  RESOURCE_ORGANOID: 'organoid',
  RESOURCE_ORGANISM: 'organism',

  RESOURCE_ALLOY: 'alloy',
  RESOURCE_TUBE: 'tube',
  RESOURCE_FIXTURES: 'fixtures',
  RESOURCE_FRAME: 'frame',
  RESOURCE_HYDRAULICS: 'hydraulics',
  RESOURCE_MACHINE: 'machine',

  RESOURCE_CONDENSATE: 'condensate',
  RESOURCE_CONCENTRATE: 'concentrate',
  RESOURCE_EXTRACT: 'extract',
  RESOURCE_SPIRIT: 'spirit',
  RESOURCE_EMANATION: 'emanation',
  RESOURCE_ESSENCE: 'essence',

}


const C = {
  baseUrl,
  corsUrl,
  roomImgUrlPrefix,
  staticImgUrlPrefix
}


export default C