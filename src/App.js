import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Siginpage from './Pages/Signinpage/Siginpage.js';
import Mappage from './Pages/Mappage/Mappage';
//import Search from './Components/search/Search';
//import Sidbar from './Components/shared/Sidebar/Sidbar';


function App() {
  
  return (
    <>
    <div className="App">
    <Router>
      <Routes>
          <Route exact path="/" element={<Navigate to="/map" />} />
          <Route path='/signin' element={<Siginpage/>}/>
          <Route path='/map' element={<Mappage/>}/>
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
