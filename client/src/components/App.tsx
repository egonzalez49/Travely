import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeNav from './navbars/HomeNav';
import HomeContainer from './home/HomeContainer';
import AuthContainer from './auth/AuthContainer';
import AboutContainer from './home/AboutContainer';
import HomeSocialMedia from './home/HomeSocialMedia';
import ContactContainer from './home/ContactContainer';
import Dashboard from './dashboard/Dashboard';
import DashNav from './navbars/DashNav';
import LocationContainer from './locations/LocationContainer';

class App extends React.Component {
  render() {
    return (
      <div className="dummy-container">
        <BrowserRouter>
          <div className="base-container">
            <Route
              path={['/', '/about', '/auth', '/contact']}
              exact
              component={HomeNav}
            />
            <Route path={['/', '/about']} exact component={HomeSocialMedia} />
            <Route path="/" exact component={HomeContainer} />
            <Route path="/about" exact component={AboutContainer} />
            <Route path="/contact" exact component={ContactContainer} />
            <Route path="/auth" component={AuthContainer} />
            <Route path={['/dashboard', '/location']} component={DashNav} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/location/:id" component={LocationContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
