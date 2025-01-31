"use client";
import { SessionProvider } from "next-auth/react";
import { OktoProvider } from "@okto_web3/react-sdk";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the config type and context type
const defaultConfig = {
  environment: 'sandbox',
  vendorPrivKey: '',
  vendorSWA: '',
};

export const ConfigContext = createContext({
  config: defaultConfig,
  setConfig: () => {},
});

const STORAGE_KEY = 'okto_config';

function AppProvider({ children, session }) {
  // Initialize state with a function to avoid unnecessary initial calculations
  const [config, setConfig] = useState(() => {
    try {
      // Check if we're in the browser environment
      if (typeof window !== 'undefined') {
        const savedConfig = localStorage.getItem(STORAGE_KEY);
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig);
          return {
            environment: parsed.environment || defaultConfig.environment,
            vendorPrivKey: parsed.vendorPrivKey || defaultConfig.vendorPrivKey,
            vendorSWA: parsed.vendorSWA || defaultConfig.vendorSWA,
          };
        }
      }
    } catch (error) {
      console.error('Error loading config from localStorage:', error);
    }
    // Default config if nothing in localStorage or error occurred
    return {
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT || defaultConfig.environment,
      vendorPrivKey: process.env.NEXT_PUBLIC_VENDOR_PRIVATE_KEY || defaultConfig.vendorPrivKey,
      vendorSWA: process.env.NEXT_PUBLIC_VENDOR_SWA || defaultConfig.vendorSWA,
    };
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config to localStorage:', error);
    }
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
