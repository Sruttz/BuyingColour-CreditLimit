require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: 'https://ethereum-sepolia-rpc.publicnode.com',
      accounts: ["4d53f44d4acd890bc3c1ea9ad8ee14d5bb7de510e25f66f6c624a8266acbcf50"],
    },
  },
};