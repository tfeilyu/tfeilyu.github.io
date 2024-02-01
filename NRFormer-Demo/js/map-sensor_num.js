// 获取容器元素
var container = document.getElementById('chart-container');
// 初始化 ECharts 实例
var myChart = echarts.init(container);

// 显示加载动画
myChart.showLoading();

// 获取地图数据并注册地图
$.get('json/japan.geojson', function (geoJson) {
  echarts.registerMap('Japan', geoJson);
  // 在地图数据加载完成后，获取传感器数据
  $.getJSON('json/map-sensor_num/1D-data-v2-3841-node_num.json', function (sensorData) {
    // 隐藏加载动画
    myChart.hideLoading();

    // 设置图表的配置项和数据
    myChart.setOption({
      title: {
        text: '日本辐射传感器分布数量',
        subtext: 'Data from Japan',
        sublink: ''
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} (个)'
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: true },
          restore: {},
          saveAsImage: {}
        }
      },
      visualMap: {
        min: 0,
        max: 150, // 根据实际的最大值来设置
        text: ['High', 'Low'],
        realtime: true,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
      series: [
        {
          name: '日本辐射传感器数量',
          type: 'map',
          map: 'Japan',
          roam: true,
          label: {
            show: false,
            formatter: '{c}', // 标签格式
            textStyle: {
                        color: '#2E4053', // label 文本颜色
                        fontFamily: 'Times', // label 的字体
                        fontSize: 24, // label 的字体大小
                        fontWeight: 'normal', // label 的字体粗细
                        // opacity:0.6
                        // 其他样式...
                    }
          },
          data: sensorData // 使用从 JSON 文件中读取的数据
        }
      ]
    });
  });
});