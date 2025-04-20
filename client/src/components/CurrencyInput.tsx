import { Input } from "@/components/ui/input";

interface CurrencyInputProps {
  label: string;
  symbol: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
}

export default function CurrencyInput({ label, symbol, value, onValueChange }: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onValueChange(null);
    } else {
      const numericValue = parseFloat(val);
      if (!isNaN(numericValue)) {
        onValueChange(numericValue);
      }
    }
  };

  return (
    <div className="flex-1">
      <label htmlFor={`${label}-input`} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{symbol}</span>
        </div>
        <Input
          id={`${label}-input`}
          type="number"
          className="pl-8 pr-12 py-3"
          placeholder="0.00"
          value={value !== null ? value : ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
