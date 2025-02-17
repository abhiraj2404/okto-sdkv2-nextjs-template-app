"use client";
import React, { useState } from "react";
import { useOkto } from "@okto_web3/react-sdk";

const SessionSetter = () => {
  const oktoClient = useOkto();
  const [sessionPrivateKey, setSessionPrivateKey] = useState("");
  const [sessionPublicKey, setSessionPublicKey] = useState("");
  const [userSWA, setUserSWA] = useState("");

  const handleSetSession = () => {
    if (sessionPrivateKey && sessionPublicKey && userSWA) {
      try {
        oktoClient.setSession(
          sessionPrivateKey as `0x${string}`,
          sessionPublicKey as `0x${string}`,
          userSWA as `0x${string}`
        );
        console.log("Session set successfully");
      } catch (error) {
        console.error("Failed to set session", error);
      }
    } else {
      console.error("Please provide all session details");
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4 mt-6">
      <h3 className="font-medium text-gray-700 mb-2">Set Session</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Session Private Key
        </label>
        <input
          type="text"
          value={sessionPrivateKey}
          onChange={(e) => setSessionPrivateKey(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Session Public Key
        </label>
        <input
          type="text"
          value={sessionPublicKey}
          onChange={(e) => setSessionPublicKey(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          User SWA
        </label>
        <input
          type="text"
          value={userSWA}
          onChange={(e) => setUserSWA(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <button
        type="button"
        onClick={handleSetSession}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Set Session
      </button>
    </div>
  );
};

export default SessionSetter; 