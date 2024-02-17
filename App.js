import React from 'react';
import { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const[movie,setMovie]=useState([])
 const[loading,setLoading]=useState(false)
   async function what(){
    setLoading(true)
   const x= await fetch('https://swapi.dev/api/films/')
   const y= await x.json()
   console.log(y.results)
   console.log("hello");
   var z= y.results.map((item)=>(
    {
      id:item.episode_id,
      title:item.title,
      releasedate:item.release_date,
      openingtext:item.opening_crawl
    }
   ))
   setMovie(z)
   setLoading(false)
   console.log(movie)
   }
  return (
    <React.Fragment>
      <section>
        <button onClick={what}>Fetch Movies</button>
      </section>
      <section>
    {!loading &&
        <MoviesList movies={movie} />  }
        {!loading && movie.length=== 0 && <p>no movies to show...</p>}
     {loading  && <p>loading....</p>}   
         
      </section>
    </React.Fragment>
  );
}

export default App;
