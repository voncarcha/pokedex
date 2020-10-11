import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPokemonListAsync,
  setCurrentPage,
  selectPokemon,
} from 'services/pokemon';

import { LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import { Tag, Pagination } from 'antd';

import PokemonCard from 'components/PokemonCard';
import pokeball from 'images/pokeball.png';

import * as S from './styles';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);
  const { isLoading, pokemonList, totalCount, currentPage } = pokemon;

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(getPokemonListAsync(0));
    }
  }, [dispatch, pokemonList.length]);

  const onPageChange = (pageNumber) => {
    const offset = (pageNumber - 1) * 20;
    dispatch(getPokemonListAsync(offset));
    dispatch(setCurrentPage(pageNumber));
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
        <Pagination
          current={currentPage}
          total={totalCount}
          defaultPageSize={20}
          onChange={onPageChange}
          showSizeChanger={false}
          responsive={true}
        />
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
        <Pagination
          current={currentPage}
          total={totalCount}
          defaultPageSize={20}
          onChange={onPageChange}
          showSizeChanger={false}
          responsive={true}
        />
        <Tag icon={<LinkOutlined />} color="magenta">
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source API: https://pokeapi.co/
          </a>
        </Tag>
      </footer>
    </S.Wrapper>
  );
}

export default PokemonList;
