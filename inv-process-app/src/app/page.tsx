'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnnualIncomeModal from './components/AnnualIncomeModal';

export default function Home() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number>(6000);
  const [customAmount, setCustomAmount] = useState<string>('6,000');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const amountOptions = [6000, 12000, 30000, 100000];
  const INCOME_MODAL_THRESHOLD = 8000;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[₪,\s]/g, '');
    const numValue = Number(value);
    
    if (!isNaN(numValue)) {
      // Allow typing but enforce minimum on blur
      setCustomAmount(numValue > 0 ? numValue.toLocaleString('en-US') : '');
      setSelectedAmount(numValue);
    }
  };

  const handleAmountBlur = () => {
    // Enforce minimum of 1000
    if (selectedAmount < 1000 && selectedAmount > 0) {
      setSelectedAmount(1000);
      setCustomAmount('1,000');
    }
  };

  const handleInvest = () => {
    if (selectedAmount >= 1000) {
      if (selectedAmount > INCOME_MODAL_THRESHOLD) {
        setShowIncomeModal(true);
      } else {
        router.push(`/invest/1?amount=${selectedAmount}`);
      }
    }
  };

  const handleIncomeModalContinue = (incomeRange: string) => {
    setShowIncomeModal(false);
    // Store income range if needed (e.g., in localStorage or state management)
    console.log('Selected income range:', incomeRange);
    router.push(`/invest/1?amount=${selectedAmount}&incomeRange=${incomeRange}`);
  };

  const handleIncomeModalClose = () => {
    setShowIncomeModal(false);
    // Navigate to /invest/1 so user can see the error and change the amount
    router.push(`/invest/1?amount=${selectedAmount}`);
  };

  const handleChangeAmount = () => {
    setShowIncomeModal(false);
    // Navigate to /invest/1 so user can see the error and change the amount
    router.push(`/invest/1?amount=${selectedAmount}`);
  };

  return (
    <div className="min-h-screen bg-[#ededed]">
      {/* Top Bar */}
      <div className="bg-[#2d3e50] text-white py-2 px-8">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-xs">
          <div className="flex gap-6">
            <button className="hover:underline">Log In</button>
            <button className="hover:underline">Register</button>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">HE</span>
            <span className="text-gray-400">EN</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4 px-8">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex gap-10 items-center text-sm">
            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Active investment</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Fundraising</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Smart Club</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">How It Works</a>
            <a href="#" className="text-gray-900 font-medium pb-1 border-b-2 border-gray-900">Contact</a>
          </div>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[#1e2d4f] text-2xl font-bold">SMART</span>
            <span className="text-[#1e2d4f] text-2xl font-bold">BUNDLES</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#d0d0d0] to-[#ededed] py-8 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center">
              {/* Left - Logo and Text */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                  <div className="w-4 h-16 bg-[#1e2d4f] rounded"></div>
                  <div className="w-4 h-16 bg-[#8ba361] rounded"></div>
                </div>
                <div>
                  <h1 className="text-[#1e2d4f] text-3xl font-bold mb-2">
                    SMART BUNDLES
                  </h1>
                  <p className="text-gray-700 text-sm">
                    SMART BUNDLES the Israel&apos;s new real estate investment arena
                  </p>
                </div>
              </div>

              {/* Center - Laptop Image */}
              <div className="relative" style={{ perspective: '1200px' }}>
                <div 
                  className="w-[380px] h-[240px] bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg shadow-2xl"
                  style={{ transform: 'rotateY(-25deg) rotateX(10deg)' }}
                >
                  <div className="absolute top-2 left-2 right-8 bottom-12 bg-white rounded shadow-inner overflow-hidden">
                    <div className="p-4">
                      <div className="flex gap-2 mb-3">
                        <div className="w-2 h-2 bg-[#1e2d4f] rounded-sm"></div>
                        <div className="w-2 h-2 bg-[#8ba361] rounded-sm"></div>
                      </div>
                      <div className="text-[#1e2d4f] text-xs font-bold mb-2">SMART BUNDLES</div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Buttons */}
              <div className="flex flex-col gap-3">
                <button className="bg-[#4a5d7c] text-white px-6 py-3 rounded-full text-xs hover:bg-[#3d4f6a] transition-colors shadow-md flex items-center gap-2 whitespace-nowrap">
                  Send a question to the<br/>entrepreneurs
                  <span className="text-base">✉</span>
                </button>
                <button className="bg-[#4a5d7c] text-white px-8 py-3 rounded-full text-xs hover:bg-[#3d4f6a] transition-colors shadow-md">
                  Sharing ⚭⚮
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-6">
        <div className="flex gap-6">
          {/* Left Column */}
          <div className="flex-1">
            {/* Investment Amount Selection Section */}
            <div className="bg-[#3d4f6a] rounded-xl shadow-lg p-10 mb-6">
              <h2 className="text-white text-3xl font-light text-center mb-4">
                How much do you want to invest in Europe Bundle?
              </h2>
              
              <p className="text-white text-center text-lg mb-8">
                Select the amount of investment
              </p>

              {/* Amount Options */}
              <div className="grid grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
                {amountOptions.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount(amount.toLocaleString('en-US'));
                    }}
                    className={`py-6 px-4 rounded-lg transition-all font-semibold text-xl ${
                      selectedAmount === amount
                        ? 'bg-[#d4c5a0] text-[#2d3e50]'
                        : 'bg-white text-[#2d3e50] hover:bg-gray-100'
                    }`}
                  >
                    ₪ {amount.toLocaleString('en-US')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="text-center mb-6">
                <p className="text-white text-lg mb-4">
                  Or select an amount yourself
                </p>
                
                <div className="flex justify-center mb-2">
                  <div className="bg-white rounded-lg px-6 py-4 min-w-[320px]">
                    <input
                      type="text"
                      value={`₪ ${customAmount}`}
                      onChange={handleAmountChange}
                      onBlur={handleAmountBlur}
                      className="w-full text-center text-2xl font-semibold text-[#2d3e50] bg-transparent border-none outline-none"
                    />
                  </div>
                </div>
                
                <p className="text-white text-sm mb-6">
                  Minimum ₪ 1,000
                </p>
                
                <button 
                  onClick={handleInvest}
                  disabled={selectedAmount < 1000}
                  className="bg-[#d4c5a0] hover:bg-[#c9b88a] text-[#2d3e50] px-16 py-3 rounded-full font-medium transition-colors shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Invest
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="flex border-b border-gray-200">
                <button className="px-8 py-4 text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-900">
                  Review
                </button>
                <button className="px-8 py-4 text-gray-600 hover:text-gray-900">
                  Team
                </button>
                <button className="px-8 py-4 text-gray-600 hover:text-gray-900">
                  Docs
                </button>
                <button className="px-8 py-4 text-gray-600 hover:text-gray-900">
                  Investment
                </button>
                <button className="px-8 py-4 text-gray-600 hover:text-gray-900">
                  Updates
                </button>
              </div>

              {/* Content */}
              <div className="p-16 text-center">
                <h3 className="text-[#1e2d4f] text-2xl font-bold mb-4" dir="rtl">
                  זירת ההשקעות החדשה של ישראל
                </h3>
                <h2 className="text-[#1e2d4f] text-5xl font-bold mb-8">
                  SMART BUNDLES
                </h2>
                <div className="mb-12" dir="rtl">
                  <p className="text-[#8ba361] text-5xl font-bold leading-tight">
                    מחברת בין חברות נדל&quot;ן
                  </p>
                  <p className="text-[#8ba361] text-5xl font-bold leading-tight">
                    למשקיעים בכל סכום
                  </p>
                </div>
                
                {/* Phone mockup */}
                <div className="flex justify-center">
                  <div className="w-64 h-[450px] bg-gradient-to-br from-gray-900 to-black rounded-[3rem] shadow-2xl p-3 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl"></div>
                    <div className="w-full h-full bg-gray-800 rounded-[2.5rem] flex items-center justify-center mt-4">
                      <div className="text-center">
                        <div className="text-white text-2xl font-bold mb-2">SMART</div>
                        <div className="text-white text-2xl font-bold">BUNDLES</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Project Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-600 mb-2">
                The status of the project: <span className="font-semibold text-gray-900">Raising now</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">Project End Date:</p>
              <p className="text-sm text-gray-600">
                Days left: <span className="font-semibold text-gray-900">0</span>
              </p>
            </div>

            {/* Investment Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                  💼
                </div>
              </div>
              
              <button className="w-full bg-[#d4c5a0] hover:bg-[#c9b88a] text-gray-800 py-3 rounded-lg mb-6 transition-colors text-sm font-medium">
                Want to lead this<br/>project?
              </button>

              {/* Progress Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#3d4f6a"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 52 * 0.4} ${2 * Math.PI * 52}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#1e2d4f]">40%</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">From the amount</p>
                <p className="text-sm text-gray-600 mb-4">of the capital raising target</p>
                
                <p className="text-lg font-semibold text-gray-900">54 People have already</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">invested</p>
                
                <p className="text-sm text-gray-600">₪159,616 out of ₪400,000</p>
              </div>
            </div>

            {/* Our Team */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900">Our team</h3>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Frequently asked Questions
              </h3>
              <div className="space-y-2">
                {[
                  'Jakubowski LtdKub-Howe',
                  'Hyatt and SonsJerde, Crooks and Schowalter',
                  'Jones-BoscoSmith PLC',
                  'Olson, Schuppe and GleasonGrant-Koss',
                  'Stiedemann-WeichMante PLC',
                  'Gutkowski-KovacekSchumm-Barrows',
                  'Larkin LtdCummerata, Reichel and Schiller',
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex justify-between items-center text-left"
                  >
                    <span className="text-sm text-gray-700">{item}</span>
                    <span className="text-gray-400 text-lg font-light">
                      {expandedFaq === index ? '−' : '+'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Income Modal */}
      <AnnualIncomeModal
        isOpen={showIncomeModal}
        onClose={handleIncomeModalClose}
        onContinue={handleIncomeModalContinue}
        onChangeAmount={handleChangeAmount}
        investmentAmount={selectedAmount}
        alreadyInvested={15000}
      />
    </div>
  );
}
