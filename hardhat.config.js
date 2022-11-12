module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        accountsBalance: "100000000000000000000",
        passphrase: "",
      },
      mining: {
        auto: false,
        interval: [3000, 6000]
      }
    },
  },
};
