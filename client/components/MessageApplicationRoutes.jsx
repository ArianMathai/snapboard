import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import SnapBoard from "./SnapBoard";
import Home from "./Home";
import LoginCallback from "./LoginCallback";

function MessageApplicationRoutes () {


    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login/>} />
            <Route path={"/login/callback"} element={<LoginCallback/>} />
            <Route path={"/signup"} element={<SignUp/>} />
            <Route path={"/snapboard"} element={<SnapBoard />} />
            <Route path={"/*"} element={<h2>NOT FOUND</h2>} />
        </Routes>
    )

}

export default MessageApplicationRoutes;