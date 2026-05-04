import { useState } from "react";

function Addlistbutton({ handleClick }) {
  return (
    <button onClick={handleClick}>Add To List!</button>
  );
}

if (!import.meta.env.VITE_TMDB_KEY) {
  console.error("Missing TMDB API key");
  return;
}

export default function Movies({ addItem }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    if (!query.trim()) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&query=${query}`
    );

    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Movie Search</h2>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {if (e.key === "Enter") searchMovies();}}
      />

      <button onClick={searchMovies}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {results.map((movie) => (
          <div key={movie.id} style={{ marginBottom: "20px" }}>
            <h3>{movie.title}</h3>
            <h3>{movie.release_date?.slice(0, 4)}</h3>
            <p>{movie.overview?.slice(0, 150)}...</p>
            <Addlistbutton handleClick={() => addItem(movie.title)} />
          </div>
        ))}
      </div>
    </div>
  );
}

