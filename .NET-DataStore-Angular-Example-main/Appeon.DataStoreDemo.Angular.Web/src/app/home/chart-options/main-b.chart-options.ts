import { BarReport } from './../../models/barReport';
import { EChartsOption } from 'echarts';

export class MainBOptionsGenerator {
  public static generateWithData(data: BarReport): EChartsOption {
    return {
      title: {
        text: 'Sales Quantity Per Month',
        subtext: 'for 2013',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: data.productCategory,
      },
      toolbox: {
        show: !0,
        feature: {
          saveAsImage: {
            show: !0,
            title: 'Save',
          },
        },
      },
      calculable: !1,
      xAxis: [
        {
          type: 'category',
          data: data.saleMonth,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: data.productCategoryQty,
    };
  }
}

export const MainBOptions: EChartsOption = {
  title: {
    text: 'Sales Quantity Per Month',
    subtext: 'for 2013',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['sales', 'purchases'],
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
  calculable: false,
  xAxis: [
    {
      type: 'category',
      data: [
        '1?',
        '2?',
        '3?',
        '4?',
        '5?',
        '6?',
        '7?',
        '8?',
        '9?',
        '10?',
        '11?',
        '12?',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: [
        2.0,
        4.9,
        7.0,
        23.2,
        25.6,
        76.7,
        135.6,
        162.2,
        32.6,
        20.0,
        6.4,
        3.3,
      ],
      markPoint: {
        data: [
          {
            type: 'max',
            name: '???',
          },
          {
            type: 'min',
            name: '???',
          },
        ],
      },
      markLine: {
        data: [
          {
            type: 'average',
            name: '???',
            symbolOffset: 0,
          },
        ],
      },
    },
    {
      name: 'purchases',
      type: 'bar',
      data: [
        2.6,
        5.9,
        9.0,
        26.4,
        28.7,
        70.7,
        175.6,
        182.2,
        48.7,
        18.8,
        6.0,
        2.3,
      ],
      markPoint: {
        data: [
          {
            name: 'sales',
            value: 182.2,
            xAxis: 7,
            yAxis: 183,
          },
          {
            name: 'purchases',
            value: 2.3,
            xAxis: 11,
            yAxis: 3,
          },
        ],
      },
      markLine: {
        data: [
          {
            type: 'average',
            name: '???',
            symbolOffset: 0,
          },
        ],
      },
    },
  ],
};
