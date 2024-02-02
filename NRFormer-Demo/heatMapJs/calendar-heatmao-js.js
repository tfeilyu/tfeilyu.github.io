    // 页面加载完毕后，渲染默认的热力图
    $(document).ready(function () {
    renderHeatmap($("#csvSelector").val());
});

    // 下拉框更改时获取新文件地址并渲染热力图
    $("#csvSelector").on("change", function () {
    var selectedCsv = $(this).val();
    renderHeatmap(selectedCsv);
});

    // 渲染热力图
    function renderHeatmap(csvFile) {
    $.ajax({
        type: "GET",
        url: csvFile,
        dataType: "text",
        success: function (data) {
            processData(data, csvFile);
        }
    });
}

    // 处理CSV数据
    function processData(csvData, csvFileName) {
    var lines = csvData.split("\n");
    var header = lines[0].split(",");
    var result = [];

    for (var i = 1; i < lines.length; i++) {
    var currentLine = lines[i].split(",");
    if (currentLine.length === header.length) {
    var yearMonth = currentLine[5]; // 年-月
    var day = parseInt(currentLine[4], 10); // 日期
    var average = parseFloat(currentLine[1]); // 平均值
    if (!isNaN(average)) {
    result.push([yearMonth, day, average.toFixed(2)]); // 保留两位小数
}
}
}

    generateHeatmap(result, csvFileName);
}

    // 生成热力图
    function generateHeatmap(data, csvFileName) {
    var months = [...new Set(data.map(item => item[0]))]; // 月份
    var days = [...new Set(data.map(item => item[1]))]; // 天
    days.sort(function(a, b) { return a - b; }); // 天数排序

    var heatmapData = data.map(item => [months.indexOf(item[0]), days.indexOf(item[1]), item[2]]);

    var option = {
    title: {
    top: 0,
    left: 'center',
    text: 'Average Values Heatmap - ' + csvFileName.split('/').pop()
},
    tooltip: {
    position: 'top',
    formatter: function (params) {
    var yearMonthDay = params.name + '-' + params.data[1];
    var average = params.data[2];
    return 'Date: ' + yearMonthDay + '<br>Average: ' + average;
}
},
    grid: {
    height: '50%',
    y: '10%'
},
    xAxis: {
    type: 'category',
    data: months,
    splitArea: {
    show: true
}
},
    yAxis: {
    type: 'category',
    data: days,
    splitArea: {
    show: true
}
},
    visualMap: {
    min: Math.min(...data.map(item => parseFloat(item[2]))),
    max: Math.max(...data.map(item => parseFloat(item[2]))),
    calculable: true,
    orient: 'horizontal',
    left: 'right',
    top: 10, // 调整到合适的位置
    color: ['#d94e5d', '#eac736', '#50a3ba']
},
    series: [{
    name: 'Average Radiation',
    type: 'heatmap',
    data: heatmapData,
    label: {
    normal: {
    show: false // 不显示每个单元格的值
}
},
    itemStyle: {
    emphasis: {
    shadowBlur: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
}
},
    rectangular: false, // 将模块变成正方形
    width: '1', // 正方形的宽度
    height: '2' // 正方形的高度
}]
};


    var heatmapChart = echarts.init(document.getElementById('heatmapChart'));
    heatmapChart.setOption(option);
}
