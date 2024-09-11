const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const {signUp} = require("./routes/signUp");
const {validateSignUp} = require("./middlware/validateSignUp");
const {signIn} = require("./routes/signIn");

function createApi({store}){
    api.use(bodyParser.json());

    api.post("/sign-up", validateSignUp, signUp({store}));
    api.post("/sign-in", signIn({store}));

    return api;
}

module.exports = {createApi};
