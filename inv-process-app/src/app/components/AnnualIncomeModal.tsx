'use client';

import { useState } from 'react';
import CloseModalConfirmation from './CloseModalConfirmation';

interface AnnualIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (incomeRange: string) => void;
  onChangeAmount: () => void;
  investmentAmount: number;
  alreadyInvested?: number;
}

type IncomeRange = 'low' | 'medium' | 'high';

interface IncomeRangeOption {
  id: IncomeRange;
  label: string;
  maxPerOffer: string;
  maxAcrossOffers: string;
  maxPerOfferValue: number;
  maxAcrossOffersValue: number;
}

export default function AnnualIncomeModal({
  isOpen,
  onClose,
  onContinue,
  onChangeAmount,
  investmentAmount,
  alreadyInvested = 15000,
}: AnnualIncomeModalProps) {
  const [selectedRange, setSelectedRange] = useState<IncomeRange | null>(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  const incomeRanges: IncomeRangeOption[] = [
    {
      id: 'low',
      label: 'Up to ₪406,925',
      maxPerOffer: '₪11,625',
      maxAcrossOffers: '₪23,250',
      maxPerOfferValue: 11625,
      maxAcrossOffersValue: 23250,
    },
    {
      id: 'medium',
      label: '₪406,926 – ₪871,990',
      maxPerOffer: '₪34,875',
      maxAcrossOffers: '₪34,875',
      maxPerOfferValue: 34875,
      maxAcrossOffersValue: 34875,
    },
    {
      id: 'high',
      label: '₪871,991 – ₪1,395,175',
      maxPerOffer: '₪116,260 or 5% of annual income (whichever is lower)',
      maxAcrossOffers: '',
      maxPerOfferValue: 116260,
      maxAcrossOffersValue: 116260,
    },
  ];

  const validateInvestment = (range: IncomeRange): boolean => {
    const selectedOption = incomeRanges.find(r => r.id === range);
    if (!selectedOption) return false;

    const totalInvestment = investmentAmount + alreadyInvested;

    // Check per offer limit
    if (investmentAmount > selectedOption.maxPerOfferValue) {
      return false;
    }

    // Check across offers limit
    if (totalInvestment > selectedOption.maxAcrossOffersValue) {
      return false;
    }

    return true;
  };

  const getErrorMessage = (range: IncomeRange): string | null => {
    const selectedOption = incomeRanges.find(r => r.id === range);
    if (!selectedOption) return null;

    const totalInvestment = investmentAmount + alreadyInvested;

    // Check per offer limit first
    if (investmentAmount > selectedOption.maxPerOfferValue) {
      return `This income range allows a maximum of ${selectedOption.maxPerOffer} per offer. Your investment of ₪${investmentAmount.toLocaleString()} exceeds this limit.`;
    }

    // Check across offers limit (includes already invested amount)
    if (totalInvestment > selectedOption.maxAcrossOffersValue) {
      return `This income range allows a maximum of ${selectedOption.maxAcrossOffers} across all offers. With your previous investment of ₪${alreadyInvested.toLocaleString()}, your total would be ₪${totalInvestment.toLocaleString()}, which exceeds this limit.`;
    }

    return null;
  };

  const handleContinue = () => {
    if (selectedRange && validateInvestment(selectedRange)) {
      onContinue(selectedRange);
    }
  };

  const handleCloseAttempt = () => {
    setShowCloseConfirmation(true);
  };

  const handleConfirmChangeAmount = () => {
    setShowCloseConfirmation(false);
    onChangeAmount();
  };

  const handleConfirmDeclareIncome = () => {
    setShowCloseConfirmation(false);
  };

  const handleConfirmClose = () => {
    setShowCloseConfirmation(false);
    onClose();
  };

  const isValidSelection = selectedRange ? validateInvestment(selectedRange) : false;
  const errorMessage = selectedRange ? getErrorMessage(selectedRange) : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-start">
          <h1 className="text-3xl font-bold text-[#1e2d4f]">
            Invest in Europe Bundle
          </h1>
          <button
            onClick={handleCloseAttempt}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <h2 className="text-2xl font-semibold text-[#1e2d4f] mb-4">
            Annual Revenue Self Declaration
          </h2>

          <div className="mb-6">
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              In order to invest the selected amount ({investmentAmount.toLocaleString()}), you should declare your total annual income range as the Israel Securities Authority (ISA) limits investment amounts based on it.
            </p>
            <button
              onClick={() => setShowReadMore(!showReadMore)}
              className="text-blue-600 text-sm hover:underline"
            >
              Read more
            </button>
            
            {showReadMore && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                <p className="mb-2">
                  According to Israeli securities regulations, investment limits are determined based on your annual income to protect investors and ensure responsible investing.
                </p>
                <p>
                  The ISA has established different maximum investment thresholds for different income brackets, both per individual offering and across all crowdfunding investments annually.
                </p>
              </div>
            )}
          </div>

          {/* Income Range Selection */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-[#1e2d4f]">
                Select you annual income range
              </h3>
              <div className="relative group">
                <button
                  type="button"
                  className="text-[#1e2d4f] border border-[#1e2d4f] rounded-full w-5 h-5 flex items-center justify-center hover:bg-[#1e2d4f] hover:text-white transition-colors text-xs font-semibold"
                  aria-label="Information"
                >
                  ?
                </button>
                <div className="absolute left-0 top-full mt-2 w-72 bg-[#1e2d4f] text-white text-xs rounded-lg shadow-xl p-3 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="absolute -top-2 left-4 w-4 h-4 bg-[#1e2d4f] transform rotate-45"></div>
                  <p className="relative z-10">
                    Select your annual income range to determine your maximum investment limits according to ISA regulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {incomeRanges.map((range) => {
                const isInvalid = selectedRange === range.id && !validateInvestment(range.id);
                return (
                  <label
                    key={range.id}
                    className={`relative border-2 rounded-lg p-5 cursor-pointer transition-all ${
                      selectedRange === range.id && isInvalid
                        ? 'border-red-500 bg-red-50'
                        : selectedRange === range.id
                        ? 'border-[#1e2d4f] bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="incomeRange"
                      value={range.id}
                      checked={selectedRange === range.id}
                      onChange={() => setSelectedRange(range.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedRange === range.id && isInvalid
                              ? 'border-red-500 bg-red-500'
                              : selectedRange === range.id
                              ? 'border-[#1e2d4f] bg-[#1e2d4f]'
                              : 'border-gray-400'
                          }`}
                        >
                          {selectedRange === range.id && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#1e2d4f] mb-3 text-sm">
                          {range.label}
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>
                            <span className="font-medium">Max investment per offer:</span>{' '}
                            <span className="text-gray-800">{range.maxPerOffer}</span>
                          </div>
                          {range.maxAcrossOffers && (
                            <div>
                              <span className="font-medium">Max investment across offers:</span>{' '}
                              <span className="text-gray-800">{range.maxAcrossOffers}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Show error message if selected range is invalid */}
            {selectedRange && errorMessage && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Box - Only show when there's no error message */}
          {!errorMessage && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-700">
                  Please note that you&apos;ve already invested{' '}
                  <strong>{alreadyInvested.toLocaleString()} ILS</strong> within the past 12 months.
                </p>
              </div>
            </div>
          )}

          {/* Certification */}
          <div className="mb-6">
            <p className="text-gray-700 text-sm">
              By pressing submit, I certify that the investment corresponds to the limits based on my annual income.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center pt-4 border-t border-gray-200">
            <button
              onClick={handleContinue}
              disabled={!isValidSelection}
              className="px-8 py-2.5 bg-[#1e2d4f] text-white rounded hover:bg-[#2d3e60] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Close Confirmation Popup */}
      <CloseModalConfirmation
        isOpen={showCloseConfirmation}
        investmentAmount={investmentAmount}
        onChangeAmount={handleConfirmChangeAmount}
        onDeclareIncome={handleConfirmDeclareIncome}
        onClose={handleConfirmClose}
      />
    </div>
  );
}

