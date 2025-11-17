# Smart Bundles - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Smart Bundles App                         │
│                     (Next.js 16 App Router)                      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Application Shell                         │
│                      src/app/layout.tsx                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  • Global Navigation                                      │   │
│  │  • Top Bar (Login, Register, Language)                   │   │
│  │  • SMART BUNDLES Branding                                │   │
│  │  • Footer (if applicable)                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Page Flow Architecture

```
┌──────────────┐
│              │
│  Home Page   │  ──────────────────────────────────┐
│      /       │                                     │
│              │                                     │
└──────┬───────┘                                     │
       │                                             │
       │ Select Investment Amount                    │
       │ Click "Invest"                              │
       │                                             │
       ▼                                             │
   ┌───────┐                                         │
   │Amount │                                         │
   │> 8000?│                                         │
   └───┬───┘                                         │
       │                                             │
    YES│                                          NO │
       │                                             │
       ▼                                             │
┌────────────────────┐                               │
│ AnnualIncomeModal  │◄──────────────────────────────┘
│   (Component)      │
└─────────┬──────────┘
          │
          │ Declare Income Range
          │ Validate Limits
          │
          ▼
┌────────────────────┐
│  Investment        │
│  Confirmation      │
│   /invest/1        │
│                    │
│  • Confirm Amount  │
│  • Sign Agreement  │
│  • Accept Terms    │
└─────────┬──────────┘
          │
          │ Continue
          │
          ▼
┌────────────────────┐
│  Payment Method    │
│    Selection       │
│   /invest/2        │
│                    │
│  • Credit Card     │
│  • Bank Transfer   │
└─────────┬──────────┘
          │
          │ Select Method
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌──────────────┐
│ Credit  │ │     Bank     │
│  Card   │ │   Transfer   │
│/invest/3│ │/invest/bank- │
│         │ │   transfer   │
│• Card # │ │• Instructions│
│• CVV    │ │• Upload Doc │
│• Pay    │ │• Confirmation│
└────┬────┘ └──────┬───────┘
     │             │
     │             │
     └──────┬──────┘
            │
            │ Payment Complete
            │
            ▼
    ┌──────────────┐
    │   KYC Form   │
    │     /kyc     │
    │              │
    │  Step 1: ID  │
    │  Step 2: ...│
    │  Step 3: ...│
    │  Step 4: ...│
    └──────┬───────┘
           │
           │ Submit KYC
           │
           ▼
    ┌──────────────┐
    │     My       │
    │ Investments  │
    │/invest/my-   │
    │ investments  │
    │              │
    │• Portfolio   │
    │• Status      │
    │• Progress    │
    └──────────────┘
```

## Component Dependency Tree

```
src/app/
│
├── layout.tsx (Root Layout)
│
├── page.tsx (Home)
│   └── uses: AnnualIncomeModal
│
├── invest/
│   ├── 1/page.tsx (Confirmation)
│   │   └── uses: AnnualIncomeModal
│   │
│   ├── 2/page.tsx (Payment Method)
│   │
│   ├── 3/page.tsx (Credit Card)
│   │
│   ├── bank-transfer/page.tsx
│   │   └── uses: PaymentIncompleteModal
│   │
│   └── my-investments/page.tsx (Dashboard)
│
├── kyc/page.tsx
│
└── components/
    ├── AnnualIncomeModal.tsx
    │   └── uses: CloseModalConfirmation
    │
    ├── CloseModalConfirmation.tsx
    │
    └── PaymentIncompleteModal.tsx
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      User Input Layer                         │
└────────────┬─────────────────────────────────────────────────┘
             │
             │ Investment Amount
             │ Income Range
             │ Personal Data
             │ Payment Details
             │ Signature
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                  Client-Side Validation                       │
│                                                               │
│  • Amount >= 1000                                            │
│  • Amount <= ISA Limits (per income range)                   │
│  • Required fields present                                   │
│  • Signature provided                                        │
│  • Terms accepted                                            │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                    State Management                           │
│                                                               │
│  React useState:                                             │
│  • Component-level state                                     │
│  • Modal visibility                                          │
│  • Form inputs                                               │
│  • Validation errors                                         │
│                                                               │
│  URL Parameters:                                             │
│  • Investment amount                                         │
│  • Income range                                              │
│                                                               │
│  LocalStorage:                                               │
│  • investmentAmount (persisted)                              │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                    Navigation Layer                           │
│                                                               │
│  Next.js App Router (useRouter):                             │
│  • router.push('/next-page')                                 │
│  • router.back()                                             │
│  • URL parameter passing                                     │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                    Data Output Layer                          │
│                    (Console Logs - Prototype)                 │
│                                                               │
│  In Production, this would be:                               │
│  • API calls to backend                                      │
│  • Database persistence                                      │
│  • Payment gateway integration                               │
│  • Email notifications                                       │
└──────────────────────────────────────────────────────────────┘
```

