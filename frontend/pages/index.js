import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "../component/PrivateRouter";

import AppBar from "../component/AppBar";
import LeftMenu from "../component/LeftMenu";
import isLogin from "../common/isLogin";

import Login from "./Login";
import Home from "./Home";
import Coming from "./Coming";
import Devices from "./Devices";

const useStyles = makeStyles((theme) => ({
  router: {
    paddingTop: "74px",
    paddingRight: "10px",
    height: "100%",
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft: "10px",
  },
  routerWithMenu: {
    paddingTop: "74px",
    paddingRight: "10px",
    height: "100%",
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    paddingLeft: "210px",
  },
}));

export default function AppRouter() {
  const userState = useSelector(state => state.auth);
  const classes = useStyles();
  const [leftMenuOpen, setleftMenuOpen] = useState(true);

  function toggleLeftMenu() {
    setleftMenuOpen(!leftMenuOpen);
  }

  return (
    <div>
      <Router>
        {
          isLogin() ? <div><AppBar changeLeftMenu={toggleLeftMenu}></AppBar>
            <LeftMenu menuOpen={leftMenuOpen}></LeftMenu></div> : null
        }
        <div className={leftMenuOpen ? classes.routerWithMenu : classes.router}>
          <Switch>
          <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/home">
              <Home />
            </PrivateRoute>
            <PrivateRoute exact path="/coming">
              <Coming />
            </PrivateRoute>
            <PrivateRoute exact path="/devices">
              <Devices />
            </PrivateRoute>
            {/* <PrivateRoute path="/customers">
              <CustomerPage />
            </PrivateRoute>
            <Route path="*">
              <PageNF />
            </Route> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}
