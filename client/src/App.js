import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "./components";
import { Header, Footer } from "./layout";
import {
  Explore,
  Accommodation,
  Experiences,
  Flights,
  LandingPage,
  Login,
  Register,
  Dashboard,
  Trip
} from "./pages";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/explore" component={Explore} />
        <Route path="/flights" component={Flights} />
        <Route path="/accommodation" component={Accommodation} />
        <Route path="/experiences" component={Experiences} />
        <Route path="/creatortrip" component={Trip} />
        <Route path="/yourtrip" component={Trip} />
        <NotFound />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
