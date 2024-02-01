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

    // 获取节点数据
    $.when(
        $.get('json/map-radiation_and_noaa/noaa-node.json'),
        $.get('json/map-radiation_and_noaa/radiation-node.json')
    ).done(function (noaaNodeData, radiationNodeData) {
        // 处理节点数据
        var noaaNodeSeries = {
            name: 'NOAA Node',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: noaaNodeData[0],
            symbolSize: 6,
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: '#EB984E',
                shadowBlur: 0,
                shadowColor: '#333'
            }
        };

        var radiationNodeSeries = {
            name: 'Radiation Node',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: radiationNodeData[0],
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
                    return params.name + '<br>longitude: ' + params.value[0] + '<br>latitude: ' + params.value[1];
                }
            },
            legend: {
                data: ['NOAA Node', 'Radiation Node'],
                show: true,
                textStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#464646"
                }
            },
            geo: {
                map: 'Japan',
                roam: true,
                label: {
                    show: false // 控制地图板块 name isShow
                }
            },
            series: [noaaNodeSeries, radiationNodeSeries]
        });

        // 监听地图缩放和平移事件
        myChart.on('georoam', function (event) {
            // 如果有缩放或平移事件，重新设置数据
            if (event.zoom || event.dx || event.dy) {
                myChart.setOption({
                    series: [noaaNodeSeries, radiationNodeSeries]
                });
            }
        });

    });
});