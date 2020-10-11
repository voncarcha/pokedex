import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API;

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    isLoading: true,
    pokemonList: [],
    nextUrl: '',
    prevUrl: '',
    selectedPokemon: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
    },
    setNextUrl: (state, action) => {
      state.nextUrl = action.payload;
    },
    setPrevUrl: (state, action) => {
      state.prevUrl = action.payload;
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const {
  setLoading,
  setPokemonList,
  setNextUrl,
  setPrevUrl,
  setSelectedPokemon,
} = pokemonSlice.actions;

export function getPokemonListAsync(apiUrl) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      const res = await axios.get(apiUrl);

      let _pokemonData = await Promise.all(
        res.data.results.map(async (pokemon) => {
          let pokemonRecord = await axios.get(pokemon.url);
          const { id, name, types, sprites } = pokemonRecord.data;
          return { name, id, types, sprites };
        }),
      );
      dispatch(setPokemonList(_pokemonData));

      dispatch(setNextUrl(res.data.next));
      dispatch(setPrevUrl(res.data.previous));

      dispatch(setLoading(false));
    } catch (err) {
      console.error('error');
    }
  };
}

export function getPokemonDataAsync(url) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${API}/pokemon${url}`);
      const pokemonData = res.data;
      const { name, id, sprites, stats, weight, types, species, height } = pokemonData;

      let pokemonSpecies = await axios.get(species.url);
      let flavorTextEntries = pokemonSpecies.data.flavor_text_entries;
      let flavorText = flavorTextEntries.find((i) => i.language.name === 'en');
      let description = flavorText.flavor_text;

      dispatch(
        setSelectedPokemon({
          name,
          id,
          sprites,
          stats,
          weight,
          height,
          types,
          description,
        }),
      );
      dispatch(setLoading(false));
    } catch (error) {
      console.error('error');
    }
  };
}

export const selectPokemon = (state) => state.pokemon;

export default pokemonSlice.reducer;
