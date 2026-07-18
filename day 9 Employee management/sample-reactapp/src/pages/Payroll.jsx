import { useState } from 'react';
import { Banknote, Download, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const payrollData = [
  { id: 1, name: 'Rahul', dept: 'Engineering', salary: '₹12,00,000', netPay: '₹84,500', bonus: '+₹5,000', deductions: '-₹12,000', status: 'Paid', date: 'Jul 31, 2026' },
  { id: 2, name: 'Ajith', dept: 'Marketing', salary: '₹15,00,000', netPay: '₹1,05,000', bonus: '+₹8,000', deductions: '-₹15,500', status: 'Paid', date: 'Jul 31, 2026' },
  { id: 3, name: 'Suriya', dept: 'Engineering', salary: '₹25,00,000', netPay: '₹1,75,000', bonus: '+₹15,000', deductions: '-₹28,000', status: 'Processing', date: 'Jul 31, 2026' },
  { id: 4, name: 'Vijay', dept: 'Human Resources', salary: '₹20,00,000', netPay: '₹1,42,000', bonus: '₹0', deductions: '-₹22,000', status: 'Processing', date: 'Jul 31, 2026' },
  { id: 5, name: 'Dhanush', dept: 'Sales', salary: '₹8,00,000', netPay: '₹58,500', bonus: '+₹12,000', deductions: '-₹8,000', status: 'Paid', date: 'Jul 31, 2026' },
];

export default function Payroll() {
  const [month, setMonth] = useState('2026-07');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Payroll Management</h1>
          <p>Process salaries, bonuses, and deductions securely.</p>
        </div>
        <div className="page-header-actions" style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="month" 
            value={month} 
            onChange={e => setMonth(e.target.value)}
            className="filter-select"
            style={{ padding: '0 12px', width: '160px', background: 'var(--surface)' }}
          />
          <button className="btn">
            <Banknote size={16} /> Process Run
          </button>
        </div>
      </div>

      <div className="metrics-grid section-gap">
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Banknote size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">₹5.65M</div>
            <div className="metric-label">Total Payroll (Est.)</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">₹2.48M</div>
            <div className="metric-label">Disbursed</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <Clock size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">₹3.17M</div>
            <div className="metric-label">Processing</div>
          </div>
        </div>
        <div className="card metric-card">
          <div className="metric-card-top">
            <div className="metric-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
              <AlertCircle size={22} />
            </div>
          </div>
          <div>
            <div className="metric-value">₹45.5K</div>
            <div className="metric-label">Taxes & Deductions</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Salary Breakdown</div>
            <div className="card-subtitle">Detailed view for {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
          </div>
          <button className="btn secondary sm">
            <Download size={14} /> Export Report
          </button>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Base Salary (LPA)</th>
                <th>Bonus</th>
                <th>Deductions</th>
                <th>Net Pay (Monthly)</th>
                <th>Status</th>
                <th>Payslip</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map(p => (
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
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.salary}</td>
                  <td className={p.bonus !== '₹0' ? 'text-success font-medium' : 'text-muted'}>{p.bonus}</td>
                  <td className="text-danger font-medium">{p.deductions}</td>
                  <td style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)' }}>{p.netPay}</td>
                  <td>
                    <span className={`status-badge ${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn ghost icon-only" title="Download Payslip">
                      <FileText size={16} />
                    </button>
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
