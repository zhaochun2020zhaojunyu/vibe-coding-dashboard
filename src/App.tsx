import { useEffect, useState } from 'react';
import './App.css';
import TimeTrendChart from './components/charts/TimeTrendChart';
import SkillRadarChart from './components/charts/SkillRadarChart';
import ProjectStackChart from './components/charts/ProjectStackChart';
import StatCard from './components/StatCard';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFE500]">
      {/* Header */}
      <header className="nb-header">
        <div className="max-w-7xl mx-auto">
          <h1
            className={`nb-title transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Vibe Coding 仪表板
          </h1>
          <p
            className={`nb-subtitle transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            追踪学习进度 · 可视化技能成长 · 记录作品迭代
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard value={127.5} suffix="h" label="总学习时长" delay={100} />
          <StatCard value={12} suffix="个" label="完成项目" delay={200} />
          <StatCard value={23} suffix="天" label="连续打卡" delay={300} />
        </section>

        {/* Time Trend Chart - Full Width */}
        <section className="mb-10">
          <TimeTrendChart />
        </section>

        {/* Charts Grid - Radar + Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Skill Radar - 1/3 */}
          <div className="lg:col-span-1">
            <SkillRadarChart />
          </div>

          {/* Project Stack - 2/3 */}
          <div className="lg:col-span-2">
            <ProjectStackChart />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="nb-card animate-pop delay-500">
          <h3 className="text-xl font-bold mb-4">快速操作</h3>
          <div className="flex flex-wrap gap-4">
            <button className="nb-button" aria-label="记录今日学习">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              记录今日学习
            </button>
            <button className="nb-button" style={{ backgroundColor: '#FF0066' }} aria-label="添加新项目">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              添加新项目
            </button>
            <button className="nb-button" style={{ backgroundColor: '#6600FF' }} aria-label="导出数据">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              导出数据
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="nb-footer mt-12">
        <p className="text-sm font-medium">
          Built with Vibe · 数据可视化仪表板 MVP
        </p>
        <p className="text-xs mt-2 opacity-60">
          Neo-brutalism Style · React + ECharts + Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
