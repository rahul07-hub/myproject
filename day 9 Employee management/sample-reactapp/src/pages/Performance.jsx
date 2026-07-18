import { Star, Target, TrendingUp, Award, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const performanceData = [
  { id: 1, name: 'Rahul', dept: 'Engineering', score: 92, rating: 5, goals: '4/4', trend: 'up' },
  { id: 2, name: 'Ajith', dept: 'Marketing', score: 85, rating: 4, goals: '3/4', trend: 'up' },
  { id: 3, name: 'Suriya', dept: 'Engineering', score: 95, rating: 5, goals: '5/5', trend: 'stable' },
  { id: 4, name: 'Vijay', dept: 'Human Resources', score: 78, rating: 4, goals: '3/5', trend: 'down' },
  { id: 5, name: 'Dhanush', dept: 'Sales', score: 65, rating: 3, goals: '2/5', trend: 'down' },
];

export default function Performance() {
  const getProgressColor = (score) => {
    if (score >= 90) return 'blue';
    if (score >= 75) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Performance Review</h1>
          <p>Track employee KPIs, goals, and quarterly ratings.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn">
            <Target size={16} /> Start Review Cycle
          </button>
        </div>
      </div>

      <div className="metrics-grid section-gap">
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Star size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">4.2</div>
            <div className="metric-label">Avg. Company Rating</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <Award size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">12</div>
            <div className="metric-label">Top Performers (&gt;90)</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <Target size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">84%</div>
            <div className="metric-label">Goals Completed</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}>
              <TrendingUp size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">+5%</div>
            <div className="metric-label">QoQ Improvement</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Employee Reviews</div>
            <div className="card-subtitle">Q3 2026 Cycle</div>
          </div>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Overall Score</th>
                <th>Rating</th>
                <th>Goals Met</th>
                <th>Trend</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="employee-profile">
                      <div className="avatar sm">{p.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <div className="employee-name">{p.name}</div>
                        <div className="employee-email">{p.dept}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ width: '25%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="progress-bar">
                        <div 
                          className={`progress-bar-fill ${getProgressColor(p.score)}`} 
                          style={{ width: `${p.score}%` }} 
                        />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', width: '30px' }}>
                        {p.score}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={star <= p.rating ? 'star filled' : 'star'} 
                          fill={star <= p.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {p.goals}
                  </td>
                  <td>
                    {p.trend === 'up' && <span className="status-badge active"><ArrowUpRight size={12} /> Improving</span>}
                    {p.trend === 'down' && <span className="status-badge absent"><ArrowDownRight size={12} /> Declining</span>}
                    {p.trend === 'stable' && <span className="status-badge inactive"><Minus size={12} /> Stable</span>}
                  </td>
                  <td>
                    <button className="btn secondary xs">View Details</button>
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
