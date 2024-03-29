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
import SingleAgent from "./components/agents/agentInfo";
import Listing from "./components/listings/single_listing_display";
import { Helmet } from "react-helmet";
import Review from "./components/reviews/single_review";
// import { MapContainer } from "./components/maps";
// import { GoogleApiWrapper } from "google-maps-react";
import Map from "./components/map/map";
import mapStyles from "./components/map/mapStyles";

import {
    useLoadScript,
} from "@react-google-maps/api"

const libraries = ["places"]

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoad, setIsLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      await dispatch(authenticate()).then(() => {
        setIsLoaded(true);
      });
      setLoaded(true);
    })();
  }, [dispatch]);

  const { isLoaded , loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyCD4HqDWtcp8kz09do8TUk0_CR0TJjCZcY",
      libraries,
  })

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"

  return (
    isLoad && (
      <BrowserRouter>
      <Helmet>
          <meta charSet="utf-8" />
          <title>ltnk</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Title and icon" />
      </Helmet>
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
            <Listing />
          </Route>
          <Route path="/map">
            <Map />
            {/* <GoogleApiWrapper> */}
            {/* <MapContainer /> */}
            {/* </GoogleApiWrapper> */}
          </Route>
          <Route path="/agents" exact={true}>
            <AgentDisplay />
          </Route>
          <Route path="/agents/:agentId(\d+)" exact={true}>
            <SingleAgent />
          </Route>
          <Route path="/agents/:agentId(\d+)/reviews/:reviewId(\d+)" exact={true}>
            <Review />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
