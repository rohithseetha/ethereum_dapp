const Web3 = require("web3");

// const web3 = new Web3("http://localhost:8545");
console.log(Web3.providers);
const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/37ce477e00c14a8390548738542dd9aa'));

// console.log(web3);

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
];

var myContract = new web3.eth.Contract(abi, contractAddress);

// console.log(myContract);

myContract.events.wordEvent((err, result) => {
  console.log(result);
  console.log(err);
});

// var settingWordEvent1 = myContract.events.wordEvent({}, { fromBlock: 8461274, toBlock:'latest'});
//                 console.log(settingWordEvent1);
//                 settingWordEvent1.watch(function(error,result){
//                     console.log(result);
//                 })
myContract.events.wordEvent({
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
}, function(error, event){ console.log(event); 
	// console.log(event);
	})
.on('data', function(event){
	// console.log(event);
	// console.log(event.Result)
	 // same results as the optional callback above
})
.on('changed', function(event){
    // remove event from local database
})
.on('error', console.error);