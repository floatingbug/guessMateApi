function signIn({store, jwt}){
    return (req, res) => {
        handleRequest({req, res, store, jwt});
    }
}


async function handleRequest(params){
    const {req, res, store, jwt} = params;
    let user = null;

    //validate credentials-format
    if(!req.body || !req.body.name || !req.body.password ||
        typeof req.body.name !== "string" || 
        typeof req.body.name !== "string"){
        return res.status(400).json({success: false, msg: "Invalid credentials"});
    }

    //validate credentials
    try{
        const query = {
            $or:[ 
                {name: req.body.name, password: req.body.password},
                {email: req.body.name, password: req.body.password}
            ]
        };
        user = await store.getUser(query);
        if(!user){
            res.status(200);
            res.json({success: false, msg: "Wrong name, email or password."});
            return;
        }
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.json({success: false, msg: "Fail to get user."});
        return;
    }
    
    //create and send jwt
    const token = jwt.sign(user, process.env.JWT_KEY);
    res.status(200);
    res.set({
        "Authorization": `Bearer ${token}`
    });
    res.json({success: true, msg: "Sign in was successfull."});
}


module.exports = {signIn};
