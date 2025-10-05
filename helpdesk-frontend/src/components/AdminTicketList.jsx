import { useEffect, useState } from "react";
import axios from "axios";

function AdminTicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/tickets",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTickets(response.data);
      } catch (error) {
        alert("Error fetching tickets");
      }
    };
    fetchAllTickets();
  }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.description} [{ticket.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminTicketList;
