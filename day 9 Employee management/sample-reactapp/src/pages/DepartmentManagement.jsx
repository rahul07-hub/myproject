import { Building2, Users, UserCheck, TrendingUp, MoreVertical, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const departments = [
  { id: 1, name: 'Engineering', head: 'Amit Kumar', employees: 45, budget: '₹2.5 Cr', color: '#2563EB', bg: '#EFF6FF', growth: '+8%', location: 'Bangalore' },
  { id: 2, name: 'Marketing', head: 'Priya Singh', employees: 22, budget: '₹1.2 Cr', color: '#8B5CF6', bg: '#F5F3FF', growth: '+5%', location: 'Mumbai' },
  { id: 3, name: 'Human Resources', head: 'Neha Desai', employees: 15, budget: '₹80 L', color: '#10B981', bg: '#ECFDF5', growth: '+3%', location: 'Chennai' },
  { id: 4, name: 'Sales', head: 'Vikram Mehta', employees: 30, budget: '₹1.8 Cr', color: '#F59E0B', bg: '#FFFBEB', growth: '+12%', location: 'Delhi' },
  { id: 5, name: 'Finance', head: 'Ravi Patel', employees: 18, budget: '₹95 L', color: '#EF4444', bg: '#FEF2F2', growth: '+2%', location: 'Pune' },
  { id: 6, name: 'Design', head: 'Ananya Roy', employees: 12, budget: '₹65 L', color: '#EC4899', bg: '#FDF2F8', growth: '+6%', location: 'Bangalore' },
  { id: 7, name: 'Operations', head: 'Suresh Nair', employees: 25, budget: '₹1.1 Cr', color: '#06B6D4', bg: '#ECFEFF', growth: '+4%', location: 'Chennai' },
  { id: 8, name: 'Legal', head: 'Kavita Sharma', employees: 8, budget: '₹50 L', color: '#64748B', bg: '#F1F5F9', growth: '+1%', location: 'Delhi' },
];

export default function DepartmentManagement() {
  const totalEmployees = departments.reduce((sum, d) => sum + d.employees, 0);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Departments</h1>
          <p>Manage organizational structure and teams.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn">
            <Building2 size={16} /> Add Department
          </button>
        </div>
      </div>

      <div className="metrics-grid section-gap">
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Building2 size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{departments.length}</div>
            <div className="metric-label">Total Departments</div>
          </div>
        </div>
        
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>
              <Users size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{totalEmployees}</div>
            <div className="metric-label">Total Employees</div>
          </div>
        </div>
        
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: '#FFFBEB', color: '#F59E0B' }}>
              <UserCheck size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{departments.length}</div>
            <div className="metric-label">Department Heads</div>
          </div>
        </div>
        
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: '#F5F3FF', color: '#8B5CF6' }}>
              <TrendingUp size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{Math.round(totalEmployees / departments.length)}</div>
            <div className="metric-label">Avg. Team Size</div>
          </div>
        </div>
      </div>

      <div className="grid-4">
        {departments.map((dept, index) => (
          <motion.div 
            key={dept.id} 
            className="card dept-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div className="dept-card-header" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="dept-icon" style={{ background: dept.bg, color: dept.color }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="dept-name">{dept.name}</div>
                  <div className="dept-head">Head: {dept.head}</div>
                </div>
              </div>
              <button className="btn ghost icon-only" style={{ margin: '-8px -8px 0 0', width: 28, height: 28, padding: 0 }}>
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <MapPin size={14} /> {dept.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <DollarSign size={14} /> Budget: {dept.budget}
              </div>
            </div>

            <div className="dept-stats">
              <div className="dept-stat">
                <span className="dept-stat-label">Employees</span>
                <span className="dept-stat-value">{dept.employees}</span>
              </div>
              <div className="dept-stat" style={{ paddingLeft: '16px' }}>
                <span className="dept-stat-label">Growth</span>
                <span className="dept-stat-value text-success" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <TrendingUp size={12} /> {dept.growth}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
