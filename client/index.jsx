import React from "react";
import ReactDOM from "react-dom/client"
import MessageApplication from "./components/MessageApplication";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";

import "./application.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
    <BrowserRouter>
    <MessageApplication/>
    </BrowserRouter>
    </AuthProvider>);