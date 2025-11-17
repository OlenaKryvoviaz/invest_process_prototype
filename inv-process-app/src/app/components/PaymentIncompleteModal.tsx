'use client';

interface PaymentIncompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToPayment: () => void;
  onCloseAnyway: () => void;
}

export default function PaymentIncompleteModal({
  isOpen,
  onClose,
  onBackToPayment,
  onCloseAnyway,
}: PaymentIncompleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold text-[#1e2d4f] mb-6">
          Complete payment to secure your investment
        </h2>

        <div className="space-y-4 mb-8">
          <p className="text-gray-700 leading-relaxed">
            If you leave now, your payment status is incomplete.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            To secure your investment, transfer the funds and upload the confirmation.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            If this isn&apos;t completed on time, your investment will be canceled.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onCloseAnyway}
            className="px-6 py-2.5 border-2 border-[#1e2d4f] text-[#1e2d4f] rounded hover:bg-gray-50 font-medium transition-colors"
          >
            Close anyway
          </button>
          <button
            onClick={onBackToPayment}
            className="px-6 py-2.5 bg-[#1e2d4f] text-white rounded hover:bg-[#2d3e60] font-medium transition-colors"
          >
            Back to payment
          </button>
        </div>
      </div>
    </div>
  );
}

