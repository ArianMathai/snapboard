import jwt from "jsonwebtoken";

function cookieJwtAuth (req,res,next){

    const token = req.signedCookies.token;
    const access_token = req.signedCookies.access_token;

    if(token){
        try {
            const user = jwt.verify(token,process.env.MY_SECRET);
            req.user = user;
            next();
        }catch (error){
            res.clearCookie("token");
            res.clearCookie("authorization")
            return res.redirect("/login");
        }
    } else if(access_token){

        const googleUser = req.signedCookies.user
        req.user = googleUser;
        next();
    } else {
        console.log("WITHIN ELSE IN JWT")
        return res.redirect("/login");
    }
}

export default cookieJwtAuth;
