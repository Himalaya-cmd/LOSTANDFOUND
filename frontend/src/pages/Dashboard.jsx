import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const API = "https://https://lostfound-backend-m6qq.onrender.com";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    itemName:"", description:"", type:"", location:"", contactInfo:""
  });

  axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/api/items`);
    setItems(res.data);
  };

  useEffect(()=>{ fetchItems(); }, []);

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`${API}/api/items/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(`${API}/api/items`, form);
    }

    setForm({
      itemName:"", description:"", type:"", location:"", contactInfo:""
    });

    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/api/items/${id}`);
    fetchItems();
  };

  const searchItem = async () => {
    const res = await axios.get(`${API}/api/items/search?name=${search}`);
    setItems(res.data);
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">

        {/* ADD / UPDATE */}
        <div className="card shadow p-3 mb-4">
          <h4>{editId ? "Update Item" : "Add Item"}</h4>

          <input className="form-control mb-2"
            placeholder="Item Name"
            value={form.itemName}
            onChange={(e)=>setForm({...form,itemName:e.target.value})}
          />

          <input className="form-control mb-2"
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}
          />

          <input className="form-control mb-2"
            placeholder="Type"
            value={form.type}
            onChange={(e)=>setForm({...form,type:e.target.value})}
          />

          <input className="form-control mb-2"
            placeholder="Location"
            value={form.location}
            onChange={(e)=>setForm({...form,location:e.target.value})}
          />

          <input className="form-control mb-2"
            placeholder="Contact"
            value={form.contactInfo}
            onChange={(e)=>setForm({...form,contactInfo:e.target.value})}
          />

          <button className="btn btn-primary" onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* SEARCH */}
        <div className="d-flex gap-2 mb-3">
          <input className="form-control"
            placeholder="Search..."
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={searchItem}>
            Search
          </button>
        </div>

        {/* ITEMS */}
        <div className="row">
          {items.map(i => (
            <motion.div
              key={i._id}
              className="col-md-4 mb-3"
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
            >
              <div className="card shadow p-3 h-100">
                <h5>{i.itemName}</h5>
                <p>{i.description}</p>
                <p><b>{i.type}</b></p>

                <div className="mt-auto">
                  <button className="btn btn-warning me-2"
                    onClick={()=>{
                      setForm(i);
                      setEditId(i._id);
                    }}>
                    Edit
                  </button>

                  <button className="btn btn-danger"
                    onClick={()=>deleteItem(i._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;