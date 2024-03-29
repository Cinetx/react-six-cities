import React from 'react';
import CardItemFavorite from './card-item-favorite';
import PropTypes from 'prop-types';
import offerPropsType from '../../prop-types/offer';
import {filterOffers} from '../../utils/filter';

function CardListFavorite(props) {
  const {offers} = props;

  const uniqueCities = [...new Set(offers.map((item) => item.city.name))];

  return (
    <ul className="favorites__list">
      {uniqueCities
        .map((city) =>
          <CardItemFavorite offers={filterOffers(city, offers)} city={city} key={city}/>,
        )}
    </ul>
  );
}

CardListFavorite.propTypes = {
  offers: PropTypes.arrayOf(offerPropsType).isRequired,
};

export default CardListFavorite;
