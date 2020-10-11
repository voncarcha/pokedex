import { combineReducers } from '@reduxjs/toolkit';

import pokemonReducer from 'services/pokemon';

export default combineReducers({
  pokemon: pokemonReducer,
});
