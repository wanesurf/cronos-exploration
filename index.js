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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
