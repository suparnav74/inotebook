import { useState } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();
    const host = process.env.REACT_APP_API_URL
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, email: email, password: password }),
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert("Account Signup Successfully", 'success')
        }
        else {
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
                            fontSize: "20px",
                            fontStyle: "italic",
                            color: "#333",
                        }}
                    >
                        New to iNotebook ? Create a account to get started with your notes.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={credentials.name} onChange={onChange} name='name' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChange} name='cpassword' minLength={5} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <div className="text-center mt-4">
                        <span style={{ color: "#555" }}>
                            Already have an account?
                        </span>

                        <Link
                            to="/login"
                            className="ms-2 text-primary fw-semibold text-decoration-none"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
