// 获取容器元素
var container = document.getElementById('chart-container');
// 初始化 ECharts 实例
var myChart = echarts.init(container);

// 显示加载动画
myChart.showLoading();

// 获取地图数据并注册地图
$.get('json/beijing.geojson', function (geoJson) {
    // 隐藏加载动画
    myChart.hideLoading();


    echarts.registerMap('Beijing', geoJson);

    // 节点数据
    var TrainData = [
        {name: '石景山古城', value: [116.184239,39.914409]},
        {name: '海淀万柳', value: [116.287451,39.987313]},
        {name: '朝阳奥体中心', value: [116.3974,39.982053]},
        {name: '永定门内大街', value: [116.394009,39.876184]},
        {name: '南三环西路', value: [116.36781,39.855958]},
        {name: '朝阳农展馆', value: [116.460742,39.937119]},
        {name: '东城东四', value: [116.416883,39.929287]},
        {name: '丰台花园', value: [116.279082,39.86347]},
        {name: '大兴黄村镇', value: [116.406155,39.718147]},
        {name: '亦庄开发区', value: [116.506319,39.794491]},
        {name: '东城天坛', value: [116.407355,39.886491]},
        {name: '前门东大街', value: [116.395383,39.899135]},
        {name: '顺义新城', value: [116.655,40.127]},
        {name: '昌平镇', value: [116.23,40.216999]},
        {name: '门头沟龙泉镇', value: [116.105999,39.936999]},
        {name: '平谷镇', value: [117.099999,40.143]},
        {name: '怀柔镇', value: [116.628,40.328]},
        {name: '密云镇', value: [116.831999,40.369999]},
        {name: '延庆镇', value: [115.971999,40.453]},
        {name: '昌平定陵', value: [116.22,40.292]},
        {name: '京东北密云水库', value: [116.911,40.499]},
        {name: '京东南永乐店', value: [116.783,39.712]},
        {name: '京南榆垡', value: [116.3,39.52]},
    ];
    var TestData = [
        {name: '海淀北部新区', value: [116.173553,40.090679]},
        {name: '海淀北京植物园', value: [116.20531,40.00395]},
        {name: '丰台云岗', value: [116.17115,39.815128]},
        {name: '房山良乡', value: [116.136045,39.742767]},
        {name: '西直门北大街', value: [116.348991,39.954047]},
        {name: '西城万寿西宫', value: [116.351974,39.878193]},
        {name: '东四环北路', value: [116.483746,39.939554]},
        {name: '西城官园', value: [116.351029,39.929302]},
        {name: '通州新城', value: [116.664162,39.885241]},
        {name: '京西北八达岭', value: [115.988,40.365]},
        {name: '京东东高村', value: [117.12,40.1]},
        {name: '京西南琉璃河', value: [116.0,39.579999]},
    ];

    // 设置图表的配置项和数据
    myChart.setOption({
        title: {
            text: '北京传感器分布数量',
            subtext: 'Data from STGNP',
            sublink: ''
            },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                // 悬浮展示详情块
                return '名称: ' + params.data.name + '<br/>经度: ' + params.value[0] + '<br/>纬度: ' + params.value[1];
            }
        },
        legend: {
            data: ['Train Node', 'Test Node'],
            show: true,
            textStyle:{
                fontSize: 20,
                fontWeight: "bold",
                color: "#464646",
            }
        },
        geo: {
            map: 'Beijing',
            roam: true,
            selectedMode: 'single',
            label: {
                show: true
            }
        },
        series: [
            // 添加节点的散点图
            {
                name: 'Train Node',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: TrainData,
                symbolSize: 12,
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: '#2471A3',
                    shadowBlur: 0,
                    shadowColor: '#333'
                }
            },
            {
                name: 'Test Node',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: TestData,
                symbolSize: 12,
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: '#F5B041',
                    shadowBlur: 0,
                    shadowColor: '#333'
                }
            }
        ],
    });
});
