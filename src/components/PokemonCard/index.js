import React from 'react';
import { useSelector } from 'react-redux';
import { selectPokemon } from 'services/pokemon';
import { Skeleton, Card, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { TYPE_COLORS } from 'styles/colors';
import ReactImageFallback from 'react-image-fallback';
import pokeball from 'images/pokeball.png';

import * as S from './styles';

const { Meta } = Card;

function PokemonCard({ pokemon }) {
  const pokemonState = useSelector(selectPokemon);
  const { name, sprites, types, id } = pokemon;

  return (
    <S.Wrapper>
      <Link to={`/${id}`} className="link-btn">
        <Card
          hoverable
          cover={
            <ReactImageFallback
              src={sprites.other['official-artwork'].front_default}
              fallbackImage={pokeball}
              initialImage={
                <S.Loader>
                  <LoadingOutlined className="loader" />
                </S.Loader>
              }
              alt={name}
            />
          }
        >
          <Skeleton loading={pokemonState.isLoading} avatar active>
            <Meta title={name} />
            <div className="tag">
              {types.map((i, index) => (
                <Tag color={TYPE_COLORS[i.type.name]} key={index}>
                  {i.type.name}
                </Tag>
              ))}
            </div>
          </Skeleton>
        </Card>
      </Link>
    </S.Wrapper>
  );
}

export default PokemonCard;
