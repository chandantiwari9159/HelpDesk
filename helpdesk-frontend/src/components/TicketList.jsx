import { useEffect, useState } from "react";
import axios from "axios";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tickets",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTickets(response.data);
      } catch (error) {
        alert("Error fetching tickets");
      }
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Your Tickets</h2>
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

export default TicketList;
