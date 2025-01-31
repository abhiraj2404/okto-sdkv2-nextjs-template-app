"use client";
import { SessionProvider } from "next-auth/react";
import { OktoProvider } from "@okto_web3/react-sdk";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for config management
export const ConfigContext = createContext(null);

const STORAGE_KEY = 'okto_config';

function AppProvider({ children, session }) {
  // Initialize state with a function to avoid unnecessary initial calculations
  const [config, setConfig] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem(STORAGE_KEY);
      if (savedConfig) {
        return JSON.parse(savedConfig);
      }
    }
    // Default config if nothing in localStorage
    return {
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'sandbox',
      vendorPrivKey: process.env.NEXT_PUBLIC_VENDOR_PRIVATE_KEY || '',
      vendorSWA: process.env.NEXT_PUBLIC_VENDOR_SWA || '',
    };
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  return (
    <SessionProvider session={session}>
      <ConfigContext.Provider value={{ config, setConfig }}>
        <OktoProvider config={config}>
          {children}
        </OktoProvider>
      </ConfigContext.Provider>
    </SessionProvider>
  );
}

export default AppProvider;
