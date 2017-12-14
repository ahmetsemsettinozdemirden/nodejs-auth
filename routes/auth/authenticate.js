"use strict";
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {

    // TODO: validation

    const token = req.body.token;

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.json({ result: "failed", code: 302, response: "Invalid token." });
        } else {
            res.json({ result: "success", code: 300, response: decoded });
        }
    });

};