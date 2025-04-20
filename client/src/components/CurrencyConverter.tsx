import { useState, useEffect } from "react";
import CurrencyInput from "./CurrencyInput";
import LiveRateInfo from "./LiveRateInfo";
import PPESettings from "./PPESettings";
import ConversionResults from "./ConversionResults";
import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRate } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

// Direction enum for tracking which input was last changed
enum Direction {
  INRtoUSD,
  USDtoINR,
}

export default function CurrencyConverter() {
  // State for input values
  const [inrValue, setInrValue] = useState<number>(10000);
  const [usdValue, setUsdValue] = useState<number | null>(null);
  
  // State for PPE rate
  const [ppeRate, setPpeRate] = useState<number>(24);
  
  // Track which input was last modified
  const [direction, setDirection] = useState<Direction>(Direction.INRtoUSD);

  // Fetch exchange rate
  const { 
    data: exchangeRateData, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['/api/exchange-rate'],
    staleTime: 1000 * 60 * 5, // Refresh every 5 minutes
  });

  // Get the exchange rate from the API response
  const forexRate = exchangeRateData?.rate || 83; // Fallback to a default value if API fails

  // Calculate conversions when inputs or rates change
  useEffect(() => {
    if (direction === Direction.INRtoUSD && inrValue !== null) {
      // Calculate USD from INR
      setUsdValue(inrValue / forexRate);
    } else if (direction === Direction.USDtoINR && usdValue !== null) {
      // Calculate INR from USD
      setInrValue(usdValue * forexRate);
    }
  }, [inrValue, usdValue, forexRate, direction]);

  // Handle INR input change
  const handleInrChange = (value: number | null) => {
    setInrValue(value || 0);
    setDirection(Direction.INRtoUSD);
  };

  // Handle USD input change
  const handleUsdChange = (value: number | null) => {
    setUsdValue(value || 0);
    setDirection(Direction.USDtoINR);
  };

  // Handle PPE rate change
  const handlePPERateChange = (value: number) => {
    setPpeRate(value);
  };

  // Calculate PPE conversion values
  const usdValuePPE = inrValue / ppeRate;
  const inrValuePPE = usdValue ? usdValue * ppeRate : 0;

  // Prepare result texts based on direction
  const forexResultText = direction === Direction.INRtoUSD 
    ? `₹${formatCurrency(inrValue)} = $${formatCurrency(usdValue || 0)}`
    : `$${formatCurrency(usdValue || 0)} = ₹${formatCurrency(inrValue)}`;
  
  const ppeResultText = direction === Direction.INRtoUSD
    ? `₹${formatCurrency(inrValue)} = $${formatCurrency(usdValuePPE)}`
    : `$${formatCurrency(usdValue || 0)} = ₹${formatCurrency(inrValuePPE)}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">INR/USD Currency Converter</h1>
      
      {/* Input Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <CurrencyInput
            label="Indian Rupee (₹)"
            symbol="₹"
            value={inrValue}
            onValueChange={handleInrChange}
          />
          
          {/* Direction Indicator */}
          <div className="flex items-center justify-center">
            <div className="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          
          <CurrencyInput
            label="US Dollar ($)"
            symbol="$"
            value={usdValue}
            onValueChange={handleUsdChange}
          />
        </div>
      </div>
      
      {/* Live Rate Info */}
      <LiveRateInfo 
        rate={forexRate} 
        isLoading={isLoading} 
        isError={isError} 
        timestamp={exchangeRateData?.timestamp} 
      />
      
      {/* PPE Settings */}
      <PPESettings 
        ppeRate={ppeRate} 
        onPPERateChange={handlePPERateChange} 
      />
      
      {/* Conversion Results */}
      <ConversionResults 
        forexResult={forexResultText}
        ppeResult={ppeResultText}
        forexRate={forexRate}
        ppeRate={ppeRate}
      />
      
      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Exchange rates provided by <a href="https://exchangerate.host" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">exchangerate.host</a>
        </p>
      </div>
    </div>
  );
}
