import { useState, useEffect } from "react";
import CurrencyInput from "./CurrencyInput";
import LiveRateInfo from "./LiveRateInfo";
import PPESettings from "./PPESettings";
import ResultCard from "./ResultCard";
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
  const [inrValue, setInrValue] = useState<number | null>(10000);
  const [usdValue, setUsdValue] = useState<number | null>(null);
  
  // State for PPE rate
  const [ppeRate, setPpeRate] = useState<number>(20);
  
  // Track which input was last modified
  const [direction, setDirection] = useState<Direction>(Direction.INRtoUSD);

  // Fetch exchange rate directly from the external API
  const { 
    data: exchangeRateData, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['exchangeRate'],
    queryFn: fetchExchangeRate,
    staleTime: 1000 * 60 * 5, // Refresh every 5 minutes
  });

  // Get the exchange rate from the API response
  const forexRate = exchangeRateData?.rate || 83; // Fallback to a default value if API fails

  // Calculate conversions when inputs or rates change
  useEffect(() => {
    if (direction === Direction.INRtoUSD && inrValue !== null) {
      // Calculate USD from INR with 2 decimal places
      const convertedValue = Number((inrValue / forexRate).toFixed(2));
      setUsdValue(convertedValue);
    } else if (direction === Direction.USDtoINR && usdValue !== null) {
      // Calculate INR from USD with 2 decimal places
      const convertedValue = Number((usdValue * forexRate).toFixed(2));
      setInrValue(convertedValue);
    }
  }, [inrValue, usdValue, forexRate, direction]);

  // Handle INR input change
  const handleInrChange = (value: number | null) => {
    setInrValue(value);
    setDirection(Direction.INRtoUSD);
  };

  // Handle USD input change
  const handleUsdChange = (value: number | null) => {
    setUsdValue(value);
    setDirection(Direction.USDtoINR);
  };

  // Handle PPE rate change
  const handlePPERateChange = (value: number) => {
    setPpeRate(value);
  };

  // Calculate PPE conversion values with 2 decimal places
  const usdValuePPE = inrValue !== null ? Number((inrValue / ppeRate).toFixed(2)) : null;
  const inrValuePPE = usdValue !== null ? Number((usdValue * ppeRate).toFixed(2)) : null;

  // Prepare result texts based on direction
  const forexResultText = direction === Direction.INRtoUSD 
    ? `₹${inrValue !== null ? formatCurrency(inrValue, "INR") : "0.00"} = $${usdValue !== null ? formatCurrency(usdValue) : "0.00"}`
    : `$${usdValue !== null ? formatCurrency(usdValue) : "0.00"} = ₹${inrValue !== null ? formatCurrency(inrValue, "INR") : "0.00"}`;
  
  const ppeResultText = direction === Direction.INRtoUSD
    ? `₹${inrValue !== null ? formatCurrency(inrValue, "INR") : "0.00"} = $${usdValuePPE !== null ? formatCurrency(usdValuePPE) : "0.00"}`
    : `$${usdValue !== null ? formatCurrency(usdValue) : "0.00"} = ₹${inrValuePPE !== null ? formatCurrency(inrValuePPE, "INR") : "0.00"}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">INR/USD Currency Converter</h1>
      
      {/* Input Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <CurrencyInput
              label="Indian Rupee (₹)"
              symbol="₹"
              value={inrValue}
              onValueChange={handleInrChange}
            />
          </div>
          
          {/* Direction Indicator - Centered */}
          <div className="flex items-center justify-center">
            <div className="p-4 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <CurrencyInput
              label="US Dollar ($)"
              symbol="$"
              value={usdValue}
              onValueChange={handleUsdChange}
            />
          </div>
        </div>
      </div>
      
      {/* Conversion Results */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-4xl">
          {/* Forex Result Card with Rate Info Below */}
          <div className="space-y-4">
            <ResultCard
              type="forex"
              resultText={forexResultText}
              rateText={`1 USD = ₹${formatCurrency(forexRate, "INR")} INR`}
              description="Based on current exchange rate"
            />
            
            {/* Live Rate Info below Forex Card */}
            <div className="mt-4">
              <LiveRateInfo 
                rate={forexRate} 
                isLoading={isLoading} 
                isError={isError} 
                timestamp={exchangeRateData?.timestamp} 
              />
            </div>
          </div>
          
          {/* PPE Result Card with Settings Below */}
          <div className="space-y-4">
            <ResultCard
              type="ppe"
              resultText={ppeResultText}
              rateText={`1 USD = ₹${formatCurrency(ppeRate, "INR")} INR (PPE)`}
              description="Based on purchasing power equivalent"
            />
            
            {/* PPE Settings below PPE Card */}
            <div className="mt-4">
              <PPESettings 
                ppeRate={ppeRate} 
                onPPERateChange={handlePPERateChange} 
              />
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}
