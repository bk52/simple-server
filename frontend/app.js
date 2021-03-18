import React from "react";
import { Provider } from "react-redux";
import { ConfirmProvider } from 'material-ui-confirm';
import store from "./state/store";
import ServerApp from "./pages";

export default function App() {
  return (
    <ConfirmProvider>
        <Provider store={store}>
          <ServerApp />
        </Provider>
    </ConfirmProvider>
  );
}