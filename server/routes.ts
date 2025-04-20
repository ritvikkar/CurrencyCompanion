import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Exchange rate API endpoint
  app.get("/api/exchange-rate", async (req, res) => {
    try {
      // Fetch the exchange rate from the external API
      const response = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=INR");
      
      if (!response.ok) {
        throw new Error(`Exchange rate API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Return the processed data
      res.json({
        rate: data.rates.INR,
        timestamp: new Date().toISOString(),
        base: data.base,
      });
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      res.status(500).json({ 
        message: "Failed to fetch exchange rate",
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
