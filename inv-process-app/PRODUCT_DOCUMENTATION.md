# Smart Bundles Investment Process - Product Documentation

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [User Journey](#user-journey)
4. [Technical Architecture](#technical-architecture)
5. [Page Documentation](#page-documentation)
6. [Component Documentation](#component-documentation)
7. [Regulatory Compliance](#regulatory-compliance)
8. [Installation & Setup](#installation--setup)
9. [Dependencies](#dependencies)

---

## Overview

**Smart Bundles** is a modern web-based investment platform designed to connect real estate investment opportunities with investors in Israel. The platform enables users to invest in real estate bundles with flexible investment amounts starting from ₪1,000.

### Purpose
The application provides a complete investment workflow that includes:
- Investment amount selection and validation
- Regulatory compliance with Israeli Securities Authority (ISA) requirements
- Multiple payment method options
- KYC (Know Your Customer) data collection
- Investment portfolio management

### Target Audience
- Individual investors interested in real estate crowdfunding
- Israeli residents looking to diversify their investment portfolio
- Investors seeking regulated, transparent investment opportunities

### Technology Stack
- **Framework**: Next.js 16.0.1 with App Router
- **React**: 19.2.0
- **TypeScript**: ^5
- **Styling**: Tailwind CSS v4
- **Runtime**: Node.js
- **Development Server**: Port 4000

---

## Key Features

### 1. Dynamic Investment Selection
- Pre-defined investment amounts (₪6,000, ₪12,000, ₪30,000, ₪100,000)
- Custom investment amount input with minimum ₪1,000
- Real-time validation and formatting
- Investment threshold checks

### 2. ISA Regulatory Compliance
- Automatic detection of investments exceeding base limits (₪8,000)
- Annual income range declaration modal
- Investment limit validation based on income brackets:
  - **Low Income** (Up to ₪406,925): Max ₪11,625 per offer, ₪23,250 across offers
  - **Medium Income** (₪406,926 – ₪871,990): Max ₪34,875 per offer and across offers
  - **High Income** (₪871,991 – ₪1,395,175): Max ₪116,260 or 5% of annual income
- Historical investment tracking (12-month window)
- Real-time validation with error messaging

### 3. Digital Investment Confirmation
- Multi-checkbox consent system
- Digital signature canvas with HTML5
- Risk disclosure acknowledgment
- Investment terms acceptance
- Personal fund confirmation

### 4. Multiple Payment Methods
- **Credit Card Payment**
  - Card number, expiration date, CVV
  - Cardholder name and ID validation
  - 3% transaction fee display
  - Support for Visa, Mastercard, Israeli cards (Isracard, Leumi Card)
- **Bank Transfer**
  - Email instructions
  - Upload confirmation document
  - Payment status tracking
  - Exit warning system for incomplete payments

### 5. KYC Data Collection
- Multi-step form wizard (4 steps)
  - Personal identification details
  - Investment type
  - General information
  - Final declaration & review
- Address validation
- ID verification
- Date of birth collection
- Gender selection
- Country of issuance tracking

### 6. Investment Portfolio Dashboard
- Comprehensive investment table view
- Multiple investment statuses:
  - Booked Investment
  - Payment Confirmed
  - Waiting For Approval
  - Active
- Search functionality
- Sortable columns
- Investment progress tracking
- Total investment calculations
- Pagination support

### 7. Leader Application System
- Project selection form
- Comment submission
- Leadership request workflow

---

## User Journey

### Primary Investment Flow

```
1. Home Page (Landing)
   ├── Select Investment Amount
   ├── Choose Predefined Amount OR Enter Custom Amount
   └── Click "Invest"
        ├── If Amount > ₪8,000 → Annual Income Modal
        │   ├── Select Income Range
        │   ├── Validate Against Investment Limits
        │   └── Continue or Change Amount
        └── Navigate to Investment Confirmation

2. Investment Confirmation (/invest/1)
   ├── Confirm Investment Amount
   │   └── Modify if needed (triggers income check if > ₪8,000)
   ├── Accept Risk Disclosures (3 checkboxes)
   ├── Provide Digital Signature
   └── Click "Continue"

3. Payment Method Selection (/invest/2)
   ├── Choose Credit Card OR Bank Transfer
   └── Click "Continue"

4a. Credit Card Payment (/invest/3)
   ├── Enter Card Details
   ├── View Investment Amount + Fees
   ├── Submit Payment
   └── Navigate to KYC

4b. Bank Transfer (/invest/bank-transfer)
   ├── View Bank Instructions (sent via email)
   ├── Upload Transfer Confirmation
   ├── Handle "Transfer Later" option
   │   └── Payment Incomplete Warning Modal
   └── Navigate to KYC

5. KYC Process (/kyc)
   ├── Step 1: Personal Identification
   │   ├── Name, DOB, ID Number
   │   ├── Country of ID Issuance
   │   └── Gender
   ├── Step 2: Investment Type (placeholder)
   ├── Step 3: General Information (placeholder)
   └── Step 4: Final Declaration & Review (placeholder)

6. Investment Dashboard (/invest/my-investments)
   ├── View All Investments
   ├── Track Investment Status
   ├── Apply for Leadership Roles
   └── Monitor Investment Progress
```

### Secondary Flows

**Annual Income Declaration Modal Flow:**
```
Triggered When: Investment Amount > ₪8,000
├── Select Annual Income Range
├── View Maximum Investment Limits
├── Validate Current + Past Investments (12 months)
├── Display Error if Exceeds Limits
│   └── Options: Change Amount OR Select Higher Income Range
└── Submit Declaration → Continue Investment
```

**Payment Incomplete Flow:**
```
Triggered When: User attempts to leave bank transfer page without uploading confirmation
├── Display Warning Modal
│   ├── "Close Anyway" → Navigate to My Investments
│   └── "Back to Payment" → Return to Upload Form
└── Browser Close Warning (beforeunload event)
```

---

## Technical Architecture

### Application Structure

```
inv-process-app/
├── src/
│   └── app/
│       ├── components/
│       │   ├── AnnualIncomeModal.tsx       # Income declaration component
│       │   ├── CloseModalConfirmation.tsx  # Close warning for income modal
│       │   └── PaymentIncompleteModal.tsx  # Bank transfer exit warning
│       ├── invest/
│       │   ├── 1/page.tsx                  # Investment confirmation
│       │   ├── 2/page.tsx                  # Payment method selection
│       │   ├── 3/page.tsx                  # Credit card payment
│       │   ├── bank-transfer/page.tsx      # Bank transfer
│       │   └── my-investments/page.tsx     # Investment dashboard
│       ├── kyc/page.tsx                    # KYC form
│       ├── page.tsx                        # Home/Landing page
│       ├── layout.tsx                      # Root layout
│       ├── globals.css                     # Global styles
│       └── favicon.ico
├── public/                                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

### State Management

The application uses **React's built-in hooks** for state management:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- `useRouter` for navigation
- `useSearchParams` for URL parameter handling
- `localStorage` for persisting investment amount across pages

### Data Flow

1. **Investment Amount**: Passed via URL query parameters and localStorage
2. **Income Range**: Stored in component state and passed via URL
3. **Form Data**: Logged to console (prototype - no backend integration)
4. **Payment Status**: Tracked via component state

### Navigation Pattern

- Client-side routing using Next.js App Router
- Programmatic navigation with `useRouter().push()`
- URL parameters for data transfer between pages
- Back button support with `router.back()`

---

## Page Documentation

### 1. Home Page (`/`)
**File**: `src/app/page.tsx`

**Purpose**: Landing page where users select their investment amount and initiate the investment process.

**Key Elements**:
- Hero section with branding
- Investment amount selection interface
- Project status sidebar (40% funded, ₪159,616 of ₪400,000)
- FAQ section
- Team information
- Navigation menu

**User Interactions**:
- Select predefined investment amounts (₪6,000, ₪12,000, ₪30,000, ₪100,000)
- Enter custom investment amount (minimum ₪1,000)
- Click "Invest" button
  - If amount > ₪8,000: Shows Annual Income Modal
  - Otherwise: Navigates to `/invest/1`

**State Variables**:
- `selectedAmount`: Current investment amount
- `customAmount`: Formatted display value
- `expandedFaq`: FAQ accordion state
- `showIncomeModal`: Annual income modal visibility

**Constants**:
- `INCOME_MODAL_THRESHOLD`: ₪8,000

---

### 2. Investment Confirmation Page (`/invest/1`)
**File**: `src/app/invest/1/page.tsx`

**Purpose**: Confirm investment details, sign digital agreement, and accept terms.

**Key Elements**:
- Investment amount display and edit field
- Risk disclosure and terms checkboxes
- Digital signature canvas
- Validation messages for income limits

**User Interactions**:
- Modify investment amount
- Toggle 3 consent checkboxes:
  1. Risk disclosure and offering documents acceptance
  2. Personal funds confirmation
  3. Public display permission
- Draw signature on canvas
- Clear signature if needed
- Click "Continue" (enabled only when all requirements met)

**Validation Rules**:
- All 3 checkboxes must be checked
- Signature must be provided
- Investment amount must be valid
- If amount > ₪8,000 and no income range declared: Show error

**State Variables**:
- `investmentAmount`: Current amount
- `checkbox1`, `checkbox2`, `checkbox3`: Consent states
- `hasSignature`: Signature presence indicator
- `showIncomeModal`: Income modal visibility
- `incomeRange`: Declared income range
- `showTooltip`: Info tooltip visibility

**Canvas Signature**:
- HTML5 Canvas API for drawing
- Mouse event handlers (mousedown, mousemove, mouseup)
- Retina display support (2x scaling)
- Clear functionality

**Navigation**:
- Back: Returns to previous page
- Continue: Navigates to `/invest/2`
- Stores investment amount in localStorage

---

### 3. Payment Method Selection (`/invest/2`)
**File**: `src/app/invest/2/page.tsx`

**Purpose**: Allow users to choose their preferred payment method.

**Key Elements**:
- Radio button selection for payment methods
- Credit Card option
- Bank Transfer option

**User Interactions**:
- Select one payment method
- Click "Continue"
  - If Credit Card: Navigate to `/invest/3`
  - If Bank Transfer: Navigate to `/invest/bank-transfer`

**State Variables**:
- `selectedPaymentMethod`: 'credit-card' | 'bank-transfer' | ''

**Navigation**:
- Retrieves investment amount from localStorage
- Passes amount via URL parameter to next page

---

### 4. Credit Card Payment Page (`/invest/3`)
**File**: `src/app/invest/3/page.tsx`

**Purpose**: Collect credit card payment information and process payment.

**Key Elements**:
- Investment amount and fee display (3% fee)
- Credit card form fields
- Payment card logos (Visa, Mastercard, Isracard, Leumi Card)
- Bank transfer alternative link

**Form Fields**:
- Card Number (formatted with spaces, max 16 digits)
- Expiration Year (dropdown: 2024-2030)
- Expiration Month (dropdown: 01-12)
- Cardholder Name
- ID Number (9 digits max)
- CVV (3 digits max)

**User Interactions**:
- Enter card details with auto-formatting
- View calculated fees (3% of investment)
- Submit payment
- Alternative: Switch to bank transfer

**Validation**:
- Card number: Numeric only, max 16 digits
- ID Number: Numeric only, max 9 digits
- CVV: Numeric only, max 3 digits

**Navigation**:
- "To Payment": Navigates to `/kyc`
- "click here": Returns to `/invest/2` for bank transfer

**Payment Notes**:
- Cannot pay with Diners card
- Card charged only when company reaches 100% of minimum funding target

---

### 5. Bank Transfer Page (`/invest/bank-transfer`)
**File**: `src/app/invest/bank-transfer/page.tsx`

**Purpose**: Provide bank transfer instructions and collect payment confirmation.

**Key Elements**:
- Transfer instructions (sent to email)
- File upload for transfer confirmation
- Exit warning system

**User Interactions**:
- Upload confirmation document (PDF, JPG, PNG, DOC, DOCX)
- View uploaded file with delete option
- Click "Submit" to proceed
- Click "Transfer Later" to exit with warning

**Payment Incomplete Modal**:
Triggered when:
- User clicks "Transfer Later"
- User attempts to close browser tab/window (beforeunload event)

Options:
- "Close Anyway": Navigate to My Investments
- "Back to Payment": Return to upload form

**State Variables**:
- `uploadedFile`: File object or null
- `showPaymentModal`: Modal visibility
- `isPaymentComplete`: Controls beforeunload warning

**Navigation**:
- Submit: Navigates to `/kyc`
- Close Anyway: Navigates to `/invest/my-investments`

**User Experience**:
- Informational alert with trustee account details
- Email address display (e.g., ethansanders@gmail.com)
- File preview with delete functionality
- Upload button disabled after file selected

---

### 6. KYC Form Page (`/kyc`)
**File**: `src/app/kyc/page.tsx`

**Purpose**: Collect additional investor information for regulatory compliance.

**Key Elements**:
- Multi-step wizard (4 steps)
- Progress sidebar showing current step
- Information banner explaining requirements

**Step 1: Personal Information** (Implemented)

**Personal Identification Details**:
- First Name*
- Last Name*
- Date of Birth* (DD/MM/YYYY)
- ID Number*
- Country of ID Issuance* (dropdown)
- Gender* (dropdown: Male, Female, Other)

**Current Residential Address**:
- City*
- Country* (dropdown)
- Postal Code*
- Street*
- Building Number*
- Apartment Number*

**Steps 2-4**: (Placeholder - UI shows step indicators)
- Step 2: Investment Type
- Step 3: General Information
- Step 4: Final Declaration & Review

**User Interactions**:
- Fill out form fields
- Navigate through steps (currently only Step 1 active)
- Click "Continue" to proceed

**State Variables**:
- Individual state variables for each form field
- `currentStep`: Current wizard step (1-4)

**Validation**:
- All fields marked with * are required
- Form data logged to console (prototype)

**Navigation**:
- Continue button advances to next step
- Currently logs data and updates step counter

---

### 7. My Investments Dashboard (`/invest/my-investments`)
**File**: `src/app/invest/my-investments/page.tsx`

**Purpose**: Display user's investment portfolio and enable leadership applications.

**Key Elements**:
- Investment table with sortable columns
- Search functionality
- Leader application form (left sidebar)
- Pagination controls

**Table Columns**:
1. **N**: Investment number
2. **Campaign Name**: Project name (e.g., Europe Bundle, Sweden Bundle)
3. **Investment Date**: Date format DD.MM.YYYY
4. **Investment Status**: 
   - Booked Investment (orange)
   - Payment Confirmed (black)
   - Waiting For Approval (gray)
   - Active (green)
   - Includes payment method subtext
5. **Investment Amount**: ILS currency
6. **Amount of Shares/Units**: Share quantity
7. **Verification Status**: "Verified" badge
8. **Investment Progress**: Action button to check progress

**Leader Application Sidebar**:
- Project selection input
- Comment textarea
- "Send Request" button
- Purpose: Apply to lead investment campaigns

**User Interactions**:
- Search investments
- Sort by column headers
- View investment details (info button)
- Check investment progress
- Navigate pages
- Submit leadership applications

**Sample Data**:
- 4 investment records displayed
- Total investment calculation in footer
- Status-based color coding

**Pagination**:
- Rows per page selector (default: 10)
- Page number buttons (1, 2, ..., 10)
- Previous/Next navigation arrows

---

## Component Documentation

### 1. AnnualIncomeModal
**File**: `src/app/components/AnnualIncomeModal.tsx`

**Purpose**: Collect annual income declaration to determine investment limits per ISA regulations.

**Props**:
```typescript
interface AnnualIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (incomeRange: string) => void;
  onChangeAmount: () => void;
  investmentAmount: number;
  alreadyInvested?: number; // Default: 15000
}
```

**Income Range Options**:
```typescript
type IncomeRange = 'low' | 'medium' | 'high';

interface IncomeRangeOption {
  id: IncomeRange;
  label: string;
  maxPerOffer: string;
  maxAcrossOffers: string;
  maxPerOfferValue: number;
  maxAcrossOffersValue: number;
}
```

**Income Brackets**:
1. **Low** (Up to ₪406,925)
   - Max per offer: ₪11,625
   - Max across offers: ₪23,250

2. **Medium** (₪406,926 – ₪871,990)
   - Max per offer: ₪34,875
   - Max across offers: ₪34,875

3. **High** (₪871,991 – ₪1,395,175)
   - Max per offer: ₪116,260 or 5% of annual income (whichever lower)
   - Max across offers: ₪116,260

**Validation Logic**:
```javascript
validateInvestment(range) {
  // Check per offer limit
  if (investmentAmount > maxPerOfferValue) return false;
  
  // Check across offers limit (includes previous investments)
  if (investmentAmount + alreadyInvested > maxAcrossOffersValue) return false;
  
  return true;
}
```

**Error Messages**:
- Per offer exceeded: Shows maximum allowed per offer
- Across offers exceeded: Shows total with previous investments

**UI Features**:
- "Read more" expandable section with ISA information
- Radio button selection with visual feedback
- Real-time validation with error highlighting
- Red border for invalid selections
- Blue border for valid selections
- Info tooltip explaining requirements
- Previous investment alert (12-month context)

**User Actions**:
- Select income range
- View validation errors
- Submit declaration (enabled only if valid)
- Close modal (triggers CloseModalConfirmation)
- Read ISA regulations information

**Callbacks**:
- `onContinue(incomeRange)`: When valid range submitted
- `onClose()`: When modal closed without selection
- `onChangeAmount()`: User wants to reduce investment amount

---

### 2. CloseModalConfirmation
**File**: `src/app/components/CloseModalConfirmation.tsx`

**Purpose**: Confirm user intention when attempting to close AnnualIncomeModal without completing declaration.

**Props**:
```typescript
interface CloseModalConfirmationProps {
  isOpen: boolean;
  investmentAmount: number;
  onChangeAmount: () => void;
  onDeclareIncome: () => void;
  onClose: () => void;
}
```

**Key Message**:
"The investment amount you've selected exceeds the ISA limits"

**User Options**:
1. **Change Amount**: Return to previous page to reduce investment
2. **Back to Declaration**: Return to income modal to select higher range

**UI Design**:
- Modal overlay with backdrop
- Clear heading explaining the issue
- Investment amount display with localization
- Two equally-sized action buttons
- Close button (X) in top-right corner

**Usage Context**:
Appears when user clicks close (X) on AnnualIncomeModal without:
- Selecting a valid income range
- Completing the declaration

**Callbacks**:
- `onChangeAmount()`: Navigate back to change investment amount
- `onDeclareIncome()`: Return to income declaration modal
- `onClose()`: Close both modals completely

---

### 3. PaymentIncompleteModal
**File**: `src/app/components/PaymentIncompleteModal.tsx`

**Purpose**: Warn users about incomplete payment when attempting to leave bank transfer page.

**Props**:
```typescript
interface PaymentIncompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToPayment: () => void;
  onCloseAnyway: () => void;
}
```

**Key Message**:
"Complete payment to secure your investment"

**Warning Content**:
- Payment status incomplete notification
- Instruction to transfer funds and upload confirmation
- Risk of investment cancellation if not completed on time

**User Options**:
1. **Close Anyway**: Exit without completing payment
   - Navigates to My Investments page
   - Investment may be cancelled

2. **Back to Payment**: Return to upload form
   - Continue with payment process
   - Keep investment active

**Trigger Conditions**:
1. User clicks "Transfer Later" button
2. User attempts to close browser tab (beforeunload event)

**UI Design**:
- Modal overlay (z-index: 60)
- Warning-style messaging
- Two action buttons (outline vs filled)
- Close button in corner (triggers onClose)

**Integration**:
Used exclusively on `/invest/bank-transfer` page to:
- Prevent accidental abandonment
- Ensure users understand payment requirements
- Reduce incomplete payment rates

---

## Regulatory Compliance

### Israeli Securities Authority (ISA) Requirements

The application implements several ISA-mandated features to protect investors:

#### 1. Investment Limits Based on Annual Income

**Regulatory Framework**:
The ISA establishes maximum investment thresholds for crowdfunding investments to ensure investors don't over-expose themselves to risky investments.

**Implementation**:
- Automatic threshold detection at ₪8,000
- Mandatory income range declaration for higher amounts
- Real-time validation against both:
  - Per offer limits
  - Annual aggregate limits (12-month rolling period)

**Income Brackets** (as implemented):

| Income Range | Max Per Offer | Max Across Offers (Annual) |
|-------------|---------------|---------------------------|
| Up to ₪406,925 | ₪11,625 | ₪23,250 |
| ₪406,926 – ₪871,990 | ₪34,875 | ₪34,875 |
| ₪871,991 – ₪1,395,175 | ₪116,260 or 5% | ₪116,260 |

#### 2. Risk Disclosure

**Requirements**:
- Explicit acknowledgment of investment risks
- Access to offering documents
- Confirmation of personal fund usage

**Implementation**:
Three mandatory checkboxes on Investment Confirmation page:
1. ✓ Risk disclosure and offering documents acceptance
2. ✓ Personal funds confirmation (not on behalf of others)
3. ✓ Public display permission

#### 3. Digital Signature

**Purpose**: Legally binding agreement to investment terms

**Implementation**:
- HTML5 Canvas-based signature capture
- Required before proceeding to payment
- Clear and redraw functionality
- Touch-action optimized

#### 4. Know Your Customer (KYC)

**Requirements**:
- Personal identification
- Address verification
- Document validation
- Investment suitability assessment

**Implementation**:
Multi-step wizard collecting:
- Full name and date of birth
- Government ID number and issuing country
- Current residential address
- Gender information
- Investment type classification
- General financial information
- Final declaration and review

#### 5. Payment Verification

**Credit Card**:
- Conditional charging (only when minimum funding reached)
- Transaction fee transparency (3% display)
- Cardholder verification (ID number required)

**Bank Transfer**:
- Transfer confirmation documentation required
- Email instruction delivery
- Trustee account usage
- Payment status tracking

#### 6. Investor Protection Measures

**Annual Investment Tracking**:
The system tracks previous investments in the past 12 months to ensure aggregate limits aren't exceeded.

**Example Scenario**:
- Previous investments: ₪15,000
- New investment attempt: ₪10,000
- Low income range max across offers: ₪23,250
- Validation: ₪15,000 + ₪10,000 = ₪25,000 > ₪23,250 → **Rejected**

**Exit Warnings**:
- Bank transfer page prevents accidental abandonment
- Browser close warning (beforeunload event)
- Clear communication about cancellation risks

**Transparency Requirements**:
- Clear fee display (3% credit card fee)
- Funding progress visibility (40% funded, ₪159,616 / ₪400,000)
- Investment status tracking
- Accessible offering documents

---

## Installation & Setup

### Prerequisites

- **Node.js**: v18 or higher (recommended: v20+)
- **npm**: v9 or higher (or yarn/pnpm equivalent)
- **Operating System**: macOS, Linux, or Windows

### Installation Steps

1. **Clone or Navigate to Project Directory**
```bash
cd "/Users/olenakryvoviaz/Documents/Inv Process/inv-process-app"
```

2. **Install Dependencies**
```bash
npm install
```

This will install:
- Next.js 16.0.1
- React 19.2.0
- React DOM 19.2.0
- TypeScript
- Tailwind CSS v4
- ESLint with Next.js config

3. **Development Server**
```bash
npm run dev
```

The application will start on **http://localhost:4000**

*Note: Custom port 4000 is configured in package.json*

4. **Build for Production**
```bash
npm run build
```

Creates optimized production build in `.next/` directory

5. **Start Production Server**
```bash
npm start
```

Serves production build

6. **Run Linter**
```bash
npm run lint
```

Checks code quality with ESLint

### Environment Configuration

The application currently uses hard-coded values for prototype purposes. For production deployment, create a `.env.local` file:

```env
# Example environment variables (not currently implemented)
NEXT_PUBLIC_API_URL=https://api.smartbundles.com
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
NEXT_PUBLIC_MAX_INVESTMENT_THRESHOLD=8000
```

### File Structure Setup

```
inv-process-app/
├── .next/                    # Build output (generated)
├── node_modules/             # Dependencies (generated)
├── public/                   # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/                  # Next.js App Router
│       ├── components/       # Reusable components
│       ├── invest/          # Investment flow pages
│       ├── kyc/             # KYC form
│       ├── globals.css      # Global styles
│       ├── layout.tsx       # Root layout
│       └── page.tsx         # Home page
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── PRODUCT_DOCUMENTATION.md  # This file
```

---

## Dependencies

### Production Dependencies

```json
{
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "next": "16.0.1"
}
```

**React 19.2.0**:
- Latest stable version with enhanced performance
- Improved hooks and concurrent features
- Used for component architecture and state management

**React DOM 19.2.0**:
- DOM-specific methods for React
- Handles rendering to web environment

**Next.js 16.0.1**:
- React framework with App Router
- Server-side rendering capabilities
- File-based routing
- Built-in optimization

### Development Dependencies

```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "16.0.1"
}
```

**TypeScript ^5**:
- Type safety for entire application
- Enhanced IDE support
- Compile-time error checking

**Tailwind CSS v4**:
- Utility-first CSS framework
- Custom design system
- Responsive design utilities
- Color scheme:
  - Primary: `#1e2d4f` (dark blue)
  - Secondary: `#8ba361` (olive green)
  - Accent: `#d4c5a0` (beige/gold)
  - Background: `#ededed` (light gray)

**ESLint ^9**:
- Code quality enforcement
- Next.js-specific rules
- TypeScript integration

### Browser Compatibility

**Supported Browsers**:
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

**Required Features**:
- HTML5 Canvas API (for signature)
- LocalStorage API (for data persistence)
- Modern JavaScript (ES2020+)
- CSS Grid and Flexbox

---

## Future Enhancements

### Backend Integration
Currently, the application is a **frontend prototype** with no backend API. Future versions should implement:

1. **API Endpoints**:
   - `POST /api/investments` - Create investment
   - `GET /api/investments` - List user's investments
   - `POST /api/payments/credit-card` - Process credit card
   - `POST /api/payments/bank-transfer` - Record bank transfer
   - `POST /api/kyc` - Submit KYC data
   - `GET /api/user/investment-history` - Get 12-month history
   - `POST /api/income-declaration` - Store income range

2. **Database Schema**:
   - Users table
   - Investments table
   - Payments table
   - KYC data table
   - Income declarations table

3. **Payment Gateway Integration**:
   - Credit card processing (Stripe, Tranzila, or local Israeli gateway)
   - Bank transfer verification
   - Fee calculation
   - Transaction logging

4. **Authentication System**:
   - User registration/login
   - Session management
   - JWT or session-based auth
   - OAuth integration (optional)

5. **Email Service**:
   - Bank transfer instructions
   - Investment confirmation
   - Payment receipts
   - Status updates

### Additional Features

1. **Multi-language Support**:
   - Currently shows HE/EN toggle (not functional)
   - Implement i18n with Hebrew and English translations
   - RTL support for Hebrew

2. **Document Management**:
   - Upload and store ID documents
   - Proof of address
   - Bank transfer confirmations
   - Digital document signing

3. **Investment Analytics**:
   - Portfolio performance charts
   - ROI calculations
   - Historical trends
   - Comparative analysis

4. **Notification System**:
   - Email notifications
   - SMS alerts
   - In-app notifications
   - Investment status updates

5. **Mobile Optimization**:
   - Touch-optimized signature canvas
   - Responsive table views
   - Mobile payment methods
   - Progressive Web App (PWA)

6. **Security Enhancements**:
   - Two-factor authentication
   - Biometric authentication
   - Fraud detection
   - Secure document storage
   - Audit logging

7. **Reporting & Compliance**:
   - Tax document generation
   - Investment statements
   - Regulatory reporting
   - Transaction history export

---

## Support & Maintenance

### Logging
Currently uses `console.log()` for debugging. Production should implement:
- Structured logging (Winston, Pino)
- Error tracking (Sentry, Rollbar)
- Analytics (Google Analytics, Mixpanel)

### Error Handling
Prototype has minimal error handling. Implement:
- Global error boundaries
- API error handling
- Validation error messages
- Network failure recovery

### Testing
No tests currently implemented. Recommended:
- Unit tests (Jest, Vitest)
- Component tests (React Testing Library)
- E2E tests (Playwright, Cypress)
- Visual regression tests

### Performance Optimization
- Image optimization (Next.js Image component)
- Code splitting
- Lazy loading
- Caching strategy
- CDN deployment

---

## Deployment

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Self-Hosted Deployment
```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "smart-bundles" -- start

# Or with systemd
sudo systemctl start smart-bundles
```

### Environment Variables for Production
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.smartbundles.com
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
SMTP_HOST=smtp.example.com
SMTP_USER=...
SMTP_PASS=...
```

---

## License & Legal

This application handles financial transactions and personal data. Ensure compliance with:
- Israeli Securities Law
- ISA regulations
- GDPR (if applicable)
- PCI DSS (for credit card handling)
- Data protection laws

**Disclaimer**: This documentation describes a prototype application. Before production use, ensure all regulatory requirements are met and legal counsel is consulted.

---

## Version History

**v0.1.0** (Current)
- Initial prototype implementation
- Investment flow (home → confirmation → payment → KYC)
- ISA compliance (income declaration, limits validation)
- Multi-payment methods (credit card, bank transfer)
- Investment dashboard
- Digital signature capture

---

## Contact & Support

For questions or support regarding this documentation:
- Project: Smart Bundles Investment Platform
- Technology: Next.js 16, React 19, TypeScript, Tailwind CSS
- Documentation Version: 1.0.0
- Last Updated: November 17, 2025

---

*End of Product Documentation*

