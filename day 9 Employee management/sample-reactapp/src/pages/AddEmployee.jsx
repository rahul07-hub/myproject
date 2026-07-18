import { useState } from 'react';
import { UserPlus, Briefcase, Mail, Phone, MapPin, DollarSign, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AddEmployee({ onAddEmployee }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: '', role: '', status: 'Active',
    joinDate: new Date().toISOString().split('T')[0], location: '', manager: '',
    salary: '', skills: '', rating: 3
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.department) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onAddEmployee) {
      onAddEmployee({ ...formData, id: Date.now() });
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '', email: '', phone: '', department: '', role: '', status: 'Active',
        joinDate: new Date().toISOString().split('T')[0], location: '', manager: '',
        salary: '', skills: '', rating: 3
      });
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card" style={{ textAlign: 'center', padding: '48px', maxWidth: '400px' }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}
          >
            <UserPlus size={40} />
          </motion.div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Employee Added!</h2>
          <p className="text-muted">The new employee record has been successfully created in the system.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Add Employee</h1>
          <p>Fill in the details below to create a new employee profile.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Section: Personal Info */}
          <div className="form-section-title">
            <UserPlus size={16} className="text-primary-color" />
            <span>Personal Information</span>
          </div>
          
          <div className="add-employee-form" style={{ marginTop: '16px', marginBottom: '32px' }}>
            <div className="form-group">
              <label>Full Name *</label>
              <div style={{ position: 'relative' }}>
                <UserPlus size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" className={errors.name ? 'error-input' : ''} style={{ paddingLeft: '36px' }} />
              </div>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label>Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" className={errors.email ? 'error-input' : ''} style={{ paddingLeft: '36px' }} />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" style={{ paddingLeft: '36px' }} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bangalore" style={{ paddingLeft: '36px' }} />
              </div>
            </div>
          </div>

          {/* Section: Professional Info */}
          <div className="form-section-title">
            <Briefcase size={16} className="text-primary-color" />
            <span>Professional Details</span>
          </div>
          
          <div className="add-employee-form" style={{ marginTop: '16px' }}>
            <div className="form-group">
              <label>Department *</label>
              <select name="department" value={formData.department} onChange={handleChange} className={errors.department ? 'error-input' : ''}>
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
                <option value="Legal">Legal</option>
              </select>
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>
            
            <div className="form-group">
              <label>Designation *</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Senior Developer" className={errors.role ? 'error-input' : ''} />
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>
            
            <div className="form-group">
              <label>Reporting Manager</label>
              <input type="text" name="manager" value={formData.manager} onChange={handleChange} placeholder="Manager's name" />
            </div>
            
            <div className="form-group">
              <label>Employment Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Date of Joining</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} style={{ paddingLeft: '36px' }} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Annual Salary</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. ₹12,00,000" style={{ paddingLeft: '36px' }} />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label>Skills & Qualifications</label>
              <div style={{ position: 'relative' }}>
                <Target size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, Node.js, Project Management (comma separated)" style={{ paddingLeft: '36px' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <button 
              type="button" 
              className="btn secondary" 
              onClick={() => {
                setFormData({
                  name: '', email: '', phone: '', department: '', role: '', status: 'Active',
                  joinDate: new Date().toISOString().split('T')[0], location: '', manager: '',
                  salary: '', skills: '', rating: 3
                });
                setErrors({});
              }}
            >
              Reset Form
            </button>
            <button type="submit" className="btn">
              <UserPlus size={16} /> Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
