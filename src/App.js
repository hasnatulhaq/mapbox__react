import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Siginpage from './Pages/Signinpage/Siginpage.js';
import Mappage from './Pages/Mappage/Mappage';
import { useState } from 'react';
//import Search from './Components/search/Search';
//import Sidbar from './Components/shared/Sidebar/Sidbar';


function App() {
  
  const [loggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
    <div className="App">
    <Router>
      <Routes>
            <Route exact path="/" element={<Navigate to="/signin" />} />
            <Route path='/signin' element={<Siginpage setIsLoggedIn={setIsLoggedIn} loggedIn={loggedIn}/>}/>
          
          {loggedIn ? (
         <Route path='/map' element={<Mappage setIsLoggedIn={setIsLoggedIn}/>}/>
        ) : (
          <Route
          path="*"
        element={<Navigate to="/signin" replace />}
    />
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