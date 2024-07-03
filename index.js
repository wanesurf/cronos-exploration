const express = require("express");
const app = express();
const port = 3000;
const cronosRpcMainnet = "https://evm.cronos.org";
const { Web3 } = require("web3");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Returns the CRO balance of the given account address.
app.get("/balance/:address", async (req, res) => {
  const address = req.params.address;
  const balance = await eth_getBalance(address);
  res.json({
    address: address,
    balance: balance + " CRO",
  });
});

async function eth_getBalance(address) {
  try {
    const web3 = new Web3(cronosRpcMainnet);
    const balance = await web3.eth.getBalance(address, "latest");
    // console.log(`Balance of ${address}: ${web3.utils.fromWei(balance, 'ether')} CRO`);
    const formattedBalance = web3.utils.fromWei(balance, "ether");

    return formattedBalance;
  } catch (error) {
    console.log(`Failed to get balance for ${address}: ${error.message}`);
  }
}

app.get("/balance/:address/:tokenAddress", async (req, res) => {
  const address = req.params.address;
  const tokenAddress = req.params.tokenAddress;
  const { balance, symbol } = await cerc20_getBalance(address, tokenAddress);
  res.json({
    address: address,
    balance: balance,
    symbol: symbol,
  });
});

async function cerc20_getBalance(address, tokenAddress) {
  try {
    const web3 = new Web3(cronosRpcMainnet);
    const abi = [
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(abi, tokenAddress);
    const balance = await contract.methods.balanceOf(address).call();
    console.log({ balance });
    const symbol = await contract.methods.symbol().call();
    const decimals = await contract.methods.decimals().call();
    // applying the correct decimal as it can be different for each token
    const formattedBalance = web3.utils.fromWei(balance, parseInt(decimals));

    return { balance: formattedBalance, symbol: symbol };
  } catch (error) {
    console.log(`Failed to get balance for ${address}: ${error.message}`);
  }
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
