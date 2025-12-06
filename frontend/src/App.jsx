import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestFranchise from './components/RequestFranchise';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Status from './components/Status';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<RequestFranchise />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
