import React, { useState, useEffect } from "react";
import Field, { Title, ForgetPass, Button, Form } from './Field'

function Login () {
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
    if (Object.keys(errors).length) setErrors({});
  }, [password, email]);

  const emailProps = {
    type: "email",
    value: email,
    error: errors.email,
    placeholder: "Email",
    onChange: e => setEmail(e.target.value),
  }

  const passwordProps = {
    type: "password",
    value: password,
    error: errors.password,
    placeholder: "Password",
    onChange: e => setPassword(e.target.value),
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Title>
        <h3>Welcome to U of Tears</h3>
      </Title>

      <Field {...emailProps} />

      <Field {...passwordProps} />

      <ForgetPass type="button">
        Forgot password?
      </ForgetPass>

      <Button style={{ marginTop: 40 }} block>
        Login
      </Button>

      <div style={{ textAlign: 'center', margin: '10px' }}>OR</div>

      <Button type="button" style={{ margin: '10px 0' }} block>
        Continue With Facebook
      </Button>
      <Button type="button" block>
        Continue With Google
      </Button>

    </Form>
  );
}

export default Login;
