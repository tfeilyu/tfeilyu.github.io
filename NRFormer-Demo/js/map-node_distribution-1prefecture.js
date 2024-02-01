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
    geoJson.features.forEach(function (feature) {
        feature.properties.name = feature.properties.nam; // 假设 'nam' 是正确的属性键
    });

    echarts.registerMap('Japan', geoJson);

    // 夹载节点数据
    $.when(
        $.get('json/map-node_distribution/1D-data-v2-3841-node_distribution_[\'宮城県\'].json'),
        $.get('json/map-node_distribution/1D-data-v2-3841-node_distribution_[\'山形県\'].json'),
        // $.get('json/map-node_distribution/1D-data-v2-3841-node_distribution_[\'佐賀県\'].json'),
        // $.get('json/map-node_distribution/1D-data-v2-3841-node_distribution_[\'鹿児島県\'].json'),
        $.get('json/map-node_distribution/1D-data-v2-3841-node_distribution_大分県.json'),
        $.get('json/map-node_distribution/1D-data-v2-3841-node_distribution_[\'宮崎県\'].json')
    ).done(function (gongcheng, shanxing, xiongben, gongqi) {
        // 分别处理两个数据源的节点数据
        var gongchengSeries = {
            name: '宮城県',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: gongcheng[0],
            symbolSize: 15,
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: 'rgb(231,098,084)',
                shadowBlur: 0,
                shadowColor: '#333'
            }
        };

        var shanxingSeries = {
            name: 'Test Node',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: shanxing[0],
            symbol: 'star',
            symbolSize: 15,
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: 'rgb(055,103,149)',
                shadowBlur: 0,
                shadowColor: '#333'
            }
        };

        // var zuoheSeries = {
        //     name: 'Test Node',
        //     type: 'scatter',
        //     coordinateSystem: 'geo',
        //     data: zuohe[0],
        //     symbol: 'triangle',
        //     symbolSize: 10,
        //     label: {
        //         formatter: '{b}',
        //         position: 'right',
        //         show: false
        //     },
        //     itemStyle: {
        //         color: 'rgb(231,098,084)',
        //         shadowBlur: 0,
        //         shadowColor: '#333'
        //     }
        // };
        //
        // var luerdaoSeries = {
        //     name: 'Test Node',
        //     type: 'scatter',
        //     coordinateSystem: 'geo',
        //     data: luerdao[0],
        //     symbol: 'diamond',
        //     symbolSize: 10,
        //     label: {
        //         formatter: '{b}',
        //         position: 'right',
        //         show: false
        //     },
        //     itemStyle: {
        //         color: 'rgb(030,070,110)',
        //         shadowBlur: 0,
        //         shadowColor: '#333'
        //     }
        // };

        var xiongbenSeries = {
            name: 'Test Node',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: xiongben[0],
            // symbol: 'arrow',
            symbolSize: 15,
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: '#C0392B',
                shadowBlur: 0,
                shadowColor: '#333'
            }
        };

        var gongqiSeries = {
            name: 'Test Node',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: gongqi[0],
            symbol: 'ring',
            symbolSize: 15,
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: '#117A65',
                shadowBlur: 0,
                shadowColor: '#333'
            }
        };

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
                zoom:5,
                center: [138, 38],
                selectedMode: 'single',
                label: {
                    show: false, // 控制地图板块 name isShow
                    // show: function (params) {
                    //     // 指定要显示label的都道府県名称列表
                    //     var prefecturesToShow = ['Yamagata Ken',];
                    //     // 检查当前区域的名称是否在列表中
                    //     return prefecturesToShow.includes(params.name);
                    // },
                    formatter: function (params) {
                        return params.name; // 显示 'nam' 属性，假设它被映射为 params.name
                    },
                    textStyle: {
                        color: '#808B96', // label 文本颜色
                        fontFamily: 'Times', // label 的字体
                        fontSize: 30, // label 的字体大小
                        fontWeight: 'normal', // label 的字体粗细
                        opacity:0.6
                        // 其他样式...
                    }
                },
                regions: [
                    {
                    name: 'Miyagi Ken', // 第一个要高亮的区域的名称
                    itemStyle: {
                        // areaColor: '#ffcc33', // 设置区域颜色
                        areaColor: 'rgb(255,230,183)', // 设置区域颜色
                        borderColor: '#2E4053', // 设置边界颜色
                        borderWidth: 2, // 设置边界宽度
                        opacity: 0.5
                    }},
                    {
                    name: 'Yamagata Ken', // 第二个要高亮的区域的名称
                    itemStyle: {
                        areaColor: 'rgb(170,220,224)',
                        borderColor: '#2E4053',
                        borderWidth: 2,
                        opacity: 0.5
                    }},
                    // {
                    // name: 'Saga Ken', // 第二个要高亮的区域的名称
                    // itemStyle: {
                    //     areaColor: 'rgb(255,208,111)',
                    //     borderColor: '#2E4053',
                    //     borderWidth: 2,
                    //     opacity: 0.5
                    // }},
                    // {
                    // name: 'Kagoshima Ken', // 第二个要高亮的区域的名称
                    // itemStyle: {
                    //     areaColor: 'rgb(114,188,213)',
                    //     borderColor: '#2E4053',
                    //     borderWidth: 2,
                    //     opacity: 0.5
                    // }},
                    {
                    name: 'Oita Ken', // 第二个要高亮的区域的名称
                    itemStyle: {
                        areaColor: '#F6B3AC',
                        borderColor: '#2E4053',
                        borderWidth: 2,
                        opacity: 0.5
                    }},
                    {
                    name: 'Miyazaki Ken', // 第二个要高亮的区域的名称
                    itemStyle: {
                        areaColor: '#BAE3DC',
                        borderColor: '#2E4053',
                        borderWidth: 2,
                        opacity: 0.5
                    }},
                ]
            },
            series: [gongchengSeries, shanxingSeries, xiongbenSeries, gongqiSeries]
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
