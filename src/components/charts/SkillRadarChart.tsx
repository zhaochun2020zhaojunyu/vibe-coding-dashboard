import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const skillData = {
  dimensions: ['编码', '调试', '设计', '协作', '学习', '创意'],
  current: [85, 72, 68, 75, 90, 78],
  previous: [70, 65, 55, 60, 80, 65],
};

export default function SkillRadarChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // Initial animation - expand from center
    const option: echarts.EChartsOption = {
      radar: {
        indicator: skillData.dimensions.map((dim) => ({
          name: dim,
          max: 100,
        })),
        center: ['50%', '50%'],
        radius: '65%',
        axisName: {
          color: '#1A1A1A',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'Space Grotesk',
        },
        axisLine: {
          lineStyle: {
            color: '#E0E0E0',
            width: 1,
          },
        },
        splitLine: {
          lineStyle: {
            color: '#E0E0E0',
            width: 1,
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#F5F5F5', '#FFFFFF'],
          },
        },
      },
      tooltip: {
        trigger: 'item',
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
          const data = params.value;
          const dim = skillData.dimensions;
          let html = `<div style="font-weight:600;margin-bottom:8px">${params.name}</div>`;
          data.forEach((val: number, idx: number) => {
            const color = params.name === '当前水平' ? '#FF0066' : '#999999';
            html += `<div style="margin:4px 0">${dim[idx]}: <span style="color:${color};font-weight:700">${val}</span></div>`;
          });
          return html;
        },
        extraCssText: 'box-shadow: 4px 4px 0px rgba(0,0,0,0.3); border-radius: 0;',
      },
      legend: {
        data: ['当前水平', '上月对比'],
        bottom: 0,
        itemGap: 20,
        textStyle: {
          color: '#1A1A1A',
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'Space Grotesk',
        },
        icon: 'roundRect',
        itemWidth: 16,
        itemHeight: 16,
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: skillData.current,
              name: '当前水平',
              symbol: 'circle',
              symbolSize: 6,
              lineStyle: {
                color: '#FF0066',
                width: 2,
              },
              itemStyle: {
                color: '#FF0066',
                borderColor: '#FFFFFF',
                borderWidth: 2,
              },
              areaStyle: {
                color: 'rgba(255, 0, 102, 0.3)',
              },
            },
            {
              value: skillData.previous,
              name: '上月对比',
              symbol: 'circle',
              symbolSize: 4,
              lineStyle: {
                color: '#999999',
                width: 2,
                type: 'dashed',
              },
              itemStyle: {
                color: '#999999',
              },
              areaStyle: {
                color: 'rgba(153, 153, 153, 0.1)',
              },
            },
          ],
          animationDuration: 800,
          animationEasing: 'cubicOut',
        },
      ],
    };

    chartInstance.current.setOption(option);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  return (
    <div className="nb-chart-container animate-pop delay-300" style={{ height: '100%' }}>
      <div className="nb-chart-header">
        <h3 className="nb-chart-title">技能成长</h3>
      </div>
      <div ref={chartRef} style={{ height: '340px' }} />
    </div>
  );
}
