import React, { useState } from 'react';

const previewContent = {
  student: 'View detailed reports of student registrations and statuses.',
  attendance: 'Track daily, monthly attendance statistics of students.',
  payment: 'Check all payment transactions, due fees, and discounts applied.'
};

export default function ReportsApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('student');
  const [hoverTab, setHoverTab] = useState(null);

  const sidebarItems = [
    { id: 'student', icon: '📚', text: 'Student Reports' },
    { id: 'attendance', icon: '🗓️', text: 'Attendance Reports' },
    { id: 'payment', icon: '💳', text: 'Payment Reports' }
  ];

  const displayTab = hoverTab || activeTab;

  const sampleStudentReports = [
    { id: 1, name: 'John Doe', class: 'Grade 10', status: 'Active' },
    { id: 2, name: 'Jane Smith', class: 'Grade 9', status: 'Graduated' }
  ];

  const sampleAttendanceReports = [
    { id: 1, date: '2025-04-01', present: 98, absent: 5 },
    { id: 2, date: '2025-04-02', present: 96, absent: 7 }
  ];

  const samplePaymentReports = [
    { id: 1, name: 'John Doe', amount: '$500', status: 'Paid' },
    { id: 2, name: 'Jane Smith', amount: '$450', status: 'Pending' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 relative`}
        onMouseLeave={() => setHoverTab(null)}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Reports</h1>}
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
          <h2 className="text-xl font-semibold text-gray-700">Reports Overview</h2>
        </header>

        <section className="p-6">
          {displayTab === 'student' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Reports</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Class</th>
                      <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {sampleStudentReports.map(student => (
                      <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">{student.id}</td>
                        <td className="py-3 px-6 text-left">{student.name}</td>
                        <td className="py-3 px-6 text-left">{student.class}</td>
                        <td className="py-3 px-6 text-left">{student.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {displayTab === 'attendance' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Reports</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Present</th>
                      <th className="py-3 px-6 text-left">Absent</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {sampleAttendanceReports.map(att => (
                      <tr key={att.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">{att.date}</td>
                        <td className="py-3 px-6 text-left">{att.present}</td>
                        <td className="py-3 px-6 text-left">{att.absent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {displayTab === 'payment' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Reports</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Student Name</th>
                      <th className="py-3 px-6 text-left">Amount</th>
                      <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {samplePaymentReports.map(payment => (
                      <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">{payment.name}</td>
                        <td className="py-3 px-6 text-left">{payment.amount}</td>
                        <td className="py-3 px-6 text-left">{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
