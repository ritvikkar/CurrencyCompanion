import { AlertCircle, Check, X, Edit, RefreshCw } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ParsedExchangeRate } from "@/lib/api";

interface LiveRateInfoProps {
  rate: number;
  isLoading: boolean;
  isError: boolean;
  timestamp?: string;
  onRateOverride?: (rate: number | null) => void;
  exchangeRateData?: ParsedExchangeRate;
}

export default function LiveRateInfo({ 
  rate, 
  isLoading, 
  isError, 
  timestamp,
  onRateOverride,
  exchangeRateData
}: LiveRateInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [customRate, setCustomRate] = useState<string>(rate.toFixed(2));
  const [isRateOverridden, setIsRateOverridden] = useState(false);
  
  const formattedTimestamp = timestamp ? formatDate(new Date(timestamp)) : "Unknown";
  
  // Determine API status
  let statusColor = "bg-green-500";
  let statusText = "Live exchange rate";
  
  if (isRateOverridden) {
    statusColor = "bg-purple-500";
    statusText = "Using custom rate";
  } else if (isLoading) {
    statusColor = "bg-yellow-500";
    statusText = "Loading exchange rates...";
  } else if (isError) {
    if (exchangeRateData?.cachedData) {
      statusColor = "bg-orange-400";
      statusText = "Using cached rate";
    } else {
      statusColor = "bg-red-500";
      statusText = "Using fallback rates";
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomRate(e.target.value);
  };
  
  const applyCustomRate = () => {
    const parsedRate = parseFloat(customRate);
    if (!isNaN(parsedRate) && parsedRate > 0) {
      if (onRateOverride) {
        onRateOverride(parsedRate);
        setIsRateOverridden(true);
        setIsEditing(false);
      }
    }
  };
  
  const resetToLiveRate = () => {
    if (onRateOverride) {
      onRateOverride(null);
      setIsRateOverridden(false);
      setCustomRate(rate.toFixed(2));
    }
  };
  
  const cancelEditing = () => {
    setIsEditing(false);
    setCustomRate(rate.toFixed(2));
  };
  
  return (
    <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
      <div className="flex flex-col justify-between">
        <div className="flex items-center">
          <h3 className="text-[10px] sm:text-xs font-medium text-gray-700 mb-1 sm:mb-2">Exchange Rate Status</h3>
          <div className="relative inline-block group">
            <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 cursor-help opacity-70 text-blue-500 mb-1 sm:mb-2 hover:opacity-100">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-full w-full" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute left-0 top-4 p-2 w-[calc(100vw-2rem)] sm:w-64 max-w-xs bg-white rounded-md shadow-lg border border-gray-200 text-[10px] sm:text-xs text-gray-700 z-20 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
              This shows the real-time market exchange rate, which tells you how currencies trade in global markets. While it accurately converts money values, it doesn't tell you if ₹80,000 in India would buy you the same goods and services as $1,000 in the US. For that information, see the Relative Rate conversion.
            </div>
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">
          {isLoading ? "Updating..." : (
            <>
              Last updated: {formattedTimestamp}
              <div>Data: <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ExchangeRate-API.com</a></div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`inline-block h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full ${statusColor} mr-1 sm:mr-2`}></span>
          <span className="text-[10px] sm:text-xs text-gray-600">{statusText}</span>
        </div>
        {onRateOverride && !isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-5 px-1 sm:px-2 text-[10px] sm:text-xs text-blue-600" 
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
            <span className="hidden sm:inline">Custom Rate</span>
          </Button>
        )}
      </div>
      
      {isEditing && onRateOverride && (
        <div className="mt-3 space-y-2 bg-white p-2 rounded-md border border-blue-200">
          <div className="text-[10px] sm:text-xs font-medium text-gray-700">
            Enter custom rate for airports/exchange offices:
          </div>
          <div className="flex items-center space-x-1">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-[10px] sm:text-xs">1 USD</span>
                <span className="text-gray-500 text-[10px] sm:text-xs mx-1">=</span>
              </div>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                className="pl-14 sm:pl-16 pr-10 sm:pr-12 py-1 sm:py-2 h-7 sm:h-8 text-xs sm:text-sm"
                value={customRate}
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-[10px] sm:text-xs">INR</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="h-7 sm:h-8 w-7 sm:w-8 p-0 bg-green-500 hover:bg-green-600" 
              onClick={applyCustomRate}
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 sm:h-8 w-7 sm:w-8 p-0 border-red-200 text-red-500" 
              onClick={cancelEditing}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-500">This will override the market rate for all conversions</p>
        </div>
      )}
      
      {isRateOverridden && onRateOverride && !isEditing && (
        <div className="mt-3 p-2 bg-purple-50 rounded-md border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="text-[10px] sm:text-xs text-purple-700">
              Using custom rate: 1 USD = ₹{formatCurrency(parseFloat(customRate), "INR")}
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-6 px-2 text-[10px] sm:text-xs text-blue-600 border-blue-200 hover:bg-blue-50" 
              onClick={resetToLiveRate}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              <span className="inline">Return to Live Rate</span>
            </Button>
          </div>
          <p className="mt-1 text-[9px] sm:text-[10px] text-gray-500">Current market rate: 1 USD = ₹{formatCurrency(exchangeRateData?.rate || 83, "INR")} INR</p>
        </div>
      )}
      
      {isError && !isRateOverridden && (
        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
          {exchangeRateData?.cachedData ? (
            <>
              <div className="flex items-center text-[10px] sm:text-xs text-orange-600">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span>Could not connect to exchange rate API. Using previously cached rate.</span>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500">
                <span>Cache updated: {formattedTimestamp}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center text-[10px] sm:text-xs text-red-600">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span>Could not connect to exchange rate API. Using default fallback rate.</span>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500">
                <span>Possible causes:</span>
                <ul className="list-disc ml-4 mt-1 sm:mt-2">
                  <li>CORS policy blocking the request</li>
                  <li>Rate limit exceeded (100 requests/month for free tier)</li>
                  <li>API service temporarily unavailable</li>
                </ul>
              </div>
            </>
          )}
          <div className="text-[10px] sm:text-xs text-gray-500">
            Using rate: 1 USD <span className="px-1">=</span> ₹{formatCurrency(rate, "INR")} INR
          </div>
        </div>
      )}
    </div>
  );
}
