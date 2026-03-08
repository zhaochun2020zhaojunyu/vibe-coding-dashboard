import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface DataPoint {
  date: string;
  hours: number;
}

interface TimeData {
  '7d': DataPoint[];
  '30d': DataPoint[];
  '90d': DataPoint[];
}

const mockData: TimeData = {
  '7d': [
    { date: '03/03', hours: 2.5 },
    { date: '03/04', hours: 4.0 },
    { date: '03/05', hours: 3.5 },
    { date: '03/06', hours: 5.0 },
    { date: '03/07', hours: 2.0 },
    { date: '03/08', hours: 6.5 },
    { date: '03/09', hours: 4.5 },
  ],
  '30d': [
    { date: '02/09', hours: 3.0 },
    { date: '02/12', hours: 4.5 },
    { date: '02/15', hours: 2.5 },
    { date: '02/18', hours: 5.0 },
    { date: '02/21', hours: 3.5 },
    { date: '02/24', hours: 4.0 },
    { date: '02/27', hours: 6.0 },
    { date: '03/02', hours: 3.5 },
    { date: '03/05', hours: 4.5 },
    { date: '03/09', hours: 5.5 },
  ],
  '90d': [
    { date: '12/10', hours: 2.0 },
    { date: '12/25', hours: 3.5 },
    { date: '01/10', hours: 4.0 },
    { date: '01/25', hours: 5.5 },
    { date: '02/10', hours: 4.5 },
    { date: '02/25', hours: 6.0 },
    { date: '03/09', hours: 5.0 },
  ],
};

export default function TimeTrendChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;

    const data = mockData[period];
    const xData = data.map(item => item.date);
    const yData = data.map(item => item.hours);

    const option: echarts.EChartsOption = {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: xData,
        axisLine: {
          lineStyle: {
            color: '#1A1A1A',
            width: 2,
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#1A1A1A',
            width: 2,
          },
        },
        axisLabel: {
          color: '#333333',
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'Space Grotesk',
        },
      },
      yAxis: {
        type: 'value',
        name: '小时',
        nameTextStyle: {
          color: '#1A1A1A',
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'Space Grotesk',
          padding: [0, 0, 0, -30],
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#1A1A1A',
            width: 2,
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#1A1A1A',
            width: 2,
          },
        },
        axisLabel: {
          color: '#333333',
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'Space Grotesk',
        },
        splitLine: {
          lineStyle: {
            color: '#E0E0E0',
            type: 'dashed',
            width: 1,
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1A1A1A',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        padding: [12, 16],
        textStyle: {
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Space Grotesk',
        },
        formatter: (params: any) => {
          const p = params[0];
          return `<div style="font-weight:600">${p.name}</div>
                  <div style="margin-top:4px">学习时长: <span style="color:#0066FF;font-weight:700">${p.value} 小时</span></div>`;
        },
        extraCssText: 'box-shadow: 4px 4px 0px rgba(0,0,0,0.3); border-radius: 0;',
      },
      series: [
        {
          type: 'line',
          data: yData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: '#0066FF',
            width: 4,
          },
          itemStyle: {
            color: '#0066FF',
            borderColor: '#FFFFFF',
            borderWidth: 2,
          },
          emphasis: {
            scale: 1.5,
            itemStyle: {
              borderWidth: 3,
            },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 102, 255, 0.4)' },
              { offset: 1, color: 'rgba(0, 102, 255, 0)' },
            ]),
          },
          animationDuration: 500,
          animationEasing: 'cubicOut',
        },
      ],
    };

    chartInstance.current.setOption(option, true);
  }, [period]);

  return (
    <div className="nb-chart-container animate-pop delay-200">
      <div className="nb-chart-header">
        <h3 className="nb-chart-title">学习时间趋势</h3>
        <div className="nb-toggle-group" role="tablist" aria-label="时间周期切换">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              className={`nb-toggle-item ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
              role="tab"
              aria-selected={period === p}
              aria-label={`切换到${p === '7d' ? '7天' : p === '30d' ? '30天' : '90天'}数据`}
            >
              {p === '7d' ? '7天' : p === '30d' ? '30天' : '90天'}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartRef} style={{ height: '320px' }} />
    </div>
  );
}
