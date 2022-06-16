import "./Navbar.css"


function Navbar({setIsLoggedIn,userstatus}){
   return(
    <>
      <nav className="navbar">
        <div className="navbar__logo">
           <h3>Zoning
           {userstatus === "premium" ? (
            <sup>pro</sup>
        ) : userstatus === "zoning_only" ? (
             <sup>Basic</sup>
        ) : (
            <sup>subscribe</sup>
        )}
            </h3>
        </div>
      <ul className="navbar__menu">
  <li className="navbar__menu_item">Home</li>
  <li className="navbar__menu_item">Dashboard</li>
</ul> 
        <button className="navbar__btn" onClick={() => setIsLoggedIn(false)}>
        Signout
      </button>
      </nav>
      <div className="statusdiv">
       
      </div>
    </>
   )
}

export default Navbar
