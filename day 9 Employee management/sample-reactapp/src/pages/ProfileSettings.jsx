import { useState } from 'react';
import { User, Lock, Bell, Palette, Upload, Shield, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile Settings' },
    { id: 'security', icon: Lock, label: 'Security & Auth' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Account Settings</h1>
          <p>Manage your personal profile and preferences.</p>
        </div>
      </div>

      <div className="grid-5-7">
        {/* Navigation Sidebar */}
        <div className="card" style={{ height: 'fit-content', padding: '12px' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`nav-item ${activeTab === t.id ? 'active' : ''}`}
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '4px' }}
            >
              <t.icon size={18} />
              <span className="font-medium" style={{ fontSize: '0.875rem' }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="card">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && (
                <div>
                  <div className="profile-header">
                    <div className="profile-avatar" style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
                      R
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0}>
                        <Upload size={20} color="white" />
                      </div>
                    </div>
                    <div className="profile-details">
                      <h2>Rahul</h2>
                      <p>Administrator • Engineering Dept</p>
                      <button className="btn secondary sm mt-1">Change Avatar</button>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" defaultValue="Rahul" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" defaultValue="" />
                    </div>
                    <div className="form-group full-width">
                      <label>Email Address</label>
                      <input type="email" defaultValue="admin@company.com" disabled />
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>Email cannot be changed directly. Contact IT support.</span>
                    </div>
                    <div className="form-group full-width">
                      <label>Bio / Headline</label>
                      <textarea defaultValue="System Administrator managing HR portals." />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <div className="form-section-title mb-2">
                    <Shield size={16} className="text-primary-color" />
                    <span>Password Management</span>
                  </div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Current Password</label>
                      <input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" placeholder="Create new password" />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input type="password" placeholder="Confirm new password" />
                    </div>
                  </div>

                  <div className="form-section-title mt-3 mb-2">
                    <Lock size={16} className="text-primary-color" />
                    <span>Two-Factor Authentication</span>
                  </div>
                  <div className="setting-item">
                    <div className="setting-label">
                      <span>Require 2FA for login</span>
                      <span>Enhance security using an authenticator app.</span>
                    </div>
                    <div className="toggle active"></div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <div className="form-section-title mb-2">
                    <Bell size={16} className="text-primary-color" />
                    <span>Email Notifications</span>
                  </div>
                  <div className="setting-item">
                    <div className="setting-label">
                      <span>Weekly Digest</span>
                      <span>Get a summary of system activity every Monday.</span>
                    </div>
                    <div className="toggle active"></div>
                  </div>
                  <div className="setting-item">
                    <div className="setting-label">
                      <span>Leave Requests</span>
                      <span>Notify me when an employee requests leave.</span>
                    </div>
                    <div className="toggle active"></div>
                  </div>
                  <div className="setting-item">
                    <div className="setting-label">
                      <span>Payroll Alerts</span>
                      <span>Notifications related to payroll processing.</span>
                    </div>
                    <div className="toggle"></div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <div className="form-section-title mb-2">
                    <Palette size={16} className="text-primary-color" />
                    <span>Theme Options</span>
                  </div>
                  <p className="text-muted mb-2" style={{ fontSize: '0.845rem' }}>
                    Toggle dark mode using the Moon/Sun icon in the TopBar.
                  </p>
                  
                  <div className="form-section-title mt-3 mb-2">
                    <span>Sidebar Preferences</span>
                  </div>
                  <div className="setting-item">
                    <div className="setting-label">
                      <span>Collapse Sidebar by Default</span>
                      <span>Start with a minimized navigation bar.</span>
                    </div>
                    <div className="toggle"></div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                <button className="btn">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
