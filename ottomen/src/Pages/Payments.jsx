import React, { useState } from 'react';

const previewContent = {
  add: 'Add new payment record for a student.',
  manage: 'View, edit, or delete payment records.',
  setup: 'Configure payment categories and types.',
  discount: 'Set up discount schemes for students.'
};

export default function PaymentManagementApp() {
  const [activeTab, setActiveTab] = useState('add');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoverTab, setHoverTab] = useState(null);

  const displayTab = hoverTab || activeTab;

  const sidebarItems = [
    { id: 'add', icon: '💳', text: 'Add Payment' },
    { id: 'manage', icon: '📂', text: 'Manage Payment' },
    { id: 'setup', icon: '⚙️', text: 'Setup Payment' },
    { id: 'discount', icon: '🏷️', text: 'Setup Discount' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 relative`}
        onMouseLeave={() => setHoverTab(null)}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Payment Management</h1>}
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
          <h2 className="text-xl font-semibold text-gray-800">Payment Module</h2>
        </header>

        <section className="p-6">
          {displayTab === 'add' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Payment</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border px-4 py-2 rounded focus:ring-amber-500" type="text" placeholder="Student Name" />
                <input className="border px-4 py-2 rounded focus:ring-amber-500" type="number" placeholder="Amount" />
                <input className="border px-4 py-2 rounded focus:ring-amber-500" type="date" placeholder="Payment Date" />
                <select className="border px-4 py-2 rounded focus:ring-amber-500">
                  <option>Method</option>
                  <option>Cash</option>
                  <option>Card</option>
                </select>
                <button className="col-span-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Submit Payment
                </button>
              </form>
            </div>
          )}

          {displayTab === 'manage' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Payment Records</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">$500</td>
                    <td className="px-6 py-4">2025-04-25</td>
                    <td className="px-6 py-4">Card</td>
                    <td className="px-6 py-4">
                      <button className="text-amber-600 hover:text-amber-800 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {displayTab === 'setup' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Setup Payment Categories</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Tuition Fees</li>
                <li>Library Fees</li>
                <li>Transport Charges</li>
              </ul>
            </div>
          )}

          {displayTab === 'discount' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Setup Discount Schemes</h2>
              <div className="space-y-3">
                <div className="border p-4 rounded">
                  <h3 className="font-medium text-lg">Sibling Discount</h3>
                  <p className="text-gray-600 text-sm">10% off for second child</p>
                </div>
                <div className="border p-4 rounded">
                  <h3 className="font-medium text-lg">Merit Scholarship</h3>
                  <p className="text-gray-600 text-sm">Up to 25% based on grades</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
