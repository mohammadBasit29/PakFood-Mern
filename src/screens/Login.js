import React, { useState} from "react";
import { Link , useNavigate} from 'react-router-dom';


export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: ""});
let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Synthetic event
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
          email: credentials.email,
          password: credentials.password,
         
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/"); // Navigate to the root path if success

      } else {
        alert("Please Enter Valid Credentials"); // Show an alert for failure
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Update the state when input fields change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name='email'
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name='password'
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/Signup" className='m-3 btn btn-danger'>New User</Link>
        </form>
      </div>
    </div>
  );
}
