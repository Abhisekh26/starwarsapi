import React from "react";
import { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Movieform from "./components/Movieform";

function App() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState([]);

  const what = useCallback(async function () {
    try {
      setLoading(true);
      setError(null);
      const x = await fetch("https://swapi.dev/api/films/");
      if (!x.ok) {
        throw new Error("something went wrong....Retrying");
      }
      const y = await x.json();
      console.log(y.results);
      // console.log("hello");
      var z = y.results.map((item) => ({
        id: item.episode_id,
        title: item.title,
        releasedate: item.release_date,
        openingtext: item.opening_crawl,
      }));
      setMovie(z);

      console.log(movie);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  function setdata(title, openingtext, releasedate) {
    var newarr=[...form, {
      title: title,
      openingtext: openingtext,
      releasedate: releasedate,
    },];
    setForm(newarr)
    console.log(form)
  }
  
  useEffect(() => {
    what();
  }, [what]);

  return (
    <React.Fragment>
      <Movieform setdata={setdata}></Movieform>
      <section>
        <button onClick={what}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movie} />}
        {!loading && movie.length === 0 && !error && (
          <p>no movies to show...</p>
        )}
        {!loading && error && <p>{error}</p>}
        {loading && <p>loading....</p>}
        {!loading && error && <p>{error}</p>}
        
      </section>
     
    </React.Fragment>
  );
}

export default App;
