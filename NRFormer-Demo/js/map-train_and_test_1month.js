// 获取容器元素
var container = document.getElementById('chart-container');
// 初始化 ECharts 实例
var myChart = echarts.init(container);

// 显示加载动画
myChart.showLoading();

// 获取地图数据并注册地图
$.get('json/japan.geojson', function (geoJson) {
    // 隐藏加载动画
    myChart.hideLoading();


    echarts.registerMap('Japan', geoJson);

    // 夹载节点数据
    $.when(
        $.get('json/map-train_and_test_1month/train_node_num.json'),
        $.get('json/map-train_and_test_1month/test_node_num.json')
    ).done(function (trainNodeData, testNodeData) {
        // 分别处理两个数据源的节点数据
        var trainNodeSeries = {
            name: 'Train Node',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: trainNodeData[0],
            symbolSize: 6,
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
        };

        var testNodeSeries = {
            name: 'Test Node',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: testNodeData[0],
            symbolSize: 6,
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
        };

        // 设置图表的配置项和数据
        myChart.setOption({
            title: {
                text: '日本辐射传感器分布数量',
                subtext: 'Data from Japan',
                sublink: ''
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return 'name: '+params.data.name + '<br/>longitude: ' + params.value[0] + '<br/>latitude: ' + params.value[1];
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
                map: 'Japan',
                roam: true,
                selectedMode: 'single',
                label: {
                    show: true // 控制地图板块 name isShow
                }
            },
            series: [trainNodeSeries, testNodeSeries]
        });
    });
});