'use client';

import { useRouter } from 'next/navigation';

export default function MyInvestmentsPage() {
  const router = useRouter();

  const investments = [
    {
      n: 4,
      campaignName: 'Europe Bundle',
      investmentDate: '12.12.2025',
      investmentStatus: 'Booked Investment',
      investmentStatusSubtext: 'Bank Transfer',
      investmentAmount: '1000 ILS',
      amountOfShares: '10,000',
      verificationStatus: 'Verified',
      hasInfo: true,
    },
    {
      n: 3,
      campaignName: 'Sweden Bundle',
      investmentDate: '12.11.2025',
      investmentStatus: 'Payment Confirmed',
      investmentStatusSubtext: 'credit card',
      investmentAmount: '1000 ILS',
      amountOfShares: '10,000',
      verificationStatus: 'Verified',
      hasInfo: true,
    },
    {
      n: 3344,
      campaignName: 'North America Bundle',
      investmentDate: '12.10.2025',
      investmentStatus: 'Waiting For Approval',
      investmentStatusSubtext: '',
      investmentAmount: '500,000 ILS',
      amountOfShares: '5,000,000',
      verificationStatus: 'Verified',
      hasInfo: true,
    },
    {
      n: 1,
      campaignName: 'SMART BUNDLES',
      campaignSubtext: 'fundraising campaign',
      investmentDate: '12.05.2025',
      investmentStatus: 'Active',
      investmentStatusSubtext: '',
      investmentAmount: '10,000 ILS',
      amountOfShares: '100,000',
      verificationStatus: 'Verified',
      hasInfo: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#ededed]">
      {/* Top Bar */}
      <div className="bg-[#1e2d4f] text-white py-2 px-8">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-8 items-center">
            <button className="flex items-center gap-2 hover:text-gray-300">
              <span className="text-lg">⊕</span>
              <span>Test</span>
            </button>
            <button className="hover:text-gray-300">Profile</button>
            <button className="hover:text-gray-300">Logout</button>
          </div>
          <div className="flex gap-3">
            <span className="font-semibold">HE</span>
            <span className="text-[#8ba361]">EN</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4 px-8">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex gap-10 items-center text-sm">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Active investment</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Fundraising</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Smart Club</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">How It works</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
          </div>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[#1e2d4f] text-2xl font-bold">SMART</span>
            <span className="text-[#1e2d4f] text-2xl font-bold">BUNDLES</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-[#1e2d4f] text-xl font-bold mb-3">Leader</h2>
              
              <div className="mb-6">
                <h3 className="text-[#1e2d4f] text-base font-semibold mb-1">
                  I want to be a leader
                </h3>
                <p className="text-gray-500 text-sm">
                  It&apos;s a leadership application form
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-[#1e2d4f] text-sm font-semibold mb-2">
                  Select Project
                </label>
                <input
                  type="text"
                  placeholder="Name of the project"
                  className="w-full px-3 py-2 bg-[#f5f5f7] border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a7bba]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[#1e2d4f] text-sm font-semibold mb-2">
                  Comment
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 bg-[#f5f5f7] border border-gray-300 rounded text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#4a7bba]"
                />
              </div>

              <button className="w-full bg-[#1e2d4f] text-white py-2 rounded hover:bg-[#2d3e60] font-medium transition-colors text-sm">
                Send Request
              </button>
            </div>
          </div>

          {/* Main Content - My Investments Table */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md">
              {/* Search Bar */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7bba]"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Table Title */}
              <div className="px-6 py-4">
                <h1 className="text-2xl font-bold text-[#1e2d4f]">My Investments</h1>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        N
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        Campaign Name ⌄
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        Investment Date ⌄
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        Investment Status ⌄
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        Investment Amount ⌄
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        Amount of Shares/Units ⌄
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        Verification Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#1e2d4f] uppercase tracking-wider">
                        Investment Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {investments.map((investment, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {investment.n}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{investment.campaignName}</div>
                            {investment.campaignSubtext && (
                              <div className="text-xs text-gray-500">{investment.campaignSubtext}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {investment.investmentDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <div>
                              <div
                                className={`font-medium ${
                                  investment.investmentStatus === 'Booked Investment'
                                    ? 'text-[#c67a4a]'
                                    : investment.investmentStatus === 'Payment Confirmed'
                                    ? 'text-gray-900'
                                    : investment.investmentStatus === 'Waiting For Approval'
                                    ? 'text-gray-600'
                                    : investment.investmentStatus === 'Active'
                                    ? 'text-[#8ba361]'
                                    : 'text-gray-900'
                                }`}
                              >
                                {investment.investmentStatus}
                              </div>
                              {investment.investmentStatusSubtext && (
                                <div className="text-xs text-gray-500">
                                  {investment.investmentStatusSubtext}
                                </div>
                              )}
                            </div>
                            {investment.hasInfo && (
                              <button
                                className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-400 text-white text-xs font-semibold flex items-center justify-center hover:bg-gray-500 transition-colors"
                                aria-label="More information"
                              >
                                i
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {investment.investmentAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {investment.amountOfShares}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {investment.verificationStatus}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="px-4 py-2 border border-[#4a7bba] text-[#4a7bba] rounded hover:bg-[#4a7bba] hover:text-white transition-colors text-xs font-medium">
                            Check Investment Progress
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        500,000 ILS
                      </td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Rows per page: <span className="font-medium">10</span> ⌄
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50">
                      &lt;
                    </button>
                    <button className="px-3 py-1 bg-[#1e2d4f] text-white text-sm rounded">
                      1
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                      2
                    </button>
                    <span className="text-gray-400">...</span>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                      10
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

