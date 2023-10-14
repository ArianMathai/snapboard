import jwt from "jsonwebtoken";

function cookieJwtAuth (req,res,next){

    const token = req.cookies.token;

    try {

        const user = jwt.verify(token,process.env.MY_SECRET);
        req.user = user;
        next();
    }catch (error){
        res.clearCookie("token");
        res.clearCookie("authorization")
        return res.redirect("/login");
    }

}

export default cookieJwtAuth;