// 获取容器元素
var container = document.getElementById('chart-container');
// 初始化 ECharts 实例
var myChart = echarts.init(container);

// 显示加载动画
// myChart.showLoading();

// 定义 visualMap 的默认配置
var visualMapConfig = {
    min: 0,
    max: 5, // 根据您的数据实际情况进行调整
    splitNumber: 5,
    inRange: {
        color: ['blue', 'green', 'yellow', 'red']
    },
    textStyle: {
        color: '#000'
    }
};

// 定义起始和结束日期
var startDate = new Date('2021-04-10');
var endDate = new Date('2023-12-19');

// 初始化当前日期
var currentDate = startDate;

// 加载地图数据
$.get('json/japan.geojson', function (geoJson) {
    // 注册地图
    echarts.registerMap('Japan', geoJson);

    // 切换文件的函数
    function switchFile() {
        // 构建当前文件的文件名
        var folderPath = 'hotPostMapData/';
        var currentFileName = currentDate.toISOString().split('T')[0] + '.json';

        // 更改 title 来显示文件夹名
        myChart.setOption({
            title: {
                text: folderPath + currentFileName,
                left: 'center'
            }
        });

        console.log(folderPath + currentFileName);
        // 加载节点数据
        $.get(folderPath + currentFileName, function (nodeData) {
            console.log(nodeData[898]);
            // 设置图表的配置项和数据
            myChart.setOption({
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
                        blurSize: 10, // 热力点的模糊大小
                        width: '100%', // 设置模块宽度为100%使其成为正方形
                        height: '100%' // 设置模块高度为100%使其成为正方形
                    }
                ],
                visualMap: visualMapConfig // 使用定义的 visualMap 配置
            });

            // 增加一天
            currentDate.setDate(currentDate.getDate() + 1);

            // 如果日期小于等于结束日期，则继续切换文件，否则重置日期为开始日期
            if (currentDate <= endDate) {
                // 设置定时器，3秒后切换下一个文件
                setTimeout(switchFile, 3000);
            } else {
                currentDate = startDate;
                setTimeout(switchFile, 3000);
            }
        });
    }

    // 开始展示第一个文件
    switchFile();

    // 添加地图缩放和平移事件监听器
    myChart.on('geoRoam', function (params) {
        // 获取地图的缩放级别和平移位置
        var zoom = params.zoom;
        var x = params.x;
        var y = params.y;

        // 在这里处理地图缩放和平移事件
        // 您可以根据需要执行相应的操作
        console.log('Zoom Level: ' + zoom);
        console.log('X Coordinate: ' + x);
        console.log('Y Coordinate: ' + y);
    });
});
