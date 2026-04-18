const jwt = require("jsonwebtoken");

async function authArtist(req, res, next){

    try{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Token is required"
        });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
}
catch(err){
    return res.status(401).json({
        message: "Invalid token"
    });
}
};

async function authUser(req, res, next){
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "Token is required"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken.role !== "user"){
            return res.status(401).json({
                message: "You dont have access to this feature"
            });
        }
        req.user = decodedToken;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = { authArtist, authUser };