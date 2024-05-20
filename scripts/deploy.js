const hre= require("hardhat");
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Crowdfundingfm = await hre.ethers.getContractFactory("ColorMarketplace");
  const crowdfunding = await Crowdfundingfm.deploy();

  console.log("ColorMarketplace contract deployed to:", crowdfunding.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
;  

// const { ethers } = require("hardhat");

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);

//   const ColorMarketplace = await ethers.getContractFactory("ColorMarketplace");
//   const colorMarketplace = await ColorMarketplace.deploy();

//   console.log("ColorMarketplace contract deployed to:", colorMarketplace.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });