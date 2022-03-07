import { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "./styles";
import { Link, useNavigate } from "react-router-dom";

export const Register = ({ isAuthenticated, setIsAuthenticated }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newUser);
    try {
      const resp = await axios.post(
        "/users/register",
        newUser,
        { withCredentials: true }
      );
      setResult(resp.data);
      setIsAuthenticated(true);
    } catch (error) {
      setResult(error.response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h1>Register</h1>
      {result?.msg && <p style={styles.tooltip}>{result.msg}</p>}
      {result?.errMsg && (
        <p style={{ ...styles.tooltip, background: "red" }}>{result.errMsg}</p>
      )}

      <input
        value={newUser.username}
        placeholder="enter your username"
        style={styles.input}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        type="text"
      />
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
      <input style={styles.submit} type="submit" value="Sign Up" />
      <p>
        You already have an account? Go login <Link to="/login">here</Link>
      </p>
    </form>
  );
};
