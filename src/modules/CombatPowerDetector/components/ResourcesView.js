import { Statistic, Row, Col } from "antd"
import { gameConstants, RES_COLORS } from "../../../utils/consts"

const C = gameConstants


const resMap = {
  "基础资源": {
    "default": [
      C.RESOURCE_ENERGY, C.RESOURCE_OXYGEN, C.RESOURCE_HYDROGEN, C.RESOURCE_UTRIUM, C.RESOURCE_LEMERGIUM, C.RESOURCE_ZYNTHIUM, C.RESOURCE_KEANIUM, C.RESOURCE_CATALYST,
      // C.RESOURCE_GHODIUM
    ],
  },

  // "原矿": {  //上述已包含
  //   "default": [C.RESOURCE_OXYGEN, C.RESOURCE_HYDROGEN, C.RESOURCE_LEMERGIUM, C.RESOURCE_ZYNTHIUM, C.RESOURCE_KEANIUM, C.RESOURCE_UTRIUM, C.RESOURCE_CATALYST, C.RESOURCE_GHODIUM],
  // },

  "压缩资源": {
    "default": [C.RESOURCE_BATTERY, C.RESOURCE_OXIDANT, C.RESOURCE_REDUCTANT, C.RESOURCE_UTRIUM_BAR, C.RESOURCE_LEMERGIUM_BAR, C.RESOURCE_ZYNTHIUM_BAR, C.RESOURCE_KEANIUM_BAR, C.RESOURCE_PURIFIER],
  },

  "Power资源": {
    "default": [C.RESOURCE_POWER, C.RESOURCE_OPS],
  },


  "lab资源": {
    "Basic": [C.RESOURCE_HYDROXIDE, C.RESOURCE_ZYNTHIUM_KEANITE, C.RESOURCE_UTRIUM_LEMERGITE, C.RESOURCE_GHODIUM],
    "U": [
      C.RESOURCE_UTRIUM_HYDRIDE,
      C.RESOURCE_UTRIUM_ACID,
      C.RESOURCE_CATALYZED_UTRIUM_ACID,
      C.RESOURCE_UTRIUM_OXIDE,
      C.RESOURCE_UTRIUM_ALKALIDE,
      C.RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    ],
    "L": [
      C.RESOURCE_LEMERGIUM_HYDRIDE,
      C.RESOURCE_LEMERGIUM_ACID,
      C.RESOURCE_CATALYZED_LEMERGIUM_ACID,
      C.RESOURCE_LEMERGIUM_OXIDE,
      C.RESOURCE_LEMERGIUM_ALKALIDE,
      C.RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    ],
    "K": [
      C.RESOURCE_KEANIUM_HYDRIDE,
      C.RESOURCE_KEANIUM_ACID,
      C.RESOURCE_CATALYZED_KEANIUM_ACID,
      C.RESOURCE_KEANIUM_OXIDE,
      C.RESOURCE_KEANIUM_ALKALIDE,
      C.RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    ],
    "Z": [
      C.RESOURCE_ZYNTHIUM_HYDRIDE,
      C.RESOURCE_ZYNTHIUM_ACID,
      C.RESOURCE_CATALYZED_ZYNTHIUM_ACID,
      C.RESOURCE_ZYNTHIUM_OXIDE,
      C.RESOURCE_ZYNTHIUM_ALKALIDE,
      C.RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    ],
    "G": [
      C.RESOURCE_GHODIUM_HYDRIDE,
      C.RESOURCE_GHODIUM_ACID,
      C.RESOURCE_CATALYZED_GHODIUM_ACID,
      C.RESOURCE_GHODIUM_OXIDE,
      C.RESOURCE_GHODIUM_ALKALIDE,
      C.RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
    ],
    // "T3": [
    //   C.RESOURCE_CATALYZED_UTRIUM_ACID,
    //   C.RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    //   C.RESOURCE_CATALYZED_KEANIUM_ACID,
    //   C.RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    //   C.RESOURCE_CATALYZED_LEMERGIUM_ACID,
    //   C.RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    //   C.RESOURCE_CATALYZED_ZYNTHIUM_ACID,
    //   C.RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    //   C.RESOURCE_CATALYZED_GHODIUM_ACID,
    //   C.RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
    // ],
    // "T2": [
    //   C.RESOURCE_UTRIUM_ACID,
    //   C.RESOURCE_UTRIUM_ALKALIDE,
    //   C.RESOURCE_KEANIUM_ACID,
    //   C.RESOURCE_KEANIUM_ALKALIDE,
    //   C.RESOURCE_LEMERGIUM_ACID,
    //   C.RESOURCE_LEMERGIUM_ALKALIDE,
    //   C.RESOURCE_ZYNTHIUM_ACID,
    //   C.RESOURCE_ZYNTHIUM_ALKALIDE,
    //   C.RESOURCE_GHODIUM_ACID,
    //   C.RESOURCE_GHODIUM_ALKALIDE,
    // ],

    // "T1": [
    //   C.RESOURCE_UTRIUM_HYDRIDE,
    //   C.RESOURCE_UTRIUM_OXIDE,
    //   C.RESOURCE_KEANIUM_HYDRIDE,
    //   C.RESOURCE_KEANIUM_OXIDE,
    //   C.RESOURCE_LEMERGIUM_HYDRIDE,
    //   C.RESOURCE_LEMERGIUM_OXIDE,
    //   C.RESOURCE_ZYNTHIUM_HYDRIDE,
    //   C.RESOURCE_ZYNTHIUM_OXIDE,
    //   C.RESOURCE_GHODIUM_HYDRIDE,
    //   C.RESOURCE_GHODIUM_OXIDE,
    // ]
  },

  "商品资源": {
    "Misc": [
      C.RESOURCE_COMPOSITE,
      C.RESOURCE_CRYSTAL,
      C.RESOURCE_LIQUID,
    ],

    "Mechanical": [
      C.RESOURCE_METAL,
      C.RESOURCE_ALLOY,
      C.RESOURCE_TUBE,
      C.RESOURCE_FIXTURES,
      C.RESOURCE_FRAME,
      C.RESOURCE_HYDRAULICS,
      C.RESOURCE_MACHINE,
    ],

    "Electronical": [
      C.RESOURCE_SILICON,
      C.RESOURCE_WIRE,
      C.RESOURCE_SWITCH,
      C.RESOURCE_TRANSISTOR,
      C.RESOURCE_MICROCHIP,
      C.RESOURCE_CIRCUIT,
      C.RESOURCE_DEVICE,
    ],

    "Biological": [
      C.RESOURCE_BIOMASS,
      C.RESOURCE_CELL,
      C.RESOURCE_PHLEGM,
      C.RESOURCE_TISSUE,
      C.RESOURCE_MUSCLE,
      C.RESOURCE_ORGANOID,
      C.RESOURCE_ORGANISM,
    ],

    "Mystical": [
      C.RESOURCE_MIST,
      C.RESOURCE_CONDENSATE,
      C.RESOURCE_CONCENTRATE,
      C.RESOURCE_EXTRACT,
      C.RESOURCE_SPIRIT,
      C.RESOURCE_EMANATION,
      C.RESOURCE_ESSENCE,
    ]
  }
}


const Resource = ({ name, amount }) => {
  return (
    <Statistic title={name} value={amount} precision={0} valueStyle={{ color: RES_COLORS[name], fontSize: '20px' }} style={{ color: RES_COLORS[name] }} />
  )
}


const ResourcesView = ({ resources }) => {


  return (
    <div className="resources-view" style={{ width: '800px' }}>

      {
        Object.keys(resMap).map(mainCategory => (
          <div key={mainCategory} className="resource-category">
            <h3>{mainCategory}</h3>
            <div className="resource-list">
              {
                Object.keys(resMap[mainCategory]).map(subCatagory => (
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} key={subCatagory}>
                    {Object.values(resMap[mainCategory][subCatagory]).map(resName => (
                      <Col key={resName} span={3}>
                        <Resource key={resName} name={resName} amount={resources[resName]} />
                      </Col>
                    )
                    )}
                  </Row>
                )
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ResourcesView