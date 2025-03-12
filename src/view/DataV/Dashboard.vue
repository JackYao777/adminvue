<template>
    <div class="data-box">
        <div class="dataMM">
            <div class="data-header">
                <h1>个人大屏数据展示</h1>
            </div>
            <div class="data-content">
                <div class="box1">
                    <dv-border-box-1>
                        <h2>环状图</h2>
                        <dv-active-ring-chart :config="config" style="height:100%; text-align: center;" />
                    </dv-border-box-1>
                </div>
                <div class="box2"><dv-border-box-2><ve-line :data="chartData" :extend='chartExtend'
                            style="min-width: 300px; height: 100%;"></ve-line></dv-border-box-2>
                </div>
                <div class="box3"><dv-border-box-3><ve-bar :data="chartData" :extend='chartExtend'
                            style="min-width: 300px; height: 100%;"></ve-bar></dv-border-box-3>
                </div>
                <div class="box4"><dv-border-box-4><ve-candle :data="chartData" :extend='chartExtend'
                            style="min-width: 300px; height: 100%;"></ve-candle></dv-border-box-4>
                </div>
                <!-- <div class="box5"><dv-border-box-5><ve-radar :data="chartData" height="100%"></ve-radar></dv-border-box-5></div> -->
                <div class="box5"><dv-border-box-6><ve-map :data="chartData" :extend='chartExtend'
                            style="min-width: 400px; height: 100%;"></ve-map></dv-border-box-6>
                </div>
                <!-- <div class="box7"><dv-border-box-7><ve-heatmap :data="chartData" height="100%"></ve-heatmap></dv-border-box-7></div>
            <div class="box8"><dv-border-box-8><ve-gauge :data="chartData" height="100%"></ve-gauge></dv-border-box-8></div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dashboard',
    data() {
        this.chartExtend = {
        'xAxis.0.axisLabel.color': 'white', //x轴文本颜色
        'yAxis.0.axisLabel.color': 'white', //y轴文本改变颜色
        legend: {
          textStyle: {
            color: 'white',
          }
        }
      };
        return {
            config: {
                data: [
                    {
                        name: '深圳',
                        value: 55
                    },
                    {
                        name: '上海',
                        value: 120
                    },
                    {
                        name: '武汉',
                        value: 78
                    },
                    {
                        name: '北京',
                        value: 66
                    },
                    {
                        name: '杭州',
                        value: 80
                    }
                ],
                lineWidth: 10
            },
            chartData: {
                columns: ['日期', '访问用户', '下单用户'],
                rows: [
                    { '日期': '2024-05-22', '访问用户': 32371, '下单用户': 19810 },
                    { '日期': '2024-05-23', '访问用户': 12328, '下单用户': 4398 },
                    { '日期': '2024-05-24', '访问用户': 92381, '下单用户': 52910 },
                    { '日期': '2024-05-25', '访问用户': 92381, '下单用户': 52910 },
                    { '日期': '2024-05-26', '访问用户': 92381, '下单用户': 52910 }
                ]
            }
        }
    }
}
</script>
<style lang="less" scoped>
.data-box {
    width: 100%;
    margin: 0;
    padding: 0;
    max-height: 760px;
    // height: 100%;
    // border: 1px solid orange;
    // background-size: cover;
    display: flex;

    .dataMM {
        height: 100%;
        flex: 1;
        background-image: url('../../assets/bbimgg.png');
        background-size: cover;
    }

    .data-header {
        flex: none;
    }

    .data-header h1 {
        height: 50px;
        text-align: center;
        line-height: 50px;
        text-shadow: 2px 2px 5px green, 0 0 10px red;
        font-style: italic;
        font-size: 25px;
        color: rgb(66, 129, 247);
    }

    h2 {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        font-size: 20px;
    }

    .data-content {
        // height: 600px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 10px;

        .box5 {
            grid-column: span 2;
        }
    }
}
</style>