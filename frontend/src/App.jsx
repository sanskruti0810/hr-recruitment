import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import ApplicationPage from './pages/ApplicationPage';
import InterviewsPage from './pages/InterviewsPage';
import ProfilePage from './pages/ProfilePage'; // <-- HA NAVIN LINE ADD KAR

import Sidebar from './components/sidebar';

// Layout with Sidebar
const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {children}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/jobs" element={<MainLayout><JobsPage /></MainLayout>} />
        <Route path="/applications" element={<MainLayout><ApplicationPage /></MainLayout>} />
        <Route path="/interviews" element={<MainLayout><InterviewsPage /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} /> {/* HA NAVIN ROUTE ADD KAR */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}