'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KycPage() {
  const router = useRouter();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [countryOfIssuance, setCountryOfIssuance] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  
  const [currentStep, setCurrentStep] = useState(1);

  const handleContinue = () => {
    // For prototype - just log the data
    console.log('Form data:', {
      firstName,
      lastName,
      dateOfBirth,
      idNumber,
      countryOfIssuance,
      gender,
      city,
      country,
      postalCode,
      street,
      buildingNumber,
      apartmentNumber
    });
    
    // In a real application, this would submit the data
    // and navigate to the next step
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
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
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold text-[#1e2d4f] mb-8">
          Additional details for completing the investment
        </h1>

        {/* Info Box */}
        <div className="bg-[#f8f4e6] border border-[#e8dcc0] rounded-lg p-6 mb-8">
          <p className="text-[#1e2d4f] text-sm font-semibold mb-2">
            Thank you for making a payment.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-2">
            Our team will review your payment and notify you by email once the funds are received and verified.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-2">
            To meet regulatory requirements, we need some additional information to approve your Investment.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-2">
            Please complete the questionnaire below by providing or confirming your personal details.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            If nothing has changed, simply press <span className="font-semibold">Continue</span> to confirm.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="flex gap-8">
          {/* Left Sidebar - Steps */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {/* Step 1 - Active */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8ba361] text-white flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <span className={`text-sm font-medium ${currentStep === 1 ? 'text-[#1e2d4f]' : 'text-gray-400'}`}>
                    Personal information
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <span className={`text-sm font-medium ${currentStep === 2 ? 'text-[#1e2d4f]' : 'text-gray-400'}`}>
                    Investment type
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <span className={`text-sm font-medium ${currentStep === 3 ? 'text-[#1e2d4f]' : 'text-gray-400'}`}>
                    General information
                  </span>
                </div>

                {/* Step 4 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold flex-shrink-0">
                    4
                  </div>
                  <span className={`text-sm font-medium ${currentStep === 4 ? 'text-[#1e2d4f]' : 'text-gray-400'}`}>
                    Final declaration & review
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#1e2d4f] mb-8">Personal information</h2>

            {/* Personal identification details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#1e2d4f] mb-6">Personal identification details</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* ID Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* Country of ID Issuance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country of ID issuance <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={countryOfIssuance}
                    onChange={(e) => setCountryOfIssuance(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent appearance-none bg-white cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select country</option>
                    <option value="israel">Israel</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent appearance-none bg-white cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Current residential address */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#1e2d4f] mb-6">Current residential address</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent appearance-none bg-white cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select country</option>
                    <option value="israel">Israel</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                  </select>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* Street */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* Building Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={buildingNumber}
                    onChange={(e) => setBuildingNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>

                {/* Apartment Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apartment number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={apartmentNumber}
                    onChange={(e) => setApartmentNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8ba361] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                onClick={handleContinue}
                className="bg-[#8ba361] text-white px-8 py-2.5 rounded hover:bg-[#7a9254] font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

