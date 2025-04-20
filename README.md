# INR/USD Currency Converter

A React-based currency converter that provides both forex exchange rates and purchasing power equivalent (PPE) conversions between Indian Rupees (INR) and US Dollars (USD).

## Features

- **Live Exchange Rate**: Fetches real-time forex exchange rates from ExchangeRate-API
- **Purchasing Power Equivalent**: Customizable PPE rate with a default of 24 INR = 1 USD
- **Bidirectional Conversion**: Convert from INR to USD or USD to INR
- **Responsive Design**: Works on mobile, tablet, and desktop screens
- **Visual Comparison**: Clear visual distinction between forex and PPE conversion results

## Technology Stack

- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: Express.js
- **API**: ExchangeRate-API for real-time exchange rates
- **State Management**: React Query for API data fetching
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/inr-usd-converter.git
   cd inr-usd-converter
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser to the displayed URL (usually http://localhost:5000)

## Usage

- Enter an amount in either the INR or USD input field
- The conversion will update automatically in both forex and PPE rates
- Adjust the PPE rate using the slider if needed

## License

MIT

## Acknowledgments

- Exchange rates provided by [ExchangeRate-API](https://www.exchangerate-api.com)