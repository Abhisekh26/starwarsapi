import React from "react";
import { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Movieform from "./components/Movieform";

function App() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const what = useCallback(async function () {
    try {
      setLoading(true);
      setError(null);
      // const x = await fetch("https://swapi.dev/api/films/");
      const x = await fetch(
        "https://react-http-f5f7f-default-rtdb.firebaseio.com/movies.json"
      );
      if (!x.ok) {
        throw new Error("something went wrong....Retrying");
      }
      const y = await x.json();
      const loadedmovies=[]
      for(const key in y){
        loadedmovies.push({
          id:key,
          title:y[key].title,
          openingtext:y[key].openingtext,
          releasedate:y[key].releasedate,
        })
      }
     
      setMovie(loadedmovies);

      // console.log(movie);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    what();
  }, [what]);

  async function setdata(title, openingtext, releasedate) {
    var newObj = {
      title: title,
      openingtext: openingtext,
      releasedate: releasedate,
    };
    // console.log(newObj);
     const response=await fetch("https://react-http-f5f7f-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(newObj),
      headers:{
        "Content-type": "application/json"
      }
    });
    const data= await response.json()
    console.log(data)
  }
  async function deletemovie(ide){
    // var key=ide
    const response= await fetch (`https://react-http-f5f7f-default-rtdb.firebaseio.com/movies/${ide}.json`,{
      method:"DELETE"
     })
    var newr = movie.filter(movie=>movie.id!==ide)
    setMovie(newr)
    

  }
  return (
    <React.Fragment>
      <Movieform setdata={setdata}></Movieform>
      <section>
        <button onClick={what}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movie}
        deletemovie={deletemovie} />}
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
