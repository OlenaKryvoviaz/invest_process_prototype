# Smart Bundles - Developer Quick Reference

## 📁 File Organization

```
src/app/
├── components/          # Reusable UI components
├── invest/             # Investment flow pages
├── kyc/                # KYC process
├── page.tsx            # Landing page
├── layout.tsx          # App shell
└── globals.css         # Base styles
```

## 🎯 Page Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | Landing & investment selection |
| `/invest/1` | `invest/1/page.tsx` | Confirm investment & sign |
| `/invest/2` | `invest/2/page.tsx` | Choose payment method |
| `/invest/3` | `invest/3/page.tsx` | Credit card payment |
| `/invest/bank-transfer` | `invest/bank-transfer/page.tsx` | Bank transfer flow |
| `/invest/my-investments` | `invest/my-investments/page.tsx` | Investment dashboard |
| `/kyc` | `kyc/page.tsx` | KYC form |

## 🧩 Component API

### AnnualIncomeModal

```typescript
import AnnualIncomeModal from '@/app/components/AnnualIncomeModal';

<AnnualIncomeModal
  isOpen={boolean}
  onClose={() => void}
  onContinue={(incomeRange: string) => void}
  onChangeAmount={() => void}
  investmentAmount={number}
  alreadyInvested={number}  // Optional, default: 15000
/>
```

**Income Ranges**: `'low'` | `'medium'` | `'high'`

### CloseModalConfirmation

```typescript
import CloseModalConfirmation from '@/app/components/CloseModalConfirmation';

<CloseModalConfirmation
  isOpen={boolean}
  investmentAmount={number}
  onChangeAmount={() => void}
  onDeclareIncome={() => void}
  onClose={() => void}
/>
```

### PaymentIncompleteModal

```typescript
import PaymentIncompleteModal from '@/app/components/PaymentIncompleteModal';

<PaymentIncompleteModal
  isOpen={boolean}
  onClose={() => void}
  onBackToPayment={() => void}
  onCloseAnyway={() => void}
/>
```

## 🎨 Design Tokens

### Colors

```typescript
// Tailwind CSS classes
const colors = {
  primary: 'bg-[#1e2d4f]',      // Navy blue
  secondary: 'bg-[#8ba361]',     // Olive green
  accent: 'bg-[#d4c5a0]',        // Beige/gold
  background: 'bg-[#ededed]',    // Light gray
  text: 'text-gray-900',
  textSecondary: 'text-gray-600'
};
```

### Typography

```typescript
const typography = {
  h1: 'text-4xl font-bold text-[#1e2d4f]',
  h2: 'text-2xl font-semibold text-[#1e2d4f]',
  h3: 'text-lg font-semibold text-[#1e2d4f]',
  body: 'text-sm text-gray-700',
  small: 'text-xs text-gray-600'
};
```

### Common Components

```typescript
// Button - Primary
<button className="bg-[#1e2d4f] text-white px-8 py-2 rounded hover:bg-[#2d3e60] font-medium transition-colors">
  Button Text
</button>

// Button - Outline
<button className="border-2 border-[#1e2d4f] text-[#1e2d4f] px-8 py-2 rounded hover:bg-gray-50 font-medium transition-colors">
  Button Text
</button>

// Input
<input 
  className="w-full border border-gray-300 rounded px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] focus:border-transparent"
/>

// Select
<select className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e2d4f] appearance-none bg-white">
  <option>Option 1</option>
</select>
```

## 🔄 Navigation Patterns

### Using Next.js Router

```typescript
import { useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();
  
  // Navigate forward
  router.push('/invest/1');
  
  // Navigate with query params
  router.push(`/invest/1?amount=${amount}`);
  
  // Go back
  router.back();
};
```

### Reading URL Parameters

```typescript
import { useSearchParams } from 'next/navigation';

const Component = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const incomeRange = searchParams.get('incomeRange');
};
```

## 💾 Data Persistence

### LocalStorage

```typescript
// Store investment amount
localStorage.setItem('investmentAmount', amount);

// Retrieve investment amount
const amount = localStorage.getItem('investmentAmount');

// Clear
localStorage.removeItem('investmentAmount');
```

## 🎯 ISA Compliance Logic

### Investment Limits

```typescript
const ISA_LIMITS = {
  low: {
    maxPerOffer: 11625,
    maxAcrossOffers: 23250
  },
  medium: {
    maxPerOffer: 34875,
    maxAcrossOffers: 34875
  },
  high: {
    maxPerOffer: 116260,
    maxAcrossOffers: 116260
  }
};

const INCOME_THRESHOLD = 8000;
```

### Validation Example

```typescript
const validateInvestment = (
  currentAmount: number,
  alreadyInvested: number,
  incomeRange: 'low' | 'medium' | 'high'
): boolean => {
  const limits = ISA_LIMITS[incomeRange];
  
  // Check per offer limit
  if (currentAmount > limits.maxPerOffer) {
    return false;
  }
  
  // Check total across offers
  if (currentAmount + alreadyInvested > limits.maxAcrossOffers) {
    return false;
  }
  
  return true;
};
```

## 🎨 Canvas Signature

### Implementation Pattern

```typescript
import { useRef, useState, useEffect } from 'react';

const SignatureCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (2x for retina)
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Style
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    setIsDrawing(true);
    setHasSignature(true);

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      className="w-full h-48 cursor-crosshair border-2 border-gray-300 rounded-lg"
    />
  );
};
```

