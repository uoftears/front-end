import React, { useState, useEffect } from "react";
import classnames from "classnames";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    let isError = false;
    if (!email) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Email is required" }));
      isError = true;
    }
    if (!password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: "Password is required"
      }));
      isError = true;
    }

    if (!isError) {
      // login acction
    }
  };

  useEffect(() => {
    // Reset error when password or email changed
    if (Object.keys(errors)) setErrors({});
  }, [password, email]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 600, margin: "auto", padding: 50 }}
      noValidate
    >
      <div className="text-center">
        <h3>U of Tears Login</h3>
      </div>
      <div
        className="form-group mt-3"
        style={{ position: "relative", marginBottom: 30 }}
      >
        <label>Email</label>
        <div>
          <input
            type="email"
            className={classnames({
              "form-control": true,
              "is-invalid": !!errors.email
            })}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div
            className="invalid-feedback mt-0"
            style={{ position: "absolute" }}
          >
            {errors.email}
          </div>
        </div>
      </div>

      <div
        className="form-group"
        style={{ position: "relative", marginBottom: 30 }}
      >
        <label>Password</label>
        <div>
          <input
            type="password"
            className={classnames({
              "form-control": true,
              "is-invalid": !!errors.password
            })}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div
            className="invalid-feedback mt-0"
            style={{ position: "absolute" }}
          >
            {errors.password}
          </div>
        </div>
      </div>
      <div className="text-center" style={{ marginTop: 40 }}>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </div>
      <div className="text-center mt-3">
        <button type="button" className="btn btn-link">
          forgot password
        </button>
      </div>
    </form>
  );
}

export default Login;
