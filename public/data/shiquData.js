// 市区的数据
window.SHI_QU_DATA = {
	updateTime: '2020年02月06日24时', // 截止日期
	zhishuData: {
		// fblTitle: '单位(%)',
		fblTitle: '',
		fblDesc: '近15日确诊病例/常住人口 (截至2020年2月07日)',
		fbl: [ // 二代及以上病例 近15日确诊病例/常住人口
			{value: 7.5, key: "鹿城"},
			{value: 5.5, key: "龙湾"},
			{value: 6, key: "瓯海"},
			{value: 6.5, key: "洞头"},
			{value: 3.5, key: "乐清"},
			{value: 5, key: "瑞安"},
			{value: 4, key: "永嘉"},
			{value: 4.5, key: "文成"},
			{value: 7, key: "平阳"},
			{value: 8, key: "泰顺"},
			{value: 9, key: "苍南"},
			{value: 8.5, key: "龙港"},
			{value: 9.5, key: "浙南集聚区"},
			{value: 10, key: "瓯江口"}		
		],
		// mzblsTitle: '单位(%)',
		mzblsTitle: '',
		mzblsDesc: '近15日全市非本地产生的二代以上病例占比 (截至2020年2月07日)',
		mzbls: [ // 二代及以上病例 近15日全市非本地产生的二代以上病例占比
			{value: 8.52, key: "鹿城"},
			{value: 3.33, key: "龙湾"},
			{value: 8.18, key: "瓯海"},
			{value: 5, key: "洞头"},
			{value: 6.29, key: "乐清"},
			{value: 5.75, key: "瑞安"},
			{value: 8.28, key: "永嘉"},
			{value: 8.75, key: "文成"},
			{value: 5, key: "平阳"},
			{value: 6, key: "泰顺"},
			{value: 4, key: "苍南"},
			{value: 0, key: "龙港"},
			{value: 10, key: "浙南集聚区"},
			{value: 0, key: "瓯江口"}
		],
		// fxlTitle: '单位(%)',
		fxlTitle: '',
		fxlDesc: '近15日新增非自行前往发热门诊病例/近15日地区新增确定病例数 (截至2020年2月07日)',
		fxl: [ // 主动发现病例 近15日新增非自行前往发热门诊病例/近15日地区新增确定病例数
			{value: 10.37, key: "鹿城"},
			{value: 30, key: "龙湾"},
			{value: 27.27, key: "瓯海"},
			{value: 0, key: "洞头"},
			{value: 21.44, key: "乐清"},
			{value: 24, key: "瑞安"},
			{value: 23.45, key: "永嘉"},
			{value: 35, key: "文成"},
			{value: 20, key: "平阳"},
			{value: 32, key: "泰顺"},
			{value: 24, key: "苍南"},
			{value: 24, key: "龙港"},
			{value: 0, key: "浙南集聚区"},
			{value: 0, key: "瓯江口"}
		],
		// qzblsTitle: '单位(起)',
		qzblsTitle: '',
		qzblsDesc: '近15日新增聚集性疫情发生起数 (截至2020年2月07日)',
		qzbls: [ // 聚集性疫情 近15日新增聚集性疫情发生起数
			{value: 4, key: "鹿城"},
			{value: 6.5, key: "龙湾"},
			{value: 4.5, key: "瓯海"},
			{value: 10, key: "洞头"},
			{value: 8, key: "乐清"},
			{value: 3.5, key: "瑞安"},
			{value: 6.5, key: "永嘉"},
			{value: 8, key: "文成"},
			{value: 5, key: "平阳"},
			{value: 6.5, key: "泰顺"},
			{value: 7, key: "苍南"},
			{value: 10, key: "龙港"},
			{value: 10, key: "浙南集聚区"},
			{value: 10, key: "瓯江口"}	
		],
		// jublsTitle: '单位(例)',
		jublsTitle: '',
		jublsDesc: '近15日新增聚集性疫情发生病例数 (截至2020年2月07日)',
		jubls: [ // 聚集性疫情 近15日新增聚集性疫情发生病例数
			{value: 4, key: "鹿城"},
			{value: 5.5, key: "龙湾"},
			{value: 5, key: "瓯海"},
			{value: 10, key: "洞头"},
			{value: 7, key: "乐清"},
			{value: 3.5, key: "瑞安"},
			{value: 6, key: "永嘉"},
			{value: 7.5, key: "文成"},
			{value: 4.5, key: "平阳"},
			{value: 6.5, key: "泰顺"},
			{value: 8, key: "苍南"},
			{value: 10, key: "龙港"},
			{value: 10, key: "浙南集聚区"},
			{value: 10, key: "瓯江口"}	
		],
	},
	qushiData: {
		xz: { // 新增
			date: ['1.24', '1.25', '1.26', '1.27', '1.28', '1.29', '1.30', '1.31', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6'],
			value: [4, 8, 14, 28, 54, 58, 55, 14, 24, 26, 49, 24, 32, 25]
		},
		lj: { // 累计
			date: ['1.24', '1.25', '1.26', '1.27', '1.28', '1.29', '1.30', '1.31', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6'],
			value: [10, 18, 32, 60, 114, 172, 227, 241, 265, 291, 340, 364, 396, 421]
		}
	},
	QZ: '421', // 确诊病例
	QZXZ: '+25', // 确诊今日新增
	ZZ: '30', // 重症病例
	ZZXZ: '+6', // 重症今日新增
	CY: '36', // 出院病例
	CYXZ: '+8', // 出院今日新增
	SW: '0', // 死亡病例
	SWXZ: '+0' // 死亡今日新增
};