## Component Communication Patterns

### Parent → Child (Props)

```
┌─────────────────┐
│  Home Page      │
│                 │
│  Props ↓        │
│  • isOpen       │
│  • amount       │
│  • callbacks    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│AnnualIncomeModal│
└─────────────────┘
```

### Child → Parent (Callbacks)

```
┌─────────────────┐
│AnnualIncomeModal│
│                 │
│  Callbacks ↑    │
│  • onContinue() │
│  • onClose()    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Home Page      │
│                 │
│  Handles:       │
│  • Continue flow│
│  • Close modal  │
└─────────────────┘
```

### Sibling Communication (via URL/localStorage)

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  /invest/1  │         │ localStorage │         │  /invest/2  │
│             │────────▶│              │────────▶│             │
│ Save amount │         │    amount    │         │ Read amount │
└─────────────┘         └──────────────┘         └─────────────┘
```

## Modal Communication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Parent Page                           │
│                     (e.g., Home or /invest/1)                │
│                                                              │
│  State:                                                      │
│  • showIncomeModal: boolean                                 │
│  • investmentAmount: number                                 │
│  • incomeRange: string | null                               │
│                                                              │
│  Methods:                                                    │
│  • handleIncomeModalContinue(range)                         │
│  • handleIncomeModalClose()                                 │
│  • handleChangeAmount()                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Props passed down
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   AnnualIncomeModal                          │
│                                                              │
│  Props received:                                             │
│  • isOpen                                                    │
│  • investmentAmount                                          │
│  • alreadyInvested                                           │
│  • onContinue                                                │
│  • onClose                                                   │
│  • onChangeAmount                                            │
│                                                              │
│  Internal State:                                             │
│  • selectedRange: 'low' | 'medium' | 'high'                 │
│  • showReadMore: boolean                                    │
│  • showCloseConfirmation: boolean                           │
│                                                              │
│  Validation Logic:                                           │
│  • validateInvestment()                                      │
│  • getErrorMessage()                                         │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       │ Props passed down
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              CloseModalConfirmation                          │
│                                                              │
│  Props received:                                             │
│  • isOpen                                                    │
│  • investmentAmount                                          │
│  • onChangeAmount                                            │
│  • onDeclareIncome                                           │
│  • onClose                                                   │
│                                                              │
│  User Actions:                                               │
│  • Change Amount → calls onChangeAmount()                   │
│  • Back to Declaration → calls onDeclareIncome()            │
│  • Close → calls onClose()                                  │
└─────────────────────────────────────────────────────────────┘
```

## ISA Compliance Validation Flow

