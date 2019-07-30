import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeNav from './navbars/HomeNav';
import HomeContainer from './homepage/HomeContainer';
import AuthContainer from './auth/AuthContainer';

class App extends React.Component {
  render() {
    return (
      <div className="dummy-container">
        <BrowserRouter>
          <div className="base-container">
            <Route path={['/', '/auth']} exact component={HomeNav} />
            <Route path="/" exact component={HomeContainer} />
            <Route path="/auth" component={AuthContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
