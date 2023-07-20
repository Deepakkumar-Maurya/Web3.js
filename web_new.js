solc = require("solc");

const fs = require("fs");

const path = 'demo.sol';

Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

let fileContent = fs.readFileSync(path,'utf-8');

console.log(fileContent);

var input = {
    language: "Solidity",
    sources: {
        "demo.sol": {
            content: fileContent,
        },
    },

    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
let ABI = output.contracts["demo.sol"]["demo"].abi;
let bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;

console.log("abi: ",ABI);
console.log("bytecode: ",bytecode);

contract = new web3.eth.Contract(ABI);

web3.eth.getAccounts().then((accounts) => {
    console.log("Accounts:", accounts);
    defaultAccount = accounts[0];
    console.log("Default Account:", defaultAccount);

    contract
        .deploy({ data: bytecode })
        .send({ from: defaultAccount, gas: 5000000 })
        .on('receipt', (receipt) => {
            console.log("Contract Address:", receipt.contractAddress);
        })
        .on('error', (err) => {
            console.log(err);
          })
        .then((demoContract) => {
            demoContract.methods.x().call((err,data) => {
                console.log("Initial Value:",data);
            })
        });

});