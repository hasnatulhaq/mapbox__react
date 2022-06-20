import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Siginpage from "./Pages/Signinpage/Siginpage.js";
import Mappage from "./Pages/Mappage/Mappage";
import { useState } from "react";
import localStorage from "./lib/localStorage";
//import Navbar from "./Components/Navbar/Navbar";
//import { accessToken } from "mapbox-gl";
//import Search from './Components/search/Search';
//import Sidbar from './Components/shared/Sidebar/Sidbar';

function App() {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [userstatus,setMembershipstatus] = useState();
  console.log(userstatus)
  //const [token , setToken] = useState()
  // localStorage.setItem('redtoken', token);
  // const Stoken=  localStorage.getItem('usetoken')

  //   const initialState = {
  //     token: localStorage.getItem('usetoken'),
  //     isAuthenticated: localStorage.getItem('usetoken') ? true : false, // or just !!localStorage.getItem('token')
  //     isLoading: false,
  //     isRegistered: false
  //  }

  const { accessToken } = localStorage.getToken();
  console.log(accessToken, "ACCESS TOKEN");

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate to="/signin" />} />
            <Route
              path="/signin"
              element={
                <Siginpage
                  setIsLoggedIn={setIsLoggedIn}
                  loggedIn={accessToken}
                />
              }
            />
            {loggedIn ? (
              <Route
                path="/map"
                element={<Mappage setIsLoggedIn={setIsLoggedIn} userstatus={userstatus} setMembershipstatus={setMembershipstatus}/>}
              />
            ) : (
              <Route path="*" element={<Navigate to="/signin" replace />} />
            )}
          </Routes>
        </Router>
        {/* <div className='searh_div'>
        <div>
        <Search/>
        </div>
        <div className='navbar_items'>
          <a>Home</a>
          <a>About</a>
        </div>
      </div> */}
        {/* <div className='main_container'></div>
       <div className='side_nav'>
          <Sidbar/>
      </div>
      <div className="map_div">
      <Mapro/>
      </div> */}
      </div>
    </>
  );
}
export default App;

// <Route
// exact
// path="/"
// render={() => (loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />)}
// />;
