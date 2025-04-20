import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Exchange rate API endpoint
  app.get("/api/exchange-rate", async (req, res) => {
    try {
      // Using ExchangeRate-API.com's free tier API (no key required)
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      
      if (!response.ok) {
        throw new Error(`Exchange rate API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Exchange rate API response received");
      
      // Verify data structure
      if (data.result !== "success" || !data.rates || !data.rates.INR) {
        throw new Error("Invalid response format from exchange rate API");
      }
      
      // Return the processed data
      res.json({
        rate: data.rates.INR,
        timestamp: new Date(data.time_last_update_utc).toISOString(),
        base: data.base_code,
        nextUpdate: data.time_next_update_utc,
        provider: data.provider
      });
      
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      // Return a fallback value in case of error
      res.json({
        rate: 85.49, // Current fallback rate (April 2025)
        timestamp: new Date().toISOString(),
        base: "USD",
        fallback: true
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
