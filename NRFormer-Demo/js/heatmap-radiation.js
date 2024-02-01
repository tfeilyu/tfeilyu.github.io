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

    // 加载节点数据
    $.get('json/heatmap/1D-data-v2-3841-heatmap.json', function (nodeData) { // TODO: 确保文件路径和文件名正确

        // 设置图表的配置项和数据
        myChart.setOption({
            title: {
                text: '这个表头你自己替换一下，command+R搜索',
                left: 'center'
            },
            geo: {
                map: 'Japan',
                roam: true,
            },
            series: [
                {
                    name: '热力',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: nodeData.map(function (item) {
                        // 转换成热力图需要的数据格式
                        // 假设数据格式为 {lng: 经度, lat: 纬度, value: 权重}
                        return [item.lng, item.lat, item.value];
                    }),
                    pointSize: 5, // 热力点的大小
                    blurSize: 10 // 热力点的模糊大小
                }
            ],
            visualMap: {
                min: 0,
                max: 5, // 根据你的数据实际情况进行调整
                splitNumber: 5,
                inRange: {
                    color: ['blue', 'green', 'yellow', 'red']
                },
                textStyle: {
                    color: '#000'
                }
            }
        });

    });

});
