'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentMethodPage() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const handleContinue = () => {
    if (selectedPaymentMethod) {
      // Get investment amount from localStorage or URL
      const amount = localStorage.getItem('investmentAmount') || '0';
      
      if (selectedPaymentMethod === 'credit-card') {
        router.push(`/invest/3?amount=${amount}`);
      } else if (selectedPaymentMethod === 'bank-transfer') {
        router.push('/invest/bank-transfer');
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

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
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-[#1e2d4f] mb-8">Methods of Payment</h1>

        <div className="bg-white rounded-lg shadow-md p-12 mb-6">
          <h2 className="text-xl font-semibold text-[#1e2d4f] mb-6">Please choose a payment method</h2>

          {/* Payment Options */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={selectedPaymentMethod === 'credit-card'}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#1e2d4f] border-gray-400 focus:ring-[#1e2d4f] focus:ring-2 cursor-pointer"
                />
              </div>
              <span className="text-[#1e2d4f] font-semibold text-base">Credit Card</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank-transfer"
                  checked={selectedPaymentMethod === 'bank-transfer'}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#1e2d4f] border-gray-400 focus:ring-[#1e2d4f] focus:ring-2 cursor-pointer"
                />
              </div>
              <span className="text-[#1e2d4f] font-semibold text-base">Bank Transfer</span>
            </label>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedPaymentMethod}
            className={`px-8 py-2 text-white rounded font-medium transition-colors ${
              selectedPaymentMethod
                ? 'bg-[#1e2d4f] hover:bg-[#2d3e60] cursor-pointer'
                : 'bg-[#a5b3c8] cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

