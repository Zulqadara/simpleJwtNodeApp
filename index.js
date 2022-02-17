const express = require('express')
const jwt = require("jsonwebtoken");
const app = express()

app.use(express.json())

app.post('/login', function (req, res) {
    let email = req.body.email;
    let name = req.body.name;

    //1. Check username and password (Validation)
    //2. Check if user exists
    // if yes then procees
    const options = {
        expiresIn: "1m",
    };
    const payload = { email: email, name: name };
    const token = jwt.sign(payload, "myVerySecureSecretKey", options);
    
    res.json({
        "Token": token,
        "Email": email,
        "Name": name
    })
})

app.get('/', function (req, res) {
    res.json({
        "Message": "Hello world"
    })
})

app.get('/protected', function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    const options = {
        expiresIn: "1m",
    };
    jwt.verify(token, "myVerySecureSecretKey", options, (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            res.status(400).json({
                "message": err.message
            })
        } else {
            console.log(decodedToken);
            res.status(200).json({
                "message": "Success"
            })
            //next()
        }
    });
})

app.get('/nonprotected', function (req, res) {
    res.json({
        "message": "I am not protected"
    })
})

app.listen(3000, function(){
    console.log('Connected on 3000')
})