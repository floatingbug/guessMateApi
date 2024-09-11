function signUp({store}){
    return (req, res) => {
        handleRequest({req, res, store});
    }
}


async function handleRequest(params){
    const {req, res, store} = params;

    
}


module.exports = {signUp};
