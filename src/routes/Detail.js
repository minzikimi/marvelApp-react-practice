import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Movies from "../components/Movies"; 
import "./Detail.css"

function Detail() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const apiURL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async() => {
    try {
      const response = await fetch(apiURL);
      const json = await response.json();
      setMovie(json.data.movie);
      setLoading(false);
      console.log(json.data.movie);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="movie-detail">
          <h1>Movie Detail</h1>
          {movie ? (
            <Movies
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ) : (
            <h2 className="error">Movie not found</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default Detail;