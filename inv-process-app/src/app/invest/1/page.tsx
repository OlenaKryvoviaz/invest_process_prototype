'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AnnualIncomeModal from '../../components/AnnualIncomeModal';

export default function InvestConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [incomeRange, setIncomeRange] = useState<string | null>(null);
  
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  // Investment limits
  const MAX_INVESTMENT = 8000;
  const ALREADY_INVESTED = 15000;
  const MAX_ANNUAL_INVESTMENT = 23250;

  useEffect(() => {
    const amount = searchParams.get('amount');
    const range = searchParams.get('incomeRange');
    if (amount) {
      setInvestmentAmount(amount);
    }
    if (range) {
      setIncomeRange(range);
    }
  }, [searchParams]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2; // 2x for retina
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Set drawing style
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    setHasSignature(true);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseAmount(value);
    setInvestmentAmount(value);
    
    // If user changes amount to exceed threshold and hasn't declared income range yet, show modal
    if (numValue > MAX_INVESTMENT && !incomeRange) {
      setShowIncomeModal(true);
    }
  };

  const parseAmount = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const currentAmount = parseAmount(investmentAmount);
  const hasError = currentAmount > MAX_INVESTMENT;

  const handleIncomeModalContinue = (selectedRange: string) => {
    setIncomeRange(selectedRange);
    setShowIncomeModal(false);
    console.log('Selected income range:', selectedRange);
  };

  const handleIncomeModalClose = () => {
    setShowIncomeModal(false);
    // User returns to the page with the error visible
  };

  const handleChangeAmount = () => {
    setShowIncomeModal(false);
    // User returns to the page with the error visible, can change the amount
  };

  const handleContinue = () => {
    // Store investment amount for next pages
    if (investmentAmount) {
      localStorage.setItem('investmentAmount', investmentAmount);
    }
    // Navigate to payment method selection page
    router.push('/invest/2');
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
        <h1 className="text-4xl font-bold text-[#1e2d4f] mb-8">Invest in Europe Bundle</h1>

        <div className="bg-white rounded-lg shadow-md p-12">
          <h2 className="text-2xl font-semibold text-[#1e2d4f] mb-8">Confirm investment amount</h2>

          {/* Investment Amount */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Investment amount
            </label>
            <input
              type="text"
              value={investmentAmount}
              onChange={handleAmountChange}
              className={`border rounded px-4 py-2 w-64 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent ${
                hasError && !incomeRange
                  ? 'border-red-500 focus:ring-red-500'
                  : hasError && incomeRange
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-gray-300 focus:ring-[#1e2d4f]'
              }`}
            />
            
            {hasError ? (
              incomeRange ? (
                // Success message - Income range declared
                <div className="mt-2 relative">
                  <div className="flex items-center gap-2">
                    <svg 
                      className="w-4 h-4 text-green-500 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <p className="text-green-600 text-sm">
                      Annual income range declared. You can proceed with your investment of{' '}
                      <strong>{currentAmount.toLocaleString()} ILS</strong>
                    </p>
                  </div>
                </div>
              ) : (
                // Error message - Need to declare income range
                <div className="mt-2 relative">
                  <div className="flex items-center gap-2">
                    <svg 
                      className="w-4 h-4 text-red-500 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <p className="text-red-600 text-sm">
                      You can invest in this project maximum{' '}
                      <strong>{MAX_INVESTMENT.toLocaleString()} ILS</strong>.{' '}
                      <button
                        onClick={() => setShowIncomeModal(true)}
                        className="text-[#1e2d4f] font-medium hover:underline focus:outline-none inline"
                      >
                        Declare your annual income range
                      </button>{' '}
                      to invest a higher amount.
                    </p>
                    
                    <div className="relative ml-1">
                      <button
                        type="button"
                        onClick={() => {
                          console.log('Tooltip clicked, current state:', showTooltip);
                          setShowTooltip(!showTooltip);
                        }}
                        onMouseEnter={() => {
                          console.log('Mouse entered');
                          setShowTooltip(true);
                        }}
                        onMouseLeave={() => {
                          console.log('Mouse left');
                          setShowTooltip(false);
                        }}
                        className="text-[#1e2d4f] border border-[#1e2d4f] rounded-full w-5 h-5 flex items-center justify-center hover:bg-[#1e2d4f] hover:text-white transition-colors focus:outline-none cursor-pointer"
                        aria-label="More information"
                      >
                        <span className="text-xs font-semibold">i</span>
                      </button>
                      
                      {showTooltip && (
                        <div className="absolute left-0 top-full mt-2 w-80 bg-[#1e2d4f] text-white text-sm rounded-lg shadow-xl p-4 z-[9999]">
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-[#1e2d4f] transform rotate-45"></div>
                          <p className="relative z-10">
                            (as you've already invested <strong>{ALREADY_INVESTED.toLocaleString()} ILS</strong> within the past 12 months while the maximum annual investment amount according to the current settings is <strong>{MAX_ANNUAL_INVESTMENT.toLocaleString()} ILS</strong>).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            ) : (
              <p className="text-gray-500 text-xs mt-1">Minimum ₪1000.</p>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-8">
            Equal to X shares before applying any discounts or special terms.
          </p>

          {/* Toggle Switches */}
          <div className="space-y-4 mb-8">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={checkbox1}
                  onChange={(e) => setCheckbox1(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  checkbox1 ? 'bg-[#1e2d4f]' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    checkbox1 ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </div>
              </div>
              <span className="text-gray-800 text-sm leading-relaxed">
                I confirm that I have read and accept the{' '}
                <a href="#" className="text-blue-600 underline hover:text-blue-800">risk disclosure</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 underline hover:text-blue-800">offering documents</a>.
              </span>
            </label>

            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={checkbox2}
                  onChange={(e) => setCheckbox2(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  checkbox2 ? 'bg-[#1e2d4f]' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    checkbox2 ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </div>
              </div>
              <span className="text-gray-800 text-sm leading-relaxed">
                I confirm that I am investing on my own behalf, using my own funds.
              </span>
            </label>

            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={checkbox3}
                  onChange={(e) => setCheckbox3(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  checkbox3 ? 'bg-[#1e2d4f]' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    checkbox3 ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </div>
              </div>
              <span className="text-gray-800 text-sm leading-relaxed">
                I allow my full name, picture, and investment amount to be displayed on the SMART FUNDING and REALTY BUNDLES platforms.
              </span>
            </label>
          </div>

          {/* Signature */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Please provide your signature here:
            </label>
            <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-48 cursor-crosshair"
                style={{ touchAction: 'none' }}
              />
              {hasSignature && (
                <button
                  onClick={clearSignature}
                  className="absolute top-2 right-2 bg-white border border-gray-300 rounded px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handleBack}
              className="px-8 py-2 border-2 border-[#1e2d4f] text-[#1e2d4f] rounded hover:bg-gray-50 font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!checkbox1 || !checkbox2 || !hasSignature || !investmentAmount || (hasError && !incomeRange)}
              className="px-8 py-2 bg-[#1e2d4f] text-white rounded hover:bg-[#2d3e60] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Annual Income Modal */}
      <AnnualIncomeModal
        isOpen={showIncomeModal}
        onClose={handleIncomeModalClose}
        onContinue={handleIncomeModalContinue}
        onChangeAmount={handleChangeAmount}
        investmentAmount={currentAmount}
        alreadyInvested={ALREADY_INVESTED}
      />
    </div>
  );
}
