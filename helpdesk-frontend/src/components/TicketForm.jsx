import { useState } from "react";
import axios from "axios";

function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tickets",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ticket created successfully");
      setTitle("");
      setDescription("");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating ticket");
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e)=>setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e)=>setDescription(e.target.value)} 
          required 
        />
        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

export default TicketForm;
