import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Sun, Plus, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const notifications = [
  { id: 1, icon: '👤', bg: '#EFF6FF', text: 'Rahul applied for leave', time: '5 min ago', unread: true },
  { id: 2, icon: '💰', bg: '#ECFDF5', text: 'Payroll for July 2026 completed', time: '1 hr ago', unread: true },
  { id: 3, icon: '🎉', bg: '#F5F3FF', text: 'Ajith joined Engineering team', time: '3 hr ago', unread: false },
  { id: 4, icon: '🏢', bg: '#FFFBEB', text: 'New department "Legal" was created', time: 'Yesterday', unread: false },
];

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

export default function TopBar({ darkMode, onToggleDark, onOpenEmployee, onOpenMobileSidebar }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const notifRef = useRef(null);
  const { user } = useAuth();

  const displayName = user?.name ? user.name.split(' ')[0] : 'Admin';
  const displayInitial = displayName[0]?.toUpperCase() || 'A';

  const unreadCount = notifs.filter(n => n.unread).length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifs(n => n.map(x => ({ ...x, unread: false })));
  };

  return (
    <header className="topbar" role="banner">
      {/* Mobile Hamburger */}
      <button
        className="hamburger-btn"
        onClick={onOpenMobileSidebar}
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Left: Greeting */}
      <div className="topbar-left">
        <span className="topbar-greeting">Hi {displayName} 👋</span>
        <span className="topbar-date">{getFormattedDate()}</span>
      </div>

      {/* Center: Search */}
      <div className="topbar-search-wrapper">
        <div className="topbar-search">
          <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search employees, departments..."
            aria-label="Search"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="topbar-right">
        {/* Dark mode toggle */}
        <button
          className="topbar-icon-btn"
          onClick={onToggleDark}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="topbar-icon-btn"
            onClick={() => setShowNotifs(v => !v)}
            aria-label={`Notifications (${unreadCount} unread)`}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>

          {showNotifs && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <h4>Notifications</h4>
                {unreadCount > 0 && (
                  <button className="notif-mark-read" onClick={markAllRead}>Mark all read</button>
                )}
              </div>
              {notifs.map(n => (
                <div key={n.id} className={`notif-item${n.unread ? ' unread' : ''}`}>
                  <div className="notif-icon" style={{ background: n.bg }}>
                    <span>{n.icon}</span>
                  </div>
                  <div className="notif-text">
                    <p>{n.text}</p>
                    <span>{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add Employee */}
        <button
          className="topbar-add-btn"
          onClick={onOpenEmployee}
          aria-label="Add new employee"
        >
          <Plus size={15} />
          <span>Add Employee</span>
        </button>

        {/* User Profile */}
        <div className="topbar-user" role="button" tabIndex={0} aria-label="User profile menu">
          <div className="topbar-avatar">{displayInitial}</div>
          <div className="topbar-user-text">
            <span className="name">{displayName}</span>
            <span className="role-label">Admin</span>
          </div>
          <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </header>
  );
}
