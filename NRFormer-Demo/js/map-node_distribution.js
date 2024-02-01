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
    $.get('json/map-node_distribution/1D-data-v2-3841-node_distribution.json', function (nodeData) {

        // 设置图表的配置项和数据
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.data.name + '<br/>经度: ' + params.value[0] + '<br/>纬度: ' + params.value[1];
                }
            },
            geo: {
                map: 'Japan',
                roam: true,
                // zoom:2.05,
                zoom:2,
                center: [139, 38],
                selectedMode: 'single',
                label: {
                    show: false, // 控制地图板块 name isShow
                }
            },
            series: [
                {
                    name: '节点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: nodeData,
                    symbolSize: 6,
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    itemStyle: {
                        color: '#D35400', // 1D-radiation color
                        // color: '#A569BD', // noaa color
                        shadowBlur: 0,
                        shadowColor: '#2471A3'
                    }
                }
            ]
        });
        // 监听地图缩放和平移事件
        myChart.on('georoam', function (event) {
            // 如果有缩放或平移事件，重新设置数据
            if (event.zoom || event.dx || event.dy) {
                myChart.setOption({
                    series: [nodeData]
                });
            }
        });

    });

});
