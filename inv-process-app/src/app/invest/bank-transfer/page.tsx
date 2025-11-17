'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PaymentIncompleteModal from '../../components/PaymentIncompleteModal';

export default function BankTransferPage() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      console.log('Submitting transfer confirmation:', uploadedFile.name);
      setIsPaymentComplete(true); // Mark payment as complete
      // Navigate to KYC page for additional details
      router.push('/kyc');
    }
  };

  const handleTransferLater = () => {
    setShowPaymentModal(true);
  };

  const handleCloseAnyway = () => {
    // Mark payment as complete to allow closing
    setIsPaymentComplete(true);
    setShowPaymentModal(false);
    
    // Close the browser tab/window
    window.close();
    
    // Fallback: If window.close() doesn't work (e.g., not opened by script),
    // navigate to My Investments page
    setTimeout(() => {
      console.log('User chose to close anyway');
      router.push('/invest/my-investments');
    }, 100);
  };

  const handleBackToPayment = () => {
    setShowPaymentModal(false);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  const handleBack = () => {
    router.back();
  };

  // Handle browser tab close/refresh attempts
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show warning if payment is not complete
      if (!isPaymentComplete) {
        e.preventDefault();
        // Modern browsers require returnValue to be set
        e.returnValue = '';
        
        // Show our custom modal after a brief delay
        // Note: The browser will show its own confirmation dialog first
        setTimeout(() => {
          setShowPaymentModal(true);
        }, 100);
        
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPaymentComplete]);

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
        <h1 className="text-4xl font-bold text-[#1e2d4f] mb-8">Methods of Payment - Bank Transfer</h1>

        <div className="bg-white rounded-lg shadow-md p-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thank you for registering an investment! Please transfer the funds to complete it.
          </h2>

          <div className="mb-8">
            <p className="text-gray-700 text-base leading-relaxed">
              To complete your investment, please transfer the necessary funds to our trustee account. Payment instructions have been sent to your email address:{' '}
              <a href="mailto:ethansanders@gmail.com" className="text-[#4a7bba] hover:underline">
                ethansanders@gmail.com
              </a>
              .
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-8">
            <div className="flex items-start gap-3 bg-[#e8f1fb] border-l-4 border-[#4a7bba] p-4 rounded">
              <div className="flex-shrink-0 mt-0.5">
                <svg 
                  className="w-5 h-5 text-[#4a7bba]" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed">
                Once completed, please confirm you have transferred the funds by uploading confirmation of the transfer below.
              </p>
            </div>
          </div>

          {/* Uploaded Document Display */}
          {uploadedFile && (
            <div className="mb-6">
              <div className="flex items-center gap-3 bg-[#e8e8eb] px-4 py-3 rounded">
                <svg className="w-5 h-5 text-[#4a7bba] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm flex-grow">{uploadedFile.name}</span>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  aria-label="Remove file"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="mb-8">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className="px-6 py-2 border-2 border-[#4a7bba] text-[#4a7bba] rounded hover:bg-[#4a7bba] hover:text-white font-medium transition-colors"
            >
              Upload confirmation
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 pt-4">
            <button
              onClick={handleTransferLater}
              disabled={!!uploadedFile}
              className={`px-6 py-2 font-medium transition-colors ${
                uploadedFile
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : 'text-[#4a7bba] hover:text-[#3a6ba0] cursor-pointer'
              }`}
            >
              Transfer later
            </button>
            <button
              onClick={handleSubmit}
              disabled={!uploadedFile}
              className={`px-8 py-2 text-white rounded font-medium transition-colors ${
                uploadedFile 
                  ? 'bg-[#1e2d4f] hover:bg-[#2d3e60] cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Payment Incomplete Modal */}
      <PaymentIncompleteModal
        isOpen={showPaymentModal}
        onClose={handleCloseModal}
        onBackToPayment={handleBackToPayment}
        onCloseAnyway={handleCloseAnyway}
      />
    </div>
  );
}

