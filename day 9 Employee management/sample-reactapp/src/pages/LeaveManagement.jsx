import { useState } from 'react';
import { CalendarDays, Check, X, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialLeaves = [
  { id: 1, name: 'Rekish', dept: 'Engineering', type: 'Sick Leave', from: '2026-07-10', to: '2026-07-12', days: 3, reason: 'Medical appointment and recovery', status: 'Pending' },
  { id: 2, name: 'Gomathi', dept: 'Marketing', type: 'Casual Leave', from: '2026-07-15', to: '2026-07-15', days: 1, reason: 'Personal work', status: 'Approved' },
  { id: 3, name: 'Gopal', dept: 'Engineering', type: 'Annual Leave', from: '2026-07-20', to: '2026-07-28', days: 7, reason: 'Family vacation', status: 'Pending' },
  { id: 4, name: 'Gowri', dept: 'HR', type: 'Sick Leave', from: '2026-07-08', to: '2026-07-09', days: 2, reason: 'Fever', status: 'Approved' },
  { id: 5, name: 'Vijaya', dept: 'Sales', type: 'Casual Leave', from: '2026-07-05', to: '2026-07-05', days: 1, reason: 'Personal errand', status: 'Rejected' },
  { id: 6, name: 'Ajith', dept: 'Legal', type: 'Maternity Leave', from: '2026-08-01', to: '2026-11-01', days: 90, reason: 'Maternity', status: 'Pending' },
  { id: 7, name: 'Rahul', dept: 'Design', type: 'Work from Home', from: '2026-07-14', to: '2026-07-14', days: 1, reason: 'Internet installation at home', status: 'Approved' },
];

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filter, setFilter] = useState('All');

  const handleAction = (id, action) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
  };

  const filtered = filter === 'All' ? leaves : leaves.filter(l => l.status === filter);
  const pending = leaves.filter(l => l.status === 'Pending').length;
  const approved = leaves.filter(l => l.status === 'Approved').length;
  const rejected = leaves.filter(l => l.status === 'Rejected').length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Leave Management</h1>
          <p>Review and process employee leave requests.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn">
            <FileText size={16} /> Leave Policy
          </button>
        </div>
      </div>

      <div className="metrics-grid section-gap">
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <CalendarDays size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{leaves.length}</div>
            <div className="metric-label">Total Requests</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <Clock size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{pending}</div>
            <div className="metric-label">Pending Approval</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{approved}</div>
            <div className="metric-label">Approved</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
              <XCircle size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">{rejected}</div>
            <div className="metric-label">Rejected</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ marginBottom: 20 }}>
          <div className="card-title">Leave Requests</div>
          <div className="tabs" style={{ marginBottom: 0 }}>
            {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
              <button 
                key={f} 
                className={`tab ${filter === f ? 'active' : ''}`} 
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Date Range</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map(l => (
                  <motion.tr 
                    key={l.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>
                      <div className="employee-profile">
                        <div className="avatar sm">{l.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <div className="employee-name">{l.name}</div>
                          <div className="employee-email">{l.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="font-medium text-primary-color">{l.type}</span></td>
                    <td>
                      <span className="font-medium text-primary">{l.from}</span>
                      <span className="text-muted" style={{ margin: '0 6px' }}>to</span>
                      <span className="font-medium text-primary">{l.to}</span>
                    </td>
                    <td><span style={{ display: 'inline-block', padding: '2px 8px', background: 'var(--bg-secondary)', borderRadius: '4px', fontWeight: 600 }}>{l.days}</span></td>
                    <td>
                      <div className="truncate" style={{ maxWidth: '180px' }} title={l.reason}>
                        {l.reason}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${l.status.toLowerCase()}`}>
                        {l.status}
                      </span>
                    </td>
                    <td>
                      {l.status === 'Pending' ? (
                        <div className="actions">
                          <button 
                            className="btn success icon-only" 
                            style={{ padding: '6px', width: 28, height: 28 }}
                            onClick={() => handleAction(l.id, 'Approved')}
                            title="Approve"
                          >
                            <Check size={14} />
                          </button>
                          <button 
                            className="btn danger icon-only" 
                            style={{ padding: '6px', width: 28, height: 28 }}
                            onClick={() => handleAction(l.id, 'Rejected')}
                            title="Reject"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>Processed</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <CalendarDays size={22} />
              </div>
              <h3>No {filter !== 'All' ? filter.toLowerCase() : ''} requests found</h3>
              <p>You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
