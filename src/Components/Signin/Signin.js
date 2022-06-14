import "./Signin.css";
import axios from "../../Api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import localStorage from "../../lib/localStorage";
function Signin({ setIsLoggedIn, loggedIn, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  let navigate = useNavigate();
   const [showerr , setShowerr] = useState();
  // const handlelogin = (e) => {
  //     e.preventDefault();
  //     let formField = new FormData();
  //     formField.append('email_address', email_address)
  //     formField.append('password', password)

  //      axios.post('https://testing-api.zoneomics.com/auth/login', {
  //         data: formField
  //     }).then(function (response) {
  //         console.log(response.data);
  //         history('/', { replace: true });
  //     })
  // }

  const handlelogin = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(res.data.data.accessToken);
          localStorage.setToken({
            accessToken: res.data.data.accessToken,
            refreshToken: res.data.data.refreshToken,
          });
          navigate(`/map`);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) =>{
        setShowerr(err)
        console.log(err)
      } );
  };

  return (
    <>
      <div className="logindiv">
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="inputfield"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="inputfield"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
          </div>
          <button className="fieldbutton" type="Submit" onClick={handlelogin}>
            Submit
          </button>
        </form>
        <p className="error">{showerr}</p>
      </div>
    </>
  );
}

export default Signin;
