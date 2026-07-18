require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Intercept and mock Mongoose for lightweight local running without local MongoDB
class MockQuery {
  constructor(result) {
    this.result = result;
  }
  select(fields) {
    if (this.result && fields === '-password') {
      if (Array.isArray(this.result)) {
        this.result = this.result.map(item => {
          const copy = { ...item };
          delete copy.password;
          return copy;
        });
      } else {
        const copy = { ...this.result };
        delete copy.password;
        this.result = copy;
      }
    }
    return this;
  }
  sort(sortObj) {
    if (Array.isArray(this.result) && sortObj.createdAt) {
      this.result = [...this.result].sort((a, b) => {
        return sortObj.createdAt === -1
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    return this;
  }
  then(onResolve, onReject) {
    return Promise.resolve(this.result).then(onResolve, onReject);
  }
}

const mockDbStore = {};

mongoose.connect = async function() {
  console.log('--- Database Mock Initialized Successfully ---');
  return true;
};

// Seed admin user
const bcrypt = require('bcryptjs');
const adminPasswordHash = bcrypt.hashSync('admin123', 10);

mockDbStore['User'] = [
  {
    _id: 'user_admin',
    id: 'user_admin',
    name: 'Admin User',
    email: 'admin@zoho.com',
    password: adminPasswordHash,
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Seed some initial employees
mockDbStore['Employee'] = [
  {
    _id: 'emp_1',
    id: 'emp_1',
    name: 'Amit Kumar',
    email: 'amit.kumar@zoho.com',
    phone: '+91 98765 43210',
    department: 'Engineering',
    role: 'Head of Engineering',
    status: 'Active',
    joinDate: '2023-01-15',
    location: 'Bangalore',
    manager: 'Rahul',
    salary: '2400000',
    skills: 'React, Node.js, System Design',
    rating: 5,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'emp_2',
    id: 'emp_2',
    name: 'Priya Singh',
    email: 'priya.singh@zoho.com',
    phone: '+91 98765 43211',
    department: 'Marketing',
    role: 'Marketing Lead',
    status: 'Active',
    joinDate: '2023-06-20',
    location: 'Mumbai',
    manager: 'Rahul',
    salary: '1800000',
    skills: 'SEO, Content Strategy, Brand',
    rating: 4.5,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'emp_3',
    id: 'emp_3',
    name: 'Neha Desai',
    email: 'neha.desai@zoho.com',
    phone: '+91 98765 43212',
    department: 'Human Resources',
    role: 'HR Manager',
    status: 'Active',
    joinDate: '2024-02-10',
    location: 'Chennai',
    manager: 'Rahul',
    salary: '1200000',
    skills: 'Talent Acquisition, Employee Engagement',
    rating: 4,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'emp_4',
    id: 'emp_4',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@zoho.com',
    phone: '+91 98765 43213',
    department: 'Sales',
    role: 'Sales Director',
    status: 'Active',
    joinDate: '2022-11-05',
    location: 'Delhi',
    manager: 'Rahul',
    salary: '2200000',
    skills: 'Enterprise Sales, Negotiation',
    rating: 4.8,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'emp_5',
    id: 'emp_5',
    name: 'Ravi Patel',
    email: 'ravi.patel@zoho.com',
    phone: '+91 98765 43214',
    department: 'Finance',
    role: 'Finance Controller',
    status: 'On Leave',
    joinDate: '2023-08-12',
    location: 'Pune',
    manager: 'Rahul',
    salary: '1600000',
    skills: 'Financial Planning, Auditing',
    rating: 4.2,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'emp_6',
    id: 'emp_6',
    name: 'Ananya Roy',
    email: 'ananya.roy@zoho.com',
    phone: '+91 98765 43215',
    department: 'Design',
    role: 'UI/UX Designer',
    status: 'Active',
    joinDate: '2024-04-01',
    location: 'Bangalore',
    manager: 'Rahul',
    salary: '1400000',
    skills: 'Figma, Prototyping, User Research',
    rating: 4.6,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

let idCounter = 100;

mongoose.model = function(name) {
  if (!mockDbStore[name]) {
    mockDbStore[name] = [];
  }
  const data = mockDbStore[name];

  class MockModel {
    constructor(obj) {
      Object.assign(this, obj);
      this._id = obj._id || ('mock_' + idCounter++);
      this.id = this._id;
      this.createdAt = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
    }
    async save() {
      const index = data.findIndex(d => String(d._id) === String(this._id));
      const plainObj = { ...this };
      // Remove standard methods to prevent infinite loop
      delete plainObj.save;
      if (index >= 0) {
        data[index] = { ...data[index], ...plainObj, updatedAt: new Date().toISOString() };
      } else {
        data.push(plainObj);
      }
      return this;
    }
  }

  MockModel.find = function() {
    return new MockQuery(data);
  };

  MockModel.findOne = function(query) {
    const item = data.find(d => {
      for (let key in query) {
        if (d[key] !== query[key]) return false;
      }
      return true;
    });
    return new MockQuery(item || null);
  };

  MockModel.findById = function(id) {
    const item = data.find(d => String(d._id) === String(id) || String(d.id) === String(id));
    return new MockQuery(item || null);
  };

  MockModel.findByIdAndUpdate = function(id, updateObj) {
    const index = data.findIndex(d => String(d._id) === String(id) || String(d.id) === String(id));
    if (index === -1) return new MockQuery(null);
    const updated = { ...data[index], ...updateObj.$set, updatedAt: new Date().toISOString() };
    data[index] = updated;
    return new MockQuery(updated);
  };

  MockModel.findByIdAndDelete = function(id) {
    const index = data.findIndex(d => String(d._id) === String(id) || String(d.id) === String(id));
    if (index === -1) return new MockQuery(null);
    const deleted = data[index];
    data.splice(index, 1);
    return new MockQuery(deleted);
  };

  return MockModel;
};

// Mock Schema constructor
mongoose.Schema = function() {
  return {};
};

const cors = require('cors');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
  res.send('Server Running');
});

// API Health Check
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API Server is running'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect();
    console.log('MongoDB Connected (Mock)...');
    console.log('Admin login credentials: admin@zoho.com / admin123');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
