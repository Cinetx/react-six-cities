import React from 'react';
import {SORT_BY} from '../../const';
import SortItem from './sort-item';
import PropTypes from 'prop-types';

function SortList(props) {
  const {sortMenuIsOpen, sortType, sortMenuOpen, sortTypeChange} = props;

  const menuClass = 'places__options places__options--custom';
  const menuClassOpen = 'places__options places__options--custom places__options--opened';

  return (
    <ul className={sortMenuIsOpen ? menuClassOpen : menuClass}>
      {SORT_BY.map((sort) =>
        (
          <SortItem
            sortType={sortType}
            sortTypeChange={sortTypeChange}
            sortMenuOpen={sortMenuOpen}
            sort={sort}
            key={sort.type}
          />
        ),
      )}
    </ul>
  );
}

SortList.propTypes = {
  sortType: PropTypes.string.isRequired,
  sortTypeChange: PropTypes.func.isRequired,
  sortMenuIsOpen: PropTypes.bool.isRequired,
  sortMenuOpen: PropTypes.func.isRequired,
};

export default SortList;
