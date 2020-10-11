import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonListAsync, selectPokemon } from 'services/pokemon';

import { LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';

import PokemonCard from 'components/PokemonCard';
import pokeball from 'images/pokeball.png';

import * as S from './styles';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);
  const { isLoading, pokemonList } = pokemon;

  useEffect(() => {
    const API = 'https://pokeapi.co/api/v2';
    if (pokemonList.length === 0) {
      dispatch(getPokemonListAsync(`${API}/pokemon`));
    } 
  }, [dispatch, pokemonList.length]);

  const handleNext = () => {
    dispatch(getPokemonListAsync(pokemon.nextUrl));
  };
  const handlePrev = () => {
    dispatch(getPokemonListAsync(pokemon.prevUrl));
  };

  return (
    <S.Wrapper>
      <header>
        <aside>
          <img src={pokeball} alt="" />
          <h1>
            Poke<span>DEX</span>
          </h1>
        </aside>
        <div className="btn-group">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={handlePrev}
            disabled={pokemon.prevUrl === null}
          >
            Previous
          </Button>
          <span className="divider"></span>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </header>
      <section>
        {isLoading ? (
          <S.Loader>
            <LoadingOutlined className="loader" />
          </S.Loader>
        ) : (
          <div className="pokemon-list">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        )}
      </section>
      <footer>
        <Tag icon={<LinkOutlined />} color="magenta">
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Source: https://pokeapi.co/
          </a>
        </Tag>
        <div className="btn-group">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={handlePrev}
            disabled={pokemon.prevUrl === null}
          >
            Previous
          </Button>
          <span className="divider"></span>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </footer>
    </S.Wrapper>
  );
}

export default PokemonList;
