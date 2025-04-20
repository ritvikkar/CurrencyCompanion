import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <CurrencyConverter />
      </div>
    </div>
  );
}
