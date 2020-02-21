import { loadModules } from "esri-loader";
import { colorHash } from "./landColorHash";
import {
  OPTION,
  WRT_config,
  CYBJ,
  ALLLANDREGULATORY,
  spatialReference,
  DKHX,
  TDT25DCONFIG,
  TDT25D
} from "@/components/common/Tmap";
const { server } = WRT_config;
const urlHash = {
  allLandRegulatory: ALLLANDREGULATORY + "/0",
  landAva: DKHX + "/1",
  YZDC: DKHX + "/0"
};
/**
 * 空间查询
 * @param {*} context
 * @param {Boolean} isCompany
 */
export function spaceQuery(context, isLand = false) {
  loadModules(
    [
      "esri/Graphic",
      "esri/widgets/Sketch/SketchViewModel",
      "esri/layers/GraphicsLayer",
      "esri/geometry/Circle",
      "esri/geometry/Point"
    ],
    OPTION
  ).then(([Graphic, SketchViewModel, GraphicsLayer, Circle, Point]) => {
    let spaceGraphicsLayer = context.map.findLayerById("spaceLayer");
    if (!spaceGraphicsLayer) {
      spaceGraphicsLayer = new GraphicsLayer({
        id: "spaceLayer"
      });
      context.map.add(spaceGraphicsLayer);
    }
    // 绘制多边形
    context.sketchViewModel = new SketchViewModel({
      updateOnGraphicClick: false,
      view: context.view,
      layer: spaceGraphicsLayer,
      polylineSymbol: {
        type: "simple-line",
        color: "#0000ff",
        width: "1",
        style: "dash"
      },
      polygonSymbol: {
        type: "simple-fill",
        color: "rgba(0, 0, 255, 0.2)",
        style: "solid",
        outline: {
          color: "white",
          width: 1
        }
      }
    });
    context.sketchViewModel.on("create", function(event) {
      if (
        event.tool == "polyline" &&
        event.graphic.geometry.paths[0].length == 3
      ) {
        event.graphic.geometry.paths[0].length = 2;
        context.sketchViewModel.complete();
        const p1 = event.graphic.geometry.paths[0][0];
        const p2 = event.graphic.geometry.paths[0][1];
        const circleCenter = new Point({
          x: p1[0],
          y: p1[1]
        });
        const circle = new Circle({
          center: circleCenter,
          radius:
            Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)) *
            111000
        });
        const circleGraphic = new Graphic({
          geometry: circle,
          symbol: {
            type: "simple-fill",
            color: [0, 0, 255, 0.2],
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          }
        });
        spaceGraphicsLayer.add(circleGraphic);
        isLand
          ? queryLand(spaceGraphicsLayer, circleGraphic, context)
          : queryCompany(spaceGraphicsLayer, circleGraphic, context);
      }
      if (event.tool == "polygon" && event.state === "complete") {
        isLand
          ? queryLand(spaceGraphicsLayer, event.graphic, context)
          : queryCompany(spaceGraphicsLayer, event.graphic, context);
      }
    });
  });
}
export function doSpaceQuery(context) {
  context.sketchViewModel.create("polygon");
}
export function doCircleQuery(context) {
  context.sketchViewModel.create("polyline");
}
export function clearQuery(context) {
  // 移除空间查询图层
  context.map.findLayerById("spaceLayer").removeAll();
  // 清空测量工具
  if (context.activeWidget) {
    context.activeWidget.destroy();
    context.activeWidget = null;
  }
  // 移除定位标志
  context.view.graphics.removeAll();
}
export function distanceMeasure(context) {
  loadModules(["esri/widgets/DistanceMeasurement2D"], OPTION).then(
    ([DistanceMeasurement2D]) => {
      if (context.activeWidget) {
        context.activeWidget.destroy();
        context.activeWidget = null;
      }
      context.activeWidget = new DistanceMeasurement2D({
        view: context.view
      });
      context.activeWidget.viewModel.newMeasurement();
    }
  );
}
export function areaMeasure(context) {
  loadModules(["esri/widgets/AreaMeasurement2D"], OPTION).then(
    ([AreaMeasurement2D]) => {
      if (context.activeWidget) {
        context.activeWidget.destroy();
        context.activeWidget = null;
      }
      context.activeWidget = new AreaMeasurement2D({
        view: context.view
      });
      context.activeWidget.viewModel.newMeasurement();
    }
  );
}
export function addMapToolMap({ id, url, layer }, context) {
  loadModules(
    [
      "esri/layers/TileLayer",
      "esri/layers/VectorTileLayer",
      "esri/layers/WebTileLayer",
      "esri/layers/support/TileInfo"
    ],
    OPTION
  ).then(([TileLayer, VectorTileLayer, WebTileLayer, TileInfo]) => {
    let Layer;
    if (layer != "WebTileLayer") {
      Layer = layer == "TileLayer" ? TileLayer : VectorTileLayer;
      const _layer = new Layer({ url, id });
      context.map.add(_layer, 1);
    } else if (layer == "WebTileLayer") {
      Layer = WebTileLayer;
      const tileInfo = new TileInfo(JSON.parse(TDT25DCONFIG));
      const _layer = new WebTileLayer(url, {
        tileInfo,
        id,
        spatialReference
      });
      context.map.add(_layer, 1);
    }
  });
}
export function queryLand(spaceGraphicsLayer, graphic, context) {
  let arr = [];
  //  leftOptions取[0],注意变动,如果[可出让地块][已征待拆地块]不勾选则默认控制性规划
  context.$props.leftOptions[0].children.map(item => {
    if ((item.id == "landAva" || item.id == "YZDC") && item.check) {
      arr.push(item.id);
    }
  });
  !arr.length && arr.push("allLandRegulatory");
  //  若地块画像搜索条件中有用地性质，则强制查询地块画像页面
  context.$props.hasOwnProperty("isSearch") &&
    context.isSearch &&
    (arr = ["landAva", "YZDC"]);
  loadModules(
    ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
    OPTION
  ).then(async ([QueryTask, Query, Graphic]) => {
    arr.map(item => {
      const url = urlHash[item];
      queryLandSingle(
        url,
        spaceGraphicsLayer,
        graphic,
        QueryTask,
        Query,
        Graphic,
        context
      );
    });
  });
}
export function queryCompany(spaceGraphicsLayer, graphic) {
  loadModules(
    ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
    OPTION
  ).then(([QueryTask, Query, Graphic]) => {
    const queryTask = new QueryTask({
      url: CYBJ + "/4"
    });
    const query = new Query();
    query.outFields = ["*"];
    query.where = "1=1";
    query.extent = graphic.geometry.extent;
    query.geometry = graphic.geometry;
    query.returnGeometry = true;
    queryTask.execute(query).then(response => {
      response.features.length &&
        response.features.map(item => {
          const type =
            item.attributes["chanye"] == "1"
              ? "一"
              : item.attributes["chanye"] == "2"
              ? "二"
              : "三";
          const pointGraphic = new Graphic({
            geometry: item.geometry,
            symbol: {
              type: "picture-marker", // autocasts as new PictureMarkerSymbol()
              url: `${server}/icon/commonIcon/${type}.png`,
              width: "20px",
              height: "20px",
              yoffset: 10
            }
          });
          spaceGraphicsLayer.add(pointGraphic);
        });
    });
  });
}

