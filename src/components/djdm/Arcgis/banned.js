//  筛选排除的字段
export const BANNED_PARAMS = [
  "OBJECTID",
  "OBJECTID_1",
  "Shape",
  "Shape_Area",
  "SHAPE_Area",
  "Shape.STArea()",
  "Shape_STArea__",
  "Shape_Leng",
  "SHAPE_Length",
  "Shape.STLength()",
  "Shape_Length",
  "Shape_STLength__",
  "x",
  "y",
  "type",
  "dz1",
  "zyy",
  "wt",
  "bz",
  "复工率颜色",
  /** 暂时隐藏 */
  "gxsj"
];
//  工业企业暂时去除
export const BANNED_PARAMS_COMPANY = [
  "szcs",
  "tyshxydm",
  "lxr",
  "lxdh",
  "lxdh1",
  "ydygs",
  "cnfhqk",
  "zcdzj",
  "cnfhbl",
  "drxdw",
  "snyg",
  "swyg",
  "hbjyg"
];
