import { Link } from 'react-router-dom';

export default function HomePage() {
  // Sample data - replace with your actual data
  const stats = {
    totalStudents: 248,
    activeStudents: 215,
    pendingPayments: 18,
    recentActivity: [
      { id: 1, name: 'John Doe', action: 'Payment Received', time: '2 hours ago' },
      { id: 2, name: 'Jane Smith', action: 'Profile Updated', time: '5 hours ago' },
      { id: 3, name: 'Robert Johnson', action: 'New Registration', time: '1 day ago' }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-amber-600 flex items-center">
            <span className="bg-amber-100 p-2 rounded-lg mr-3">🎓</span>
            Student Management System
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-amber-600 font-medium border-b-2 border-amber-600 pb-1">Home</Link>
          <Link to="/students" className="text-gray-700 hover:text-amber-600 font-medium">Students</Link>
          <Link to="/payments" className="text-gray-700 hover:text-amber-600 font-medium">Payments</Link>
          <Link to="/reports" className="text-gray-700 hover:text-amber-600 font-medium">Reports</Link>
        </nav>
        <div className="md:hidden">
          <button className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Welcome Section with Stats */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-md p-8 mb-8 text-white">
          <h2 className="text-3xl font-semibold mb-2">Welcome Back, Admin!</h2>
          <p className="mb-6 opacity-90">Here's what's happening with your school today</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-30 p-3 rounded-full mr-3">
                  <span className="text-xl">👥</span>
                </div>
                <div>
                  <p className="text-sm opacity-80">Total Students</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
              </div>
            </div>
            
            {/* Stat Card 2 */}
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-30 p-3 rounded-full mr-3">
                  <span className="text-xl">✅</span>
                </div>
                <div>
                  <p className="text-sm opacity-80">Active Students</p>
                  <p className="text-2xl font-bold">{stats.activeStudents}</p>
                </div>
              </div>
            </div>
            
            {/* Stat Card 3 */}
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-30 p-3 rounded-full mr-3">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <p className="text-sm opacity-80">Pending Payments</p>
                  <p className="text-2xl font-bold">{stats.pendingPayments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Action Card 1 */}
              <Link to="/students/add" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl text-amber-600">➕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Add New Student</h4>
                    <p className="text-sm text-gray-500">Register a new student</p>
                  </div>
                </div>
              </Link>

              {/* Action Card 2 */}
              <Link to="/payments" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl text-green-600">💳</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Record Payment</h4>
                    <p className="text-sm text-gray-500">Add a new payment</p>
                  </div>
                </div>
              </Link>

              {/* Action Card 3 */}
              <Link to="/reports" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl text-blue-600">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Generate Reports</h4>
                    <p className="text-sm text-gray-500">View student reports</p>
                  </div>
                </div>
              </Link>

              {/* Action Card 4 */}
              <Link to="/students/promote" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <span className="text-2xl text-purple-600">⬆️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Promote Students</h4>
                    <p className="text-sm text-gray-500">Advance to next grade</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
            <div className="bg-white rounded-xl shadow-md p-6">
              <ul className="space-y-4">
                {stats.recentActivity.map(activity => (
                  <li key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <span className="text-amber-600">
                        {activity.action.includes('Payment') ? '💸' : 
                         activity.action.includes('Profile') ? '✏️' : '📝'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">{activity.name}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/activity" className="text-amber-600 text-sm font-medium mt-4 inline-block hover:text-amber-700">
                View all activity →
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Events</h3>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">No upcoming events scheduled</p>
              <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                Add Event
              </button>
            </div>
            <div className="text-center py-8">
              <span className="text-4xl mb-2 inline-block">📅</span>
              <p className="text-gray-500">No events planned for this week</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center p-4 text-gray-500 text-sm shadow-inner">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Student Management System. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-amber-600">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-600">Terms of Service</Link>
            <Link to="/contact" className="hover:text-amber-600">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}