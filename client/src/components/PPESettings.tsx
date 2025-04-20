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
  { label: "📦 General Goods (Average)", value: 20 },
  { label: "🧾 Salary", value: 10 },
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
    if (ppeRate === 20) {
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
    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
      <h3 className="text-xs font-medium text-gray-700 mb-4">
        Adjust PPE Rate
      </h3>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-xs">1 USD</span>
              <span className="text-gray-500 text-xs mx-1">=</span>
            </div>
            <Input
              id="ppe-rate"
              type="number"
              min={1}
              max={100}
              className="pl-16 pr-12 py-2 h-8 text-sm"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-xs">INR</span>
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
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹1</span>
            <span>₹50</span>
            <span>₹100</span>
          </div>
        </div>
        
        {/* PPE presets */}
        <div className="mt-2">
          <h4 className="text-xs font-medium text-gray-600 mb-2">Spending Categories</h4>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <Button 
                key={preset.label}
                size="sm"
                variant="outline"
                className={`text-xs py-1 px-3 h-6 rounded-md border-purple-300 transition-all duration-300 ease-in-out transform cursor-pointer ${
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
