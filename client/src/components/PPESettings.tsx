import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface PPESettingsProps {
  ppeRate: number;
  onPPERateChange: (value: number) => void;
}

export default function PPESettings({ ppeRate, onPPERateChange }: PPESettingsProps) {
  const [inputValue, setInputValue] = useState<string>(ppeRate.toString());
  
  // Update the input field when ppeRate prop changes
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
    }
  };
  
  // Handle slider changes
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setInputValue(newValue.toString());
    onPPERateChange(newValue);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-sm font-medium text-gray-700 mb-2">
        Purchasing Power Equivalent (PPE) Rate
      </h2>
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="relative w-full md:w-48">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">1 USD =</span>
            </div>
            <Input
              id="ppe-rate"
              type="number"
              min={1}
              max={100}
              className="pl-16 pr-12 py-2"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">INR</span>
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
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹1</span>
            <span>₹50</span>
            <span>₹100</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">Default PPE rate is set to 24 INR per 1 USD</p>
    </div>
  );
}
