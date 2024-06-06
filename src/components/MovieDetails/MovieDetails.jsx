import "./MovieDetails.css"
import React, { Component } from 'react'
import axios from "axios"
import Axios from "../utils/Axios"
import { isEmail } from "validator"
export class MovieDetails extends Component {

    state = {
        Year : "",
        Actors: "",
        Awards: "",
        Country: "",
        Plot: "",
        Rated: "",
        Title: "",
        imdbID: "",
        toggleEmailer: false,
        isLoaded: false,
        email: "",
        message: ""
      }

  async componentDidMount(){
    try {
        const path = window.location.pathname.split('/') 
        // path = "/movie-detail/scream"
        const title = path[path.length - 1]
        //title = "scream"
        const result = await axios.get(`https://omdbapi.com/?apikey=${import.meta.env.
        VITE_MOVIE_API}&t=${title}`)
        this.setState({
            Year: result.data.Year,
            Title: result.data.Title,
            Actors: result.data.Actors,
            Awards: result.data.Awards,
            Country: result.data.Country,
            Plot: result.data.Plot,
            Rated: result.data.Rated,
            imdbID: result.data.imdbID,
            Poster: result.data.Poster,
            isLoaded: true,
            email: result.data.email,
            message: result.data.message
        })
    } catch (error) {
        console.log(error)
    }
  }

  handleOnSubmit = async (event) =>{
    console.log("clicked")
    event.preventDefault()
      try {
        if(this.state.email && this.state.message && isEmail(this.state.email)){
          const response = await Axios.post('mailjet/send-message',{
            recipient: this.state.email,
            message: this.state.message
          })
          console.log(response.data)
          } 
        }catch (error) {
        console.log(error)
        }
      }

  showEmailer = () => {
    if(!this.state.toggleEmailer){
        return(
          <div>
            <p style={{cursor: "pointer", color:"blue"}}
                onClick={()=>this.setState({toggleEmailer: true})}>
              Tell your friends!
            </p>
          </div>
        )
      }else{
        return(
          <div id="emailer">
            <form  onSubmit={this.handleOnSubmit} > 
              <label htmlFor="email">Friend's email</label>
              <input
                  id="recipient"
                  name="email"
              />
              <br/>
              <label htmlFor="message">Message</label>
              <textarea id="message"
                      name="message"
                      type="text"
                  />
                  <br/>
              <button
                  type="submit"
                 
                    >Submit</button>
            </form>
          </div>
        )
      }
  }
//if using input type=submit, use onSubmit={} in the form 
//want to use Axios instance when attaching the capability to send emails from movie detail page



    

  showMovieDetail = () =>{
    return (
        <div id="movie-page" >
            <div className="movie-image">
                <img src={this.state.Poster} alt={this.state.Title} />
            </div>
            <div className="movie-detail" style={{width: "100%"}}>
                <div><b>Year:</b> {this.state.Year}</div>
                <div><b>Actors:</b> {this.state.Actors}</div>
                <div><b>Awards:</b> {this.state.Awards}</div>
                <div><b>Country:</b> {this.state.Country}</div>
                <div><b>Rated:</b> {this.state.Rated}</div>
                <div><b>Title:</b> {this.state.Title}</div>
                <div><b>imdbID:</b> {this.state.imdbID}</div>
                <div><b>Plot:</b>{this.state.Plot}</div>
                {this.showEmailer()}
                
            </div>
            
        </div>
    )
  }
    
  render() {
    return(
      <div> 
          {
            !this.state.isLoaded ? (<div className="lds-dual-ring">Loading...</div>) : (
              <>
               {this.showMovieDetail()}
               
              </>
            )
          }
      </div>
    )
  }
}

export default MovieDetails

// style={{display: "flex"}}