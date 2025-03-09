import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  const API_URL = `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`;

  useEffect(() => {
    async function fetchCharacterDetail() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setCharacter(data.data.results[0] || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacterDetail();
  }, [id]);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <button onClick={handleBackToHome} className="back-button">Back to Home</button>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : character ? (
        <div className="character-detail">
          <h1>{character.name}</h1>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="character-image"
          />
          <p>{character.description|| "No description available"}</p>

          <h2>Comics</h2>
          {character.comics.items.length > 0 ? (
            <ul className="comics-list">
              {character.comics.items.slice(0, 5).map((comic, index) => (
                <li key={index}>{comic.name}</li>
              ))}
            </ul>
          ) : (
            <p>No comics available</p>
          )}

          <h2>Series</h2>
          {character.series.items.length > 0 ? (
            <ul className="series-list">
              {character.series.items.slice(0, 5).map((series, index) => (
                <li key={index}>{series.name}</li>
              ))}
            </ul>
          ) : (
            <p>No series available</p>
          )}

          <h2>Stories</h2>
          {character.stories.items.length > 0 ? (
            <ul className="stories-list">
              {character.stories.items.slice(0, 5).map((story, index) => (
                <li key={index}>{story.name}</li>
              ))}
            </ul>
          ) : (
            <p>No stories available</p>
          )}
        </div>
      ) : (
        <h1>Character not found</h1>
      )}
    </div>
  );
}

export default Detail;
