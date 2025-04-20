import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8">
          <img 
            src="/currency-icon.png" 
            alt="INR USD Converter Icon" 
            className="w-16 h-16 sm:w-20 sm:h-20 mr-0 sm:mr-4 mb-3 sm:mb-0" 
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center sm:text-left">
            INR &lt;&gt; USD Converter
          </h1>
        </div>
        <CurrencyConverter />
      </div>
    </div>
  );
}
