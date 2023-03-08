import React, { useEffect } from "react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="login">
      <div>
        {auth.errors ? (
          <div>
            <p>{auth.errors.errorMessage}</p>
          </div>
        ) : null}
      </div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => auth.signin(email, password)}>Login</button>

      <h1>Register</h1>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => auth.signup(email, password)}>Register</button>
    </div>
  );
}
