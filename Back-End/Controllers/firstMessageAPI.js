const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');  


function auth(req, res, next) {
    const user = { id: 73673930709 };
        //callback(null, any);
        // then return a token, secret key should be an env variable
        const token = jwt.sign({ user: user.id }, 'my secret key');{
        // if (typeof token !== 'undefined') {
            res.header({
                // message: 'Authenticated! Use this token in the "Authorization" header',
                token: token,
            })
            next();
    
        }
    }

app.post('/firstmesage', auth, function(req,res) {
     res.send('Hello');
}),



app.listen(port, () => console.log(`Example app listening on port ${port}!`))















// const express = require('express');
// const router = express.Router();
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// router.use(bodyParser());
// const port = 3002;

// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//     callback(null, corsOptions); // callback expects two parameters: error and options
//   }



// router.post('/api/firstmessage', auth, function(req, res){
//   //router.use(auth);
//   res.send('Hello ! This is GST Hero. How Can we help you')

//   //router.use(function(req,res,next)
  
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers", "Origin,X-requested-With,Content-Type,Authorization,Accept");
// },
// function auth(req, res, next) {
//     const user = { id: 73673930709 };
//     //callback(null, any);
//     // then return a token, secret key should be an env variable
//     const token = jwt.sign({ user: user.id }, 'my secret key');
//         {
//     // if (typeof token !== 'undefined') {
//         res.header({
//             // message: 'Authenticated! Use this token in the "Authorization" header',
//             token: token,
//         })
//         next();
//     }
// }
  
//   app.use(router)
//   app.listen(port, () => {
//       console.log(`Running on http://localhost:${port}`)
//   })