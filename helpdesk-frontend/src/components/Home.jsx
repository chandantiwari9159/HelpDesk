import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Help Desk</h1>
      <p>Please choose an option:</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/register">
          <button style={{ marginRight: "10px", padding: "10px 20px" }}>Register</button>
        </Link>
        <Link to="/login">
          <button style={{ padding: "10px 20px" }}>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
