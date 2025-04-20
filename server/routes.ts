import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Exchange rate API endpoint
  app.get("/api/exchange-rate", async (req, res) => {
    try {
      // The API now requires an access key
      // Use fallback data with a note indicating API key is needed
      console.log("Using fallback exchange rate - API key required for live data");
      
      // Return a fallback value with current timestamp
      res.json({
        rate: 83.25, // Current approximate INR/USD rate as fallback
        timestamp: new Date().toISOString(),
        base: "USD",
        fallback: true,
        message: "Using fallback rate - API key required for live data"
      });
      
      // Note: When API key is available, replace with actual API call:
      // const response = await fetch("https://api.exchangerate.host/latest?access_key=YOUR_API_KEY&base=USD&symbols=INR");
      
    } catch (error) {
      console.error("Error in exchange rate endpoint:", error);
      // Return a fallback value in case of error
      res.json({
        rate: 83.25, // Fallback exchange rate
        timestamp: new Date().toISOString(),
        base: "USD",
        fallback: true
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
