const {randomUUID} = require("crypto");


function addQuiz({store}){
    return (req, res) => {
        handleRequest({req, res, store});
    }
}


async function handleRequest(param){
    const {req, res, store} = param;

    try{
        const doc = {
            userId: req.user.userId,
            quizId: randomUUID(),
            quizCreator: req.user.name,
            quiz: req.body
        };

        const result = await store.addQuiz(doc);
        if(!result){
            res.status(400);
            res.json({success: false, msg: "Add quiz failed."});
            return;
        }
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.json({success: false, msg: "Intern server error."});
        return;
    }

    res.status(200);
    res.json({success: true, msg: "Quiz has been added."});
}


module.exports = {addQuiz};
