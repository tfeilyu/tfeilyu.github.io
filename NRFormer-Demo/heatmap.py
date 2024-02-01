import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import calendar

# 假设我们有一个月的数据，这里以2023年1月为例
# 输入数据格式是一个列表，其中包括日期和对应的数值
# 例如: [("2023-01-01", value1), ("2023-01-02", value2), ..., ("2023-01-31", value3)]
data = {
    "2023-01-01": 1,
    "2023-01-02": 2,
    "2023-01-03": 2,
    "2023-01-04": 2,
    "2023-01-05": 2,
    "2023-01-06": 2,
    "2023-01-07": 2,
    "2023-01-08": 2,
    "2023-01-09": 2,
    "2023-01-10": 2,
    "2023-01-11": 2,
    "2023-01-12": 2,
    "2023-01-13": 2,
    "2023-01-14": 2,
    "2023-01-15": 2,
    "2023-01-16": 2,
    "2023-01-17": 2,
    "2023-01-18": 2,
    "2023-01-19": 2,
    "2023-01-20": 2,
    "2023-01-21": 2,
    "2023-01-22": 2,
    "2023-01-23": 2,
    "2023-01-24": 2,
    "2023-01-25": 2,
    "2023-01-26": 2,
    "2023-01-27": 2,
    "2023-01-28": 2,
    "2023-01-29": 2,
    "2023-01-30": 2,
    "2023-01-31": 3
}

# 将数据转换为Pandas DataFrame
dates = pd.to_datetime(list(data.keys()))
values = list(data.values())
df = pd.DataFrame({'Date': dates, 'Value': values})

# 添加年、月、日和星期几的列
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month
df['Day'] = df['Date'].dt.day
df['Weekday'] = df['Date'].dt.weekday

# 获取该月的第一天是星期几以及这个月有多少天
year, month = 2023, 1
first_weekday, total_days = calendar.monthrange(year, month)

# 创建一个空的矩阵用于热力图（6周 x 7天）
calendar_matrix = np.nan * np.zeros((6, 7))

# 填充矩阵
for index, row in df.iterrows():
    week_of_month = (first_weekday + row['Day'] - 1) // 7
    calendar_matrix[week_of_month, row['Weekday']] = row['Value']

# 绘制热力图
plt.figure(figsize=(10, 6))
sns.heatmap(calendar_matrix, annot=True, fmt=".0f", cmap="YlGnBu", linewidths=0.5,
            cbar=False, square=True)

# 设置x轴和y轴的标签
plt.xticks(np.arange(7), calendar.day_abbr[:7], rotation=0)
plt.yticks(np.arange(6), ['Week {}'.format(i) for i in range(1, 7)], rotation=0)

# 添加标题
plt.title(f'Heatmap Calendar for {calendar.month_name[month]} {year}')

# 显示图表
plt.show()
