import { AlertCircle } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface LiveRateInfoProps {
  rate: number;
  isLoading: boolean;
  isError: boolean;
  timestamp?: string;
}

export default function LiveRateInfo({ rate, isLoading, isError, timestamp }: LiveRateInfoProps) {
  const formattedTimestamp = timestamp ? formatDate(new Date(timestamp)) : "Unknown";
  
  // Determine API status
  let statusColor = "bg-green-500";
  let statusText = "Live exchange rate";
  
  if (isLoading) {
    statusColor = "bg-yellow-500";
    statusText = "Loading exchange rates...";
  } else if (isError) {
    statusColor = "bg-red-500";
    statusText = "Using fallback rates";
  }
  
  return (
    <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
      <div className="flex flex-col justify-between">
        <div className="relative group">
          <div className="flex items-center">
            <h3 className="text-[10px] sm:text-xs font-medium text-gray-700 mb-1 sm:mb-2">Exchange Rate Status</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 cursor-help opacity-70 text-blue-500 mb-1 sm:mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 sm:right-0 sm:left-auto mt-6 p-2 w-[calc(100vw-2rem)] sm:w-64 max-w-xs bg-white rounded-md shadow-lg border border-gray-200 text-[10px] sm:text-xs text-gray-700 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            This shows the real-time exchange rate from a financial data provider. The market exchange rate is what banks and currency exchanges use for transactions. It fluctuates based on global economic factors and market conditions.
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
      <div className="flex items-center">
        <span className={`inline-block h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full ${statusColor} mr-1 sm:mr-2`}></span>
        <span className="text-[10px] sm:text-xs text-gray-600">{statusText}</span>
      </div>
      
      {isError && (
        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
          <div className="flex items-center text-[10px] sm:text-xs text-red-600">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span>Could not connect to exchange rate API. Using fallback rate.</span>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500">
            <span>Possible causes:</span>
            <ul className="list-disc ml-4 mt-1 sm:mt-2">
              <li>CORS policy blocking the request</li>
              <li>Rate limit exceeded (100 requests/month for free tier)</li>
              <li>API service temporarily unavailable</li>
            </ul>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500">
            Using fallback rate: 1 USD <span className="px-1">=</span> ₹{formatCurrency(rate, "INR")} INR
          </div>
        </div>
      )}
    </div>
  );
}
