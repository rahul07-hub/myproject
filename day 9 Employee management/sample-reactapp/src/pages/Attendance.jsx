import { useState } from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { id: 1, name: 'Rahul', dept: 'Engineering', checkIn: '09:02 AM', checkOut: '06:15 PM', status: 'Present', hours: '9h 13m' },
  { id: 2, name: 'Ajith', dept: 'Marketing', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'Present', hours: '9h 15m' },
  { id: 3, name: 'Suriya', dept: 'Engineering', checkIn: '—', checkOut: '—', status: 'On Leave', hours: '—' },
  { id: 4, name: 'Vijay', dept: 'Human Resources', checkIn: '09:45 AM', checkOut: '06:00 PM', status: 'Late', hours: '8h 15m' },
  { id: 5, name: 'Dhanush', dept: 'Sales', checkIn: '08:55 AM', checkOut: '05:50 PM', status: 'Present', hours: '8h 55m' },
  { id: 6, name: 'Vkram', dept: 'Legal', checkIn: '09:00 AM', checkOut: '06:10 PM', status: 'Present', hours: '9h 10m' },
  { id: 7, name: 'Surutti', dept: 'Finance', checkIn: '—', checkOut: '—', status: 'Absent', hours: '—' },
  { id: 8, name: 'Vengi', dept: 'Design', checkIn: '09:30 AM', checkOut: '—', status: 'Late', hours: 'In progress' },
];

const weeklyStats = [
  { name: 'Mon', Present: 145, Late: 12, Absent: 5, Leave: 13 },
  { name: 'Tue', Present: 150, Late: 8, Absent: 3, Leave: 14 },
  { name: 'Wed', Present: 142, Late: 15, Absent: 6, Leave: 12 },
  { name: 'Thu', Present: 148, Late: 9, Absent: 4, Leave: 14 },
  { name: 'Fri', Present: 135, Late: 18, Absent: 8, Leave: 14 },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const present = attendanceData.filter(a => a.status === 'Present').length;
  const late = attendanceData.filter(a => a.status === 'Late').length;
  const absent = attendanceData.filter(a => a.status === 'Absent').length;
  const onLeave = attendanceData.filter(a => a.status === 'On Leave').length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Attendance Log</h1>
          <p>Track daily check-ins, check-outs, and working hours.</p>
        </div>
        <div className="page-header-actions" style={{ display: 'flex', gap: '12px' }}>
          <div className="search-bar" style={{ minWidth: 'unset', width: '160px', background: 'var(--surface)' }}>
            <Calendar size={16} className="text-muted" />
            <input 
              type="date" 
              value={selectedDate} 
              onChange={e => setSelectedDate(e.target.value)}
              style={{ fontSize: '0.8rem', padding: 0 }}
            />
          </div>
          <button className="btn secondary sm">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="metrics-grid section-gap">
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{present}</div>
            <div className="metric-label">On Time / Present</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <AlertCircle size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{late}</div>
            <div className="metric-label">Late Arrivals</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
              <XCircle size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{absent}</div>
            <div className="metric-label">Absent</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
              <Clock size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{onLeave}</div>
            <div className="metric-label">On Leave</div>
          </div>
        </div>
      </div>

      <div className="grid-7-5 section-gap">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Daily Log: {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div className="employee-profile">
                        <div className="avatar sm">{a.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <div className="employee-name">{a.name}</div>
                          <div className="employee-email">{a.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{a.checkIn}</td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{a.checkOut}</td>
                    <td>{a.hours}</td>
                    <td>
                      <span className={`status-badge ${a.status.toLowerCase().replace(' ', '-')}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Weekly Overview</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '13px' }}
                cursor={{ fill: 'var(--bg-secondary)' }}
              />
              <Bar dataKey="Present" stackId="a" fill="var(--success)" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Late" stackId="a" fill="var(--warning)" />
              <Bar dataKey="Leave" stackId="a" fill="var(--text-placeholder)" />
              <Bar dataKey="Absent" stackId="a" fill="var(--danger)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-legend" style={{ marginTop: '20px' }}>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--success)' }} />On Time</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--warning)' }} />Late</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--danger)' }} />Absent</div>
          </div>
        </div>
      </div>
    </div>
  );
}
