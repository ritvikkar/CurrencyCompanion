import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
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
  
  // PPE rate preset handler
  const handlePresetChange = (value: number) => {
    setInputValue(value.toString());
    onPPERateChange(value);
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
        
        {/* PPE presets */}
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm"
            variant={ppeRate === 24 ? "default" : "outline"}
            className="text-xs h-8 px-3 rounded-full"
            onClick={() => handlePresetChange(24)}
          >
            General Goods (Average)
          </Button>
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
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹1</span>
            <span>₹50</span>
            <span>₹100</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">Default: 24 INR per 1 USD</p>
    </div>
  );
}
