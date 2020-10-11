import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://pokeapi.co/api/v2';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    isLoading: true,
    pokemonList: [],
    totalCount: 0,
    currentPage: 1,
    selectedPokemon: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const {
  setLoading,
  setPokemonList,
  setSelectedPokemon,
  setTotalCount,
  setCurrentPage,
} = pokemonSlice.actions;

export function getPokemonListAsync(offset) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      const res = await axios.get(`${API}/pokemon/?offset=${offset}&limit=20`);

      let _pokemonData = await Promise.all(
        res.data.results.map(async (pokemon) => {
          let pokemonRecord = await axios.get(pokemon.url);
          const { id, name, types, sprites } = pokemonRecord.data;
          return { name, id, types, sprites };
        }),
      );

      dispatch(setPokemonList(_pokemonData));
      dispatch(setTotalCount(res.data.count));
      dispatch(setLoading(false));
    } catch (error) {
      throw Error(error);
    }
  };
}

export function getPokemonDataAsync(url) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${API}/pokemon${url}`);
      const pokemonData = res.data;
      const {
        name,
        id,
        sprites,
        stats,
        weight,
        types,
        species,
        height,
      } = pokemonData;

      let pokemonSpecies = await axios.get(species.url);
      let flavorTextEntries = pokemonSpecies.data.flavor_text_entries;
      let flavorText = flavorTextEntries.find((i) => i.language.name === 'en');
      let description = flavorText.flavor_text;
      let artwork = sprites.other['official-artwork'].front_default;
      let spriteFront = sprites.front_default;

      dispatch(
        setSelectedPokemon({
          name,
          id,
          stats,
          weight,
          height,
          types,
          description,
          artwork,
          spriteFront,
          sprites
        }),
      );
      dispatch(setLoading(false));
    } catch (error) {
      throw Error(error);
    }
  };
}

export const selectPokemon = (state) => state.pokemon;

export default pokemonSlice.reducer;
