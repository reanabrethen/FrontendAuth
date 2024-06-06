import React from 'react'
import {Link} from 'react-router-dom'

function MovieList({movieList}) {
  console.log(movieList)
    return (
    movieList.map((movie)=>{
        return(
            <div key={movie.imdbID}>
                <Link to={{pathname: `/movie-detail/${movie.Title}`}}>
                    <div>
                        <img className='moviePoster'
                        src={movie.Poster} 
                        alt={movie.Title} />
                    </div>
                    <div>
                        Title: {movie.Title}
                        <br />
                        Year: {movie.Year}
                        </div>
                </Link>
             
                </div>
            )
        }) 
  )
}

export default MovieList