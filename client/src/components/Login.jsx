import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles";

export const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "/users/login",
        newUser,
        { withCredentials: true }
      );
      setResult(resp.data);
      if (resp.data) setIsAuthenticated(true);
    } catch (error) {
      setResult(error.response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      {result?.errMsg && (
        <p style={{ ...styles.tooltip, background: "red" }}>{result.errMsg}</p>
      )}

      <input
        value={newUser.email}
        placeholder="enter your email"
        style={styles.input}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        type="email"
      />
      <input
        value={newUser.password}
        placeholder="enter your password"
        style={styles.input}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        type="password"
      />
      <input style={styles.submit} type="submit" value="Sign In" />
      <p>
        You don't have an account yet? Go register{" "}
        <Link to="/register">here</Link>
      </p>
    </form>
  );
};
