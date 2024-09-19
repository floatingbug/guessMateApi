function getQuizzes({store}){
    return (req, res) => {
        handleRequest({req, res, store});
    };
}

async function handleRequest(param){
    const {req, res, store} = param;
    let query = {};
    let quizzes = null;

    if(req.query.name && req.query.name !== ""){
        query = {
            quizCreator: req.query.name
        };
    }

    try{
        quizzes = await store.getQuizzes(query);

        if(!quizzes){
            res.status(400);
            res.json({success: false, msg: `User ${query.name} doesn't has any quizzes yet.`});
            return;
        }
    }
    catch(err){
        console.log(err)
        res.status(500);
        res.json({success: false, msg: "Internal server error."});
        return;
    }

    res.status(200);
    res.json({success: true, msg: "Quizzes have been sent.", data: quizzes});
}


module.exports = {getQuizzes};
