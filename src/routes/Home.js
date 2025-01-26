import Movies from "../components/Movies";
import { useState, useEffect } from "react";
import "./Home.css"

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const apiURL = "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year";

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await fetch(apiURL);
      const json = await response.json();
      setMovies(json.data.movies);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
       
        <div> <h1>Movie List</h1>
         <div className="movie-list"> {movies.map((movie) => (
            <Movies
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={
                movie.summary.length > 200
                  ? `${movie.summary.split(' ').slice(0, 30).join(' ')}...`
                  : movie.summary
              }
              genres={movie.genres}
            />
          ))}</div>
        </div>
      )}
    </div>
  );
}

export default Home;