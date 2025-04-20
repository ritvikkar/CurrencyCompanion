import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface PPESettingsProps {
  ppeRate: number;
  onPPERateChange: (value: number) => void;
}

// Define the preset options
type PresetOption = {
  label: string;
  value: number;
};

const PRESETS: PresetOption[] = [
  { label: "📦 General Goods (Average)", value: 24 },
  { label: "🧾 Salary", value: 24 },
  { label: "🏠 Housing & Rent", value: 10 },
  { label: "🍽️ Food & Dining", value: 10 },
  { label: "🚗 Transportation", value: 15 },
  { label: "🛋️ Furniture & Household", value: 20 },
  { label: "💻 Electronics & Imports", value: 80 },
  { label: "🏥 Healthcare & Education", value: 10 },
  { label: "🧹 Domestic Help", value: 7 },
  { label: "👗 Clothing & Apparel", value: 20 },
  { label: "🛍️ Luxury Goods & Travel", value: 80 }
];

export default function PPESettings({ ppeRate, onPPERateChange }: PPESettingsProps) {
  const [inputValue, setInputValue] = useState<string>(ppeRate.toString());
  const [selectedPreset, setSelectedPreset] = useState<string>("📦 General Goods (Average)");
  
  // Update the input field when ppeRate prop changes
  // Set General Goods as the default selection when component loads
  useEffect(() => {
    if (ppeRate === 24) {
      setSelectedPreset("📦 General Goods (Average)");
    }
  }, []);
  
  useEffect(() => {
    setInputValue(ppeRate.toString());
  }, [ppeRate]);
  
  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    const numericValue = parseFloat(val);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 100) {
      onPPERateChange(numericValue);
      // Clear selected preset when manually changing the value
      setSelectedPreset("");
    }
  };
  
  // Handle slider changes
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setInputValue(newValue.toString());
    onPPERateChange(newValue);
    // Clear selected preset when using the slider
    setSelectedPreset("");
  };
  
  // PPE rate preset handler
  const handlePresetChange = (preset: PresetOption) => {
    setInputValue(preset.value.toString());
    onPPERateChange(preset.value);
    setSelectedPreset(preset.label);
  };

  return (
    <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-100">
      <div className="flex items-center relative group mb-3 sm:mb-4">
        <h3 className="text-xs font-medium text-gray-700">
          Adjust Relative Rate
        </h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-3.5 w-3.5 ml-1 cursor-help opacity-70 text-purple-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="absolute left-0 top-6 p-2 w-[calc(100vw-2rem)] sm:w-64 max-w-xs bg-white rounded-md shadow-lg border border-gray-200 text-xs text-gray-700 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          While the market exchange rate tells you how much ₹80,000 converts to in USD, it doesn't tell you if that amount provides the same standard of living in both countries. The relative rate shows how much money you would need in the US to buy the same things you could buy in India, accounting for local price differences and cost of living.
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-[10px] sm:text-xs">1 USD</span>
              <span className="text-gray-500 text-[10px] sm:text-xs mx-1">=</span>
            </div>
            <Input
              id="ppe-rate"
              type="number"
              min={1}
              max={100}
              className="pl-14 sm:pl-16 pr-10 sm:pr-12 py-1 sm:py-2 h-7 sm:h-8 text-xs sm:text-sm"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-[10px] sm:text-xs">INR</span>
            </div>
          </div>
        </div>
        
        <div className="w-full">
          <Slider
            id="ppe-slider"
            min={1}
            max={100}
            step={1}
            value={[ppeRate]}
            onValueChange={handleSliderChange}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
            <span>₹1</span>
            <span>₹50</span>
            <span>₹100</span>
          </div>
        </div>
        
        {/* Relative rate presets */}
        <div className="mt-1 sm:mt-2">
          <div className="flex items-center relative group mb-1 sm:mb-2">
            <h4 className="text-[10px] sm:text-xs font-medium text-gray-600">Spending Categories</h4>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 cursor-help opacity-70 text-purple-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute left-0 top-6 p-2 w-[calc(100vw-2rem)] sm:w-64 max-w-xs bg-white rounded-md shadow-lg border border-gray-200 text-[10px] sm:text-xs text-gray-700 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              Different goods and services have different purchasing power ratios between countries. For example, ₹10 might buy the same amount of food in India as $1 in the US, but for electronics, the ratio might be closer to the market rate. Select the category that's most relevant to your comparison.
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {PRESETS.map((preset) => (
              <Button 
                key={preset.label}
                size="sm"
                variant="outline"
                className={`text-[10px] sm:text-xs py-0.5 sm:py-1 px-2 sm:px-3 h-5 sm:h-6 rounded-md border-purple-300 transition-all duration-300 ease-in-out transform cursor-pointer ${
                  selectedPreset === preset.label
                    ? "bg-purple-600 text-white border-purple-700 hover:bg-purple-800 hover:text-gray-50 hover:shadow-md hover:scale-105 hover:-translate-y-0.5" 
                    : "bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-400 hover:shadow hover:scale-105 hover:-translate-y-0.5"
                }`}
                onClick={() => handlePresetChange(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
