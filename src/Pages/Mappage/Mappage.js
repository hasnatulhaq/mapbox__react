import Mapro from '../../Components/Map/Map.js';
import Navbar from '../../Components/Navbar/Navbar.js';

function Mappage({setIsLoggedIn,token,userstatus,setMembershipstatus}){
    return(
      <>
        <div className="">
        <Navbar className="navbar" setIsLoggedIn={setIsLoggedIn}  userstatus={userstatus}></Navbar>
        <div className='main_container'></div>
      {/* <div className='side_nav'>
        <Sidbar/>
      </div> */}
      <div className="map_div">
      <Mapro setIsLoggedIn={setIsLoggedIn} token={token} userstatus={userstatus} setMembershipstatus={setMembershipstatus}/>
      </div>
        </div>      
        </>
    )
}
export default Mappage;