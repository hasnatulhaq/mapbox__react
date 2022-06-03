
import Signin from '../../Components/Signin/Signin.js';

function Siginpage({setIsLoggedIn ,loggedIn, setToken}){
    return(
      <>
        <div className="MainNetwok">
           <Signin setIsLoggedIn={setIsLoggedIn} loggedIn={loggedIn}  setToken={setToken}/>
        </div>      
        </>
    )
}




export default Siginpage;