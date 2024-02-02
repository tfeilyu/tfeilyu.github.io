var chartDom = document.getElementById('chart-container');
var myChart = echarts.init(chartDom);
var rawData; // 存储原始数据

// 从服务器获取数据
$.get('json/LineChart-sensor_pattern/3D-data-v2_line_pattern_data.json', function (_rawData) {
    rawData = _rawData; // 保存原始数据
    updateChart(); // 初始图表渲染
});

$(document).ready(function() {
    $('#controls input[type="checkbox"]').change(function() {
        updateChart();
    });
});

function updateChart() {
    var selectedCountries = $('#controls input[type="checkbox"]:checked').map(function() {
        return this.value;
    }).get();

    run(rawData, selectedCountries);
}

function run(_rawData, selectedCountries) {
    const datasetWithFilters = [];
    const seriesList = [];

    echarts.util.each(selectedCountries, function (area) {
        var datasetId = 'dataset_' + area;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        { dimension: 'time', gte: 2021 },
                        { dimension: 'area', '=': area }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: area,
            endLabel: {
                show: true,
                formatter: function (params) {
                    return params.value[2] + ': ' + params.value[0];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'time',
                y: 'value',
                label: ['area', 'value'],
                itemName: 'time',
                tooltip: ['value']
            }
        });
    });

    var option = {
        animationDuration: 10000,
        dataset: [
            {
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: 'Fine-Grained Radiation of Japan since 2021',
            left: 'center'
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            nameLocation: 'middle',
        },
        yAxis: {
            name: 'Radiation Value',
            left: 1400,
            min: 0.01
        },
        grid: {
            right: 140
        },
        series: seriesList
    };

    myChart.setOption(option, true); // 使用 true 参数来确保图表正确更新
}
