const {sendErrorResponse} = require("../utils/sendErrorResponse");

function validateGuess(req, res, next){
    if(!req.body || !req.body.quizId || !req.body.answers){
        sendErrorResponse({res, status: 400, msg: "Some properties are missed."});
        return;
    }

    if(!Array.isArray(req.body.answers) || 
        typeof req.body.quizId !== "string")
    {
        sendErrorResponse({res, status: 400, msg: "Value has wrong type."});
        return;
    }

    if(req.body.answers.length > 24){
        sendErrorResponse({res, status: 400, msg: "To many answers in array answers."});
        return;
    }

    const answers = req.body.answers.map(a => Number(a));

    if(answers.some(isNaN)){
        sendErrorResponse({res, status: 400, msg: "In answers are only numbers allowed."});
        return;
    }

    if(!answers.every(a => a <= 3)){
        sendErrorResponse({res, status: 400, msg: "In answers only numbers less then 4 are allowed."});
        return;
    }

    next();
}


module.exports = {validateGuess};
