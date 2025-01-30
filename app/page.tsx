"use client";
import React, { useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "@/app/components/LoginButton";
import GetButton from "@/app/components/GetButton";
import {getAccount, getChains, getNftCollections, getOrdersHistory, getPortfolio, getPortfolioActivity, getPortfolioNFT, getTokens, useOkto } from '@okto_web3/react-sdk';
import TransferTokens from "./components/TransferTokens";

export default function Home() {
  const { data: session } = useSession();
  const oktoClient = useOkto();
  
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

  return (
    <main className="flex min-h-screen flex-col items-center space-y-6 p-12 bg-violet-200">
      <div className="text-black font-bold text-3xl mb-8">Okto v2 SDK</div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-8">
        <LoginButton />

        <GetButton title="Okto Authenticate" apiFn={handleAuthenticate} />
        <GetButton title="Okto Log out" apiFn={handleLogout} />
        <GetButton title="getAccount" apiFn={getAccount} />
        <GetButton title="getChains" apiFn={getChains} />
        <GetButton title="getNftCollections" apiFn={getNftCollections} />
        <GetButton title="getOrdersHistory" apiFn={getOrdersHistory} />
        <GetButton title="getPortfolio" apiFn={getPortfolio} />
        <GetButton title="getPortfolioActivity" apiFn={getPortfolioActivity} />
        <GetButton title="getPortfolioNFT" apiFn={getPortfolioNFT} />
        <GetButton title="getTokens" apiFn={getTokens} />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xl">
        <TransferTokens />
      </div>
    </main>
  );
}
