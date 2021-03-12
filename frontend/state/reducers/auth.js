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
            localStorage.removeItem("token");
            return Object.assign({}, state, {
                isLogin: false
            });
        }
        case types.AUTH_RESP: {
            if (action.payload && action.payload.token) {
                localStorage.setItem("token", action.payload.token);
                return Object.assign({}, state, {
                    isLoading: false,
                    isAuthError: false,
                    authErrorMessage: "",
                    isLogin: true
                });
            }
            else{
                return Object.assign({}, state, {
                    isLoading: false,
                    isAuthError: true,
                    authErrorMessage: "Invalid username or password",
                    isLogin: false
                });
            }
        }
        default:
            return state;
    }
}
