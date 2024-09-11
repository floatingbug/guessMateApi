function signIn(){
    return (req, res) => {
        handleRequest({req, res});
    }
}


async function handleRequest(params){
    const {req, res} = params;
}


module.exports = {signIn};
