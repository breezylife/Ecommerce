import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Signin" exact component={Signin} />
                <Route path="/Signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

