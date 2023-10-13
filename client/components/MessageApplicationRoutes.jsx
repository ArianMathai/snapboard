import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import SnapBoard from "./SnapBoard";
import Home from "./Home";

function MessageApplicationRoutes () {


    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login/>} />
            <Route path={"/signup"} element={<SignUp/>} />
            <Route path={"/snapboard"} element={<SnapBoard />} />
        </Routes>
    )

}

export default MessageApplicationRoutes;