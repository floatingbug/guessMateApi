const {sendEmail} = require("../services/sendEmail");
const {randomUUID} = require("crypto");

function signUp({store}){
    return (req, res) => {
        handleRequest({req, res, store});
    }
}


async function handleRequest(params){
    const {req, res, store} = params;
    const confirmationCode = randomUUID();

    //confirm email if code is given as query
    if(req.query && req.query.conf){
        const confirmationCode = req.query.conf;
        const filter = {
            confirmationCode
        };
        const update = {
            $unset: {
                confirmationCode: ""
            },
            $set: {
                isEmailConfirmed: true
            }
        };
        
        try{
            const result = await store.confirmEmail({filter, update});
            if(!result){
                res.status(400);
                res.json({success: false, msg: "Confirmation has been failed."});
                return;
            }
        }
        catch(err){
            res.status(500);
            res.json({success: false, msg: "Fail to confrim e-mail. Please try again later or contact me."});
            return;
        }
        
        return res.status(200).json({success: true, msg: "Confirmation was successfull."});
    }

    //check if user allready exists
    try{
        const query = {
            $or: [
                {name: req.body.name},
                {email: req.body.email}
            ]
        };
        
        const result = await store.getUser(query);
        if(result){
            res.status(200).json({success: false, msg: "Name or e-mail allready exists."});
            return;
        }
    }
    catch(err){
        res.status(500).json({success: false, msg: "Fail to check if user exists allready."});
        return;
    }

    //add user to db
    try{
        const userId = randomUUID();
        const doc = {
            userId,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmationCode,
        };

        const result = await store.signUp(doc);
        if(!result) return res.status(400).res.json({success: false, msg: "Sign up has been failed"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success: false, msg: "Fail to add user to db. Please try again later or contact me."});
    }

    //send confirmation via e-mail
    try{
        await sendEmail({
            receiver: req.body.email, 
            confirmationCode,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success: false, msg: "Fail to send confermation e-mail. Please try again later or contact me."});
    }

    res.status(200).json({success: true, msg: "Please confirm your e-mail."});
}


module.exports = {signUp};
