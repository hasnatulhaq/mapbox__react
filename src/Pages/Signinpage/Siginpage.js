
import Signin from '../../Components/Signin/Signin.js';

function Siginpage({setIsLoggedIn ,loggedIn}){
    return(
      <>
        <div className="MainNetwok">
           <Signin setIsLoggedIn={setIsLoggedIn} loggedIn={loggedIn}/>
        </div>      
        </>
    )
}




export default Siginpage;