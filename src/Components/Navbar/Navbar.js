import "./Navbar.css"


function Navbar({setIsLoggedIn}){
   return(
    <>
      <nav className="navbar">
      <ul>
  <li><a href="default.asp">Home</a></li>
  <li><a href="news.asp">News</a></li>
  <li><a href="contact.asp">Contact</a></li>
  <li><a href="about.asp">About</a></li>
</ul> 
        <button className="navbar__btn" onClick={() => setIsLoggedIn(false)}>
        Signout
      </button>
      </nav>
    </>
   )
}

export default Navbar
