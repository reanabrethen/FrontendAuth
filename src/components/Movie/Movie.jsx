import './Movie.css'
import { Component } from 'react'
import axios from 'axios'
import MovieList from './MovieList'

export class Movie extends Component {
    state= {
        movieList : [],
        searchInput: "",
        isLoaded: false
    }

    handleOnChange = (e) => {
        this.setState({searchInput: e.target.value})
    }

    handleOnSubmit = async() => {
        try {
            let foundMovies = await axios.get(`https://omdbapi.com/?apikey=${import.meta.env.
            VITE_MOVIE_API}&s=${this.state.searchInput}`)
            this.setState({movieList : foundMovies.data.Search})
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount(){
        try {
            const startingMovieList = [
                "Lord of the Rings",
                "8 Mile",
                "Snatch",
                "Django: Unchained",
                "Hacksaw Ridge",
                "Happy Gilmore",
                "Spider-Man: Across the Spider-Verse",
                "Pirates Of the Caribbean",
                "Seven Psychopaths"
            ]
            const movieArray = [] //starting movie details array
            for(let movie of startingMovieList){
                //iterate through the starter movies
                const movieInfo = await axios.get(`https://omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API}&t=${movie}`)
                movieArray.push(movieInfo.data)
                console.log(movieInfo)
            }
            this.setState({movieList: [...movieArray], isLoaded: true})
        } catch (error) {
            console.log(error)
        }
    }

  render() {
    return (
      <div>
        {
            !this.state.isLoaded ? (<div className="lds-dual-ring">Loading...</div>) : (
                <>
                <div id="mainApp">
                    <input
                        onChange={this.handleOnChange}
                        type="text"
                        placeholder='Search for a movie...'
                        name="movie"
                        value= {this.state.searchInput}/>
                    <button onClick={this.handleOnSubmit}>Search</button>
                </div>
                <div id="movieListContainer">
                    <h3>Cool Movie App</h3>
                    <div>
                        <MovieList movieList= {this.state.movieList}/>
                    </div>
                </div>
                </>
                )
        }
       </div>
    )
  }
}

export default Movie