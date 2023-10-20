import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Logout(){

    const navigate = useNavigate();
    const {setIsAuthorized} = useAuth();
    async function handleLogout(){
        try{
            const response = await fetch("api/authentication/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "applicatioin/json"
                }
            })
            setIsAuthorized(false);
            navigate("/login");
        } catch (error){
            throw error;
        }
    }

    return (
        <Link to={"/login"} onClick={handleLogout}>Logout</Link>
    )
}

export default Logout;