```
User enters amount
       │
       ▼
┌──────────────┐
│ Amount > 8000│  ──NO──▶  Continue to next page
└──────┬───────┘
       │
      YES
       │
       ▼
┌──────────────────────┐
│  Show Income Modal   │
│  User selects range  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Validation Logic                    │
│                                      │
│  Check 1: Per Offer Limit            │
│  investmentAmount <= maxPerOffer?    │
│                                      │
│  Check 2: Across Offers Limit        │
│  investmentAmount + alreadyInvested  │
│    <= maxAcrossOffers?               │
└──────┬──────────────────┬────────────┘
       │                  │
      YES                NO
       │                  │
       ▼                  ▼
  ┌────────┐        ┌──────────┐
  │ALLOW   │        │ REJECT   │
  │Continue│        │Show Error│
  └────────┘        └────┬─────┘
                         │
                         ▼
                    ┌─────────────┐
                    │ User Options│
                    │             │
                    │ 1. Change   │
                    │    Amount   │
                    │             │
                    │ 2. Select   │
                    │    Higher   │
                    │    Income   │
                    │    Range    │
                    └─────────────┘
```

## Payment Flow Architecture

```
┌──────────────────┐
│ Payment Method   │
│   Selection      │
└────────┬─────────┘
         │
         │ User selects method
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
┌─────────┐  ┌──────────────┐
│ Credit  │  │     Bank     │
│  Card   │  │   Transfer   │
└────┬────┘  └──────┬───────┘
     │              │
     │              │ Email sent with
     │              │ instructions
     │              │
     │              ▼
     │         ┌──────────────┐
     │         │Upload Document│
     │         └──────┬───────┘
     │                │
     │                │ File attached?
     │                │
     │                ▼
     │            ┌───────┐
     │            │Submit │
     │            └───┬───┘
     │                │
     │         YES    │    NO
     │         ┌──────┴──────┐
     │         │             │
     │         ▼             ▼
     │    ┌────────┐  ┌──────────────┐
     │    │Continue│  │Transfer Later│
     │    └───┬────┘  └──────┬───────┘
     │        │              │
     │        │              ▼
     │        │       ┌────────────────┐
     │        │       │Payment         │
     │        │       │Incomplete Modal│
     │        │       │                │
     │        │       │• Back to       │
     │        │       │  Payment       │
     │        │       │• Close Anyway  │
     │        │       └────────────────┘
     │        │
     └────────┴───────────────┐
              │                │
              ▼                │
         ┌────────┐            │
         │  KYC   │◄───────────┘
         │  Form  │
         └────────┘
```

## Canvas Signature Implementation

```
┌─────────────────────────────────────────┐
│         Signature Canvas                 │
│                                          │
│  Setup (useEffect):                      │
│  1. Get canvas reference                 │
│  2. Set dimensions (2x for retina)       │
│  3. Configure drawing style              │
│     • strokeStyle: '#000000'            │
│     • lineWidth: 2                       │
│     • lineCap: 'round'                   │
└──────────────┬──────────────────────────┘
               │
               │
   ┌───────────┴───────────┐
   │                       │
   ▼                       ▼
┌──────────┐         ┌──────────┐
│ Mouse    │         │ Touch    │
│ Events   │         │ Events   │
└────┬─────┘         └────┬─────┘
     │                    │
     ├─ mouseDown         ├─ touchStart
     ├─ mouseMove         ├─ touchMove
     ├─ mouseUp           └─ touchEnd
     └─ mouseLeave
     │
     ▼
┌─────────────────────────────────┐
│    Drawing State Machine        │
│                                 │
│  mouseDown/touchStart:          │
│  • setIsDrawing(true)           │
│  • beginPath()                  │
│  • moveTo(x, y)                 │
│                                 │
│  mouseMove/touchMove:           │
│  • if isDrawing:                │
│    • lineTo(x, y)               │
│    • stroke()                   │
│                                 │
│  mouseUp/touchEnd/mouseLeave:   │
│  • setIsDrawing(false)          │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│         Clear Action            │
│                                 │
│  clearSignature():              │
│  • clearRect(0, 0, w, h)        │
│  • setHasSignature(false)       │
└─────────────────────────────────┘
```

