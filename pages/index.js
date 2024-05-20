import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ColorMarketplaceABI from "/home/sruthika/Blockchain-Colors/blockchain/blockchain/artifacts/contracts/ColorMarketplace.sol/ColorMarketplace.json";

export default function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState("");
  const [colorMarketplace, setColorMarketplace] = useState(undefined);
  const [selectedColor, setSelectedColor] = useState("");

  const contractAddress = "0xBA826518cd1e15eC5113B2476D2bf420d5398299"; // Replace with your deployed contract address
  const colorMarketplaceABIJson = ColorMarketplaceABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setEthWallet(provider);
        const accounts = await provider.listAccounts();
        setAccount(accounts[0] || "");
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    } else {
      console.error("Please install MetaMask to use this app.");
    }
  };

  const connectWallet = async () => {
    if (ethWallet) {
      try {
        const accounts = await ethWallet.listAccounts();
        setAccount(accounts[0] || "");
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("MetaMask wallet not detected.");
    }
  };

  const getColorMarketplaceContract = () => {
    if (ethWallet) {
      const signer = ethWallet.getSigner();
      const colorMarketplaceContract = new ethers.Contract(
        contractAddress,
        colorMarketplaceABIJson,
        signer
      );
      setColorMarketplace(colorMarketplaceContract);
    }
  };
  

  const buyColor = async () => {
  if (colorMarketplace && selectedColor) {
    try {
      const contribution = window.prompt(`Enter the amount you want to buy for ${selectedColor}:`);
      if (!contribution || isNaN(contribution)) {
        alert("Please enter a valid amount.");
        return;
      }
      
      let maxLimit;
      if (selectedColor === "green") {
        maxLimit = 30; // Maximum limit for green is 30
      } else if (selectedColor === "red" || selectedColor === "blue") {
        maxLimit = 40; // Maximum limit for red/blue is 40
      } else {
        alert("Invalid color selection.");
        return;
      }

      if (parseInt(contribution) > maxLimit) {
        alert(`Credit limit exceeded for ${selectedColor}`);
        return;
      }

      const contributionWei = ethers.utils.parseEther("0.001");
      const tx = await colorMarketplace.buyColour(selectedColor, contribution, { value: contributionWei });
      await tx.wait();
      alert(`Successfully purchased ${selectedColor}`);
    } catch (error) {
      console.error("Error buying color:", error);
      alert(`Error: ${error.message}`);
    }
  }
};

  // const buyColor = async () => {
  //   if (colorMarketplace && selectedColor) {
  //     try {
  //       const contributionWei = ethers.utils.parseEther("0.001");
  //       const tx = await colorMarketplace.buyColour(selectedColor, 10, { value: contributionWei });
  //       await tx.wait();
  //       console.log("Color purchased");
  //     } catch (error) {
  //       console.error("Error buying color:", error);
  //     }
  //   }
  // };

  const viewColorBalance = async () => {
    if (colorMarketplace && selectedColor) {
      try {
        const balance = await colorMarketplace.colorBalances(selectedColor);
        alert(`Balance of ${selectedColor}: ${balance}`);
      } catch (error) {
        console.error("Error viewing color balance:", error);
      }
    }
  };

  const checkTotalCredits = async () => {
    if (colorMarketplace) {
      try {
        const credits = await colorMarketplace.credits();
        alert(`Total Credits: ${credits}`);
      } catch (error) {
        console.error("Error checking total credits:", error);
      }
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    getColorMarketplaceContract();
  }, [ethWallet]);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#151515" }}>Color Marketplace</h1>
        <p style={{ textAlign: "center", color: "#6c757d" }}>Connected Account: {account}</p>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            margin: "0 auto",
            display: "block",
            cursor: "pointer",
            borderRadius: "5px",
            marginBottom: "20px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onClick={connectWallet}
        >
          Connect Wallet
        </button>

        <hr />

        <h2 style={{ textAlign: "center", color: "#151515", marginBottom: "20px" }}>Select Color</h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <button
            style={{
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onClick={() => handleColorSelection("red")}
          >
            Red
          </button>
          <button
            style={{
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onClick={() => handleColorSelection("green")}
          >
            Green
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onClick={() => handleColorSelection("blue")}
          >
            Blue
          </button>
          <button
            style={{
              backgroundColor: "black",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onClick={() => handleColorSelection("black")}
          >
            Black
          </button>
        </div>

        <hr />

        <h2 style={{ textAlign: "center", color: "#151515", marginBottom: "20px" }}>Color Operations</h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={buyColor}
          >
            Buy Color
          </button>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={viewColorBalance}
          >
            View Color Balance
          </button>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={checkTotalCredits}
          >
            Check Total Credits
          </button>
        </div>

      </div>
    </div>

  );
}
