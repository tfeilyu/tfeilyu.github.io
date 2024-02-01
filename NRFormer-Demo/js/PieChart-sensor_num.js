
var chartDom = document.getElementById('chart-container');
var myChart = echarts.init(chartDom);

option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Sensor Number',
      type: 'pie',
      radius: ['40%', '60%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
            { name: '福島県', value: 2632 },
            { name: '新潟県', value: 149 },
            { name: '石川県', value: 101 },
            { name: '茨城県', value: 74 },
            { name: '福井県', value: 53 },
            { name: '鹿児島県', value: 47 },
            { name: '宮城県', value: 38 },
            { name: '静岡県', value: 34 },
            { name: '佐賀県', value: 32 },
            { name: '北海道', value: 31},
            { name: '青森県', value: 26 },
            { name: '神奈川県', value: 25 },
            { name: '京都府', value: 23 },
            { name: '鳥取県', value: 20 },
            { name: '愛媛県', value: 20 },
            { name: '大阪府', value: 20 },
            { name: '長崎県', value: 18 },
            { name: '滋賀県', value: 15 },
            { name: '島根県', value: 14 },
            { name: '栃木県', value: 14 },
            { name: '群馬県', value: 13 },
            { name: '岐阜県', value: 12 },
            { name: '富山県', value: 12 },
            { name: '岡山県', value: 8 },
            { name: '沖縄県', value: 7 },
            { name: '長野県', value: 7 },
            { name: '岩手県', value: 7 },
            { name: '秋田県', value: 6 },
            { name: '熊本県', value: 6 },
            { name: '埼玉県', value: 6 },
            { name: '千葉県', value: 6 },
            { name: '兵庫県', value: 6 },
            { name: '山形県', value: 6 },
            { name: '高知県', value: 5 },
            { name: '愛知県', value: 5 },
            { name: '山梨県', value: 5 },
            { name: '東京都', value: 5 },
            { name: '大分県', value: 5 },
            { name: '徳島県', value: 4 },
            { name: '奈良県', value: 4 },
            { name: '三重県', value: 4 },
            { name: '山口県', value: 4 },
            { name: '宮崎県', value: 3 },
            { name: '香川県', value: 3 },
            { name: '広島県', value: 3 },
            { name: '和歌山県', value: 3 },
            { name: '福岡県', value: 2 }
      ]
    }
  ]
};

option && myChart.setOption(option);
