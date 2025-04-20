
// API endpoints for currency conversion
const EXCHANGE_RATE_API_URL = "https://open.er-api.com/v6/latest/USD";
const CACHED_RATE_KEY = "cached_exchange_rate";

interface ExchangeRateAPIResponse {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  rates: {
    [key: string]: number;
  };
}

interface ExchangeRateResponse {
  rate: number;
  timestamp: string;
  base: string;
  nextUpdate?: string;
  provider?: string;
  fallback?: boolean;
  cachedData?: boolean;
}

// Default fallback rate if no cached data is available
const DEFAULT_FALLBACK_RATE = 83;

// Define the type for our exchange rate response
export type ParsedExchangeRate = ExchangeRateResponse;

// Function to get the cached exchange rate
function getCachedExchangeRate(): ParsedExchangeRate | null {
  try {
    const cachedData = localStorage.getItem(CACHED_RATE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData) as ParsedExchangeRate;
    }
  } catch (error) {
    console.error("Error retrieving cached exchange rate:", error);
  }
  return null;
}

// Function to save exchange rate to cache
function saveExchangeRateToCache(data: ParsedExchangeRate): void {
  try {
    // Only cache actual API data, not fallback or already cached data
    if (!data.fallback && !data.cachedData) {
      localStorage.setItem(CACHED_RATE_KEY, JSON.stringify(data));
    }
  } catch (error) {
    console.error("Error saving exchange rate to cache:", error);
  }
}

// Function to fetch the exchange rate directly from external API
export async function fetchExchangeRate(): Promise<ParsedExchangeRate> {
  try {
    const response = await fetch(EXCHANGE_RATE_API_URL);
    
    if (!response.ok) {
      throw new Error(`Error fetching exchange rate: ${response.status}`);
    }
    
    const data: ExchangeRateAPIResponse = await response.json();
    
    // Verify the API response format
    if (data.result !== "success" || !data.rates || !data.rates.INR) {
      throw new Error("Invalid response format from exchange rate API");
    }
    
    // Transform the data to match our expected format
    const rateData = {
      rate: data.rates.INR,
      timestamp: new Date(data.time_last_update_utc).toISOString(),
      base: data.base_code,
      nextUpdate: data.time_next_update_utc,
      provider: data.provider
    };
    
    // Save the successful response to cache
    saveExchangeRateToCache(rateData);
    
    return rateData;
  } catch (error) {
    console.error("Failed to fetch exchange rate:", {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
    
    // Try to get cached data first
    const cachedData = getCachedExchangeRate();
    
    if (cachedData) {
      return {
        ...cachedData,
        cachedData: true,
        fallback: true
      };
    }
    
    // Use default fallback if no cached data
    return {
      rate: DEFAULT_FALLBACK_RATE, 
      timestamp: new Date().toISOString(),
      base: "USD",
      fallback: true
    };
  }
}
