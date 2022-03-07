import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";

export const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  const handleProducts = async () => {
    const resp = await axios.post(
      "http://localhost:4000/products/add",
      {
        product_id: 343124124,
      },
      { withCredentials: true }
    );
    setResult(resp.data);
  };

  const logoutHandler = async () => {
    setIsAuthenticated(false);
    const resp = await axios.get("http://localhost:4000/users/logout", {
      withCredentials: true,
    });
    setResult(resp.data);
  };

  useEffect(() => {
    let variable = true;
    if (!isAuthenticated) navigate("/login");
    return () => (variable = false);
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Home</h1>
      {result?.msg && <h2>{result.msg}</h2>}

      <h3>This is a page that is available only for authenticated users</h3>
      <button style={styles.submit} onClick={logoutHandler}>
        Logout
      </button>
      <button style={styles.submit} onClick={handleProducts}>
        Product!
      </button>
    </div>
  );
};
