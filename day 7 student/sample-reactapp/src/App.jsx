import { useState, useEffect } from "react";
import "./App.css";

// Initial mock database to provide a rich visual experience on first load
const DEFAULT_STUDENTS = [
  {
    id: "STU-2026-0001",
    name: "Sophia Chen",
    age: 20,
    gender: "Female",
    department: "Computer Science",
    course: "Web Development",
    year: "3rd Year",
    email: "sophia.chen@university.edu",
    phone: "9876543210",
    marks: 92,
    attendance: 95,
    status: "Active"
  },
  {
    id: "STU-2026-0002",
    name: "Liam Johnson",
    age: 21,
    gender: "Male",
    department: "Electrical Engineering",
    course: "Microprocessors",
    year: "4th Year",
    email: "liam.johnson@university.edu",
    phone: "9875432109",
    marks: 85,
    attendance: 88,
    status: "Active"
  },
  {
    id: "STU-2026-0003",
    name: "Ava Martinez",
    age: 19,
    gender: "Female",
    department: "Mechanical Engineering",
    course: "Thermodynamics",
    year: "2nd Year",
    email: "ava.martinez@university.edu",
    phone: "9874321098",
    marks: 78,
    attendance: 80,
    status: "Active"
  },
  {
    id: "STU-2026-0004",
    name: "Noah Patel",
    age: 18,
    gender: "Male",
    department: "Business Administration",
    course: "Accounting Principles",
    year: "1st Year",
    email: "noah.patel@university.edu",
    phone: "9873210987",
    marks: 90,
    attendance: 94,
    status: "Active"
  },
  {
    id: "STU-2026-0005",
    name: "Emma Wilson",
    age: 20,
    gender: "Female",
    department: "Mathematics",
    course: "Linear Algebra",
    year: "2nd Year",
    email: "emma.wilson@university.edu",
    phone: "9872109876",
    marks: 88,
    attendance: 91,
    status: "Inactive"
  },
  {
    id: "STU-2026-0006",
    name: "Mason Davis",
    age: 22,
    gender: "Male",
    department: "Computer Science",
    course: "Data Structures & Algorithms",
    year: "4th Year",
    email: "mason.davis@university.edu",
    phone: "9871098765",
    marks: 95,
    attendance: 98,
    status: "Active"
  }
];

