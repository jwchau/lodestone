import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

// components
import MainPage from './main/main_page';
import Data from './data/data';
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';

const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <AuthRoute path='/signup' component={SignupFormContainer}/>
            <AuthRoute path='/login' component={LoginFormContainer}/>
            <AuthRoute exact path="/" component={MainPage} />
            <ProtectedRoute path="/data" component={Data} />
        </Switch>
    </div>
);

export default App;