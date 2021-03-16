import React,{ useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import isLogin from "../common/isLogin";
import Login from "../component/Login";

export default function LoginPage(){
    const userState = useSelector(state => state.auth);
    return(
        isLogin() ? <Redirect  to="/home" /> : <Login/>
    )
}