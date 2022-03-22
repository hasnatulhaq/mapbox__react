import './App.css';
import Mapro from './Components/Map/Map';

import Search from './Components/search/Search';
import Sidbar from './Components/shared/Sidebar/Sidbar';


function App() {
  
  return (
    <div className="App">
      <div className='searh_div'>
        <div>
        <Search/>
        </div>
        <div className='navbar_items'>
          <a>Home</a>
          <a>About</a>
        </div>
      </div>
      <div className='side_nav'>
          <Sidbar/>
      </div>
      <section className="map_div">
      <Mapro/>
      </section>
    </div>
  );
}
export default App;
