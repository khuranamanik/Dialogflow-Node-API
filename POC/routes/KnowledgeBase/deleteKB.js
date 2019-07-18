const express = require('express')
const router  = express.Router()
//const cors = require('cors')
const credentials = require ('../Cred.js');
//DELETES ONLY THOSE KNOWLEDGE BASES THAT DO NOT HAVE A DOCUMENT
//SHOWS ERROR: THE KNOWLEDGE BASE HAS A DOCUMENT IN IT. IF YOU STILL WANT TO, AND THE TERMINATES
async function deleteKnowledgeBase(req,res)
    
    //projectId, knowledgeBaseFullName
     {
    // [START dialogflow_delete_knowledge_base]
    // Instantiate a DialogFlow client.
    const dialogflow = require('dialogflow').v2beta1;
//     let pk = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCp+20rAGET27cf\nI5rO9SbsXQ9jCulpo4uhe/gsa7gCOHsJiZRJfBmEVAdYeE+PxoKNRx6xK5Z5wULW\ndngAKAwsnNWcJ0hNU6fiUB/CbU0px4OdzpQzQcf5i2KW7WSaK99JVduO5HLCkw+R\n40dhZScMSE1fgWi8oLhIKkHgJ+tRKH72QvUdd8ZCxC9gKCs4HWVHv4srDwOVutQn\n44kIxOBhTOaXYx4sTZ7kyDorlG1RTuvYYF49D2ryCTUvcL9JJDoFS5qpOPkftDIY\nqmsvEfgpxNudhuFyLriuhJdXiubZq4yTk7TyPRh8kaxh8o/sErFuft7afE0liSgo\n1fVhGoedAgMBAAECggEAJMIgjDNHivgRTFxSeq1EhsokDO675ZKOnDP3CcIcl2xX\n3QrhpJd/3CAgu4a+69BJhJwr3LPYlUlP9xlE34HJii87OUq8Za5wyG27xHuG+4Ev\n6uUUotX3lPUJs6ov/m/81/rHYUnxMDcFn66Gzd7GOC99fej5+YqG92Id/0eaqWCt\nwJnSMUINyTe2Nq2pObEZ5lQ0bnzRsSI0Gl8SS5bARl01klEMKnhTZRd+/hPriu/S\nudNadc1d9dPc8tm/l37BJ/+StX5kic511ctil5N6QRZ0k2AOYDG/KGnxCUX18jCQ\n42Lb5xq66jw9Y8sjJeCcPNfTxfjfKL0sxBS+FMDQEQKBgQDtqKqtZHsNy6BSelXp\nsrHJABahgRo62ayXpqJA2E+iBhVVUksjY+YxefVkPX4pnSnWltkHt5Z0pX151DNl\n4yTHodCGEv3Huy3AuC8f1mJwPAOCBimbZ8TKyxUWOQ+kfbdbKst9i5ThW48kscWg\n7hIpDb4FKgVdEvV6JQVyCr0dMQKBgQC3GbJ51pkJWUSF2zveyfX3SPHoM6iUg5Ky\nLZKlWB641o4BwCq+TS8oWmRuItDZUSQzElF/yNkM7dQl2IGZOvbi83g2r1i9W78Q\nlW0aXjdihvKg8MWJMjW8zpxxUr05GVTBH4VvYDcOb+UPzgsAnONhdy610/KaOVN1\nolpX6bFGLQKBgQCkqwY/h+yfPWTDYRJgD7mRnKcRlmN3PVWR6hpoNbjPecmUSaXY\nSqK3y1oU72qYKNZRYknUSAdOoU/Udwx53y2fyOWz0DrZBj+IVdYJCEFCpMKFeAGi\nNP8syBO/RyAoiBbga0F9ppYso4UGFsrpW6tnmKb96wS2XamKzVX9k6U/MQKBgCqJ\nTL4jTZAvbczO/pymPH8DMjeocJx36Id+MNg6nYCBT6I2e3eURMVSIoy3h99Ei21V\n7xsJlOr9AVD9eDYZzasxtpa1q57qBnwayqragnFgOlOLO8jAol1Hfm6RMyZlrRvk\nb8JNDt1Kv2MpkcLFr8k/v9k78NtFQA9O9UABKU7NAoGBAIGflDqaBtWkLrmed8h6\nn+UGNsTwgsrQdrR8stsjPP1leF4lz5dKElRpSY7wkJftJ1M0ejUVrlJW+A1v+56P\nnNrJn8/b14R8vvfzRMTiaB5DKu8bJPXmi3fehhQSOtsVdMaLaISzGHDmqrGFnJor\nSm/bN3eER4E056sN7XrOKprk\n-----END PRIVATE KEY-----"
//     let email = "perennial-chatbot@still-tensor-244105.iam.gserviceaccount.com";
//     var config = {
//     credentials: {
//         private_key: pk,
//         client_email: email
// }
// }
 
    // Instantiate a DialogFlow KnowledgeBasesClient.
    const client = new dialogflow.KnowledgeBasesClient(credentials,projectId);
    const knowledgeBaseFullName = 'projects/chatbot-perennial-243513/knowledgeBases/MzQwNjE4NTg2Nzc4MDI5MjYwOA';

    const [result] = await client.deleteKnowledgeBase({
      name: knowledgeBaseFullName,
    });
    
    // if (result.name === 'undefined') 
    // {
    // console.log('Knowledge Base deleted')
    // }
    console.log('knowledge Base Deleted');
    res.send('knowledge Base Deleted');
    //console.log(`Knowledge Base deleted`);
    
    // [END dialogflow_delete_knowledge_base]

//   const responsetouser = result.name;
//   let respData = {
//     data: responsetouser
//   };    
//   res.send(respData);

}
  module.exports = {
    deleteKnowledgeBase: deleteKnowledgeBase
}