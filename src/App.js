import { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import Logo from "./Logos/movielore.png";
import AddFavourite from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

const trending =
  "https://api.themoviedb.org/3/trending/all/day?api_key=26ebf704a90b3fd2c15a471fe813ef6e";
const featured =
  "https://api.themoviedb.org/3/discover/tv?api_key=26ebf704a90b3fd2c15a471fe813ef6e&language=en-US&sort_by=popularity.desc&api_key=26ebf704a90b3fd2c15a471fe813ef6e&page=1";
const api_key = "26ebf704a90b3fd2c15a471fe813ef6e";
const search =
  "https://api.themoviedb.org/3/search/movie?api_key=26ebf704a90b3fd2c15a471fe813ef6e&query=";
const genres_api =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=26ebf704a90b3fd2c15a471fe813ef6e&language=en-US";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getMovies(trending);
  }, []);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites != null) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(search + searchTerm);
      setSearchTerm("");
    }
  };

  const addFavourites = (movie) => {
    const newFaveList = [...favourites, movie];
    setFavourites(newFaveList);
    saveToLocalStorage(newFaveList);
  };

  const removeFavourites = (movie) => {
    const newFaveList = favourites.filter(
      (favourite) => favourite.id !== movie.id
    );

    setFavourites(newFaveList);
    saveToLocalStorage(newFaveList);
  };

  return (
    <>
      <header>
        <img className="logo" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div>
        <div className="heading">Movies:</div>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => (
            <Movie
              data={movie}
              key={movie.id}
              poster_path={movie.poster_path}
              name={movie.name ? movie.name : movie.original_title}
              overview={movie.overview}
              vote_average={movie.vote_average}
              favourites={AddFavourite}
              handleFavouritesClick={addFavourites}
              movie={movie}
            />
          ))}
      </div>
      <div className="favourites-container">
        <div className="heading">Favourites:</div>
        <div className="movie-container">
          {console.log(favourites)}
          {favourites.length > 0 &&
            favourites.map((favourite) => (
              <Movie
                data={favourite}
                key={favourite.id}
                poster_path={favourite.poster_path}
                name={
                  favourite.name ? favourite.name : favourite.original_title
                }
                overview={favourite.overview}
                vote_average={favourite.vote_average}
                favourites={RemoveFavourites}
                handleFavouritesClick={removeFavourites}
                movie={favourite}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
