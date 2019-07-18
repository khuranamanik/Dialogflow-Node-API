const express = require('express');
const router = express.Router();

const {google} = require('googleapis');
const path = require('path');

async function runSample(req,res) {

  const client = await google.auth.getClient({
   keyFile: path.join('/home/arpan/Downloads','bot-user.json'),
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
 });

//IAM permission 'dialogflow.agents.get' on 'projects/chatbot-perennial-243513>' denied.
  //  at Gaxios.request (/home/arpan/node_modules/gaxios/build/src/gaxios.js:70:23)
    //at process._tickCallback (internal/process/next_tick.js:68:7)

  const dialogflow = google.dialogflow({
    version: 'v2',
    auth: client
  });

  const result = await dialogflow.projects.getAgent({
    parent: 'projects/chatbot-perennial-243513'
  });
  
  console.log(result.data);


if (module === require.main) {
  runSample().catch(console.error);
}
const responsetouser = result.data;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
}

 module.exports = {
 runSample : runSample 
 } 


