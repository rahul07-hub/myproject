import { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, Download } from 'lucide-react';

const PAGE_SIZE = 6;

export default function EmployeeList({ employees, openModal, handleDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const departments = useMemo(() => {
    const deps = new Set(employees.map(e => e.department));
    return ['All', ...Array.from(deps)];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const filtered = employees.filter(emp => {
      const roleName = emp.role || emp.designation || '';
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roleName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = departmentFilter === 'All' || emp.department === departmentFilter;
      const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      let aVal = a[sortBy] || '';
      let bVal = b[sortBy] || '';

      if (sortBy === 'role') {
        aVal = a.role || a.designation || '';
        bVal = b.role || b.designation || '';
      }

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      } else {
        return sortOrder === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
      }
    });
  }, [employees, searchTerm, departmentFilter, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE));
  const paginated = filteredEmployees.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Department', 'Role', 'Status', 'Phone', 'Join Date'];
    const rows = filteredEmployees.map(e => [e.name, e.email, e.department, e.role, e.status, e.phone, e.joinDate]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'employees.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h1>All Employees</h1>
          <p>{filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''} found</p>
        </div>
        <div className="page-header-actions">
          <button className="btn secondary sm" onClick={handleExportCSV}>
            <Download size={14} /> Export CSV
          </button>
          <button className="btn" onClick={() => openModal()}>
            <Plus size={15} /> Add Employee
          </button>
        </div>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-bar">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, role..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                aria-label="Search employees"
              />
            </div>
            <select
              className="filter-select"
              value={departmentFilter}
              onChange={e => { setDepartmentFilter(e.target.value); setPage(1); }}
              aria-label="Filter by department"
            >
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep === 'All' ? 'All Departments' : dep}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              aria-label="Filter by status"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Employee {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('employeeId')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Emp ID {sortBy === 'employeeId' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('department')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Department {sortBy === 'department' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('role')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Designation {sortBy === 'role' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Status {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(emp => (
                <tr key={emp.id} style={{ position: 'relative' }}>
                  <td>
                    <div className="employee-profile">
                      {emp.profileImage ? (
                        <img 
                          src={emp.profileImage} 
                          alt={emp.name} 
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div className="avatar">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                      )}
                      <div>
                        <div className="employee-name">{emp.name}</div>
                        <div className="employee-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {emp.employeeId || `EMP${emp.id.toString().padStart(3, '0')}`}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.845rem', color: 'var(--text-secondary)' }}>{emp.department}</td>
                  <td style={{ fontSize: '0.845rem', color: 'var(--text-secondary)' }}>{emp.role || emp.designation}</td>
                  <td>
                    <span className={`status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn ghost icon-only"
                        onClick={() => openModal(emp)}
                        title="Edit employee"
                        aria-label={`Edit ${emp.name}`}
                      >
                        <Edit2 size={15} color="var(--primary)" />
                      </button>
                      <button
                        className="btn ghost icon-only"
                        onClick={() => handleDelete(emp.id, emp.name)}
                        title="Delete employee"
                        aria-label={`Delete ${emp.name}`}
                      >
                        <Trash2 size={15} color="var(--danger)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Search size={22} />
              </div>
              <h3>No employees found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredEmployees.length > 0 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filteredEmployees.length)}–{Math.min(page * PAGE_SIZE, filteredEmployees.length)} of {filteredEmployees.length}
            </span>
            <div className="pagination-controls">
              <button
                className="page-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`page-btn${page === p ? ' active' : ''}`}
                  onClick={() => setPage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={page === p ? 'page' : undefined}
                >
                  {p}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
