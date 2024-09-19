function sendErrorResponse(param){
    const {res, status, msg} = param;

    res.status(status);
    res.json({success: false, msg});
}


module.exports = {sendErrorResponse};
