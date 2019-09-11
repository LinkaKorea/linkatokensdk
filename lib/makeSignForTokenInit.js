"use strict";
const grab = require('ps-grab');
const fs = require('fs');
const path = require('path');
const linka_sdk = require("linka-node-sdk");

const tokenSymbol = grab('--symbol') || grab('-S');
const nonce = grab('--nonce') || grab('-N');
const privatekeyPath = grab('--key') || grab('-K');
const outputPath = grab('--output') || grab('-O');

if( !tokenSymbol || !nonce || !privatekeyPath || !outputPath){
    console.log('node ',__filename,'-S [symbol] -N [nonce] -K [keyPath] -O [outputPath]');
}

async function makeSign(){
    var privatekey = null;
    if(privatekeyPath.startsWith('.')){
        privatekey = fs.readFileSync(path.join(__dirname,'..', privatekeyPath));
    }else{
        privatekey = fs.readFileSync(privatekeyPath);
    }
    console.log(privatekey.toString('utf8'));
    let result = await linka_sdk.makeSignForTokenInit(tokenSymbol, nonce, privatekey.toString('utf8'));
    console.log(result);
    if(outputPath){
        fs.writeFileSync(outputPath,result.data.signdata);
    }
}
makeSign();