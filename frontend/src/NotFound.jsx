import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#fff", 
      color: "#ff4081",
      flexDirection: "column",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>404 - Page Not Found</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" style={{
        textDecoration: "none",
        backgroundColor: "#ff4081",
        color: "#fff", // Pink text color
        padding: "10px 20px",
        borderRadius: "5px",
        fontSize: "1.2rem",
        fontWeight: "bold"
      }}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
