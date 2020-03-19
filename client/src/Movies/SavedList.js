import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

function SavedList({ list }) {
  const history = useHistory();

  const addMovie = () => {
    history.push(`/add-movie`)
  }

  return (
    <div className="saved-list">
      <div className='add-button' onClick={addMovie}>
        Add
      </div>
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default SavedList;
