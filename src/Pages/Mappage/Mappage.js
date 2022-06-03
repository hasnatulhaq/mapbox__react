import Mapro from '../../Components/Map/Map.js';


function Mappage({setIsLoggedIn,token}){
    return(
      <>
        <div className="">
        <div className='main_container'></div>
      {/* <div className='side_nav'>
          <Sidbar/>
      </div> */}
      <div className="map_div">
      <Mapro setIsLoggedIn={setIsLoggedIn} token={token}/>
      </div>
        </div>      
        </>
    )
}




export default Mappage;