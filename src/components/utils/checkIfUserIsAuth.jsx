import setAxiosAuthToken from './SetAxiosAuthToken'
import {jwtDecode} from 'jwt-decode'


const checkIfUserIsAuth = () =>{
    //check if token exsists, if not return false
    //if token exsists, check if expired, if so, return false
    //else return true

    const jwt = window.localStorage.getItem('jwt')
    if(jwt){
        const currentTime = Date.now() / 1000
        const decodedJwt = jwtDecode(jwt)   //gives us our obj w/ information needed
        if(decodedJwt.exp > currentTime){
            setAxiosAuthToken(jwt)
            return true
        }else{
            return false
        }
    }else{
        return false //if it doesn't exsist--> automatically comes to this false statement
    }
}


export default checkIfUserIsAuth