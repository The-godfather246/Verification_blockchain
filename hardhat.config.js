require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  },
  paths: {
    artifacts: './src/artifacts',
  },
};
