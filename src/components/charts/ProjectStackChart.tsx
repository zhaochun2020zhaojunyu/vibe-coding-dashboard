import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const projectData = {
  categories: ['Web应用', '工具脚本', '数据可视化', '移动端', '其他'],
  planning: [2, 3, 1, 2, 1],
  inProgress: [3, 2, 2, 1, 1],
  completed: [4, 5, 3, 2, 2],
};

export default function ProjectStackChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    const option: echarts.EChartsOption = {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '12%',
        top: '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: projectData.categories,
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
          color: '#1A1A1A',
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'Space Grotesk',
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        name: '项目数',
        nameTextStyle: {
          color: '#1A1A1A',
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'Space Grotesk',
          padding: [0, 0, 0, -20],
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
        axisPointer: {
          type: 'shadow',
        },
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
          let html = `<div style="font-weight:600;margin-bottom:8px">${params[0].name}</div>`;
          params.forEach((p: any) => {
            const color = p.color;
            html += `<div style="margin:4px 0;display:flex;align-items:center;gap:8px">
              <span style="display:inline-block;width:12px;height:12px;background:${color};border:2px solid #fff"></span>
              ${p.seriesName}: <span style="font-weight:700">${p.value}</span>
            </div>`;
          });
          const total = params.reduce((sum: number, p: any) => sum + p.value, 0);
          html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #444;font-weight:600">总计: ${total}</div>`;
          return html;
        },
        extraCssText: 'box-shadow: 4px 4px 0px rgba(0,0,0,0.3); border-radius: 0;',
      },
      legend: {
        data: ['规划中', '进行中', '已完成'],
        bottom: 0,
        itemGap: 24,
        textStyle: {
          color: '#1A1A1A',
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'Space Grotesk',
        },
        icon: 'rect',
        itemWidth: 16,
        itemHeight: 16,
      },
      series: [
        {
          name: '规划中',
          type: 'bar',
          stack: 'total',
          data: projectData.planning,
          barWidth: '60%',
          itemStyle: {
            color: '#999999',
            borderColor: '#1A1A1A',
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
            },
          },
          animationDelay: 0,
        },
        {
          name: '进行中',
          type: 'bar',
          stack: 'total',
          data: projectData.inProgress,
          itemStyle: {
            color: '#0066FF',
            borderColor: '#1A1A1A',
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
            },
          },
          animationDelay: 200,
        },
        {
          name: '已完成',
          type: 'bar',
          stack: 'total',
          data: projectData.completed,
          itemStyle: {
            color: '#FF0066',
            borderColor: '#1A1A1A',
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
            },
          },
          animationDelay: 400,
        },
      ],
      animationDuration: 600,
      animationEasing: 'cubicOut',
    };

    chartInstance.current.setOption(option);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  return (
    <div className="nb-chart-container animate-pop delay-400" style={{ height: '100%' }}>
      <div className="nb-chart-header">
        <h3 className="nb-chart-title">作品迭代进度</h3>
      </div>
      <div ref={chartRef} style={{ height: '340px' }} />
    </div>
  );
}
