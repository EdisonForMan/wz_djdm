import {
  TDTDSJ,
  TDTXZQH,
  TDTJY,
  TDTIMAGE2017,
  TDTIMAGE2012,
  TDT25D
} from "@/components/common/Tmap";
export default {
  vector: {
    name: "矢量",
    id: "vector",
    fun: "addSimpleStyle",
    layer: "VectorTileLayer",
    url: TDTJY,
    class: "lefter",
    icon: "icon icondingwei",
    check: false,
    children: {
      simpleStyle: {
        name: "简约风",
        id: "simpleStyle",
        fun: "addSimpleStyle",
        layer: "VectorTileLayer",
        url: TDTJY,
        check: false
      },
      largeDataStyle: {
        name: "大数据",
        id: "largeDataStyle",
        fun: "addLargeDataStyle",
        layer: "VectorTileLayer",
        url: TDTDSJ,
        check: false
      },
      administrativeStyle: {
        name: "行政区划",
        id: "administrativeStyle",
        fun: "addAdministrativeStyle",
        layer: "VectorTileLayer",

        url: TDTXZQH,
        check: false
      }
    }
  },
  _25d: {
    name: "2.5维",
    id: "25d",
    fun: "do25d",
    layer: "WebTileLayer",
    check: false,
    class: "left",
    icon: "icon icon-",
    url: TDT25D,
    children: {}
  },
  images: {
    name: "影像",
    class: "center",
    icon: "icon iconmap",
    id: "images",
    explainer: {
      name: "地图工具",
      icon: "icon iconmap"
    },
    children: {
      image2017: {
        name: "2018年度影像",
        id: "image2017",
        fun: "addHistory",
        layer: "TileLayer",
        url: TDTIMAGE2017,
        check: false
      },
      image2012: {
        name: "2012年度影像",
        id: "image2012",
        fun: "addHistory",
        layer: "TileLayer",
        url: TDTIMAGE2012,
        check: false
      }
    }
  },
  search: {
    name: "空间查询",
    class: "right",
    icon: "icon iconRectangleCopy2",
    id: "search",
    children: {
      circle: {
        name: "圆形查询",
        id: "circle",
        fun: "doCircleQuery",
        check: false
      },
      space: {
        name: "多边形查询",
        id: "space",
        fun: "doSpaceQuery",
        check: false
      }
    }
  },
  tools: {
    name: "地图工具",
    class: "righter",
    icon: "icon icongongju",
    id: "tools",
    children: {
      distance: {
        name: "距离测量",
        id: "distance",
        fun: "distanceMeasure",
        check: false
      },
      area: {
        name: "面积测量",
        id: "area",
        fun: "areaMeasure",
        check: false
      },
      clear: {
        name: "图层清除",
        id: "clear",
        fun: "clearQuery",
        check: false
      }
    }
  }
};
