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
            res.json({ result: "failed", code: 102, response: "User already exists."});
        }else{

            bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), (bcryptErr, passwordHash) => {

                if(bcryptErr){
                    res.json({ result: "failed", code: 101, message: bcryptErr });
                }else {
                
                    User.create({ email: email, password: passwordHash }).then(() => {

                        const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

                        res.json({ result: "success", code: 100, response: token });

                    }).catch((err) => {
                        res.json({ result: "failed", code: 101, response: err });
                    });
            
                }

            });
            
        }

    }).catch((err) => {
        res.json({ result: "failed", code: 101, response: err });
    });

};