import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();
  const host = process.env.REACT_APP_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authToken)
      props.showAlert("Account Logged in Successfully", 'success')
      navigate('/')
    }
    else {
      //alert("Invalid Credentials")
      props.showAlert("Invalid Credentials", 'danger')
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='container-fluid d-flex justify-content-center align-items-center' style={{
      height: "100vh",
      overflow: "hidden",
      backgroundImage: "url('/inotebookbg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      textAlign: 'justify'
    }}>
      <div
        className="container"
        style={{
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <div className="text-center mb-4">
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            iNOTEBOOK
          </h1>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            Your notes on cloud ☁️
          </p>

          <p
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              color: "#333",
            }}
          >
            Login to continue using iNotebook
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <div className="text-center mt-4">
            <span style={{ color: "#555" }}>
              Don't have an account?
            </span>

            <a
              href="/signup"
              className="ms-2 text-primary fw-semibold text-decoration-none"
            >
              SignUp
            </a>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login
