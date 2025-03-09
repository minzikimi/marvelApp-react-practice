import { useState, useEffect } from "react";
import "./Home.css";
import Character from "../components/Character";


function Home() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const API_URL = "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023";

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("API error!");
        }
        const data = await response.json();
        console.log("Fetched Characters:", data.data.results);
        setCharacters(data.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacter();
  }, []);

  return (
    <div className="container">
      {loading ? <h1>Loading...</h1> : 
        <div>
          <h1>Marvel Characters</h1>
          <ul className="characters-grid">
            {characters.map((character) => (
              <li key={character.id}>
                <Character
                  id={character.id}
                  name={character.name}
                  thumbnail={character.thumbnail}
                />
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default Home;
