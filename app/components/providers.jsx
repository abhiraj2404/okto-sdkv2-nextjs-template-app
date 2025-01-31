"use client";
import { SessionProvider } from "next-auth/react";
import { OktoProvider } from "@okto_web3/react-sdk";
import React, { createContext, useContext, useState } from "react";

// Create a context for config management
export const ConfigContext = createContext(null);

function AppProvider({ children, session }) {
  const [config, setConfig] = useState({
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'sandbox',
    vendorPrivKey: process.env.NEXT_PUBLIC_VENDOR_PRIVATE_KEY || '',
    vendorSWA: process.env.NEXT_PUBLIC_VENDOR_SWA || '',
  });

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
