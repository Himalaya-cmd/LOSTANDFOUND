import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://https://lostfound-backend-m6qq.onrender.com";

function Login() {
  const [data, setData] = useState({ email:"", password:"" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/login`, data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{width:"350px"}}>
        <h3 className="text-center mb-3">Login 👋</h3>

        <input className="form-control mb-3"
          placeholder="Email"
          value={data.email}
          onChange={(e)=>setData({...data,email:e.target.value})}
        />

        <input className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e)=>setData({...data,password:e.target.value})}
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center mt-2">
          <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;