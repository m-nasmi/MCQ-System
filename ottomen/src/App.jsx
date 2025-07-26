import { Outlet } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNavigation />
      <main className="flex-1 overflow-auto">
        <Outlet /> {/* This renders the child routes like /home, /students etc. */}
      </main>
    </div>
  );
}
