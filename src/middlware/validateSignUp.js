function validateSignUp(req, res, next){
    if(!req.body || !req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json({success: false, msg: "Not all required properties provided."});
    }

    if(Object.keys(req.body).length > 3) {
        return res.status(400).json({success: false, msg: "To many properties provided."});
    }

    if(typeof req.body.name !== "string" || typeof req.body.email !== "string" || typeof req.body.password !== "string"){
        return res.status(400).json({success: false, msg: "Wrong type."});
    }

    next();
}


module.exports = {validateSignUp};
