const express = require('express')
const app = express()

const Web3 = require('web3');

// console.log(Web3);

const web3 = new Web3("https://ropsten.infura.io/v3/37ce477e00c14a8390548738542dd9aa");
                        // wss://ropsten.infura.io/ws/v3/37ce477e00c14a8390548738542dd9aa
// console.log(web3);
const account = "0xfc6448AA384E6ca33e64023C2a0b18f6a69423ad";//metmask account(ethereum Compatible public key;
var pkey ="a20ab37c47fb882b45231be038e2f57f48a21e133cddaa9db260319658a3b283"//privatekey of your account;

const contractAddress = "0x56E82a2B9Feaf4eD4834a2c104e42D3E362A4662";

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_word",
				"type": "string"
			}
		],
		"name": "setWord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newstate",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "changer",
				"type": "address"
			}
		],
		"name": "wordEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getWord",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];//abi of the contract from remix

var myContract = new web3.eth.Contract(abi, contractAddress);

console.log(myContract);
console.log('app is runing')

app.get('/', function (req, res) {
// res.send('Hello Everyone')
    console.log(__dirname);
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/newroute/:ID',function(req,res){
    console.log(req.params.ID);
res.send("this is the response from webserver : "+ req.params.ID)
})

app.post('/set/:ID',function(req,res){

    var encodedData = myContract.methods.setWord(req.params.ID).encodeABI();
    console.log(encodedData);
  let transactionObject = {
    gas: "470000",
    data: encodedData,
    from: account,
    to: contractAddress
  };

  web3.eth.accounts.signTransaction(transactionObject, pkey, function(
    err,
    trans
  ) {
    if (err) {
      console.log(err);
    }
    console.log(trans);
    web3.eth
      .sendSignedTransaction(trans.rawTransaction)
      .on("receipt",function(result){
          console.log(result);
          res.send(result.blockHash);
      });
  });


})

app.get('/get',function(req,res){
    myContract.methods.getWord().call({from:account})
    .then(function(result){
        console.log(result);
        res.send(result);
    })
})



app.listen(8080) 