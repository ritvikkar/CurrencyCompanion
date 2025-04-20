import ResultCard from "./ResultCard";

interface ConversionResultsProps {
  forexResult: string;
  ppeResult: string;
  forexRate: number;
  ppeRate: number;
}

export default function ConversionResults({ 
  forexResult, 
  ppeResult, 
  forexRate, 
  ppeRate 
}: ConversionResultsProps) {
  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Conversion Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          type="forex"
          resultText={forexResult}
          rateText={`1 USD = ₹${forexRate.toFixed(2)} INR`}
          description="Based on current exchange rate"
        />
        
        <ResultCard
          type="ppe"
          resultText={ppeResult}
          rateText={`1 USD = ₹${ppeRate.toFixed(2)} INR (PPE)`}
          description="Based on purchasing power equivalent"
        />
      </div>
    </div>
  );
}
