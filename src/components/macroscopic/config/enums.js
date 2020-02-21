const {
    macroscopic
} = window.nCov_luchengData;
const {
    lc,
    lc_yt
} = macroscopic;
export const leftOptions = [{
    label: "疫情分布",
    tabIndex: 1,
    check: false,
    show: true,
    children: [{
        name: `确诊病例 (${lc.qzbl}例)`,
        id: "qzbl",
        url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/fangkong_wz/MapServer",
        sublayers: "0",
        icon: "确诊病例",
        check: false
    }, {
        name: `密切接触者 (${lc.mj}例)`,
        // ytd: "IdentityType like '%银泰%'",
        id: "mj",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "5",
        icon: "密接",
        check: false
    }, {
        name: `集中隔离者 (${lc.gld_list}个)`,
        id: "gld_list",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "5",
        icon: "治愈",
        check: false
    }, {
        name: `疫点 (${lc.gld}个)`,
        id: "gld",
        url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/fangkong_wz/MapServer",
        sublayers: "1",
        icon: "死亡",
        check: false
    }
    ]
}, {
    label: "医疗资源",
    tabIndex: 1,
    check: false,
    show: true,
    children: [{
        name: `发热门诊 (${macroscopic.clinic_type_1}家)`,
        id: "clinic_type_1",
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
        sublayers: "1",
        icon: "发热门诊",
        check: false
    }, {
        name: `定点救治医院 (${macroscopic.clinic_type_2}家)`,
        id: "clinic_type_2",
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
        sublayers: "2",
        icon: "定点医院",
        check: false
    }, {
        name: `其他专科医院 (${macroscopic.clinic_type_3}家)`,
        id: "clinic_type_3",
        url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
        sublayers: "8",
        definitionExpression: "TAG LIKE '%专科医院%'",
        icon: "其他专科医院",
        check: false
    },
        // {
        //     name: "乡镇卫生医院 (7129家)",
        //     id: "clinic_type_4",
        //     url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
        //     sublayers: "8",
        //     definitionExpression: "TAG LIKE '%医疗卫生%'",
        //     icon: "乡镇卫生院",
        //     check: false
        // },
        {
            name: `医保药房 (${macroscopic.clinic_type_5}家)`,
            id: "clinic_type_5",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "8",
            definitionExpression: "TAG LIKE '%药房/保健品%'",
            icon: "药店",
            check: false
        },
        // {
        //     name: "其他医疗机构 (7129家)",
        //     id: "clinic_type_6",
        //     sublayers: "8",
        //     url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
        //     icon: "其他医疗机构",
        //     check: false
        // },
        {
            name: `疾控中心 (${macroscopic.clinic_type_7}家)`,
            id: "clinic_type_7",
            sublayers: "0",
            url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
            icon: "疾控中心",
            check: false
        }
    ]
},
    {
        label: "网格管理",
        tabIndex: 1,
        check: false,
        show: true,
        children: [{
            name: "街镇网格",
            id: "chanyePlate",
            sublayers: "0",
            // isImg: true,
            url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/xzjd/MapServer",
            check: false
        }, {
            name: "社区网格",
            id: "wg",
            sublayers: "12",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            check: false
        }, {
            name: "小区、大厦、物业",
            id: "xq",
            sublayers: "14",
            // isImg: true,
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            check: false
        }]
    }, {
        label: "人员密集场所",
        tabIndex: 1,
        check: false,
        show: true,
        children: [{
            name: `佛道宗教活动场所 (${macroscopic.people_type_1}个)`,
            id: "people_type_1",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "2",
            icon: "宗教",
            check: false
        }, {
            name: `天基宗教活动场所 (${macroscopic.people_type_2}个)`,
            id: "people_type_2",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "3",
            icon: "宗教",
            check: false
        }, {
            name: `伊斯兰教宗教活动场所 (${macroscopic.people_type_13}个)`,
            id: "people_type_13",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "12",
            icon: "宗教",
            check: false
        }, {
            name: `专业市场 (${macroscopic.people_type_3}个)`,
            id: "people_type_3",
            url: "http://172.20.89.59/server/rest/services/lcjjdt/jjts/MapServer",
            sublayers: "3",
            icon: "市场",
            check: false
        }, {
            name: `城市书房 (${macroscopic.people_type_6}个)`,
            id: "people_type_6",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "6",
            icon: "城市书房",
            check: false
        }, {
            name: `健身房 (${macroscopic.people_type_7}个)`,
            id: "people_type_7",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "5",
            icon: "健身房",
            check: false
        },
            {
                name: `民办培训机构 (${macroscopic.people_type_12}个)`,
                id: "people_type_12",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "13",
                icon: "民办培训机构",
                check: false
            },
            {
                name: `博物馆 (${macroscopic.people_type_10}个)`,
                id: "people_type_10",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "7",
                icon: "博物馆",
                check: false
            }, {
                name: `文化场所 (${macroscopic.people_type_11}个)`,
                id: "people_type_11",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "8",
                icon: "文化",
                check: false
            }
        ]
    },
    {
        label: "疫情统计",
        tabIndex: 2,
        check: false,
        disabled: true,
        show: true,
        children: [{
            name: `确诊病例 (${lc.qzbl}例)`,
            id: "m_qzbl",
            url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/fangkong_wz/MapServer",
            sublayers: "0",
            m_url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/xzjd/MapServer",
            icon: "确诊病例",
            check: true
        }, {
            name: `密切接触者 (${lc.mj}例)`,
            id: "m_mj",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            sublayers: "1",
            m_url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/xzjd_mqjcz/MapServer",
            icon: "密接",
            check: false
        }, {
            name: `集中隔离者 (${lc.gld_list}个)`,
            id: "m_gld_list",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
            sublayers: "5",
            m_url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/xzjd_jzgl/MapServer",
            icon: "治愈",
            check: false
        }, {
            name: `疫点 (${lc.gld}个)`,
            id: "m_gld",
            url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/fangkong_wz/MapServer",
            sublayers: "1",
            m_url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/xzjd_yd/MapServer",
            icon: "死亡",
            check: false
        }
        ]
    }
]