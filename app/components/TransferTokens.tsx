"use client";
import React, { useState } from "react";
import { Address, tokenTransfer, useOkto } from "@okto_web3/react-sdk";

function TransferTokens() {
  const oktoClient = useOkto();

  const [networkName, setNetworkName] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [recipientAddress, setRecipientAddress] = useState(
    ""
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = () => {
    console.log("Calling transfer funds: ", {
      networkName,
      tokenAddress,
      recipientAddress,
      quantity,
    });

    const transferParams = {
      amount: Number(quantity),
      recipient: recipientAddress as Address,
      token: tokenAddress as Address,
      chain: networkName,
    }

    tokenTransfer(oktoClient, transferParams)
      .then((result) => {
        console.log("Transfer success", result);
        setModalMessage(
          "Transfer Submitted: " + JSON.stringify(result, null, 2)
        );
        setModalVisible(true);
      })
      .catch((error) => {

      });
  };

  const handleCloseModal = () => setModalVisible(false);

  return (
    <div className="flex flex-col items-center bg-black p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h1 className="text-white text-2xl font-bold mb-6">Transfer Tokens</h1>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={networkName}
        onChange={(e) => setNetworkName(e.target.value)}
        placeholder="Enter Network Name"
      />
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Enter Token Address"
      />
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter Quantity (in smallest unit)"
      />
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Enter Recipient Address"
      />
      <button
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Transfer Tokens
      </button>

      {modalVisible && (
        <div className="fixed text-white inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-black rounded-lg w-11/12 max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <div className="text-white text-lg font-semibold">Transfer Tokens</div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <div className="text-left">
              <p>{modalMessage}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferTokens;
