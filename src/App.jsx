import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Component } from 'react'
import {ToastContainer} from 'react-toastify'
import MainRouter from './MainRouter'
import { jwtDecode } from 'jwt-decode'
import setAxiosAuthToken from './components/utils/SetAxiosAuthToken'


export class App extends Component {
    state ={
      user: null //intentionally no value
    }

    handleUserLogin = (user) =>{
      this.setState({user: user})
    }

    handleUserLogout = ()=>{
      this.setState({user: null})
      window.localStorage.removeItem('jwt')
      setAxiosAuthToken(null) //deleted authorization header, removes calls we made from App
    }

    componentDidMount(){
      const jwt = window.localStorage.getItem('jwt')
      const currentUser = jwt ? jwtDecode(jwt) : null //if JWT does not exsist, do not want to continue on -->use ternary to avoid nesting, excessive code
      if(currentUser && currentUser.exp > (Date.now()/1000)){ //date.now in line === current time 
        this.setState({
            user: {
            username: currentUser.username,
            email: currentUser.email,
            id: currentUser.id
            }
        })
        setAxiosAuthToken(jwt)   //header
      }  
    } 

c


  render() {
    return (
      <>
        <ToastContainer position='top-center'/>
        <MainRouter
            user = {this.state.user}
            handleUserLogin = {this.handleUserLogin}
            handleUserLogout = {this.handleUserLogout}
            />
      </>
      // <SignUp/> used before importing router (allows info to pop up on browser)
    )
  }
}

export default App