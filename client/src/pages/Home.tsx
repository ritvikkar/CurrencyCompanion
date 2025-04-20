import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6 sm:mb-8">
          <img 
            src="/currency-icon.png" 
            alt="INR USD Converter Icon" 
            className="w-16 h-16 sm:w-20 sm:h-20" 
          />
        </div>
        <CurrencyConverter />
      </div>
    </div>
  );
}
