const {randomUUID} = require("crypto");
const {sendErrorResponse} = require("../utils/sendErrorResponse");

function addQuizAnswers({store}){
    return (req, res) => {
        handleRequest({req, res, store});
    }
}

async function handleRequest(param){
    const {req, res, store} = param;

    try{
        const doc = {
            quizId: req.body.quizId,
            answerId: randomUUID(),
            quizTaker: req.user.name,
            answers: req.body.answers
        };

        const result = await store.addQuizAnswers(doc);
        
        if(!result){
            sendErrorResponse({res, status: 400, msg: "Something went wrong. Please try again."});
            return;
        }
    }
    catch(err){
        console.log(err);
        sendErrorResponse({res, status: 500, msg: "Internal server error."});
    }

    res.status(200);
    res.json({success: true, msg: "Quiz answers have been added."});
};


module.exports = {addQuizAnswers};
