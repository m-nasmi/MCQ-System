import React, { useState } from 'react';

const previewContent = {
  profile: 'Update your admin profile details and password.',
  system: 'Change school name, session, theme or language settings.'
};

export default function SettingsApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [hoverTab, setHoverTab] = useState(null);

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@school.com',
    password: ''
  });

  const [systemSettings, setSystemSettings] = useState({
    schoolName: 'Smart Future School',
    session: '2024-2025',
    language: 'English',
    theme: 'Light'
  });

  const sidebarItems = [
    { id: 'profile', icon: '👤', text: 'Profile Settings' },
    { id: 'system', icon: '⚙️', text: 'System Settings' }
  ];

  const displayTab = hoverTab || activeTab;

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert('Profile settings saved successfully!');
  };

  const handleSystemSave = (e) => {
    e.preventDefault();
    alert('System settings updated!');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 relative`}
        onMouseLeave={() => setHoverTab(null)}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Settings</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white focus:outline-none">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="mt-6">
          {sidebarItems.map(item => (
            <div
              key={item.id}
              className={`relative flex items-center px-4 py-3 ${activeTab === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'} cursor-pointer`}
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={() => setHoverTab(item.id)}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {sidebarOpen && <span>{item.text}</span>}

              {!sidebarOpen && hoverTab === item.id && (
                <div className="absolute left-full top-0 ml-2 w-64 bg-white text-gray-800 p-3 rounded shadow-lg z-50">
                  <h4 className="font-bold mb-1">{item.text}</h4>
                  <p className="text-sm">{previewContent[item.id]}</p>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">System Settings</h2>
        </header>

        <section className="p-6">
          {displayTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleProfileChange}
                    className="w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {displayTab === 'system' && (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">System Settings</h3>
              <form onSubmit={handleSystemSave} className="space-y-4">
                <div>
                  <label className="block text-gray-700">School Name</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={systemSettings.schoolName}
                    onChange={handleSystemChange}
                    className="w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Academic Session</label>
                  <input
                    type="text"
                    name="session"
                    value={systemSettings.session}
                    onChange={handleSystemChange}
                    className="w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Language</label>
                  <select
                    name="language"
                    value={systemSettings.language}
                    onChange={handleSystemChange}
                    className="w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-amber-500"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Theme</label>
                  <select
                    name="theme"
                    value={systemSettings.theme}
                    onChange={handleSystemChange}
                    className="w-full border px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-amber-500"
                  >
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
                >
                  Save Settings
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
