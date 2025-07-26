import React, { useState } from 'react';

const previewContent = {
  charts: 'View and manage your chart of accounts including assets, liabilities, and equity.',
  vouchers: 'Record journal vouchers for financial transactions.'
};

export default function AccountsApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('charts');
  const [hoverTab, setHoverTab] = useState(null);

  const [accounts, setAccounts] = useState([
    { name: 'Cash', type: 'Asset', code: '1001' },
    { name: 'Accounts Payable', type: 'Liability', code: '2001' },
  ]);

  const [vouchers, setVouchers] = useState([
    { date: '2025-04-01', description: 'Tuition Fee Payment', debit: 'Cash', credit: 'Revenue' },
  ]);

  const [newAccount, setNewAccount] = useState({ name: '', type: '', code: '' });
  const [newVoucher, setNewVoucher] = useState({ date: '', description: '', debit: '', credit: '' });

  const sidebarItems = [
    { id: 'charts', icon: '📊', text: 'Charts of Accounts' },
    { id: 'vouchers', icon: '🧾', text: 'Journal Vouchers' }
  ];

  const displayTab = hoverTab || activeTab;

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    setAccounts([...accounts, newAccount]);
    setNewAccount({ name: '', type: '', code: '' });
  };

  const handleVoucherSubmit = (e) => {
    e.preventDefault();
    setVouchers([...vouchers, newVoucher]);
    setNewVoucher({ date: '', description: '', debit: '', credit: '' });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 relative`}
        onMouseLeave={() => setHoverTab(null)}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Accounts</h1>}
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
          <h2 className="text-xl font-semibold text-gray-700">Accounts Management</h2>
        </header>

        <section className="p-6">
          {displayTab === 'charts' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Chart of Accounts</h3>
              <form onSubmit={handleAccountSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Account Name"
                  value={newAccount.name}
                  onChange={e => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Type (Asset/Liability/Equity)"
                  value={newAccount.type}
                  onChange={e => setNewAccount({ ...newAccount, type: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Account Code"
                  value={newAccount.code}
                  onChange={e => setNewAccount({ ...newAccount, code: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-amber-500"
                  required
                />
                <button
                  type="submit"
                  className="col-span-1 md:col-span-3 bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
                >
                  Add Account
                </button>
              </form>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts.map((acc, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{acc.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{acc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{acc.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {displayTab === 'vouchers' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Journal Vouchers</h3>
              <form onSubmit={handleVoucherSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                  type="date"
                  value={newVoucher.date}
                  onChange={e => setNewVoucher({ ...newVoucher, date: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newVoucher.description}
                  onChange={e => setNewVoucher({ ...newVoucher, description: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Debit Account"
                  value={newVoucher.debit}
                  onChange={e => setNewVoucher({ ...newVoucher, debit: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Credit Account"
                  value={newVoucher.credit}
                  onChange={e => setNewVoucher({ ...newVoucher, credit: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-amber-500"
                  required
                />
                <button
                  type="submit"
                  className="col-span-1 md:col-span-4 bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
                >
                  Add Voucher
                </button>
              </form>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Debit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vouchers.map((v, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{v.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.debit}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{v.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
