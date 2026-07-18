import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserPlus, Building2, Clock,
  CalendarDays, Banknote, BarChart4, PieChart, Settings,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  {
    section: 'Main',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { to: '/employees', icon: Users, label: 'Employee List' },
      { to: '/add-employee', icon: UserPlus, label: 'Add Employee' },
      { to: '/departments', icon: Building2, label: 'Departments' },
    ]
  },
  {
    section: 'HR Management',
    items: [
      { to: '/attendance', icon: Clock, label: 'Attendance' },
      { to: '/leave', icon: CalendarDays, label: 'Leave Management' },
      { to: '/payroll', icon: Banknote, label: 'Payroll' },
      { to: '/performance', icon: BarChart4, label: 'Performance' },
      { to: '/reports', icon: PieChart, label: 'Reports & Analytics' },
    ]
  }
];

export default function Sidebar({ collapsed, mobileOpen, onClose, onToggleCollapse }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'Admin';
  const displayInitial = displayName[0]?.toUpperCase() || 'A';

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
      <div className="sidebar-inner">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">Z</div>
            {!collapsed && (
              <div className="sidebar-brand-text">
                <h2>Zoho</h2>
                <span>HR Management</span>
              </div>
            )}
          </div>
          <button
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(group => (
            <div key={group.section}>
              {!collapsed && (
                <span className="nav-section-label">{group.section}</span>
              )}
              {collapsed && <div style={{ height: 12 }} />}

              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="nav-item-icon">
                    <item.icon size={17} />
                  </span>
                  {!collapsed && (
                    <span className="nav-item-label">{item.label}</span>
                  )}
                </NavLink>
              ))}
              <div className="nav-divider" />
            </div>
          ))}

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            title={collapsed ? 'Settings' : undefined}
          >
            <span className="nav-item-icon"><Settings size={17} /></span>
            {!collapsed && <span className="nav-item-label">Settings</span>}
          </NavLink>
        </nav>

        {/* Footer / User Section */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">{displayInitial}</div>
            {!collapsed && (
              <div className="sidebar-user-info">
                <span className="name">{displayName}</span>
                <span className="role">Administrator</span>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', flexShrink: 0, padding: 4, color: 'var(--sidebar-text)', display: 'flex', alignItems: 'center' }}
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
