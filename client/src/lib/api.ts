// API endpoints for currency conversion
const EXCHANGE_RATE_API_ENDPOINT = "/api/exchange-rate";

interface ExchangeRateResponse {
  rate: number;
  timestamp: string;
  base: string;
  nextUpdate?: string;
  provider?: string;
  fallback?: boolean;
}

// Define the type for our exchange rate response
export type ParsedExchangeRate = ExchangeRateResponse;

// Function to fetch the exchange rate from the backend
export async function fetchExchangeRate(): Promise<ParsedExchangeRate> {
  try {
    const response = await fetch(EXCHANGE_RATE_API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`Error fetching exchange rate: ${response.status}`);
    }
    
    const data: ExchangeRateResponse = await response.json();
    
    // Return the parsed data
    return data;
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
    throw error;
  }
}
