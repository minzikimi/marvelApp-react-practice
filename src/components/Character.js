import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Character({ id, name, thumbnail }) {
  return (
    <Link to={`/character/${id}`} className="character-link">
      <div className="character-card">
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={name}
          className="character-image"
        />

        <h3 className="character-name">{name}</h3>
      </div>
    </Link>
  );
}

Character.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    path: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
  }).isRequired,
};

export default Character;
