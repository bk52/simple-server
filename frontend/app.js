import React from "react";
import { Provider } from "react-redux";
import store from "./state/store";
import ServerApp from "./pages";

export default function App(){
    return (
      <Provider store={store}>
        <ServerApp/>
      </Provider>
    );
}