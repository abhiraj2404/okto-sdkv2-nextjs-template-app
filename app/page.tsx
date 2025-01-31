"use client";
import React, { use, useEffect, useMemo, useContext, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "@/app/components/LoginButton";
import GetButton from "@/app/components/GetButton";
import {getAccount, getChains, getOrdersHistory, getPortfolio, getPortfolioActivity, getPortfolioNFT, getTokens, useOkto } from '@okto_web3/react-sdk';
import Link from "next/link";
import { ConfigContext } from "@/app/components/providers";

export default function Home() {
  const { data: session } = useSession();
  const oktoClient = useOkto();
  const { config, setConfig } = useContext(ConfigContext);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  
  //@ts-ignore
  const idToken = useMemo(() => (session ? session.id_token : null), [session]);

  async function handleAuthenticate(): Promise<any> {
    if (!idToken) {
      return { result: false, error: "No google login" };
    }
    const user = await oktoClient.loginUsingOAuth({
      idToken: idToken,
      provider: 'google',
    });
    console.log("Authenticateion Success", user);
    return JSON.stringify(user);
  }

  async function handleLogout() {
    try {
      signOut();
      return { result: "logout success" };
    } catch (error) {
      return { result: "logout failed" };
    }
  } 

  useEffect(()=>{
    if(idToken){
      handleAuthenticate();
    }
  }, [idToken])

  // Add this function to handle config updates
  const handleConfigUpdate = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setConfig({
      environment: formData.get('environment'),
      vendorPrivKey: formData.get('vendorPrivKey'),
      vendorSWA: formData.get('vendorSWA'),
    });
    setIsConfigOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-6 p-12 bg-violet-200">
      <div className="text-black font-bold text-3xl mb-8">Okto v2 SDK</div>

      {/* Add Config Button */}
      <button
        onClick={() => setIsConfigOpen(!isConfigOpen)}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        {isConfigOpen ? 'Close Config' : 'Update Config'}
      </button>

      {/* Config Form */}
      {isConfigOpen && (
        <form onSubmit={handleConfigUpdate} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Environment</label>
            <select
              name="environment"
              defaultValue={config.environment}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="sandbox">Sandbox</option>
              <option value="production">Production</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Vendor Private Key</label>
            <input
              type="text"
              name="vendorPrivKey"
              defaultValue={config.vendorPrivKey}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Vendor SWA</label>
            <input
              type="text"
              name="vendorSWA"
              defaultValue={config.vendorSWA}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Save Configuration
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-8">
        <LoginButton />

        {/* <GetButton title="Okto Authenticate" apiFn={handleAuthenticate} /> */}
        <GetButton title="Okto Log out" apiFn={handleLogout} />
        <GetButton title="getAccount" apiFn={getAccount} />
        <GetButton title="getChains" apiFn={getChains} />
        <GetButton title="getOrdersHistory" apiFn={getOrdersHistory} />
        <GetButton title="getPortfolio" apiFn={getPortfolio} />
        <GetButton title="getPortfolioActivity" apiFn={getPortfolioActivity} />
        <GetButton title="getPortfolioNFT" apiFn={getPortfolioNFT} />
        <GetButton title="getTokens" apiFn={getTokens} />
      </div>

      <Link 
        href="/transfer" 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Transfer Page
      </Link>

      <Link 
        href="/createnft" 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Create NFT Page
      </Link>

      <Link 
        href="/transfernft" 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Transfer NFT Page
      </Link>
    </main>
  );
}

