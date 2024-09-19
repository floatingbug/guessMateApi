function validateUser({jwt}){
    return async (req, res, next) => {
        await handleRequest({req, res, jwt});
        next();
    };
}

async function handleRequest(param){
    const {req, res, next, jwt} = param;
    const token = req.get("Authorization");


    if(!token){
        res.status(400);
        res.json({success: false, msg: "Please sign in first."});
        return;
    }

    try{
        const user = await jwt.verify(token, process.env.JWT_KEY);
        
        if(!user){
            res.status(400);
            res.json({success: false, msg: "Logout and sign in again."});
            return;
        }

        req.user = user;
    }
    catch(err){
        if (err.name === 'TokenExpiredError') {
            res.status(401);
            res.json({ success: false, msg: "Token has expired. Please sign in again." });
            return;
        } 
        else if (err.name === 'JsonWebTokenError') {
            res.status(400);
            res.json({ success: false, msg: "Invalid token. Please sign in again." });
            return;
        }
        
        console.error(err);
        res.status(500);
        res.json({ success: false, msg: "Internal server error." });
        return;
    }
}


module.exports = {validateUser};
