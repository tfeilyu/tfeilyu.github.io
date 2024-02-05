// 初始化地图 ECharts 实例
var container = document.getElementById('chart-container');
var myChart = echarts.init(container);

// 初始化折线图 ECharts 实例
var lineChartContainer = document.getElementById('line-chart-container');
var lineChart = echarts.init(lineChartContainer);

// 当前选中的节点数据
var currentNodeData = null;
var originalNodeData = []; // 用于存储原始节点数据

// 显示地图的加载动画
myChart.showLoading();

// 获取地图数据并注册地图
$.get('json/japan.geojson', function (geoJson) {
    myChart.hideLoading();
    echarts.registerMap('Japan', geoJson);

    // 加载节点数据
    $.get('json/map-node_distribution/NRFormer_1D-data-v2-3841_test_Sample1_PreGraph_xlx.json', function (nodeData) {
        originalNodeData = nodeData; // 保存原始节点数据
        myChart.setOption(getMapOption(nodeData));

        // 处理地图上的点击事件
        myChart.on('click', function (event) {
            if (event.componentType === 'series' && event.componentSubType === 'scatter') {
                currentNodeData = event.data; // 保存当前节点的数据
                updateLineChart(currentNodeData); // 使用全部数据更新折线图
                updateLineChartPosition(event.event.offsetX, event.event.offsetY); // 更新折线图位置
            }
        });

        // 点击非节点区域隐藏折线图
        myChart.getZr().on('click', function (event) {
            if (!event.target) {
                lineChartContainer.style.display = 'none';
            }
        });
    });
});

// 监听地图缩放和平移事件
myChart.on('geoRoam', function () {
    var option = myChart.getOption();
    var zoom = option.geo[0].zoom;
    var center = option.geo[0].center;

    // 重新设置地图选项以更新节点位置
    myChart.setOption(getMapOption(originalNodeData, zoom, center));
});

function getMapOption(nodeData, zoom, center) {
    return {
        title:{
            text: '预测数据图',
            left: 'center'
        },
        geo: {
            map: 'Japan',
            roam: true,
            zoom: zoom || 2,
            center: center || [139, 38]
        },
        series: [
            {
                name: '节点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: nodeData,
                symbolSize: 6
            }
        ]
    };
}

function updateLineChart(data) {
    console.log(data);
    lineChart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(32, 33, 36,.7)',
            borderColor: 'rgba(32, 33, 36,0.20)',
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize: '12'
            },
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
        },
        title: {
            text: '2023年 - '+ data.name,
        },
        xAxis: {
            type: 'category',
            data: convertAllDates(data.time),
            axisLabel: {
                interval: 'auto',
                rotate: 45
            }
        },
        yAxis: {
            scale:true,
            type: 'value',
            axisLabel: {
                interval: 'auto',
            }
        },
        legend: {
            data: ['Prediction', 'Ground Truth'],
            left: 'right',
        },
        series: [
            {
                name: 'Prediction',
                type: 'line',
                // stack: 'Total', // 移除 stack 配置
                data: data.pre,
            },
            {
                name: 'Ground Truth',
                type: 'line',
                // stack: 'Total', // 移除 stack 配置
                data: data.y,
            }
        ]
    });

    lineChartContainer.style.display = 'block';
}

function updateLineChartPosition(x, y) {
    // 更新折线图的位置
    var chartPosition = container.getBoundingClientRect();
    var offsetX = 20; // 横向偏移量
    var offsetY = 20; // 纵向偏移量

    // 将折线图容器的左上角定位在节点的右下方
    lineChartContainer.style.left = chartPosition.left + x + offsetX + 'px';
    lineChartContainer.style.top = chartPosition.top + y + offsetY + 'px';
}

// 新增拖拽功能
function makeDraggable(element) {
    var isMouseDown = false;
    var mouseX, mouseY, elemX, elemY;

    element.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        elemX = element.offsetLeft;
        elemY = element.offsetTop;
    });

    document.addEventListener('mousemove', function(e) {
        if (isMouseDown) {
            var deltaX = e.clientX - mouseX;
            var deltaY = e.clientY - mouseY;
            element.style.left = elemX + deltaX + 'px';
            element.style.top = elemY + deltaY + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isMouseDown = false;
    });
}

// 使折线图容器可拖拽
makeDraggable(lineChartContainer);


// 绑定筛选按钮事件
document.getElementById('filter-button').addEventListener('click', function () {
    var dateRangeValue = document.getElementById('date-range').value;
    var numItemsValue = document.getElementById('num-items').value;

    if (currentNodeData) {
        applyFilter(currentNodeData, dateRangeValue, numItemsValue);
    }
});

// 绑定清空按钮事件
document.getElementById('clear-button').addEventListener('click', function () {
    document.getElementById('date-range').value = '';
    document.getElementById('num-items').value = '';
    lineChartContainer.style.display = 'none'; // 清空时关闭折线图
});

function applyFilter(data, dateRange, numItems) {
    var dates = dateRange.split(' to ');
    var startDate = dates[0];
    var endDate = dates[1];
    var limit = parseInt(numItems, 10);

    var filteredData = {
        time: [],
        pre: [],
        y: [],
        name: "",
    };

    for (var i = 0; i < data.time.length; i++) {
        if ((!startDate || data.time[i] >= startDate) && (!endDate || data.time[i] <= endDate)) {
            filteredData.time.push(convertAllDates(data.time[i]));
            filteredData.pre.push(data.pre[i]);
            filteredData.y.push(data.y[i]);
            filteredData.name = data.name;
        }

        if (!isNaN(limit) && filteredData.time.length === limit) {
            break;
        }
    }
    updateLineChart(filteredData);
}

function convertDateFormat(dateStr) {
    var dateObject = new Date(dateStr);
    var newDateFormat = (dateObject.getMonth() + 1) + '-' + dateObject.getDate();
    return newDateFormat;
}
function convertAllDates(dateArray) {
    console.log(dateArray);
    var newDateArray = dateArray.map(function(date) {
        return convertDateFormat(date);
    });
    return newDateArray;
}
