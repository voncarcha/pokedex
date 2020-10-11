import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PokemonList from 'pages/PokemonList';
import PokemonData from 'pages/PokemonData';

function App() {
  console.log(process.env.REACT_APP_BASE_NAME);
  return (
    <div className="app">
      <Router basename={process.env.REACT_APP_BASE_NAME}>
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/:id" component={PokemonData} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
