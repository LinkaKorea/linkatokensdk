"use strict";
const grab = require('ps-grab');
const fs = require('fs');
const path = require('path');
const linka_sdk = require("linka-node-sdk");

const privatekeyPath = grab('--key') || grab('-K');
const outputPath = grab('--output') || grab('-O');

if(  !privatekeyPath || !outputPath){
    console.log('node ',__filename,'-K [keyPath] -O [outputPath]');
}

async function makeSign(){
    var privatekey = null;
    if(privatekeyPath.startsWith('.')){
        privatekey = fs.readFileSync(path.join(__dirname,'..', privatekeyPath));
    }else{
        privatekey = fs.readFileSync(privatekeyPath);
    }
    let result = await linka_sdk.makeSignForRegist(privatekey.toString('utf8'));
   
    if(outputPath){
        fs.writeFileSync(outputPath,result.data.signdata);
    }
}
makeSign();