import jwt from "jsonwebtoken";

/**
 * @module src/middelware/authMiddleWare
 */


/**
 * A function to check if the token is correct and proceed to the next middleware.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
function isTokenCorrect (req,res,next){
    try {
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).json({error:"no hay token jwt"});
        }
        const token = authorization.split("Bearer ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({error:"error verificando token, puede haber caducado"});
    }
}

/**
 * Checks if a session exists for the user, redirects to login if not, and calls the next middleware.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @return {void}
 */
function hasSession(req,res,next){
    const user = req.session.user;
    console.log("session user",req.session);
    if(!user){
        return res.redirect("/user/login");
    }
    next();
}
export{isTokenCorrect,hasSession};

export default {isTokenCorrect,hasSession};