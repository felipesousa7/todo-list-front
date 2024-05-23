import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Task/TaskList';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="tasks" element={<TaskList />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
