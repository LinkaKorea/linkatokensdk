"use strict";
const grab = require('ps-grab');
const fs = require('fs');
const path = require('path');
const linka_sdk = require("linka-node-sdk");

const rawDataPath = grab('--path') || grab('-P');
const privatekeyPath = grab('--key') || grab('-K');
const outputPath = grab('--output') || grab('-O');

const _abi = `[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"initialSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAddress","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldAddress","type":"address"},{"indexed":false,"name":"newAddress","type":"address"}],"name":"TransferOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]`;
const _func = "transfer";
if(!rawDataPath || !privatekeyPath || !outputPath){
    console.log('node ',__filename,'-P jsonpath -K [keyPath] -O [outputPath]');
    console.log('Input Sample: ')
    console.log(`
        {
            _from: "0xDF07985078f25Ee617dcBd93cC0725F75824606c",
            _to:"0xcee0dDd6010D2C5EAf1F99c24B46bA7abf2d5d41",
            _contractAddress:"0x73C97794235C467a90F2e363Ccfc5ADd6256B67e",
            _amount:"1000000000000000000",
            _gasPrice:"10000000000",
            _gasLimit:"21000",
            _nonce:2
        }
    `)
}

async function makeSign(){
    var privatekey = null;
    if(privatekeyPath.startsWith('.')){
        privatekey = fs.readFileSync(path.join(__dirname,'..', privatekeyPath));
    }else{
        privatekey = fs.readFileSync(privatekeyPath);
    }
    console.log(privatekey.toString('utf8'));
    var rawdata = null;
    if(rawDataPath.startsWith('.')){
        rawdata = fs.readFileSync(path.join(__dirname,'..', rawDataPath));
    }else{
        rawdata = fs.readFileSync(rawDataPath);
    }
    var rawJsonData = JSON.parse(rawdata);
    console.log(rawJsonData);

    var abiJson = JSON.parse(_abi);
    let result = await linka_sdk.makeSignedTransaction(rawJsonData._from, rawJsonData._to, rawJsonData._contractAddress, abiJson, _func, String(rawJsonData._amount), String(rawJsonData._gasPrice_), String(rawJsonData._gasLimit), String(rawJsonData._nonce), privatekey.toString('utf8'));
    console.log(result);
    if(outputPath){
        fs.writeFileSync(outputPath,result.data.signdata);
    }
}
makeSign();