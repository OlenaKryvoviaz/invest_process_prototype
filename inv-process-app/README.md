# Smart Bundles Investment Process App

A modern web application for managing real estate investment opportunities, built with Next.js, React, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at **http://localhost:4000**

### Available Scripts

```bash
npm run dev      # Start development server (port 4000)
npm run build    # Create production build
npm start        # Run production server
npm run lint     # Run ESLint
```

## 📋 Overview

**Smart Bundles** is an investment platform that enables users to invest in real estate bundles with amounts starting from ₪1,000. The application includes:

- ✅ Investment amount selection and validation
- ✅ Israeli Securities Authority (ISA) compliance
- ✅ Annual income declaration for regulatory limits
- ✅ Multi-payment options (Credit Card, Bank Transfer)
- ✅ Digital signature capture
- ✅ KYC (Know Your Customer) form
- ✅ Investment portfolio dashboard

## 🏗️ Project Structure

```
src/app/
├── components/
│   ├── AnnualIncomeModal.tsx           # Income declaration modal
│   ├── CloseModalConfirmation.tsx      # Close confirmation dialog
│   └── PaymentIncompleteModal.tsx      # Payment warning modal
├── invest/
│   ├── 1/page.tsx                      # Investment confirmation
│   ├── 2/page.tsx                      # Payment method selection
│   ├── 3/page.tsx                      # Credit card payment
│   ├── bank-transfer/page.tsx          # Bank transfer
│   └── my-investments/page.tsx         # Investment dashboard
├── kyc/page.tsx                        # KYC form
├── page.tsx                            # Home/Landing page
├── layout.tsx                          # Root layout
└── globals.css                         # Global styles
```

## 🎯 Key Features

### Investment Flow
1. **Home Page** (`/`) - Select investment amount
2. **Investment Confirmation** (`/invest/1`) - Sign agreement & accept terms
3. **Payment Method** (`/invest/2`) - Choose Credit Card or Bank Transfer
4. **Payment Processing** (`/invest/3` or `/invest/bank-transfer`) - Complete payment
5. **KYC Form** (`/kyc`) - Provide additional information
6. **My Investments** (`/invest/my-investments`) - View portfolio

### ISA Compliance
The app implements Israeli Securities Authority regulations:

| Income Range | Max Per Offer | Max Annual (All Offers) |
|-------------|---------------|------------------------|
| Up to ₪406,925 | ₪11,625 | ₪23,250 |
| ₪406,926 – ₪871,990 | ₪34,875 | ₪34,875 |
| ₪871,991 – ₪1,395,175 | ₪116,260 or 5% | ₪116,260 |

- Automatic threshold detection at ₪8,000
- Historical investment tracking (12-month window)
- Real-time validation with error messages

### Payment Options

**Credit Card**:
- Supports Visa, Mastercard, Isracard, Leumi Card
- 3% transaction fee
- Conditional charging (only when minimum funding reached)

**Bank Transfer**:
- Email instructions with trustee account details
- Upload confirmation document
- Exit warning to prevent incomplete payments

## 🛠️ Technology Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **React**: 19.2.0
- **TypeScript**: ^5
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint ^9 with Next.js config

## 🎨 Design System

**Color Palette**:
- Primary: `#1e2d4f` (Navy Blue)
- Secondary: `#8ba361` (Olive Green)
- Accent: `#d4c5a0` (Beige/Gold)
- Background: `#ededed` (Light Gray)

**Typography**:
- System fonts optimized for readability
- Responsive text sizing

## 📦 State Management

The application uses React's built-in hooks:
- `useState` - Local component state
- `useEffect` - Side effects
- `useRouter` - Navigation
- `useSearchParams` - URL parameters
- `localStorage` - Investment amount persistence

## 🔐 Security & Validation

- Digital signature capture using HTML5 Canvas
- Client-side form validation
- Investment limit enforcement
- KYC data collection
- Payment confirmation tracking

## 📱 Responsive Design

- Mobile-first approach
- Touch-optimized signature canvas
- Responsive tables and forms
- Accessible navigation

## 🚧 Current Limitations (Prototype)

This is a **frontend prototype** without backend integration:
- No actual payment processing
- Form data logged to console only
- No user authentication
- No database storage
- Hard-coded sample data in investment dashboard

## 📚 Documentation

For comprehensive documentation, see [PRODUCT_DOCUMENTATION.md](./PRODUCT_DOCUMENTATION.md)

**Documentation includes**:
- Detailed page descriptions
- Component API documentation
- User journey flows
- Regulatory compliance details
- Setup and deployment guides
- Future enhancement roadmap

## 🔄 Development Workflow

### Adding New Pages
```bash
# Create new page in app directory
touch src/app/new-page/page.tsx
```

### Adding Components
```bash
# Add to components directory
touch src/app/components/NewComponent.tsx
```

### Styling
Tailwind CSS utility classes are used throughout. Custom styles in `globals.css`.

## 🐛 Known Issues

1. Multi-language toggle (HE/EN) is not functional
2. Steps 2-4 of KYC form are placeholders
3. FAQ accordion items have placeholder content
4. Payment processing is simulated (no actual transactions)

## 🤝 Contributing

When contributing to this project:
1. Follow existing code style and conventions
2. Ensure TypeScript types are properly defined
3. Test responsive behavior on mobile devices
4. Update documentation for significant changes

## 📄 License

This project is proprietary software for Smart Bundles platform.

## 📞 Support

For questions or issues, refer to the comprehensive documentation in `PRODUCT_DOCUMENTATION.md`.

---

**Version**: 0.1.0  
**Last Updated**: November 17, 2025  
**Framework**: Next.js 16 with App Router