## State Persistence Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    Data Persistence Layers                    │
└──────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐
│   useState      │  │ URL Parameters  │  │  localStorage    │
│  (Component)    │  │   (Between      │  │  (App-wide)      │
│                 │  │    Pages)       │  │                  │
│  Scope:         │  │                 │  │  Scope:          │
│  • Single       │  │  Scope:         │  │  • Cross-page    │
│    component    │  │  • Page-to-page │  │  • Persistent    │
│  • Lost on      │  │  • Visible in   │  │  • Survives      │
│    unmount      │  │    URL          │  │    refresh       │
│                 │  │  • Shareable    │  │                  │
│  Examples:      │  │                 │  │  Examples:       │
│  • Form inputs  │  │  Examples:      │  │  • Investment    │
│  • Modal state  │  │  • amount=6000  │  │    amount        │
│  • Signature    │  │  • incomeRange  │  │  • User prefs    │
└─────────────────┘  └─────────────────┘  └──────────────────┘
```

## Error Handling Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      User Input                               │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                  Validation Layer                             │
│                                                               │
│  Client-Side Validation:                                     │
│  • Required fields                                           │
│  • Format validation (email, ID, etc)                        │
│  • Range validation (min/max amounts)                        │
│  • Business logic (ISA limits)                               │
└────────────┬─────────────────────────────────────────────────┘
             │
             ├─────── VALID ───────┐
             │                     │
             ├─── INVALID ─────┐   │
             │                 │   │
             ▼                 ▼   ▼
┌─────────────────┐  ┌──────────────────┐  ┌──────────────┐
│  Show Error     │  │  Warning Modal   │  │   Proceed    │
│  Message        │  │                  │  │              │
│                 │  │  Example:        │  │              │
│  • Red border   │  │  • Income modal  │  │              │
│  • Error icon   │  │    close warning │  │              │
│  • Error text   │  │  • Payment       │  │              │
│  • Disable CTA  │  │    incomplete    │  │              │
└─────────────────┘  └──────────────────┘  └──────────────┘
```

## Styling Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Tailwind CSS v4                          │
└──────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                    Design System                              │
│                                                               │
│  Colors:                    Typography:                       │
│  • Primary: #1e2d4f        • text-4xl (36px)                 │
│  • Secondary: #8ba361      • text-2xl (24px)                 │
│  • Accent: #d4c5a0         • text-lg (18px)                  │
│  • Background: #ededed     • text-sm (14px)                  │
│                            • text-xs (12px)                  │
│  Spacing:                                                     │
│  • p-2, p-4, p-6, p-8     Borders:                          │
│  • m-2, m-4, m-6, m-8     • border, border-2                │
│  • gap-2, gap-4, gap-6    • rounded, rounded-lg             │
└──────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                   Component Styles                            │
│                                                               │
│  Buttons:                   Inputs:                          │
│  • Primary                  • Text input                     │
│  • Secondary                • Select dropdown                │
│  • Outline                  • Checkbox                       │
│  • Text link                • File upload                    │
│                            • Canvas (signature)              │
│  Cards:                                                       │
│  • Elevated                 Forms:                           │
│  • Flat                     • Label + Input groups           │
│  • With border              • Validation states              │
│                            • Error messages                  │
│  Modals:                                                      │
│  • Overlay                  Tables:                          │
│  • Header/Content/Footer    • Striped rows                   │
│  • Close button             • Sortable columns               │
│                            • Pagination                      │
└──────────────────────────────────────────────────────────────┘
```

## Security Considerations

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend Security                          │
└──────────────────────────────────────────────────────────────┘

┌────────────────────┐    ┌────────────────────┐
│  Input Validation  │    │  Data Protection   │
│                    │    │                    │
│  • Sanitize inputs │    │  • No sensitive    │
│  • Format checking │    │    data in URL     │
│  • Length limits   │    │  • localStorage    │
│  • Type validation │    │    for public data │
│                    │    │    only            │
└────────────────────┘    └────────────────────┘

┌────────────────────┐    ┌────────────────────┐
│  HTTPS Only        │    │  XSS Prevention    │
│  (Production)      │    │                    │
│                    │    │  • React auto-     │
│  • Encrypted       │    │    escapes JSX     │
│    transmission    │    │  • No dangerously  │
│  • Secure cookies  │    │    SetInnerHTML    │
└────────────────────┘    └────────────────────┘
```

