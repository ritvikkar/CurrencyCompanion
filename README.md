# INR/USD Currency Converter

A React-based currency converter that provides both real-time forex exchange rates and purchasing power equivalent (PPE) conversions between Indian Rupees (INR) and US Dollars (USD). The application helps users understand not just the direct currency conversion, but also how much purchasing power their money would have in the other country.

![INR/USD Currency Converter Preview](https://via.placeholder.com/800x450?text=INR/USD+Currency+Converter)

> **Note:** Replace the placeholder image above with an actual screenshot or GIF of your application in action before sharing this repository.

## Features

- **Live Exchange Rate**: Fetches real-time forex exchange rates from ExchangeRate-API
- **Cache System**: Stores the latest successful exchange rate fetch locally, using it automatically when API calls fail
- **Custom Rate Override**: Override market rates with custom values for situations like airport currency exchanges
- **Purchasing Power Equivalent**: Customizable relative rate with category presets for different spending types
- **Bidirectional Conversion**: Convert seamlessly from INR to USD or USD to INR with automatic syncing
- **Responsive Design**: Fully responsive interface optimized for mobile, tablet, and desktop screens
- **Information Tooltips**: Hover-activated tooltips explaining conversion concepts and functionality

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui component library
- **API Integration**: @tanstack/react-query for data fetching and caching
- **Icons**: Lucide React for UI icons
- **Backend**: Minimal Express.js for serving the application
- **Build Tool**: Vite for fast development and optimized production builds

## Exchange Rate API

The application uses [ExchangeRate-API](https://www.exchangerate-api.com) (free tier) to fetch real-time market exchange rates:
- No API key is required for the free tier
- Limited to 100 requests per month
- Exchange rates update every 24 hours on the free tier
- Robust fallback mechanism:
  1. First tries to use previously cached exchange rates from local storage
  2. If no cached data is available, falls back to a default rate of 83 INR = 1 USD

## Relative Rate (PPE) Presets

The application includes the following relative purchasing power presets:
- **General Goods (Average)**: 24 INR = 1 USD (default)
- **Salary**: 24 INR = 1 USD
- **Housing & Rent**: 10 INR = 1 USD
- **Food & Dining**: 10 INR = 1 USD
- **Transportation**: 15 INR = 1 USD
- **Furniture & Household**: 20 INR = 1 USD
- **Electronics & Imports**: 80 INR = 1 USD
- **Healthcare & Education**: 10 INR = 1 USD
- **Domestic Help**: 7 INR = 1 USD
- **Clothing & Apparel**: 20 INR = 1 USD
- **Luxury Goods & Travel**: 80 INR = 1 USD

These values represent the approximate purchasing power equivalence for different categories of goods and services between India and the US as of 2023-2024.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/inr-usd-currency-converter.git
   cd inr-usd-currency-converter
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. The application will be available at http://localhost:5000

## Development Notes

- The application is built using a minimal backend approach, with most logic in the frontend
- Two-layer caching strategy:
  - API responses are cached for 5 minutes using React Query to minimize requests
  - Successfully fetched exchange rates are also saved to localStorage for persistent fallback
- No environment variables or API keys are required to run the application
- The project uses TypeScript for type safety and better development experience

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── ui/          # shadcn/ui base components
│   │   │   ├── CurrencyConverter.tsx  # Main converter component
│   │   │   ├── CurrencyInput.tsx      # Input field component
│   │   │   ├── LiveRateInfo.tsx       # Exchange rate info component
│   │   │   ├── PPESettings.tsx        # Relative rate settings component
│   │   │   └── ResultCard.tsx         # Conversion result card component
│   │   │
│   │   ├── lib/             # Utilities and API functions
│   │   │   ├── api.ts       # API service for fetching exchange rates
│   │   │   ├── queryClient.ts  # React Query setup
│   │   │   └── utils.ts     # Utility functions for formatting
│   │   │
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   │
│   └── index.html           # HTML template
│
├── server/                  # Backend Express server
│   └── index.ts             # Server entry point
│
├── shared/                  # Shared types and schemas
│   └── schema.ts            # Database schemas (unused in this project)
│
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Usage

1. **Basic Conversion**:
   - Enter an amount in either the INR or USD input field
   - Both conversion results (Forex and Relative Rate) update automatically

2. **Custom Exchange Rate**:
   - Click "Custom Rate" in the Exchange Rate info section
   - Enter a custom rate for situations like airport exchanges or banks
   - Click the green checkmark to apply or red X to cancel
   - Use "Return to Live Rate" button to revert to the market rate

3. **Adjust Relative Rate**:
   - Use the slider to set a custom relative rate between 1-100
   - Select from preset spending categories for commonly used rates
   - The relative rate conversion updates in real-time

## Browser Support

The application supports all modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## License

MIT

## Acknowledgments

- Exchange rates data provided by [ExchangeRate-API](https://www.exchangerate-api.com)
- UI components based on [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)