import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components';
import { Header, Footer } from './layout';
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
} from './pages';

const App = () => {
    return (
        <>
            <Header />
            <Switch>
                <PrivateRoute exact path="/" component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/explore" component={Explore} />
                <PrivateRoute path="/flights" component={Flights} />
                <PrivateRoute path="/accommodation" component={Accommodation} />
                <PrivateRoute path="/experiences" component={Experiences} />
                <PrivateRoute path="/creatortrip" component={Trip} />
                <PrivateRoute path="/yourtrip" component={Trip} />
                <NotFound />
            </Switch>
            <Footer />
        </>
    );
};

export default App;
