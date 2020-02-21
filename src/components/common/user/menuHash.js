/**
 * 权限菜单
 * 1.0后台未接入 先写死
 */
const menuHash = {
  管理组: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  //  分局&街镇
  经信局: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  国土局: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  招商局: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  发改局: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  街镇: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  //  专班&领导
  专班领导组: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  专班成员组: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  //  游客
  游客: ["招商地图"]
};
/**
 *  禁用子菜单
 */
export const fixMenuList = (list = []) => {
  const { au_username, group } = window.user;
  const _groups_ = group.map(item => {
    return item.au_groupname;
  });
  let premission = menuHash["游客"];
  for (let d in menuHash) {
    if (_groups_.includes(d)) {
      premission = premission.concat(menuHash[d]);
    }
  }
  const _premission_ = [...new Set(premission)];
  //  亩均论英雄额外判断
  _groups_.includes("亩均论英雄") && (window.user.rland = true);
  //  经济信息额外判断
  _groups_.includes("企业经济信息") && (window.user.rquota = true);
  return list.filter(item => {
    return ~_premission_.indexOf(item.label);
  });
};
