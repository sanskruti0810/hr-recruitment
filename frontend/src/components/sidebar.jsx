import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaSearch, FaFileAlt, FaUser, FaSignOutAlt, FaBuilding } from 'react-icons/fa'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const menu = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaHome /> },
    { path: '/jobs', name: 'Find Jobs', icon: <FaSearch /> },
    { path: '/applications', name: 'My Applications', icon: <FaFileAlt /> },
    { path: '/interviews', name: 'Interviews', icon: <FaBuilding /> },
    { path: '/profile', name: 'Profile', icon: <FaUser /> },
  ]

  return (
    <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 flex flex-col justify-between border-r border-gray-100">
      <div>
        {/* Logo */}
        <div className="p-6">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            HR Portal
          </h2>
          <p className="text-xs text-gray-400 mt-1">Recruitment System</p>
        </div>

        {/* Menu */}
        <nav className="px-4 flex flex-col gap-1 mt-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 rounded-xl flex items-center gap-3 text-[15px] font-medium transition-all
                ${isActive(item.path) 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Profile + Logout */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3 bg-gray-50 p-3 rounded-xl">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'Sanskruti'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'candidate'}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full p-3 rounded-xl flex items-center gap-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar