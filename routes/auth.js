"use strict";
const express = require("express");

const auth = new express.Router();

auth.post("/signUp", require("./auth/signUp"));
auth.post("/signIn", require("./auth/signIn"));
auth.post("/authenticate", require("./auth/authenticate"));

module.exports = auth;