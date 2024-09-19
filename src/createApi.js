const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const {signUp} = require("./routes/signUp");
const {validateSignUp} = require("./middlware/validateSignUp");
const {signIn} = require("./routes/signIn");
const {validateSignIn} = require("./middlware/validateSignIn");
const {validateUser} = require("./middlware/validateUser");
const jwt = require("jsonwebtoken");
const {addQuiz} = require("./routes/addQuiz");
const {validateQuiz} = require("./middlware/validateQuiz");
const {getQuizzes} = require("./routes/getQuizzes");
const {addGuess} = require("./routes/addGuess");
const {validateGuess} = require("./middlware/validateGuess");
const {addQuizAnswers} = require("./routes/addQuizAnswers");
const {validateQuizAnswer} = require("./middlware/validateQuizAnswer");

function createApi({store}){
    api.use(bodyParser.json());

    api.post("/sign-up", validateSignUp, signUp({store}));
    api.get("/sign-up", signUp({store}));
    api.post("/sign-in",  signIn({store, jwt}));
    api.post("/add-quiz", validateUser({jwt}), validateQuiz, addQuiz({store}));
    api.get("/get-quizzes", getQuizzes({store}));
    api.post("/add-guess", validateUser({jwt}), validateGuess, addGuess({store}));
    api.post("/add-quiz-answer", validateUser({jwt}), validateQuizAnsweg, addQuizAnswers({store}));

    return api;
}

module.exports = {createApi};
