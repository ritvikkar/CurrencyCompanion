import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a number as a currency string with 2 decimal places
export function formatCurrency(value: number, currency: "INR" | "USD" = "USD"): string {
  if (currency === "INR") {
    return formatIndianCurrency(value);
  }
  
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format a number according to the Indian numbering system (lakh, crore)
export function formatIndianCurrency(value: number): string {
  // Convert to string with 2 decimal places
  const parts = value.toFixed(2).split('.');
  const wholePart = parts[0];
  const decimalPart = parts[1];
  
  // Apply Indian numbering format (1,23,456.78)
  let result = "";
  
  // Handle the first thousand (no comma for numbers < 1000)
  if (wholePart.length <= 3) {
    result = wholePart;
  } else {
    // Process the last 3 digits (thousands)
    result = "," + wholePart.substring(wholePart.length - 3);
    
    // Process the remaining digits in groups of 2 (lakhs, crores, etc.)
    let remainingDigits = wholePart.substring(0, wholePart.length - 3);
    
    while (remainingDigits.length > 0) {
      // Take last 2 digits or all if less than 2
      const groupSize = Math.min(2, remainingDigits.length);
      const group = remainingDigits.substring(remainingDigits.length - groupSize);
      
      result = "," + group + result;
      remainingDigits = remainingDigits.substring(0, remainingDigits.length - groupSize);
    }
    
    // Remove the first comma
    result = result.substring(1);
  }
  
  // Append decimal part
  return result + "." + decimalPart;
}

// Format a date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
