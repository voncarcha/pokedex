import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonDataAsync, selectPokemon } from 'services/pokemon';
import { useHistory } from 'react-router-dom';
import { TYPE_COLORS } from 'styles/colors';
import { Tag, Button, Tooltip, Progress } from 'antd';
import { LoadingOutlined, LeftOutlined } from '@ant-design/icons';
import ReactImageFallback from 'react-image-fallback';
import pokeball from 'images/pokeball.png';

import * as S from './styles';

function PokemonData() {
  let history = useHistory();
  const dispatch = useDispatch();
  const pokemonState = useSelector(selectPokemon);

  useEffect(() => {
    dispatch(getPokemonDataAsync(history.location.pathname));
  }, [dispatch, history.location.pathname]);

  const {
    name,
    id,
    sprites,
    stats,
    weight,
    height,
    types,
    description,
  } = pokemonState.selectedPokemon;

  const getPokemonImage = () => {
    const artwork = sprites.other['official-artwork'].front_default;

    if (artwork !== null && sprites.other) {
      return artwork;
    }
    return sprites.front_default;
  };

  return (
    <S.Wrapper>
      {pokemonState.isLoading ? (
        <S.Loader>
          <LoadingOutlined className="loader" />
        </S.Loader>
      ) : (
        <section>
          <S.Header>
            <section>
              <Tooltip title="Go Back">
                <Button
                  shape="circle"
                  icon={<LeftOutlined />}
                  onClick={() => history.goBack()}
                />
              </Tooltip>
              <h2>
                <span>#{id}</span>
                {name}
              </h2>
            </section>
          </S.Header>
          <S.Content>
            <header>
              <figure>
                <ReactImageFallback
                  src={getPokemonImage()}
                  fallbackImage={pokeball}
                  initialImage={
                    <S.ImageLoader>
                      <LoadingOutlined className="loader" />
                    </S.ImageLoader>
                  }
                  alt={name}
                />
              </figure>
              <article>
                <h3>{description}</h3>
                <S.Stats>
                  {stats.map((i, index) => (
                    <section key={index}>
                      <div className="stat-label">
                        <small>{i.stat.name}</small>
                        <small>{i.base_stat}</small>
                      </div>
                      <Progress
                        percent={i.base_stat > 100 ? 100 : i.base_stat}
                        success={{
                          percent: i.base_stat > 100 ? i.base_stat - 100 : 0,
                        }}
                        showInfo={false}
                        status="active"
                      />
                    </section>
                  ))}
                </S.Stats>
                <aside>
                  {types && (
                    <div className="tag">
                      {types.map((i, index) => (
                        <Tag color={TYPE_COLORS[i.type.name]} key={index}>
                          {i.type.name}
                        </Tag>
                      ))}
                    </div>
                  )}
                  <div>
                    <Tag color="cyan">Weight: {weight}</Tag>
                    <Tag color="blue">Height: {height}</Tag>
                  </div>
                </aside>
              </article>
            </header>
          </S.Content>
        </section>
      )}
    </S.Wrapper>
  );
}

export default PokemonData;
