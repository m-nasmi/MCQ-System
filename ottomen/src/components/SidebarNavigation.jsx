import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import NavItem from './NavItem'

export default function SidebarNavigation() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 h-full`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {sidebarOpen && <h1 className="text-xl font-bold">SERENDILABS</h1>}
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </div>
      <nav className="mt-6">
        <NavItem to="/home" icon="🏠" text="Home" sidebarOpen={sidebarOpen} />
        <NavItem to="/examlist" icon="📝" text="Exam List" sidebarOpen={sidebarOpen} />
        <NavItem to="/managementsystem" icon="👨‍🎓" text="Student Management" sidebarOpen={sidebarOpen} />
        <NavItem to="/payments" icon="💰" text="Payments" sidebarOpen={sidebarOpen} />
        <NavItem to="/reports" icon="📊" text="Reports" sidebarOpen={sidebarOpen} />
        <NavItem to="/settings" icon="⚙️" text="Settings" sidebarOpen={sidebarOpen} />
        <NavItem to="/accounts" icon="🧮" text="Accounts" sidebarOpen={sidebarOpen} />
        
      </nav>
    </div>
  )
}