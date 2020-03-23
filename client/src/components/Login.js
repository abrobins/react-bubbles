import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    credentials: {
      username: "",
      password: ""
    }
  });

  const handleChange = e => {
    setUser({
      credentials: {
        ...user.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", user.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={user.credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={user.credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
