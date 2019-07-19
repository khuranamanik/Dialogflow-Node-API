const express = require('express')
const router  = express.Router()
const credentials = require ('Enter credentials file path');

async function getKnowledgeBase(req,res) {
    // [START dialogflow_get_knowledge_base]
    // Imports the Dialogflow client library
    const dialogflow = require('dialogflow').v2beta1;
    knowledgeBaseId = 'Enter KB-ID';
    // Instantiate a DialogFlow client.
    const client = new dialogflow.KnowledgeBasesClient({
      //projectId: projectId,
    });

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    knowledgeBaseFullName = 'Enter KBFullName'   // On creation of KB, name of the KB is the full name here.
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
 
    
