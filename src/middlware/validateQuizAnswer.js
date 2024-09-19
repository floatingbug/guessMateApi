const {sendErrorResponse} = require("../utils/sendErrorResponse");

function validateQuizAnswer(req, res, next){
    console.log(req.body)

    if(!req.body || !req.body.quizId || !req.body.answers){
        sendErrorResponse({
            res,
            status: 400,
            msg: "Not all required properties were provided."
        });

        return;
    }

    if(typeof req.body.quizId !== "string" || 
        !Array.isArray(req.body.answers) ||
        req.body.answers.some(isNaN))
    {
        sendErrorResponse({
            res,
            status: 400,
            msg: "Every element in answers must be of type number."
        });
        
        return;
    }

    if(req.body.answers.length > 24){
        sendErrorResponse({
            res,
            status: 400,
            msg: "Array answers has to many elements, max. size is 24 elements."
        });

        return;
    }

    next();
}


module.exports = {validateQuizAnswer}