const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Mathematics"
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function App() {
  // --- STATE VARIABLES ---
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("eduPulse_students");
    return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("eduPulse_theme");
    return saved ? saved : "light";
  });

  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'directory' | 'add-student'
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    department: "Computer Science",
    course: "",
    year: "1st Year",
    email: "",
    phone: "",
    marks: "",
    attendance: "",
    status: "Active"
  });
  const [formErrors, setFormErrors] = useState({});

  // Overlay Modals & Dialogs State
  const [viewProfileStudent, setViewProfileStudent] = useState(null);
  const [deleteConfirmStudent, setDeleteConfirmStudent] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Toast System Notifications
  const [toast, setToast] = useState(null); // { message, type } ('success' | 'info')
  
  // Dashboard Action Log / Activities (Visual Flair)
  const [activities, setActivities] = useState([
    { id: 1, action: "System Initialized", details: "Sample database synchronized successfully", time: "Just now" },
    { id: 2, action: "Integrity Verification", details: "Student records matched local storage parameters", time: "10m ago" }
  ]);

  // --- LIFECYCLE / SIDE EFFECTS ---
  // Sync students data with localStorage
  useEffect(() => {
    localStorage.setItem("eduPulse_students", JSON.stringify(students));
  }, [students]);

  // Sync theme with localStorage
  useEffect(() => {
    localStorage.setItem("eduPulse_theme", theme);
  }, [theme]);

  // Auto-dismiss Toast Notifications
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- DYNAMIC CALCULATIONS & STATS ---
  const totalStudents = students.length;
  
  // Get distinct departments with students
  const activeDepts = [...new Set(students.map(s => s.department))];
  const totalDepartments = activeDepts.length;

  // Average Marks Calculation
  const avgMarks = totalStudents > 0 
    ? Math.round(students.reduce((acc, curr) => acc + Number(curr.marks || 0), 0) / totalStudents)
    : 0;

  // Average Attendance Calculation
  const avgAttendance = totalStudents > 0 
    ? Math.round(students.reduce((acc, curr) => acc + Number(curr.attendance || 0), 0) / totalStudents)
    : 0;

  // Get Top Performing Students (Marks >= 90)
  const topPerformers = students
    .filter(s => Number(s.marks) >= 90)
    .sort((a, b) => b.marks - a.marks)
    .slice(0, 4);

  // Department distribution count for dashboard visual bar chart
  const deptCounts = DEPARTMENTS.reduce((acc, dept) => {
    acc[dept] = students.filter(s => s.department === dept).length;
    return acc;
  }, {});

  // --- UTILITY HANDLERS ---
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`, "info");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const logActivity = (action, details) => {
    const newAct = {
      id: Date.now(),
      action,
      details,
      time: "Just now"
    };
    setActivities(prev => [newAct, ...prev.slice(0, 4)]);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "Male",
      department: "Computer Science",
      course: "",
      year: "1st Year",
      email: "",
      phone: "",
      marks: "",
      attendance: "",
      status: "Active"
    });
    setFormErrors({});
  };

  // Generate Unique Sequential ID
  const generateNextStudentID = () => {
    const currentYear = new Date().getFullYear();
    const prefix = `STU-${currentYear}-`;
    
    let maxSuffix = 0;
    students.forEach(s => {
      if (s.id && s.id.startsWith(prefix)) {
        const parts = s.id.split("-");
        if (parts.length === 3) {
          const suffixVal = parseInt(parts[2], 10);
          if (!isNaN(suffixVal) && suffixVal > maxSuffix) {
            maxSuffix = suffixVal;
          }
        }
      }
    });

    const nextVal = maxSuffix + 1;
    return `${prefix}${String(nextVal).padStart(4, "0")}`;
  };

  // --- CRUD ACTIONS ---
  // Form submission (Add / Edit)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    else if (formData.name.trim().length < 2) errors.name = "Name must be at least 2 characters";

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) errors.age = "Age is required";
    else if (isNaN(ageNum) || ageNum < 16 || ageNum > 99) errors.age = "Age must be a valid number between 16 and 99";

    if (!formData.course.trim()) errors.course = "Enrolled course is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) errors.email = "Email address is required";
    else if (!emailRegex.test(formData.email)) errors.email = "Please enter a valid email address";

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) errors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone.replace(/[- ]/g, ""))) errors.phone = "Phone number must be exactly 10 digits";

    const marksNum = parseFloat(formData.marks);
    if (formData.marks === "") errors.marks = "Marks is required";
    else if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) errors.marks = "Marks must be between 0 and 100";

    const attNum = parseFloat(formData.attendance);
    if (formData.attendance === "") errors.attendance = "Attendance is required";
    else if (isNaN(attNum) || attNum < 0 || attNum > 100) errors.attendance = "Attendance must be between 0 and 100";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast("Validation failed. Please check form fields.", "info");
      return;
    }

    // Cleaned details
    const cleanedStudent = {
      name: formData.name.trim(),
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      department: formData.department,
      course: formData.course.trim(),
      year: formData.year,
      email: formData.email.trim(),
      phone: formData.phone.replace(/[- ]/g, ""),
      marks: Math.round(parseFloat(formData.marks)),
      attendance: Math.round(parseFloat(formData.attendance)),
      status: formData.status
    };

    if (isEditing) {
      // Edit mode
      setStudents(prev => 
        prev.map(s => s.id === editId ? { ...s, ...cleanedStudent } : s)
      );
      showToast("Student profile updated successfully!", "success");
      logActivity("Student Updated", `${cleanedStudent.name} (${editId})`);
      setIsEditing(false);
      setEditId(null);
    } else {
      // Add mode
      const nextId = generateNextStudentID();
      const newStudent = {
        id: nextId,
        ...cleanedStudent
      };
      setStudents(prev => [newStudent, ...prev]);
      showToast("New student registered successfully!", "success");
      logActivity("Student Registered", `${cleanedStudent.name} (${nextId})`);
    }

    resetForm();
    setActiveTab("directory");
  };

  const handleEditClick = (student) => {
    setIsEditing(true);
    setEditId(student.id);
    setFormData({
      name: student.name,
      age: student.age.toString(),
      gender: student.gender,
      department: student.department,
      course: student.course,
      year: student.year,
      email: student.email,
      phone: student.phone,
      marks: student.marks.toString(),
      attendance: student.attendance.toString(),
      status: student.status
    });
    setFormErrors({});
    setActiveTab("add-student");
    setMobileSidebarOpen(false);
  };

  const handleDeleteTrigger = (student) => {
    setDeleteConfirmStudent(student);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmStudent) {
      setStudents(prev => prev.filter(s => s.id !== deleteConfirmStudent.id));
      showToast(`${deleteConfirmStudent.name} has been removed.`, "success");
      logActivity("Student Deleted", `${deleteConfirmStudent.name} (${deleteConfirmStudent.id})`);
      setDeleteConfirmStudent(null);
      // Close details dialog if viewing the deleted student
      if (viewProfileStudent && viewProfileStudent.id === deleteConfirmStudent.id) {
        setViewProfileStudent(null);
      }
    }
  };

  // --- SEARCH AND FILTER FILTERED LIST ---
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = filterDept === "All" || student.department === filterDept;
    const matchesYear = filterYear === "All" || student.year === filterYear;
    const matchesStatus = filterStatus === "All" || student.status === filterStatus;

    return matchesSearch && matchesDept && matchesYear && matchesStatus;
  });

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilterDept("All");
    setFilterYear("All");
    setFilterStatus("All");
    showToast("Filters cleared", "info");
  };

  // --- SUB-RENDER METHODS ---

  // Dashboard Page View
  const renderDashboard = () => {
    return (
      <div className="dashboard-view animate-fade-in">
        {/* Welcome Card Banner */}
        <div className="welcome-card">
          <div className="welcome-content">
            <h2>Welcome back, Administrator! 👋</h2>
            <p>Here's the current snapshot of the academy database. You have full controls to view, edit, or register students.</p>
            <div className="welcome-details">
              <span><strong>Date:</strong> {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="separator">|</span>
              <span><strong>System Status:</strong> <span className="status-indicator-online">Fully Operational</span></span>
            </div>
          </div>
          <div className="welcome-illustration">
            <svg viewBox="0 0 200 200" className="floating-svg">
              <defs>
                <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="70" fill="url(#circleGrad)" opacity="0.15" />
              <path d="M60,110 L90,140 L150,80" fill="none" stroke="url(#circleGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Dynamic Analytics Count Statistics Grid */}
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-icon-wrapper student-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="stats-info">
              <span className="stats-label">Total Students Enrolled</span>
              <h3 className="stats-number">{totalStudents}</h3>
              <span className="stats-subtext">Active: {students.filter(s => s.status === 'Active').length} | Inactive: {students.filter(s => s.status === 'Inactive').length}</span>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon-wrapper department-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
            </div>
            <div className="stats-info">
              <span className="stats-label">Active Departments</span>
              <h3 className="stats-number">{totalDepartments}</h3>
              <span className="stats-subtext">Across {DEPARTMENTS.length} total options</span>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon-wrapper marks-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="stats-info">
              <span className="stats-label">Average Academic Score</span>
              <h3 className="stats-number">{avgMarks}%</h3>
              <div className="progress-mini-bar">
                <div className="progress-mini-fill" style={{ width: `${avgMarks}%` }}></div>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon-wrapper attendance-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="stats-info">
              <span className="stats-label">Average Attendance Rate</span>
              <h3 className="stats-number">{avgAttendance}%</h3>
              <div className="progress-mini-bar">
                <div className="progress-mini-fill" style={{ width: `${avgAttendance}%`, background: "linear-gradient(to right, #a78bfa, #818cf8)" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Visual Charts & Lists Row */}
        <div className="dashboard-charts-row">
          {/* Department distribution custom CSS bar representation */}
          <div className="chart-card-wrapper glass-card">
            <h3>Department Breakdown</h3>
            <p className="section-desc">Distribution of registered students per academic faculty</p>
            <div className="bar-chart-container">
              {DEPARTMENTS.map(dept => {
                const count = deptCounts[dept] || 0;
                const percent = totalStudents > 0 ? (count / totalStudents) * 100 : 0;
                return (
                  <div key={dept} className="bar-row">
                    <div className="bar-row-label">
                      <span className="dept-name">{dept}</span>
                      <span className="dept-count">{count} {count === 1 ? 'student' : 'students'}</span>
                    </div>
                    <div className="bar-progress-bg">
                      <div className="bar-progress-fill" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Academic Performers Highlight */}
          <div className="performers-card-wrapper glass-card">
            <h3>Top Performers 🏆</h3>
            <p className="section-desc">Highest scoring academic profiles (Marks ≥ 90%)</p>
            <div className="performers-list">
              {topPerformers.length === 0 ? (
                <div className="no-performers">
                  <p>No student scores are currently set above 90%.</p>
                </div>
              ) : (
                topPerformers.map(student => (
                  <div key={student.id} className="performer-item" onClick={() => setViewProfileStudent(student)}>
                    <div className="performer-avatar">
                      {student.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                    </div>
                    <div className="performer-details">
                      <h4>{student.name}</h4>
                      <span>{student.department} • {student.year}</span>
                    </div>
                    <div className="performer-badge">
                      <span className="badge-val">{student.marks}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Operations Audit List */}
          <div className="activity-card-wrapper glass-card">
            <h3>Recent Actions Log</h3>
            <p className="section-desc">System diagnostic trail for the current session</p>
            <div className="activity-trail">
              {activities.map(act => (
                <div key={act.id} className="activity-item">
                  <div className="activity-circle"></div>
                  <div className="activity-details">
                    <h4>{act.action}</h4>
                    <p>{act.details}</p>
                    <span className="activity-time">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Student Directory Page View
  const renderStudentsDirectory = () => {
    return (
      <div className="directory-view animate-fade-in">
        {/* Advanced Filter Toolbar */}
        <div className="toolbar-wrapper glass-card">
          <div className="toolbar-header">
            <h3>Filter & Search Records</h3>
            {(filterDept !== "All" || filterYear !== "All" || filterStatus !== "All" || searchQuery) && (
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            )}
          </div>
          <div className="toolbar-controls">
            <div className="control-group search-control">
              <label>Search Directory</label>
              <div className="search-input-wrapper">
                <svg className="input-search-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Enter name or ID (e.g. STU-2026-0001)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="control-group">
              <label>Faculty Department</label>
              <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                <option value="All">All Departments</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="control-group">
              <label>Academic Year</label>
              <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                <option value="All">All Years</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="control-group">
              <label>Status Badge</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Student Table Container */}
        <div className="table-responsive-container glass-card">
          <div className="table-summary-row">
            <span>Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> registered students</span>
          </div>

          <table className="student-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Department & Course</th>
                <th>Academic Year</th>
                <th className="cell-center">Marks</th>
                <th className="cell-center">Attendance</th>
                <th className="cell-center">Status</th>
                <th className="cell-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-table-cell">
                    <div className="empty-state-visual">
                      <svg className="empty-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      <h4>No Records Found</h4>
                      <p>Adjust your search queries or department/year filter settings and try again.</p>
                      <button className="reset-search-btn" onClick={clearAllFilters}>Reset Filters</button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="student-row">
                    <td data-label="ID" className="row-id">
                      <code>{student.id}</code>
                    </td>
                    <td data-label="Student" className="row-name-avatar">
                      <div className="row-avatar">
                        {student.name.split(" ").map(n => n[0]).join("").substring(0,2).toUpperCase()}
                      </div>
                      <div className="row-name-details">
                        <span className="student-full-name">{student.name}</span>
                        <span className="student-secondary-details">{student.age} yrs • {student.gender}</span>
                      </div>
                    </td>
                    <td data-label="Faculty Focus">
                      <div className="row-department-course">
                        <span className="student-dept-tag">{student.department}</span>
                        <span className="student-course-title">{student.course}</span>
                      </div>
                    </td>
                    <td data-label="Year">
                      <span className="student-year-text">{student.year}</span>
                    </td>
                    <td data-label="Marks" className="cell-center">
                      <span className={`marks-label ${student.marks >= 85 ? 'high' : student.marks >= 60 ? 'mid' : 'low'}`}>
                        {student.marks}%
                      </span>
                    </td>
                    <td data-label="Attendance" className="cell-center">
                      <div className="attendance-column-display">
                        <span className="att-num">{student.attendance}%</span>
                        <div className="att-bar-container">
                          <div className={`att-bar-fill ${student.attendance >= 75 ? 'good' : 'warning'}`} style={{ width: `${student.attendance}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Status" className="cell-center">
                      <span className={`status-pill ${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </td>
                    <td data-label="Management" className="cell-right actions-column">
                      <div className="actions-button-group">
                        <button className="action-icon-btn view" title="View Profile" onClick={() => setViewProfileStudent(student)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button className="action-icon-btn edit" title="Edit Profile" onClick={() => handleEditClick(student)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="action-icon-btn delete" title="Delete Student" onClick={() => handleDeleteTrigger(student)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Add / Edit Student Form View
  const renderStudentForm = () => {
    return (
      <div className="form-view animate-fade-in">
        <div className="form-card glass-card">
          <div className="form-card-header">
            <div className="header-info">
              <h2>{isEditing ? `Edit Profile: ${editId}` : "Register New Student"}</h2>
              <p>{isEditing ? "Modify academic details or parameters for this student profile." : "Enter data parameters to automatically mint an academic registration ID."}</p>
            </div>
            {isEditing && (
              <button className="exit-edit-btn" onClick={() => { setIsEditing(false); resetForm(); setActiveTab("directory"); }}>
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="student-registration-form">
            <div className="form-grid">
              
              {/* Field: Name */}
              <div className={`form-field-group ${formErrors.name ? 'has-error' : ''}`}>
                <label className="required-field">Student Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Liam Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {formErrors.name && <span className="field-error-message">{formErrors.name}</span>}
              </div>

              {/* Field: Email */}
              <div className={`form-field-group ${formErrors.email ? 'has-error' : ''}`}>
                <label className="required-field">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. student@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {formErrors.email && <span className="field-error-message">{formErrors.email}</span>}
              </div>

              {/* Field: Phone */}
              <div className={`form-field-group ${formErrors.phone ? 'has-error' : ''}`}>
                <label className="required-field">Phone Number</label>
                <input 
                  type="text" 
                  placeholder="10-digit number (e.g. 9876543210)"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                {formErrors.phone && <span className="field-error-message">{formErrors.phone}</span>}
              </div>

              {/* Field: Age */}
              <div className={`form-field-group ${formErrors.age ? 'has-error' : ''}`}>
                <label className="required-field">Age</label>
                <input 
                  type="number" 
                  min="16" 
                  max="99"
                  placeholder="e.g. 20"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
                {formErrors.age && <span className="field-error-message">{formErrors.age}</span>}
              </div>

              {/* Field: Gender */}
              <div className="form-field-group">
                <label className="required-field">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Field: Department */}
              <div className="form-field-group">
                <label className="required-field">Faculty Department</label>
                <select 
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Field: Course */}
              <div className={`form-field-group ${formErrors.course ? 'has-error' : ''}`}>
                <label className="required-field">Course / Major Focus</label>
                <input 
                  type="text" 
                  placeholder="e.g. Data Structures & Algorithms"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                />
                {formErrors.course && <span className="field-error-message">{formErrors.course}</span>}
              </div>

              {/* Field: Year */}
              <div className="form-field-group">
                <label className="required-field">Academic Year</label>
                <select 
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                >
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Field: Status */}
              <div className="form-field-group">
                <label className="required-field">Status Badge</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Field: Marks */}
              <div className={`form-field-group ${formErrors.marks ? 'has-error' : ''}`}>
                <label className="required-field">Academic Marks (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100"
                  placeholder="Academic score 0 - 100"
                  value={formData.marks}
                  onChange={(e) => setFormData({...formData, marks: e.target.value})}
                />
                {formErrors.marks && <span className="field-error-message">{formErrors.marks}</span>}
              </div>

              {/* Field: Attendance */}
              <div className={`form-field-group ${formErrors.attendance ? 'has-error' : ''}`}>
                <label className="required-field">Attendance Record (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100"
                  placeholder="Attendance percentage 0 - 100"
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                />
                {formErrors.attendance && <span className="field-error-message">{formErrors.attendance}</span>}
              </div>

            </div>

            <div className="form-actions-row">
              <button type="button" className="secondary-action-btn" onClick={resetForm}>
                Reset Fields
              </button>
              <button type="submit" className="primary-action-btn-gradient">
                {isEditing ? "Update Student Records" : "Register New Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`app-container ${theme === "dark" ? "dark-theme" : ""}`}>
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className={`sidebar-panel ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand-wrapper">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
          <h2>EduPulse</h2>
        </div>

        <nav className="sidebar-nav-menu">
          <button 
            className={`nav-menu-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => { setActiveTab("dashboard"); setMobileSidebarOpen(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
            </svg>
            <span>Dashboard</span>
          </button>

          <button 
            className={`nav-menu-item ${activeTab === "directory" ? "active" : ""}`}
            onClick={() => { setActiveTab("directory"); setMobileSidebarOpen(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Student Directory</span>
          </button>

          <button 
            className={`nav-menu-item ${activeTab === "add-student" ? "active" : ""}`}
            onClick={() => { 
              setIsEditing(false); 
              resetForm(); 
              setActiveTab("add-student"); 
              setMobileSidebarOpen(false); 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" />
            </svg>
            <span>{isEditing ? "Edit Profile" : "Register Student"}</span>
          </button>
        </nav>

        <div className="sidebar-footer-widget">
          <button className="theme-toggle-trigger" onClick={toggleTheme}>
            {theme === "light" ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark Theme</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light Theme</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER BAR OVERLAY */}
      {mobileSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)}></div>
      )}

      {/* MAIN VIEWPORT BODY */}
      <div className="main-viewport-body">
        
        {/* TOP NAVBAR CONTAINER */}
        <header className="top-navbar-header">
          <div className="navbar-left-branding">
            <button className="hamburger-menu-btn" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="viewport-context-title">
              {activeTab === "dashboard" ? "Academic Dashboard" : activeTab === "directory" ? "Student Registry" : isEditing ? "Modify Profile" : "Register Student"}
            </h1>
          </div>

          <div className="navbar-right-utilities">
            {/* Quick search input (links directly to active query) */}
            <div className="navbar-quick-search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== "directory") {
                    setActiveTab("directory");
                  }
                }}
              />
            </div>

            <div className="navbar-admin-profile">
              <div className="admin-avatar-circle">AP</div>
              <div className="admin-meta-text">
                <span className="profile-name">Administrator</span>
                <span className="profile-role">Registrar Portal</span>
              </div>
            </div>
          </div>
        </header>

        {/* TOAST SYSTEM FEEDBACK */}
        {toast && (
          <div className={`system-toast-alert animate-slide-in ${toast.type}`}>
            <div className="toast-content">
              <span className="toast-icon">
                {toast.type === "success" ? "✓" : "ℹ"}
              </span>
              <p className="toast-message">{toast.message}</p>
            </div>
            <button className="toast-dismiss" onClick={() => setToast(null)}>×</button>
          </div>
        )}

        {/* CURRENT TAB VIEW CONTAINER */}
        <main className="tab-view-container">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "directory" && renderStudentsDirectory()}
          {activeTab === "add-student" && renderStudentForm()}
        </main>
      </div>

      {/* OVERLAY: STUDENT DETAILS PROFILE MODAL CARD */}
      {viewProfileStudent && (
        <div className="modal-backdrop-blur animate-fade-in" onClick={() => setViewProfileStudent(null)}>
          <div className="profile-card-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="profile-card-header-banner">
              <button className="modal-close-trigger" onClick={() => setViewProfileStudent(null)}>×</button>
              <div className="profile-avatar-large">
                {viewProfileStudent.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
              </div>
            </div>

            <div className="profile-info-body">
              <div className="profile-main-meta">
                <h2>{viewProfileStudent.name}</h2>
                <code className="profile-id-tag">{viewProfileStudent.id}</code>
                <span className={`status-pill ${viewProfileStudent.status.toLowerCase()}`}>
                  {viewProfileStudent.status}
                </span>
              </div>

              <div className="profile-details-grid">
                <div className="details-col">
                  <h4>Academic Status</h4>
                  <div className="detail-data-row">
                    <span className="data-lbl">Faculty:</span>
                    <span className="data-val">{viewProfileStudent.department}</span>
                  </div>
                  <div className="detail-data-row">
                    <span className="data-lbl">Course Focus:</span>
                    <span className="data-val">{viewProfileStudent.course}</span>
                  </div>
                  <div className="detail-data-row">
                    <span className="data-lbl">Enrolled Year:</span>
                    <span className="data-val">{viewProfileStudent.year}</span>
                  </div>
                </div>

                <div className="details-col">
                  <h4>Demographic</h4>
                  <div className="detail-data-row">
                    <span className="data-lbl">Age Group:</span>
                    <span className="data-val">{viewProfileStudent.age} Years</span>
                  </div>
                  <div className="detail-data-row">
                    <span className="data-lbl">Gender Identity:</span>
                    <span className="data-val">{viewProfileStudent.gender}</span>
                  </div>
                </div>
              </div>

              {/* Progress Gauges for Attendance and Marks */}
              <div className="profile-progress-gauges">
                <div className="gauge-item">
                  <div className="gauge-header">
                    <span>Academic Grade Marks</span>
                    <span className="gauge-percentage">{viewProfileStudent.marks}%</span>
                  </div>
                  <div className="gauge-bar-bg">
                    <div 
                      className={`gauge-bar-fill ${viewProfileStudent.marks >= 85 ? 'high' : viewProfileStudent.marks >= 60 ? 'mid' : 'low'}`} 
                      style={{ width: `${viewProfileStudent.marks}%` }}
                    ></div>
                  </div>
                </div>

                <div className="gauge-item">
                  <div className="gauge-header">
                    <span>Attendance Index</span>
                    <span className="gauge-percentage">{viewProfileStudent.attendance}%</span>
                  </div>
                  <div className="gauge-bar-bg">
                    <div 
                      className={`gauge-bar-fill ${viewProfileStudent.attendance >= 75 ? 'good' : 'warning'}`} 
                      style={{ width: `${viewProfileStudent.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Contact Information Details */}
              <div className="profile-contact-info">
                <h4>Contact Registry</h4>
                <div className="contact-link-row">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href={`mailto:${viewProfileStudent.email}`} className="contact-anchor">{viewProfileStudent.email}</a>
                </div>
                <div className="contact-link-row">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href={`tel:${viewProfileStudent.phone}`} className="contact-anchor">+{viewProfileStudent.phone.substring(0,3)} {viewProfileStudent.phone.substring(3,6)} {viewProfileStudent.phone.substring(6)}</a>
                </div>
              </div>
            </div>

            <div className="profile-card-footer">
              <button className="profile-action-btn edit" onClick={() => { handleEditClick(viewProfileStudent); setViewProfileStudent(null); }}>
                Edit Student Info
              </button>
              <button className="profile-action-btn delete" onClick={() => { handleDeleteTrigger(viewProfileStudent); setViewProfileStudent(null); }}>
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY: CUSTOM DELETE CONFIRMATION DIALOG MODAL */}
      {deleteConfirmStudent && (
        <div className="modal-backdrop-blur alert-backdrop animate-fade-in" onClick={() => setDeleteConfirmStudent(null)}>
          <div className="delete-dialog-box animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-warning-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3>Remove Academic Profile?</h3>
            <p>
              Are you sure you want to permanently delete the student file for <strong>{deleteConfirmStudent.name}</strong> (<code>{deleteConfirmStudent.id}</code>)?
            </p>
            <p className="sub-warning-desc">This operation will instantly wipe all grades, marks, and registry logs. This process cannot be undone.</p>
            <div className="dialog-button-actions">
              <button className="dialog-action-btn cancel" onClick={() => setDeleteConfirmStudent(null)}>
                Keep Profile
              </button>
              <button className="dialog-action-btn confirm" onClick={handleDeleteConfirm}>
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;