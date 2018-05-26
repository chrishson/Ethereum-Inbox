const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// when pushing to github, remove these variables.
const accountMnemonic = '';
const testNetwork = '';

const provider = new HDWalletProvider(
  accountMnemonic,
  testNetwork
);

const web3 = new Web3(provider);


// !!IMPORTANT!! bytecode must have 0x infront of it. This assumes that the rest
// of the bytecode is hexadecimal and will be left alone,
// otherwise the string gets converted to hexadecimal and will be double the size,
// and completely wrong.
// https://ethereum.stackexchange.com/questions/47482/error-the-contract-code-couldnt-be-stored-please-check-your-gas-limit/
const deploy = async () => {
  const INITIAL_MESSAGE = ['XRP OMG ELEC']
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: INITIAL_MESSAGE })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to', result.options.address);
};

deploy();