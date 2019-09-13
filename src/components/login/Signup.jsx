import React, { useState, useEffect } from "react";
import classnames from "classnames";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match"
      }));
      isError = true;
    }

    if (!isError) {
      // login acction
    }
  };

  useEffect(() => {
    // Reset error when password or email changed
    if (Object.keys(errors).length) setErrors({});
  }, [email, password, confirmPassword]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 600, margin: "auto", padding: 50 }}
      noValidate
    >
      <div className="text-center">
        <h3>U of Tears Signup</h3>
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

      <div
        className="form-group"
        style={{ position: "relative", marginBottom: 30 }}
      >
        <label>Confirm Password</label>
        <div>
          <input
            type="password"
            className={classnames({
              "form-control": true,
              "is-invalid": !!errors.confirmPassword
            })}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <div
            className="invalid-feedback mt-0"
            style={{ position: "absolute" }}
          >
            {errors.confirmPassword}
          </div>
        </div>
      </div>

      <div className="text-center" style={{ marginTop: 40 }}>
        <button type="submit" className="btn btn-primary btn-block">
          Signup
        </button>
      </div>
    </form>
  );
}

export default Signup;
