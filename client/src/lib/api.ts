
// API endpoints for currency conversion
const EXCHANGE_RATE_API_URL = "https://open.er-api.com/v6/latest/USD";

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

// Function to fetch the exchange rate directly from external API
export async function fetchExchangeRate(): Promise<ParsedExchangeRate> {
  try {
    const response = await fetch(EXCHANGE_RATE_API_URL);
    
    if (!response.ok) {
      throw new Error(`Error fetching exchange rate: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Failed to fetch exchange rate:", {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
    return {
      rate: 85.49, // Fallback rate
      timestamp: new Date().toISOString(),
      base: "USD",
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
