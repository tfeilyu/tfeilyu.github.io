
var chartDom = document.getElementById('chart-container');
var myChart = echarts.init(chartDom);

// 显示加载动画
// myChart.showLoading();

$.get('json/LineChart-sensor_pattern/radiation_1mon.json', function (_rawData) {
// $.get('json/life-expectancy-table.json', function (_rawData) {
    run(_rawData);
  }
);

function run(_rawData) {
  // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
  const countries = [
      // 'China'
    // '福岛县',
    // '栃木县',
    '茨城县',
    '群马县',
    // '鹿儿岛县',
    // '宫城县',
    // '静冈县',
    // '佐贺县',
    // '北海道',
    // '青森县',
    // '神奈川县',
    // '京都县',
    // '鸟取县',
    // '爱媛县',
    // '大阪县',
    // '长崎县',
    // '滋贺县'
  ];
  const datasetWithFilters = [];
  const seriesList = [];
  echarts.util.each(countries, function (area) {
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
  option = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: _rawData
      },
      ...datasetWithFilters
    ],
    title: {
      text: 'Radiation of Japan since 2011',
      left: 'center'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Radiation Value',
      left: 1400
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
  myChart.setOption(option);
}

