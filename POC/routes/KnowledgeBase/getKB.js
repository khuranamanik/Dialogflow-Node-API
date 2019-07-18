const express = require('express')
const router  = express.Router()
const credentials = require ('/home/arpan/Dialog/Cred.js');

async function getKnowledgeBase(req,res) {
    // [START dialogflow_get_knowledge_base]
    // Imports the Dialogflow client library
    const dialogflow = require('dialogflow').v2beta1;
    knowledgeBaseId = 'MjU0NTk5ODMzODk1MjUyNzg3Mg';
    // Instantiate a DialogFlow client.
    const client = new dialogflow.KnowledgeBasesClient({
      //projectId: projectId,
    });

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // projectId = 'chatbot-perennial-243513';
    knowledgeBaseFullName = 'projects/chatbot-perennial-243513/knowledgeBases/MjU0NTk5ODMzODk1MjUyNzg3Mg';
    const formattedName = client.knowledgeBasePath(projectId, knowledgeBaseId);
  
    const [result] = await client.getKnowledgeBase({name: formattedName});
    console.log(`displayName: ${result.displayName}`);
    console.log(`name: ${result.name}`);
    // [END dialogflow_get_knowledge_base]
  
    const responsetouser = result;
    let respData = {
    data: responsetouser
  };
    res.send(respData);
  
}
module.exports = {
    getKnowledgeBase: getKnowledgeBase
};
 
    