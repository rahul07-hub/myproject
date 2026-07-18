import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Users, Building2, UserCheck,
  TrendingUp, TrendingDown, Plus, FileText,
  UserPlus, Banknote, BarChart4, Clock,
  ArrowRight, CheckCircle2,
  Star, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const growthData = [
  { month: 'Jan', employees: 142, hired: 4 },
  { month: 'Feb', employees: 148, hired: 6 },
  { month: 'Mar', employees: 151, hired: 3 },
  { month: 'Apr', employees: 159, hired: 8 },
  { month: 'May', employees: 164, hired: 5 },
  { month: 'Jun', employees: 171, hired: 7 },
  { month: 'Jul', employees: 175, hired: 4 },
];

const attendanceData = [
  { day: 'Mon', present: 162, absent: 13 },
  { day: 'Tue', present: 168, absent: 7 },
  { day: 'Wed', present: 155, absent: 20 },
  { day: 'Thu', present: 171, absent: 4 },
  { day: 'Fri', present: 158, absent: 17 },
];

const DEPT_COLORS = ['#2563EB', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

const activityFeed = [
  { id: 1, icon: UserPlus, color: '#2563EB', bg: '#EFF6FF', title: 'New employee added', desc: 'Rahul joined Engineering', time: '5m ago' },
  { id: 2, icon: CheckCircle2, color: '#10B981', bg: '#ECFDF5', title: 'Leave approved', desc: 'Suriya — Annual Leave', time: '1h ago' },
  { id: 3, icon: Banknote, color: '#F59E0B', bg: '#FFFBEB', title: 'Payroll generated', desc: 'July 2026 payroll processed', time: '3h ago' },
  { id: 4, icon: Building2, color: '#8B5CF6', bg: '#F5F3FF', title: 'Department created', desc: 'Operations team added', time: 'Yesterday' },
  { id: 5, icon: Star, color: '#EC4899', bg: '#FDF2F8', title: 'Performance review', desc: 'Q3 reviews completed', time: '2d ago' },
];

const upcomingEvents = [
  { title: 'Team Standup', time: '10:00 AM', color: '#2563EB' },
  { title: 'Performance Review — Q3', time: '2:00 PM', color: '#F59E0B' },
  { title: 'New Hire Orientation', time: '4:00 PM', color: '#10B981' },
  { title: 'Budget Planning Meeting', time: 'Tomorrow', color: '#8B5CF6' },
];

const quickActions = [
  { to: '/add-employee', icon: UserPlus, label: 'Add Employee', bg: '#EFF6FF', color: '#2563EB' },
  { to: '/departments', icon: Building2, label: 'Departments', bg: '#F5F3FF', color: '#8B5CF6' },
  { to: '/payroll', icon: Banknote, label: 'Payroll', bg: '#ECFDF5', color: '#10B981' },
  { to: '/reports', icon: BarChart4, label: 'Reports', bg: '#FFFBEB', color: '#F59E0B' },
  { to: '/attendance', icon: Clock, label: 'Attendance', bg: '#FDF2F8', color: '#EC4899' },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="value" style={{ color: entry.color }}>{entry.name}: {entry.value}</p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Dashboard({ employees, onOpenModal }) {
  const { user } = useAuth();
  const displayName = user?.name ? user.name.split(' ')[0] : 'Admin';
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const totalDepartments = new Set(employees.map(e => e.department)).size;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;

  const totalSalary = employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
  const monthlySalary = Math.round(totalSalary / 12);
  const monthlySalaryFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(monthlySalary);

  const sparklineBlue = [20, 35, 28, 50, 42, 68, 75];
  const sparklineGreen = [10, 18, 22, 20, 30, 28, 35];
  const sparklineOrange = [60, 55, 70, 65, 72, 68, 80];
  const sparklineRed = [5, 8, 4, 10, 7, 12, 8];

  const statCards = [
    {
      label: 'Total Employees', value: totalEmployees,
      icon: Users, iconBg: '#EFF6FF', iconColor: '#2563EB',
      trend: '+12%', trendDir: 'up', trendLabel: 'this month',
      sparkline: sparklineBlue, sparkColor: '#2563EB',
    },
    {
      label: 'Departments', value: totalDepartments,
      icon: Building2, iconBg: '#F5F3FF', iconColor: '#8B5CF6',
      trend: 'All active', trendDir: 'neutral', trendLabel: '',
      sparkline: sparklineGreen, sparkColor: '#8B5CF6',
    },
    {
      label: 'Active Employees', value: activeEmployees,
      icon: UserCheck, iconBg: '#ECFDF5', iconColor: '#10B981',
      trend: totalEmployees > 0 ? `${Math.round((activeEmployees / totalEmployees) * 100)}%` : '0%', trendDir: 'up', trendLabel: 'active rate',
      sparkline: sparklineOrange, sparkColor: '#10B981',
    },
    {
      label: 'Monthly Salary', value: monthlySalaryFormatted,
      icon: Banknote, iconBg: '#FEF2F2', iconColor: '#EF4444',
      trend: 'Payouts', trendDir: 'neutral', trendLabel: 'monthly average',
      sparkline: sparklineRed, sparkColor: '#EF4444',
    },
  ];

  const deptData = Array.from(new Set(employees.map(e => e.department))).map(dept => ({
    name: dept,
    value: employees.filter(e => e.department === dept).length,
  }));

  return (
    <div className="page-content">
      {/* ── Hero Banner ─────────────────────────── */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Hi {displayName} 👋</h2>
            <p>Welcome back. Here's today's HR overview.</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-dot" style={{ background: '#60A5FA' }} />
                <span className="hero-stat-value">{totalEmployees}</span>
                <span className="hero-stat-label">Employees</span>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-dot" style={{ background: '#A78BFA' }} />
                <span className="hero-stat-value">{totalDepartments}</span>
                <span className="hero-stat-label">Departments</span>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-dot" style={{ background: '#34D399' }} />
                <span className="hero-stat-value">{activeEmployees}</span>
                <span className="hero-stat-label">Active</span>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-dot" style={{ background: '#F87171' }} />
                <span className="hero-stat-value">{onLeave}</span>
                <span className="hero-stat-label">On Leave</span>
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn" onClick={() => onOpenModal && onOpenModal()}>
              <Plus size={15} /> Add Employee
            </button>
            <Link to="/reports" className="btn secondary" style={{ color: '#94A3B8', borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)' }}>
              <FileText size={15} /> Generate Report
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ────────────────────────── */}
      <div className="quick-actions-grid section-gap">
        {quickActions.map(qa => (
          <Link key={qa.to} to={qa.to} className="quick-action-card">
            <div className="quick-action-icon" style={{ background: qa.bg, color: qa.color }}>
              <qa.icon size={22} />
            </div>
            <span className="quick-action-label">{qa.label}</span>
          </Link>
        ))}
      </div>

      {/* ── Stat Cards ───────────────────────────── */}
      <div className="metrics-grid section-gap">
        {statCards.map((card, i) => (
          <div key={i} className="card metric-card">
            <div className="metric-card-top">
              <div className="metric-icon" style={{ background: card.iconBg, color: card.iconColor }}>
                <card.icon size={22} />
              </div>
              <div className="metric-sparkline">
                {card.sparkline.map((h, j) => (
                  <div
                    key={j}
                    className="sparkline-bar"
                    style={{
                      height: `${h}%`,
                      background: j === card.sparkline.length - 1 ? card.sparkColor : `${card.sparkColor}55`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="metric-value">{card.value}</div>
              <div className="metric-label">{card.label}</div>
              <div className={`metric-trend ${card.trendDir}`}>
                {card.trendDir === 'up' && <TrendingUp size={11} />}
                {card.trendDir === 'down' && <TrendingDown size={11} />}
                {card.trend} {card.trendLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ───────────────────────────── */}
      <div className="grid-7-5 section-gap">
        {/* Employee Growth Area Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Employee Growth</div>
              <div className="card-subtitle">Headcount trend over time</div>
            </div>
            <select className="filter-select" style={{ fontSize: '0.78rem', height: '30px' }}>
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={growthData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="empGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="employees" name="Employees" stroke="#2563EB" strokeWidth={2.5} fill="url(#empGrad)" dot={{ r: 3, fill: '#2563EB', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Bar Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Attendance Trend</div>
              <div className="card-subtitle">This week's overview</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="present" name="Present" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <div className="legend-item"><div className="legend-dot" style={{ background: '#10B981' }} />Present</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: '#EF4444' }} />Absent</div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ───────────────────────────── */}
      <div className="grid-3 section-gap" style={{ alignItems: 'stretch' }}>
        {/* Department Distribution Pie */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Department Split</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={deptData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={78}
                paddingAngle={3}
                dataKey="value"
              >
                {deptData.map((_, i) => (
                  <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip formatter={(val, name) => [val, name]} contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {deptData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: DEPT_COLORS[i % DEPT_COLORS.length], flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{d.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Activity</div>
          </div>
          <div className="activity-list">
            {activityFeed.map(item => (
              <div key={item.id} className="activity-item">
                <div className="activity-icon" style={{ background: item.bg, color: item.color }}>
                  <item.icon size={14} />
                </div>
                <div className="activity-body">
                  <div className="activity-title">{item.title}</div>
                  <div className="activity-desc">{item.desc}</div>
                </div>
                <div className="activity-time">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Upcoming Events</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {upcomingEvents.map((ev, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 0', borderBottom: i < upcomingEvents.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <div style={{ width: 4, height: 36, borderRadius: 2, background: ev.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.845rem', fontWeight: 600, color: 'var(--text-primary)' }}>{ev.title}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 2 }}>{ev.time}</div>
                </div>
                <ChevronRight size={14} color="var(--text-light)" />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Quick Stats</div>
            {[
              { label: 'Avg. Attendance', value: '94.2%', color: 'var(--success)' },
              { label: 'Open Positions', value: '8', color: 'var(--text-primary)' },
              { label: 'Pending Leaves', value: '5', color: 'var(--warning)' },
              { label: 'New Joinings', value: '3', color: 'var(--primary)' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ fontSize: '0.845rem', fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Employees Table ────────────────── */}
      <div className="card" style={{ marginTop: '4px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">Recent Employees</div>
            <div className="card-subtitle">Latest additions to the team</div>
          </div>
          <Link to="/employees" className="btn secondary sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(-5).reverse().map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div className="employee-profile">
                      {emp.profileImage ? (
                        <img 
                          src={emp.profileImage} 
                          alt={emp.name} 
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div className="avatar">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                      )}
                      <div>
                        <div className="employee-name">{emp.name}</div>
                        <div className="employee-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.845rem' }}>{emp.department}</td>
                  <td style={{ fontSize: '0.845rem', color: 'var(--text-secondary)' }}>{emp.role || emp.designation}</td>
                  <td>
                    <span className={`status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
