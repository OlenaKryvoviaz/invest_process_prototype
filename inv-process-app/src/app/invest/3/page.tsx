'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreditCardPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [cardholderName, setCardholderName] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  useEffect(() => {
    // Get investment amount from URL params or localStorage
    const amount = searchParams.get('amount') || localStorage.getItem('investmentAmount');
    if (amount) {
      const numAmount = parseFloat(amount);
      setInvestmentAmount(numAmount);
      setFee(Math.round(numAmount * 0.03)); // 3% fee
      localStorage.setItem('investmentAmount', amount);
    }
  }, [searchParams]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      // Format card number with spaces every 4 digits
      const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
      setCardNumber(formatted);
    }
  };

  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
      setIdNumber(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handlePayment = () => {
    // For prototype - allow moving forward without validation
    console.log('Processing payment...', {
      investmentAmount,
      fee,
      cardNumber,
      expirationDate,
      month,
      cardholderName,
      idNumber,
      cvv
    });
    // Navigate to next page or show success message
    alert('Payment processed successfully! (Prototype mode)');
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
        <h1 className="text-4xl font-bold text-[#1e2d4f] mb-8">Methods of Payment - Credit Card</h1>

        <div className="bg-white rounded-lg shadow-md p-12">
          <h2 className="text-xl font-semibold text-[#1e2d4f] mb-8">Credit Card Details</h2>

          {/* Investment Amount and Fees */}
          <div className="grid grid-cols-2 gap-12 mb-8">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Your investments amount
              </label>
              <div className="text-2xl font-semibold text-[#1e2d4f]">
                ₪ {investmentAmount.toLocaleString()}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Fees
              </label>
              <div className="text-2xl font-semibold text-[#1e2d4f]">
                ₪ {fee.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1345 5673 5568 7946B 3378"
              className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] focus:border-transparent"
            />
          </div>

          {/* Expiration Date and Month */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Expiration Date
              </label>
              <select
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] focus:border-transparent appearance-none bg-white cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '12px'
                }}
              >
                <option value="">Expiration Date</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] focus:border-transparent appearance-none bg-white cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '12px'
                }}
              >
                <option value="">Month</option>
                <option value="01">01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="David Kohen"
              className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] focus:border-transparent"
            />
          </div>

          {/* ID Number and CVV */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ID Number
              </label>
              <input
                type="text"
                value={idNumber}
                onChange={handleIdNumberChange}
                placeholder="234567904"
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="346"
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] focus:border-transparent"
              />
            </div>
          </div>

          {/* Payment Button */}
          <div className="mb-6">
            <button
              onClick={handlePayment}
              className="bg-[#1e2d4f] text-white px-8 py-3 rounded hover:bg-[#2d3e60] font-medium transition-colors"
            >
              To Payment
            </button>
          </div>

          {/* Bank Transfer Link */}
          <div className="mb-6">
            <p className="text-gray-700 text-sm">
              If instead of a card you want to pay via bank,{' '}
              <button 
                onClick={() => router.push('/invest/2')}
                className="text-[#1e2d4f] underline hover:text-[#2d3e60]"
              >
                click here
              </button>
            </p>
            <p className="text-gray-700 text-sm">Bank transfer payment</p>
          </div>

          {/* Payment Card Logos */}
          <div className="flex gap-3 mb-6">
            <div className="w-14 h-10 border border-gray-300 rounded flex items-center justify-center bg-white">
              <span className="text-[#1a1f71] font-bold text-xs">VISA</span>
            </div>
            <div className="w-14 h-10 border border-gray-300 rounded flex items-center justify-center bg-white">
              <div className="flex gap-0.5">
                <div className="w-5 h-5 rounded-full bg-[#eb001b]"></div>
                <div className="w-5 h-5 rounded-full bg-[#f79e1b] -ml-2"></div>
              </div>
            </div>
            <div className="w-14 h-10 border border-gray-300 rounded flex items-center justify-center bg-white">
              <div className="flex gap-0.5">
                <div className="w-4 h-4 rounded-full bg-[#0066b2]"></div>
                <div className="w-4 h-4 rounded-full bg-[#cc0000] -ml-1.5"></div>
              </div>
            </div>
            <div className="w-14 h-10 border border-gray-300 rounded flex items-center justify-center bg-white">
              <span className="text-[#0c3c82] font-bold text-[10px]">ישראכרט</span>
            </div>
            <div className="w-14 h-10 border border-gray-300 rounded flex items-center justify-center bg-white">
              <span className="text-[#003d82] font-bold text-[10px]">לאומי קארד</span>
            </div>
          </div>

          {/* Notes */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>* Can't pay with Diners card.</p>
            <p>
              * Your credit card will only be charged when th company has attempted at least 100% of the minimum raising target.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

