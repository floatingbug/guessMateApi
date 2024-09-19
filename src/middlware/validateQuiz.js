function validateQuiz(req, res, next){
    if(!req.body || !req.body.quizTitle || !req.body.quiz){
        res.status(400);
        res.json({success: false, msg: "Not all required proprties was given."});
        return;
    }

    if(typeof req.body.quizTitle !== "string" ||
        !Array.isArray(req.body.quiz)
    ){
        res.status(400);
        res.json({success: false, msg: "One or more properties have the wrong type."});
        return
    }

    //validate quiz
    let validQuiz = "pass";
    for(const e of req.body.quiz){
        const keys = Object.keys(e);
        
        if(typeof e !== "object"){
            validQuiz = "Every element in array quiz must be type object.";
            break;
        }

        if(keys.length > 2){
            validQuiz = "In each element of array quiz are only two properties allowed.";
            break;
        }

        if(!("question" in e && "answers" in e)){
            validQuiz = "Each element of array quiz required the property question and answers.";
            break;
        }

        if(typeof e.question !== "string" ||
            !Array.isArray(e.answers) ||
            e.answers.length > 4 ||
            typeof e.answers[0] !== "string" ||
            typeof e.answers[1] !== "string" ||
            typeof e.answers[2] !== "string" ||
            typeof e.answers[3] !== "string" 
        ){
            validQuiz = "Properties in element of quiz has wrong type";
            break;
        }

    } 

    if(validQuiz !== "pass"){
        res.status(400);
        res.json({success: false, msg: validQuiz});
        return;
    }
    
    next();
}


module.exports = {validateQuiz};
