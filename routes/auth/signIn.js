"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = (req, res) => {
    
    // TODO: validation

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {

        if(user){

            bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {

                if(bcryptErr){
                    res.json({ result: "failed", code: 201, message: bcryptErr });
                }else if(bcryptRes){

                    const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

                    res.json({ result: "success", code: 200, response: token });

                }else{
                    res.json({ result: "failed", code: 203, response: "Password mismatch." });
                }

            });
            
        }else{
            res.json({ result: "failed", code: 202, response: "User does not exist." });
        }

    }).catch((err) => {
        res.json({ result: "failed", code: 201, response: err });
    });

};