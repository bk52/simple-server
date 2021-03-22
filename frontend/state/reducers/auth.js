import { types } from "../actionTypes";

var initialState = {
    isLoading: false,
    isAuthError: false,
    authErrorMessage: "",
    isLogin: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOADING: {
            return Object.assign({}, state, {
                isLoading: action.payload.loading,
            });
        }
        case types.AUTH_LOGOUT: {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return Object.assign({}, state, {
                isLogin: false
            });
        }
        case types.AUTH_RESP: {
            let { accessToken, refreshToken } = action.payload;
            if (accessToken && accessToken != "") {     
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);
              return Object.assign({}, state, {
                  isAuthError: false,
                  authErrorMessage: "",
                  isLoading:false,
                  isLogin:true
              });
            }
            else{
              let { message } = action.payload;
              return Object.assign({}, state, {
                isAuthError: true,
                isLoading:false,
                authErrorMessage: message,
              });
            } 
        }
        default:
            return state;
    }
}
