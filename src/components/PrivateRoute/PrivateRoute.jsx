import checkIfUserIsAuth from '../utils/checkIfUserIsAuth'
import {Navigate} from 'react-router-dom' //component

const PrivateRoute = ({children}) => {  //destructure in place; children === anything nested within an element, will return props
  if(checkIfUserIsAuth()){
        return children
  }else{
        return <Navigate to='/login'/>
  }
}

export default PrivateRoute


// return children //allow us to nest something w/in private route and display it