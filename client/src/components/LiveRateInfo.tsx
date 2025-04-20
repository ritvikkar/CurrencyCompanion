import { AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

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
  let statusText = "API connected";
  
  if (isLoading) {
    statusColor = "bg-yellow-500";
    statusText = "Loading exchange rates...";
  } else if (isError) {
    statusColor = "bg-red-500";
    statusText = "API disconnected - using cached rates";
  }
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-1">Live Exchange Rate</h2>
          <p className="text-lg font-semibold text-gray-900">
            1 USD = ₹{rate.toFixed(2)} INR
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <p className="text-xs text-gray-500">
            {isLoading ? "Updating..." : `Updated on ${formattedTimestamp}`}
          </p>
          <p className="text-xs text-gray-500">Source: exchangerate.host</p>
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <span className={`inline-block h-2 w-2 rounded-full ${statusColor} mr-2`}></span>
        <span className="text-xs text-gray-600">{statusText}</span>
      </div>
      
      {isError && (
        <div className="mt-2 flex items-center text-xs text-red-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Could not connect to exchange rate API. Using fallback rate.</span>
        </div>
      )}
    </div>
  );
}
