'use client';

interface CloseModalConfirmationProps {
  isOpen: boolean;
  investmentAmount: number;
  onChangeAmount: () => void;
  onDeclareIncome: () => void;
  onClose: () => void;
}

export default function CloseModalConfirmation({
  isOpen,
  investmentAmount,
  onChangeAmount,
  onDeclareIncome,
  onClose,
}: CloseModalConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold text-[#1e2d4f] mb-4">
          The investment amount you&apos;ve selected exceeds the ISA limits
        </h2>

        <p className="text-gray-700 mb-8">
          To invest {investmentAmount.toLocaleString()}, you must declare a higher annual income on this step. Otherwise, go back and reduce your investment amount.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onChangeAmount}
            className="flex-1 px-6 py-3 border-2 border-[#1e2d4f] text-[#1e2d4f] rounded hover:bg-gray-50 font-medium transition-colors"
          >
            Change amount
          </button>
          <button
            onClick={onDeclareIncome}
            className="flex-1 px-6 py-3 bg-[#1e2d4f] text-white rounded hover:bg-[#2d3e60] font-medium transition-colors"
          >
            Back to declaration
          </button>
        </div>
      </div>
    </div>
  );
}

