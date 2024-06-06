import { Component } from 'react'
import Axios from '../utils/Axios'

export class Profile extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: ''
    }



    async componentDidUpdate(prevProps){
        try {
          if(!prevProps.user && this.props.user ){ //so long as prevprops = null and the props is a user
            console.log(this.props.user) //sanity check for proper hookup to see if props are coming in 
            const foundUser = await Axios.get(`users/get-user-by-id/${this.props.user.id}`)  
            const {firstName, lastName, username, email} = foundUser.data.payload //destructure first to identify properties we want out of it
            this.setState({firstName, lastName, username, email})  //shorthand version of key&value in obj
          } 
        } catch (error) {
            console.log(error)
        }
    }

  render() {
    return (
      <div>
        <div className="update-container">
            <h3>Profile</h3>
            <div>
                <p>First Name: {this.state.firstName}</p>
                <p>Last Name: {this.state.lastName}</p>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
            </div>
        </div>
      </div>
    )
  }
}

export default Profile