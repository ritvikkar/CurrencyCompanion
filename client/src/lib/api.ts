// API endpoints for currency conversion
const EXCHANGE_RATE_API_ENDPOINT = "https://api.exchangerate.host/latest";

interface ExchangeRateResponse {
  rates: {
    [currency: string]: number;
  };
  base: string;
  date: string;
}

interface ParsedExchangeRate {
  rate: number;
  timestamp: string;
  base: string;
}

// Function to fetch the exchange rate from INR to USD
export async function fetchExchangeRate(): Promise<ParsedExchangeRate> {
  try {
    const response = await fetch(`${EXCHANGE_RATE_API_ENDPOINT}?base=USD&symbols=INR`);
    
    if (!response.ok) {
      throw new Error(`Error fetching exchange rate: ${response.status}`);
    }
    
    const data: ExchangeRateResponse = await response.json();
    
    return {
      rate: data.rates.INR,
      timestamp: new Date().toISOString(),
      base: data.base,
    };
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
    throw error;
  }
}