## 📝 Form Patterns

### Input with Formatting

```typescript
const [amount, setAmount] = useState('6,000');

const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/[₪,\s]/g, '');
  const numValue = Number(value);
  
  if (!isNaN(numValue)) {
    setAmount(numValue > 0 ? numValue.toLocaleString('en-US') : '');
  }
};

<input
  type="text"
  value={`₪ ${amount}`}
  onChange={handleAmountChange}
/>
```

### Checkbox Toggle (iOS Style)

```typescript
const [isChecked, setIsChecked] = useState(false);

<label className="flex items-start gap-4 cursor-pointer">
  <div className="relative flex-shrink-0 mt-0.5">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      className="sr-only"
    />
    <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
      isChecked ? 'bg-[#1e2d4f]' : 'bg-gray-300'
    }`}>
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
        isChecked ? 'translate-x-6' : 'translate-x-0'
      }`}></div>
    </div>
  </div>
  <span>Checkbox Label</span>
</label>
```

### File Upload

```typescript
const [file, setFile] = useState<File | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);

const handleUploadClick = () => fileInputRef.current?.click();

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) setFile(file);
};

<>
  <input
    ref={fileInputRef}
    type="file"
    onChange={handleFileChange}
    accept=".pdf,.jpg,.jpeg,.png"
    className="hidden"
  />
  <button onClick={handleUploadClick}>
    Upload File
  </button>
</>
```

## 🚨 Error Handling Patterns

### Validation Error Display

```typescript
const [error, setError] = useState<string | null>(null);

{error && (
  <div className="mt-2 flex items-center gap-2">
    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
    <p className="text-red-600 text-sm">{error}</p>
  </div>
)}
```

### Success Message

```typescript
{success && (
  <div className="mt-2 flex items-center gap-2">
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <p className="text-green-600 text-sm">{success}</p>
  </div>
)}
```

### Info Alert

```typescript
<div className="bg-[#e8f1fb] border-l-4 border-[#4a7bba] p-4 rounded">
  <div className="flex items-start gap-3">
    <svg className="w-5 h-5 text-[#4a7bba] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
    <p className="text-gray-800 text-sm">Information message here</p>
  </div>
</div>
```

## 🔔 Modal Patterns

### Basic Modal Structure

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-start">
          <h2 className="text-2xl font-bold text-[#1e2d4f]">Modal Title</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="px-8 py-6">
          {/* Modal content here */}
        </div>
        
        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 border-2 border-[#1e2d4f] text-[#1e2d4f] rounded">
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#1e2d4f] text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
```

## 🎭 Browser Event Handling

### Prevent Navigation

```typescript
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (shouldWarn) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [shouldWarn]);
```

## 📊 Common Utility Functions

### Format Currency

```typescript
const formatCurrency = (amount: number): string => {
  return `₪${amount.toLocaleString('en-US')}`;
};
```

### Parse Amount

```typescript
const parseAmount = (value: string): number => {
  return parseFloat(value.replace(/[₪,\s]/g, '')) || 0;
};
```

### Format Date

```typescript
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');
};
```

## 🧪 Testing Checklist

- [ ] Test investment amount validation
- [ ] Test ISA limit checking with different income ranges
- [ ] Test signature canvas on desktop and mobile
- [ ] Test file upload and removal
- [ ] Test modal open/close behavior
- [ ] Test navigation between pages
- [ ] Test localStorage persistence
- [ ] Test form validation messages
- [ ] Test responsive design on mobile devices
- [ ] Test browser back button behavior

## 🚀 Performance Tips

1. **Lazy Load Components**: Use dynamic imports for large modals
```typescript
const AnnualIncomeModal = dynamic(() => import('@/components/AnnualIncomeModal'));
```

2. **Memoize Expensive Calculations**:
```typescript
const validationResult = useMemo(
  () => validateInvestment(amount, history, range),
  [amount, history, range]
);
```

3. **Debounce Input Handlers**:
```typescript
import { useMemo } from 'react';
import { debounce } from 'lodash'; // or implement your own

const debouncedSearch = useMemo(
  () => debounce((value: string) => performSearch(value), 300),
  []
);
```

## 📱 Mobile Considerations

### Touch Events for Canvas

```typescript
const handleTouchStart = (e: React.TouchEvent) => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  startDrawing({
    clientX: touch.clientX,
    clientY: touch.clientY
  } as any);
};
```

### Responsive Breakpoints

```typescript
// Tailwind breakpoints
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X Extra large devices
```

## 🔍 Debugging

### Console Logging (Development Only)

```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Investment data:', { amount, incomeRange });
}
```

### React DevTools
- Install React Developer Tools browser extension
- Inspect component props and state
- Track re-renders with Profiler

## 📦 Build & Deploy

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Production server
npm start

# Type checking
npx tsc --noEmit

# Lint
npm run lint
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENV=development
```

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Quick Tips:**
- Use `Cmd+Click` (Mac) or `Ctrl+Click` (Windows) to navigate to component definitions
- Use `Cmd+P` (Mac) or `Ctrl+P` (Windows) in VS Code for quick file navigation
- Install "Tailwind CSS IntelliSense" extension for class name autocomplete
- Install "ES7+ React/Redux/React-Native snippets" for quick component scaffolding

**Last Updated**: November 17, 2025

