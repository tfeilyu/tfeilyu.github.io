
var chartDom = document.getElementById('chart-container');
var myChart = echarts.init(chartDom);

// 显示加载动画
// myChart.showLoading();

$.get('json/LineChart-sensor_pattern/3D-data-v2_line_pattern_data.json', function (_rawData) {
// $.get('json/life-expectancy-table.json', function (_rawData) {
    run(_rawData);
  }
);

function run(_rawData) {
  // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
  const countries = [
      // "北海道",
      "青森県",
      // "岩手県",
      // "宮城県",
      // "秋田県",
      // "山形県",
      // "福島県",
      // "茨城県",
      // "栃木県",
      "群馬県",
      // "埼玉県",
      // "千葉県",
      // "東京都",
      // "神奈川県",
      // "新潟県",
      // "富山県",
      // "石川県",
      // "福井県",
      // "山梨県",
      // "長野県",
      // "岐阜県",
      // "静岡県",
      // "愛知県",
      // "三重県",
      // "滋賀県",
      // "京都府",
      // "大阪府",
      // "兵庫県",
      // "奈良県",
      // "和歌山県",
      // "鳥取県",
      // "島根県",
      // "岡山県",
      // "広島県",
      // "山口県",
      // "徳島県",
      // "香川県",
      // "愛媛県",
      // "高知県",
      // "福岡県",
      // "佐賀県",
      // "長崎県",
      // "熊本県",
      // "大分県",
      // "宮崎県",
      // "鹿児島県",
      // "沖縄県",

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
      min:0.01
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
  myChart.setOption(option);
}

