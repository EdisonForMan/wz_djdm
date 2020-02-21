/**
 * daily update
 * created by eds 2020/2/2
 */
const nCov_luchengData = {
    /** 防疫布控  */
    macroscopic: {
        updateTime: "2020年2月3日24点",
        /** daily  */
        death: 0,               //  死亡
        cure: 1,                //  治愈
        /** leftOptions  */
        lc: {
            qzbl: 396,           //  确诊病例
            zzbl: 17,           //  疑似病例 
            // yydc: 26,
            // sqdc: 7,
            gld: 95,            //  疫点
            gld_list: 5274,     //  隔离点人员
            jjgl: 2314,         //  居家隔离人员
            mj: 7047,            //  密切接触者
            hbhw: 1305          //  湖北回鹿人员信令
        },
        lc_yt: {
            qzbl: 22,           //  确诊病例（银泰）
            zzbl: 3,            //  疑似病例（银泰）
            ytyg: 575,          //  银泰员工（银泰）
            gld: 38,            //  隔离点 
            gld_list: 1350,     //  隔离点人员
            mj: 193             //  密切接触者（银泰）
        },
        highway_type_1: 4,      //  高速卡口
        highway_type_2: 1,      //  火车站
        people_type_1: 110,     //  佛道宗教活动场所
        people_type_2: 91,      //  天基宗教活动场所
        people_type_3: 10,      //  专业市场
        people_type_6: 93,      //  城市书房
        people_type_7: 28,      //  健身房
        people_type_8: 24,      //  商场超市
        people_type_9: 41,      //  农贸市场
        people_type_10: 14,     //  博物馆
        people_type_11: 4,      //  文化场所
        people_type_12: 251,    //  民办培训机构
        people_type_13: 1,      //  伊斯兰教宗教活动场所
        clinic_type_1: 8,       //  发热门诊
        clinic_type_2: 1,       //  定点救治医院
        clinic_type_3: 122,     //  其他专科医院
        clinic_type_5: 8,       //  医保药房
        clinic_type_7: 1,       //  疾控中心
        jzgd: 195,              //  建筑工地信息
        nj_zdqy: 30,            //  南郊重点企业
        nj_xm_1: 5,             //  南郊街道自建项目企业
        nj_xm_2: 14,            //  南郊街道在建项目企业
    },
    /**宏观管控**/
    /** 实时更新  */
    control: {
        lc: {
            headerData: {
                whNumber: 7081,//湖北返鹿人数
                ygkNumber: 2364,//已管控人数
                wgkNumber: 4717,//未管控人数
                frNumer: 7 // 发热门诊机构数量
            },
            qzbl_add: 0,//确诊病例新增
            qzbl_mix: "-",//确诊病例温州占比(填百分制：'10%'，如没有则填"-")
            zzbl_add: 0, //  疑似病例新增
            zzbl_mix: "-",//疑似病例温州占比
            death_add: 0, //  死亡新增
            death_mix: "-",//死亡温州占比
            cure_add: 0, //  治愈新增
            cure_mix: "-",//治愈温州占比
            tableData: [
                {
                    key: "医院发热待查",
                    value: ["15", "0", "-"]//统计总数,今日增长,增长速度(填百分制：'10%'，如没有则填"-")
                },
                {
                    key: "社区发热待查",
                    value: ["7", "0", "-"]
                },
                {
                    key: "居家隔离人员",
                    value: ["2416", "0", "-"]
                },
                {
                    key: "密切接触者",
                    value: ["282", "0", "-"]
                }
            ],
            /** 病例走势**/
            namelist1: ['24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],//日期
            datalist1: [, 5, 10, 17, 27, 29, 32, 34],//对应日期的确认病例总数（没有则空）
        },
        jd: {
            jieDaoTable: [
                {
                    key: "五马",
                    value: ["3", "3", "0", "1", "358", "-"]//确诊病例人数，疑似病例人数，医院发热待查人数，社区发热待查人数，居家隔离人员，密切接触者(如没有则填"-")
                },
                {
                    key: "广化",
                    value: ["0", "0", "1", "0", "101", "-"]
                },
                {
                    key: "大南",
                    value: ["7", "1", "1", "0", "38", "-"]
                },
                {
                    key: "松台",
                    value: ["3", "6", "6", "1", "87", "-"]
                },
                {
                    key: "滨江",
                    value: ["0", "4", "1", "0", "379", "-"]
                },
                {
                    key: "蒲鞋市",
                    value: ["1", "1", "1", "0", "174", "-"]
                },
                {
                    key: "南汇",
                    value: ["11", "3", "2", "0", "540", "-"]
                },
                {
                    key: "双屿",
                    value: ["1", "2", "0", "0", "203", "-"]
                },
                {
                    key: "七都",
                    value: ["0", "0", "0", "0", "71", "-"]
                },
                {
                    key: "仰义",
                    value: ["0", "1", "0", "0", "110", "-"]
                },
                {
                    key: "丰门",
                    value: ["0", "0", "0", "0", "77", "-"]
                },
                {
                    key: "南郊",
                    value: ["2", "0", "1", "0", "41", "-"]
                },
                {
                    key: "藤桥镇",
                    value: ["6", "0", "1", "5", "158", "-"]
                },
                {
                    key: "山福镇",
                    value: ["0", "0", "0", "0", "68", "-"]
                } // 街道数据
            ],
        },
        yt: {
            list1: ['五马', '广化', '大南', '松台', '滨江', '蒲鞋市', '南汇', '双屿', '七都', '仰义', '丰门', '南郊', '藤桥镇', '山福镇'],
            datalist1: [1, 0, 6, 1, 0, 1, 6, 1, 0, 0, 0, 2, 2, 0],//银泰事件各街道确诊人数
            list2: ['疑似病例'],
            list3: ['银泰员工'],
            list4: ['密切接触者'],
        },
        gld: {
            horseNum: 18,//鹿城隔离点总数
            roomNum: 1273,//鹿城隔离点房间总数
            gldtable: [
                {
                    key: '大宅门宾馆',
                    value: ['77', '0', '0', '77']//房间数，使用人数，其中湖北回鹿人数，空余房间数
                },
                {
                    key: '唯乐创意酒店',
                    value: ['46', '46', '31', '2']
                },
                {
                    key: '锦江之星',
                    value: ['80', '30', '8', '50']
                },
                {
                    key: '新国贸大酒店',
                    value: ['140', '0', '0', '140']
                },
                {
                    key: '金丝桥瑞都商旅酒店',
                    value: ['61', '42', '32', '29']
                },
                {
                    key: '聚商连锁酒店',
                    value: ['27', '3', '0', '24']
                },
                {
                    key: '锐思特（飞霞路店）',
                    value: ['50', '0', '0', '50']
                },
                {
                    key: '瑞都酒店',
                    value: ['72', '70', '2', '7']
                },
                {
                    key: '锐思特（飞霞路店）',
                    value: ['80', '50', '49', '47']
                },
                {
                    key: '威斯顿时尚酒店',
                    value: ['50', '58', '33', '0']
                },
                {
                    key: '众豪酒店',
                    value: ['50', '10', '3', '23']
                },
                {
                    key: '瑞都连锁酒店',
                    value: ['63', '39', '5', '31']
                },
                {
                    key: '普尔顿酒店',
                    value: ['69', '0', '0', '69']
                },
                {
                    key: '百思快捷宾馆',
                    value: ['35', '30', '30', '21']
                },
                {
                    key: '新生代员工宿舍',
                    value: ['75', '0', '0', '75']
                },
                {
                    key: '双屿欣悦宾馆',
                    value: ['51', '9', '0', '42']
                },
                {
                    key: '好万家公寓',
                    value: ['70', '0', '0', '70']
                },
                {
                    key: '龙城宾馆',
                    value: ['37', '34', '9', '3']
                },
            ],
        },
    },
}

window.nCov_luchengData = nCov_luchengData;