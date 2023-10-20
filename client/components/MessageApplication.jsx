import {Link} from "react-router-dom";
import MessageApplicationRoutes from "./MessageApplicationRoutes";
import {useAuth} from "../context/AuthContext";
import Logout from "./Logout";

function MessageApplication (){

    const {isAuthorized, setIsAuthorized} = useAuth();

    /* const handleLogout = () => {
         document.cookie = "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
         setIsAuthorized(false);
     };

     */


    return (
        <>
            <header>
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>SnapBoard 👻</h2>
                </Link>
            </header>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/snapboard"}>SnapBoard</Link>
                <div style={{flex: 1}}></div>
                {!isAuthorized?<Link to={"/login"}>Login</Link>
                    : <Logout />}
            </nav>
            <main>
                <MessageApplicationRoutes/>
            </main>
            <footer>By Arian☠️ and Simen☠️</footer>
        </>
    );
}
export default MessageApplication;