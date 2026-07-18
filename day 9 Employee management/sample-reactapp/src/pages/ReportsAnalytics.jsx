import { PieChart as PieChartIcon, BarChart3, TrendingUp, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const recruitmentData = [
  { month: 'Jan', hired: 4, rejected: 12 },
  { month: 'Feb', hired: 6, rejected: 18 },
  { month: 'Mar', hired: 3, rejected: 8 },
  { month: 'Apr', hired: 8, rejected: 20 },
  { month: 'May', hired: 5, rejected: 15 },
  { month: 'Jun', hired: 7, rejected: 22 },
];

const attrData = [
  { name: 'Engineering', value: 45 },
  { name: 'Sales', value: 30 },
  { name: 'Marketing', value: 22 },
  { name: 'HR', value: 15 },
];
const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

export default function ReportsAnalytics() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Reports & Analytics</h1>
          <p>Gain insights into HR metrics and workforce trends.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn secondary">
            <Filter size={16} /> Filter
          </button>
          <button className="btn">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="metrics-grid section-gap">
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <TrendingUp size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">4.2%</div>
            <div className="metric-label">Turnover Rate</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <PieChartIcon size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">33</div>
            <div className="metric-label">New Hires (YTD)</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <BarChart3 size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">18 Days</div>
            <div className="metric-label">Time to Hire</div>
          </div>
        </div>
      </div>

      <div className="grid-7-5 section-gap">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recruitment Pipeline</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recruitmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '13px' }}
                cursor={{ fill: 'var(--bg-secondary)' }}
              />
              <Bar dataKey="hired" name="Hired" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="rejected" name="Rejected" fill="var(--text-placeholder)" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-legend" style={{ marginTop: '20px' }}>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--primary)' }} />Hired</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--text-placeholder)' }} />Rejected</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Headcount by Dept</div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={attrData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {attrData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip formatter={(val, name) => [val, name]} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
            {attrData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '3px', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{d.name}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
