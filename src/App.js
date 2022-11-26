import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/navbar/Navbar'
import PokemonList from './components/layout/pages/pokemon-list/PokemonList'
import SignIn from './components/layout/auth/SignIn';
import SignUp from './components/layout/auth/SignUp';
import PokemonDetail from './components/layout/pages/pokemon-detail/PokemonDetail';
import Profile from './components/layout/pages/profile/Profile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={PokemonList} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/pokemon/:id" component={PokemonDetail} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
