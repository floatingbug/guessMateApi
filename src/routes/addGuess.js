function addGuess({store}){
    return (req, res) => {
        handleRequest({req, res, store});
    }
}

async function handleRequest(param){
    const {req, res, store} = param;

    try{
        const doc = {
            quizId: req.body.quizId,
            guesserId: req.user.userId,
            guesserName: req.user.name,
            answers: req.body.answers
        };

        const result = await store.addGuess(doc);
        if(!result){
            res.status(400);
            res.json({success: false, msg: "Fail adding guess."});
            return;
        }
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.json({success: false, msg: "Internal server error."});
        return;
    }

    res.status(200);
    res.json({success: true, msg: "Guess has been added."});
}


module.exports = {addGuess};
