"use client";
import React, { useState } from "react";
import { nftCollectionCreation, useOkto } from "@okto_web3/react-sdk";

function CreateNFTCollection() {
  const oktoClient = useOkto();

  const [networkName, setNetworkName] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [metadataUri, setMetadataUri] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = () => {
    const nftCollectionParams = {
      networkId: networkName,
      name: "My NFT Collection",
      description: "This is my NFT Collection",
      metadataUri,
      symbol: "MYNFT",
      type: "1155",
    };

    console.log("NFT collection params", nftCollectionParams);

    nftCollectionCreation(nftCollectionParams, oktoClient)
      .then((result) => {
        console.log("NFT Creation success", result);
        setModalMessage(
          "NFT Creation Submitted: " + JSON.stringify(result, null, 2)
        );
        setModalVisible(true);
      })
      .catch((error) => {
        console.error("NFT Creation failed:", error);
        setModalMessage("Error: " + error.message);
        setModalVisible(true);
      });
  };

  const handleCloseModal = () => setModalVisible(false);

  return (
    <div className="flex flex-col items-center bg-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-white text-2xl font-bold mb-6">Create NFT</h1>
      
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={networkName}
        onChange={(e) => setNetworkName(e.target.value)}
        placeholder="Enter Network Name"
      />
      
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Enter NFT Contract Address"
      />
      
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Enter Token ID"
      />
      
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        value={metadataUri}
        onChange={(e) => setMetadataUri(e.target.value)}
        placeholder="Enter Metadata URI"
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
        Create NFT
      </button>

      {modalVisible && (
        <div className="fixed text-white inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-black rounded-lg w-11/12 max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <div className="text-white text-lg font-semibold">NFT Creation Status</div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <div className="text-left">
              <pre className="whitespace-pre-wrap">{modalMessage}</pre>
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

export default CreateNFTCollection; 