## Performance Optimization Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                  Performance Layers                           │
└──────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Next.js Built-in Optimizations                            │
│  • Server-side rendering (SSR)                             │
│  • Automatic code splitting                                │
│  • Image optimization (if using next/image)                │
│  • Route prefetching                                       │
└────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│  React Optimizations                                       │
│  • useMemo for expensive calculations                      │
│  • useCallback for function references                     │
│  • Lazy loading with dynamic imports                       │
│  • Conditional rendering                                   │
└────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│  Application-Specific                                      │
│  • Debounced input handlers                                │
│  • Optimized canvas rendering                              │
│  • localStorage caching                                    │
│  • Minimal re-renders                                      │
└────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Source Code                               │
│                  (GitHub/Git Repository)                      │
└────────────┬─────────────────────────────────────────────────┘
             │
             │ git push
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                   Build Process                               │
│                                                               │
│  1. npm install                                              │
│  2. npm run build                                            │
│     • Type checking (TypeScript)                             │
│     • Linting (ESLint)                                       │
│     • CSS processing (Tailwind)                              │
│     • Code optimization                                      │
│     • Bundle creation                                        │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                  Production Build                             │
│                    (.next/ folder)                            │
│                                                               │
│  • Optimized JavaScript bundles                              │
│  • CSS files                                                 │
│  • Static assets                                             │
│  • Server components                                         │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                  Hosting Platform                             │
│                                                               │
│  Options:                                                     │
│  • Vercel (recommended)                                      │
│  • AWS (EC2, S3 + CloudFront)                                │
│  • Self-hosted (PM2, Docker)                                 │
│  • Netlify                                                   │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                      CDN Layer                                │
│              (Static Asset Distribution)                      │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                       End Users                               │
│                (Web Browsers - Desktop/Mobile)                │
└──────────────────────────────────────────────────────────────┘
```

## Future Backend Architecture (Not Implemented)

```
┌──────────────────────────────────────────────────────────────┐
│                     Frontend (Current)                        │
│                    Next.js Application                        │
└────────────┬─────────────────────────────────────────────────┘
             │
             │ REST API / GraphQL
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                     Backend API Layer                         │
│                    (Node.js / NestJS)                         │
│                                                               │
│  Endpoints:                                                   │
│  • POST /api/investments                                     │
│  • GET  /api/investments/:id                                 │
│  • POST /api/payments/credit-card                            │
│  • POST /api/payments/bank-transfer                          │
│  • POST /api/kyc                                             │
│  • GET  /api/user/investment-history                         │
│  • POST /api/income-declaration                              │
└────────────┬─────────────────────────────────────────────────┘
             │
             ├──────────┬──────────┬──────────┬────────────┐
             │          │          │          │            │
             ▼          ▼          ▼          ▼            ▼
    ┌────────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
    │  Database  │ │Payment │ │ Email  │ │  Auth  │ │  File    │
    │ PostgreSQL │ │Gateway │ │Service │ │Service │ │ Storage  │
    │            │ │(Stripe)│ │        │ │  JWT   │ │  (S3)    │
    └────────────┘ └────────┘ └────────┘ └────────┘ └──────────┘
```

---

## Technology Decision Rationale

### Why Next.js 16?
- **App Router**: Modern routing with layouts
- **React 19**: Latest features and performance
- **TypeScript**: Type safety and IDE support
- **Built-in optimizations**: SSR, code splitting, image optimization
- **Easy deployment**: Vercel integration

### Why Tailwind CSS?
- **Utility-first**: Rapid development
- **Responsive**: Mobile-first by default
- **Customizable**: Design system tokens
- **Production optimized**: Purges unused CSS

### Why Client-Side Only (No Backend)?
- **Prototype phase**: Faster development
- **UI/UX validation**: Test flows before backend investment
- **Flexibility**: Easy to iterate on design
- **Future-ready**: Can add API layer later

---

**Last Updated**: November 17, 2025  
**Version**: 1.0.0

