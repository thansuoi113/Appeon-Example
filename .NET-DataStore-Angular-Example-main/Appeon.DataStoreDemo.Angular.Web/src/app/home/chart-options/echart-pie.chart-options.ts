import { EChartsOption } from 'echarts';

export class EChartPieOptionsGenerator {
  public static generateWithData(labels: string[], data: any): EChartsOption {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'plain',
        left: 'center',
        bottom: 'bottom',
        data: labels,
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: 'Save',
          },
        },
      },
      calculable: true,
      series: [
        {
          name: 'Sales Quantity and Percent for 2013',
          type: 'pie',
          radius: '55%',
          center: ['50%', '48%'],
          data: data,
          color:['#fac858','#5470c6','#ee6666','#91cc75'],
        },
      ],
    };
  }
}

export const EChartPieOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    type: 'plain',
    left: 'left',
    bottom: 'bottom',
    data: [
      'Direct Access',
      'E-mail Marketing',
      'Union Ad',
      'Video Ads',
      'Search Engine',
    ],
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true,
        title: 'Save',
      },
    },
  },
  calculable: true,
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '48%'],
      data: [
        {
          value: 335,
          name: 'Direct Access',
        },
        {
          value: 310,
          name: 'E-mail Marketing',
        },
        {
          value: 234,
          name: 'Union Ad',
        },
        {
          value: 135,
          name: 'Video Ads',
        },
        {
          value: 1548,
          name: 'Search Engine',
        },
      ],
    },
  ],
};