/**
 * 地块空间查询画地
 * @param {*} url 请求地址
 * @param {*} spaceGraphicsLayer  图层
 * @param {*} graphic 空间查询图形
 * @param {*} QueryTask
 * @param {*} Query
 * @param {*} Graphic
 */
const queryLandSingle = (
  url,
  spaceGraphicsLayer,
  graphic,
  QueryTask,
  Query,
  Graphic,
  context
) => {
  const queryTask = new QueryTask({ url });
  const query = new Query();
  query.outFields = ["*"];
  query.where = "1=1";
  query.extent = graphic.geometry.extent;
  query.geometry = graphic.geometry;
  query.returnGeometry = true;
  queryTask.execute(query).then(response => {
    response.features.length
      ? (context.$parent.resultTable = response.features.map(_item => {
          return _item;
        }))
      : "";
    response.features.length &&
      response.features.map(item => {
        const fillSymbol = {
          type: "simple-fill",
          color: colorHash[item.attributes.YDDM].color,
          outline: {
            color: colorHash[item.attributes.YDDM].outline,
            width: 1
          }
        };
        const polygonGraphic = new Graphic({
          geometry: item.geometry,
          symbol: fillSymbol
        });
        const textSymbol = {
          type: "text",
          text: item.attributes.YDXZ,
          color: "white",
          font: {
            size: 14
          },
          haloColor: "black",
          haloSize: 1
        };
        const ringLength = item.geometry.rings[0].length;
        const obj1 = item.geometry.rings[0][parseInt((ringLength / 4) * 3)];
        const obj2 = item.geometry.rings[0][parseInt(ringLength / 2)];
        const obj3 = item.geometry.rings[0][parseInt(ringLength / 4)];
        const obj4 = item.geometry.rings[0][0];
        const TextGraphic = new Graphic({
          geometry: {
            type: "point",
            x: parseFloat((obj1[0] + obj2[0] + obj3[0] + obj4[0]) / 4),
            y: parseFloat((obj1[1] + obj2[1] + obj3[1] + obj4[1]) / 4)
          },
          symbol: textSymbol
        });
        spaceGraphicsLayer.add(polygonGraphic);
        spaceGraphicsLayer.add(TextGraphic);
      });
  });
};
