import React, { useEffect, useState } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';
import { useCallback } from 'react';
 


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


const fetchMoviesHandler=useCallback(async()=>{
  setIsLoading(true);
  setError(null);

  try{
  const response= await fetch('') // equal to = .then(response=>{ return response.json()})
 
  if(!response.ok){                               //before parse json check this
    throw new Error('something went wrong');
  }
  const data=await response.json(); //.then(data=>{})
  
  // console.log(data)
const loadedMovies=[]


for(let key in data){
  loadedMovies.push({
    id:key,
    title:data[key].title,
    openingText:data[key].openingText,
    releaseDate:data[key].releaseDate

  })
}
    
   setMovies(loadedMovies)
  
    setIsLoading(false)
 
  }
catch(error){
  setError(error.message)
  console.log(error.message)
 }

 setIsLoading(false)

},[])

useEffect(()=>{
  fetchMoviesHandler()
},[fetchMoviesHandler])




async function addMovieHandler(movie) {
  const response=await fetch('',{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(movie), // body data type must match "Content-Type" header
  });

const data=await response.json();
console.log(data.name)

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>   
    </React.Fragment>
  );
}

export default App;
