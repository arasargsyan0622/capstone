import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Listings from "./components/listings/listing_display";
import AgentDisplay from "./components/agents/agent_display";
import Splash from "./components/splash/splash";


function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate()).then(() => {
        setIsLoaded(true);
      });
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    isLoaded && (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact={true}>
            <Splash />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <h1>My Home Page</h1>
          </ProtectedRoute>
          <Route path="/listings" exact={true}>
            <Listings />
          </Route>
          <Route path="/listings/:listingId(\d+)">
            <Listings />
          </Route>
          <Route path="/agents" exact={true}>
            <AgentDisplay />
          </Route>
          <Route path="/agents/:agentId(\d+)" exact={true}>
            <AgentDisplay />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
