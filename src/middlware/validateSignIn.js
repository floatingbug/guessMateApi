function validateSignIn({jwt}){
    return (req, res, next) => {
        handleValidation({req, res, next, jwt});
    };
}

async function handleValidation(param){
    const {req, res, next, jwt} = param;

    next();
}


module.exports = {validateSignIn};
