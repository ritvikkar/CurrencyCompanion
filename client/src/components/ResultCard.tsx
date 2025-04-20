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
  
  // Tooltip text based on type
  const tooltipText = type === "forex" 
    ? "The official market exchange rate between currencies." 
    : "The adjusted rate that reflects actual purchasing power parity based on local prices and cost differences in various spending categories.";
  
  // Split the result text to highlight the converted amount
  const [source, target] = resultText.split(" = ");
  
  return (
    <div className={`bg-gradient-to-br ${gradientColors} rounded-lg border p-3 sm:p-4`}>
      <div className="flex items-center mb-3 sm:mb-4 relative group">
        <h3 className="text-xs sm:text-sm font-medium text-gray-700">
          {type === "forex" ? "Exchange Rate" : "Relative Rate"}
        </h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 cursor-help opacity-70 ${iconColor}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="absolute top-full left-0 mt-1 p-2 w-64 max-w-[90vw] bg-white rounded-md shadow-lg border border-gray-200 text-xs text-gray-700 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {tooltipText}
        </div>
      </div>
      <div className="mb-3 sm:mb-4">
        <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">
          <span className="text-gray-600">{source}</span> <span className="px-1">=</span> <span className={textColor}>{target}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1 sm:mt-2">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${iconColor} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-gray-600 break-words">
          {rateText.replace(" = ", " ").split("=").join(" = ")}
        </span>
      </div>
    </div>
  );
}
