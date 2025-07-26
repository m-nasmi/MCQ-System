import React, { useState } from 'react';

const previewContent = {
  addNew: 'Add a new student to the system with full details.',
  manage: 'View and edit all student records.',
  classes: 'Assign and manage student classes.',
  passed: 'List of students who passed their exams.',
  promote: 'Promote students to next grade or level.'
};

export default function StudentManagementApp() {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    age: '',
    grade: '',
    email: ''
  });

  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('addNew');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoverTab, setHoverTab] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, student]);
    alert('Student details submitted!');
    setStudent({ firstName: '', lastName: '', age: '', grade: '', email: '' });
  };

  const handleDelete = (index) => {
    const newList = students.filter((_, i) => i !== index);
    setStudents(newList);
  };

  const sidebarItems = [
    { id: 'addNew', icon: '➕', text: 'Add New Record' },
    { id: 'manage', icon: '📋', text: 'Manage Records' },
    { id: 'classes', icon: '🏫', text: 'Classes' },
    { id: 'passed', icon: '🎓', text: 'Passed Student List' },
    { id: 'promote', icon: '⬆️', text: 'Promote Students' }
  ];

  const displayTab = hoverTab || activeTab;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 relative`}
        onMouseLeave={() => setHoverTab(null)}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Student Management</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
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

              {/* Tooltip */}
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
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <select className="bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>Association No ▼</option>
            </select>
            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded">More ▼</button>
            <button className="flex items-center text-gray-700"><span className="mr-1">✔</span> Favorites</button>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search" className="bg-gray-100 border border-gray-300 rounded px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500" />
              <span className="absolute left-3 top-2.5">🔍</span>
            </div>
            <button className="text-gray-700">Clear</button>
            <button className="text-gray-700">Saved Searches</button>
          </div>
        </header>

        {/* Tab Content */}
        <section className="p-6">
          {displayTab === 'addNew' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Student Record</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={student.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={student.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" value={student.age} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="grade">Grade</label>
                    <input type="text" id="grade" name="grade" value={student.grade} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={student.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                </div>
                <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">Submit</button>
              </form>
            </div>
          )}

          {displayTab === 'manage' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Student Records</h2>
              {students.length === 0 ? (
                <p className="text-gray-500">No student records available.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((s, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{s.firstName} {s.lastName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{s.grade}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{s.age}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{s.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-amber-600 hover:text-amber-800 mr-2">Edit</button>
                            <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {displayTab === 'classes' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Class Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Grade 10', 'Grade 11', 'Grade 12'].map((grade, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">{grade}</h3>
                    <p className="text-gray-600">{20 + index * 5} Students</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayTab === 'passed' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Passed Student List</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Graduation Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap">A</td>
                    <td className="px-6 py-4 whitespace-nowrap">2023-05-15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {displayTab === 'promote' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Promote Students</h2>
              <div className="space-y-4">
                {[10, 11].map((grade) => (
                  <div key={grade} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Grade {grade}</h3>
                      <p className="text-sm text-gray-600">{grade + 10} students eligible for promotion</p>
                    </div>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded">
                      Promote to Grade {grade + 1}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
