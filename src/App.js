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
const [error,setError]=useState(null)


async function fetchMoviesHandler(){
  setIsLoading(true);
  setError(null);

  try{
  const response= await fetch('https://swapi.dev/api/films/') // equal to = .then(response=>{ return response.json()})
 
  if(!response.ok){                               //before parse json check this
    throw new Error('something went wrong')
  }
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
catch(error){
  setError(error.message)
  console.log(error.message)
 }

 setIsLoading(false)

}

let content=<p>Found no Movies</p>

if(movies.length>0){
content=<MoviesList movies={movies} />

}

if(error){
  content=<p>{error}</p>
  
}

if(isloading){
  content=<p>Loading...</p>
  
}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>   
    </React.Fragment>
  );
}

export default App;
