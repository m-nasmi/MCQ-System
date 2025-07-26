import { NavLink } from 'react-router-dom'

export default function NavItem({ to, icon, text, sidebarOpen }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 transition-colors ${
          isActive ? 'bg-gray-700 text-amber-400' : 'hover:bg-gray-700'
        }`
      }
    >
      <span className="text-xl mr-3">{icon}</span>
      {sidebarOpen && <span>{text}</span>}
    </NavLink>
  )
}