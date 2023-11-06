import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

const [movies,setMovies]=useState([])
const [isloading,setIsLoading]=useState(false)


async function fetchMoviesHandler(){
  setIsLoading(true)
  const response= await fetch('https://swapi.dev/api/films/') // equal to = .then(response=>{ return response.json()})
  const data=await response.json(); //.then(data=>{})
  

    const transformedMovies=data.results.map(moviesData=>{

      return{
        id:moviesData.episode_id,
        title:moviesData.title,
        openingText:moviesData.opening_crawl,
        releaseDate:moviesData.release_date,

      }
    })

    setMovies(transformedMovies)
    setIsLoading(false)
 
  }
    



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length>0 &&  <MoviesList movies={movies} /> }
       {!isloading && movies.length===0 && <p> Found no Movies</p>}
       {isloading &&  <p>Loading...</p>}
      </section>   
    </React.Fragment>
  );
}

export default App;
