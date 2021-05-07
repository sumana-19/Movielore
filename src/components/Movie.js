import React from "react";
const images = "https://image.tmdb.org/t/p/w500/";

const Movie = ({
  name,
  poster_path,
  vote_average,
  overview,
  favourites,
  handleFavouritesClick,
  movie,
}) => {
  const setVoteClass = (vote) => {
    if (vote >= 8) return "green";
    else if (vote >= 6) return "orange";
    else return "red";
  };

  const FavouritesComponent = favourites;
  return (
    <div className="movie">
      <img
        src={
          poster_path
            ? images + poster_path
            : "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
        }
        alt={name}
      />
      <div className="movie-info">
        <h3>{name}</h3>
        <span className={setVoteClass(vote_average)}>{vote_average} IMDB</span>
      </div>
      <div className="movie-overview">
        <h2>Synopsis:</h2>
        <p>{overview}</p>
      </div>
      <div onClick={() => handleFavouritesClick(movie)} className="overlay">
        <FavouritesComponent />
      </div>
    </div>
  );
};

export default Movie;
