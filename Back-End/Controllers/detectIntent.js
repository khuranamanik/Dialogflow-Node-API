const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const intentDetect= require('./routes/detectIntent.js')
router.use(bodyParser());
const port = 3000;

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, 'my secret key', function(err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
        next();
        }  
    })
      }
    
    else {
      res.sendStatus(400);
    }
  }

router.post('/detectIntent', ensureToken, intentDetect.runSample);
app.use(router)
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
  })