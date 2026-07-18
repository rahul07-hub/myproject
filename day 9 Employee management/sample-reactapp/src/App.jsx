import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/TopBar';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import DepartmentManagement from './pages/DepartmentManagement';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import ReportsAnalytics from './pages/ReportsAnalytics';
import Login from './pages/Login';
import ProfileSettings from './pages/ProfileSettings';
import ProtectedRoute from './Components/ProtectedRoute';
import api from './services/api';
import './index.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', role: '', department: '', status: 'Active',
    phone: '', joinDate: '', location: '', manager: '', salary: '', skills: '', rating: 3
  });
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setServerError(null);
    try {
      const res = await api.get('');
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
      setServerError('The API Server is not running. Please run npm run server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const generateEmpId = (list) => {
    const ids = list.map(e => {
      const match = e.employeeId && e.employeeId.match(/EMP(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
    const maxId = Math.max(0, ...ids);
    return `EMP${String(maxId + 1).padStart(3, '0')}`;
  };

  const openModal = (employee = null) => {
    if (employee) {
      setFormData({
        ...employee,
        role: employee.role || employee.designation || '',
        joinDate: employee.joinDate || employee.joiningDate || new Date().toISOString().split('T')[0],
        location: employee.location || employee.address || ''
      });
      setEditingId(employee.id);
    } else {
      setFormData({
        name: '', email: '', role: '', department: '', status: 'Active',
        phone: '', joinDate: new Date().toISOString().split('T')[0],
        location: '', manager: '', salary: '', skills: '', rating: 3
      });
      setEditingId(null);
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    try {
      const payload = {
        ...formData,
        designation: formData.role,
        joiningDate: formData.joinDate,
        address: formData.location,
        profileImage: formData.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'
      };

      if (editingId) {
        await api.put(`/${editingId}`, payload);
        addToast('Employee updated successfully');
      } else {
        const nextEmpId = generateEmpId(employees);
        payload.employeeId = nextEmpId;
        await api.post('', payload);
        addToast('New employee added successfully');
      }
      fetchEmployees();
      closeModal();
    } catch (_err) {
      addToast('Error saving employee', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await api.delete(`/${id}`);
        fetchEmployees();
        addToast(`${name} has been removed`, 'success');
      } catch (_err) {
        addToast('Failed to delete employee', 'error');
      }
    }
  };

  const handleAddEmployee = async (newEmp) => {
    try {
      const nextEmpId = generateEmpId(employees);
      const payload = {
        ...newEmp,
        employeeId: nextEmpId,
        designation: newEmp.role,
        joiningDate: newEmp.joinDate,
        address: newEmp.location,
        profileImage: newEmp.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'
      };
      await api.post('', payload);
      addToast('New employee added successfully');
      fetchEmployees();
    } catch (_err) {
      addToast('Error saving employee', 'error');
    }
  };

  return (
    <Router>
      <div className="app-layout">
        {mobileSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          onToggleCollapse={() => setSidebarCollapsed(v => !v)}
        />

        <div className={`main-wrapper${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
          <TopBar
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(v => !v)}
            onOpenEmployee={() => openModal()}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          />

          <div className="main-content">
            {serverError ? (
              <div className="server-error-container">
                <div className="server-error-title">
                  <AlertCircle size={20} />
                  <span>API Connection Error</span>
                </div>
                <div className="server-error-message">
                  {serverError}
                </div>
                <button className="btn" onClick={fetchEmployees}>Retry Connection</button>
              </div>
            ) : isLoading ? (
              <div className="spinner-container">
                <div className="spinner" />
                <span className="text-muted">Loading employee data...</span>
              </div>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Dashboard employees={employees} onOpenModal={openModal} /></ProtectedRoute>} />
                <Route
                  path="/employees"
                  element={<ProtectedRoute><EmployeeList employees={employees} openModal={openModal} handleDelete={handleDelete} /></ProtectedRoute>}
                />
                <Route path="/add-employee" element={<ProtectedRoute><AddEmployee onAddEmployee={handleAddEmployee} /></ProtectedRoute>} />
                <Route path="/departments" element={<ProtectedRoute><DepartmentManagement /></ProtectedRoute>} />
                <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
                <Route path="/leave" element={<ProtectedRoute><LeaveManagement /></ProtectedRoute>} />
                <Route path="/payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
                <Route path="/performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
              </Routes>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') closeModal(); }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
                <button className="close-btn" onClick={closeModal}><X size={18} /></button>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. John Doe" className={errors.name ? 'error-input' : ''} />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@company.com" className={errors.email ? 'error-input' : ''} />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-group">
                    <label>Department *</label>
                    <select name="department" value={formData.department} onChange={handleInputChange} className={errors.department ? 'error-input' : ''}>
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales">Sales</option>
                      <option value="Finance">Finance</option>
                      <option value="Design">Design</option>
                    </select>
                    {errors.department && <span className="error-text">{errors.department}</span>}
                  </div>
                  <div className="form-group">
                    <label>Designation *</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="e.g. Software Engineer" className={errors.role ? 'error-input' : ''} />
                    {errors.role && <span className="error-text">{errors.role}</span>}
                  </div>
                  <div className="form-group">
                    <label>Employment Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn">Save Employee</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast ${toast.type}`}>
              {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span className="toast-message">{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
