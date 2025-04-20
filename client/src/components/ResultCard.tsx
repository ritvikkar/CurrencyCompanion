interface ResultCardProps {
  type: "forex" | "ppe";
  resultText: string;
  rateText: string;
  description: string;
}

export default function ResultCard({ 
  type, 
  resultText, 
  rateText, 
  description 
}: ResultCardProps) {
  // Set colors based on type
  const gradientColors = type === "forex" 
    ? "from-blue-50 to-indigo-50 border-blue-100" 
    : "from-purple-50 to-pink-50 border-purple-100";
  
  const textColor = type === "forex" ? "text-blue-600" : "text-purple-600";
  const iconColor = type === "forex" ? "text-blue-500" : "text-purple-500";
  
  // Split the result text to highlight the converted amount
  const [source, target] = resultText.split(" = ");
  
  return (
    <div className={`bg-gradient-to-br ${gradientColors} rounded-lg border p-4`}>
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        {type === "forex" ? "Exchange Rate" : "Purchasing Power Equivalent"}
      </h3>
      <div className="mb-2">
        <p className="text-lg font-semibold text-gray-900">
          <span className="text-gray-600">{source}</span> <span className="px-2">=</span> <span className={textColor}>{target}</span>
        </p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-gray-600">
          {rateText.replace(" = ", " ").split("=").join(" = ")}
        </span>
      </div>
    </div>
  );
}
