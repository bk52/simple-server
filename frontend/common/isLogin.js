export default function isLogin(){
    let login=false;
    let accessToken=localStorage.getItem("token");
    if(accessToken && accessToken!=="")
        login=true
    return login;
}