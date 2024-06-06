import Home from './components/Home'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import SignUp from './components/SignUp/SignUp'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Movie from './components/Movie/Movie'
import MovieDetails from './components/MovieDetails/MovieDetails'



function MainRouter(props) {
  return (
     //react fragment -->orignial way to do it; blank 'parent element' to be able to hold info
      // <React.Fragment> </React.Fragment> --> update === just <> to use as a parent element  aka FRAGMENT
        <Router>
          <Nav
              user = {props.user}
              handleUserLogout = {props.handleUserLogout}
              />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route exact path='/sign-up' element={<SignUp/>} />
              <Route exact path='/login' element={
                props.user ? 
                    <Navigate to='/movie'/> : 
                    <Login handleUserLogin={props.handleUserLogin}/>} /> 
              <Route exact path='/profile' element={
                    <PrivateRoute>
                        <Profile user={props.user}/>
                    </PrivateRoute>}/>
              <Route exact path="/movie" element={
                  <PrivateRoute>
                      <Movie/>
                  </PrivateRoute>}/>
              <Route path='/movie-detail/:title' element={
                  <PrivateRoute>
                      <MovieDetails/>
                  </PrivateRoute>}/>
            </Routes>
          </Router>
  )
}

export default MainRouter