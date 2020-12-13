const express = require('express')
const app = express()

const Web3 = require('web3');

// console.log(Web3);

const web3 = new Web3("https://ropsten.infura.io/v3/37ce477e00c14a8390548738542dd9aa");



app.get('/', function (req, res) {
// res.send('Hello Everyone')
    console.log(__dirname);
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/newroute/:ID',function(req,res){
    console.log(req.params.ID);
res.send("this is the response from webserver : "+ req.params.ID)
})

app.post('/2ndroute',)



app.listen(8080) 