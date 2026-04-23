import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://lostfound-backend-m6qq.onrender.com";
function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/api/register`, data);
      alert("Registered!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{width:"350px"}}>
        <h3 className="text-center mb-3">Register 🚀</h3>

        <input className="form-control mb-3"
          placeholder="Name"
          value={data.name}
          onChange={(e)=>setData({...data,name:e.target.value})}
        />

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

        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;