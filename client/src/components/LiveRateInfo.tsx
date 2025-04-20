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
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-medium text-gray-700 mb-2">Exchange Rate Status</h3>
        </div>
        <div className="text-xs text-gray-500 mb-2">
          {isLoading ? "Updating..." : (
            <>
              Last updated: {formattedTimestamp}
              <div>Data: <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ExchangeRate-API.com</a></div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <span className={`inline-block h-2 w-2 rounded-full ${statusColor} mr-2`}></span>
        <span className="text-xs text-gray-600">{statusText}</span>
      </div>
      
      {isError && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-xs text-red-600">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>Could not connect to exchange rate API. Using fallback rate.</span>
          </div>
          <div className="text-xs text-gray-500">
            <span>Possible causes:</span>
            <ul className="list-disc ml-4 mt-2">
              <li>CORS policy blocking the request</li>
              <li>Rate limit exceeded (100 requests/month for free tier)</li>
              <li>API service temporarily unavailable</li>
            </ul>
          </div>
          <div className="text-xs text-gray-500">
            Using fallback rate: 1 USD <span className="px-1">=</span> ₹{formatCurrency(rate, "INR")} INR
          </div>
        </div>
      )}
    </div>
  );
}
