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
  let statusText = "Live exchange rate";
  
  if (isLoading) {
    statusColor = "bg-yellow-500";
    statusText = "Loading exchange rates...";
  } else if (isError) {
    statusColor = "bg-red-500";
    statusText = "Using fallback rates";
  }
  
  return (
    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-medium text-gray-700 mb-1">Exchange Rate Status</h3>
        </div>
        <div className="text-xs text-gray-500 mb-1">
          {isLoading ? "Updating..." : `Last updated: ${formattedTimestamp}`}
        </div>
      </div>
      <div className="flex items-center">
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
