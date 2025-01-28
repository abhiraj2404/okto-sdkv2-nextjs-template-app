"use client";
import { SessionProvider } from "next-auth/react";
import { OktoProvider } from "@okto_web3/react-sdk";
import React from "react";

function AppProvider({ children, session }) {
  const config = {
    environment: 'sandbox',
    vendorPrivKey: process.env.NEXT_PUBLIC_VENDOR_PRIVATE_KEY || (() => { throw new Error("NEXT_PUBLIC_VENDOR_PRIVATE_KEY is not set") })(),
    vendorSWA: process.env.NEXT_PUBLIC_VENDOR_SWA || (() => { throw new Error("NEXT_PUBLIC_VENDOR_SWA is not set") })(),
  };

  return (
    <SessionProvider session={session}>
      <OktoProvider config={config}>
        {children}
      </OktoProvider>
    </SessionProvider>
  );
}

export default AppProvider;
