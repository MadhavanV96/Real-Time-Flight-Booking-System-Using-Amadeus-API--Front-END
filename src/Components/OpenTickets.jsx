import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OpenTickets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the user's tickets when the component mounts
  useEffect(() => {
    if (!user) {
      alert("You need to be logged in to view your tickets.");
      navigate('/'); // Redirect to the homepage or login if the user is not logged in
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/tickets', {
          withCredentials: true,
        });
        setTickets(response.data.tickets || []);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
        alert("Failed to fetch tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, navigate]);

  if (!user) {
    alert("You need to be logged in to view your tickets.");
    navigate('/'); // Redirect to login or homepage
    return null;
  }

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading tickets...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Booked Tickets</h1>
        
        {tickets.length > 0 ? (
          <ul className="space-y-6">
            {tickets.map((ticket) => (
              <li key={ticket.flightId} className="p-6 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition duration-300">
                <div
                  onClick={() => {
                    navigate('/ticket-details', {
                      state: { ticketID: ticket.flightId },
                    });
                  }}
                  className="space-y-2"
                >
                  <p className="text-lg font-medium text-gray-800">
                    <span className="font-bold text-indigo-600">Ticket ID:</span> {ticket.flightId}
                  </p>
                  {/* Optionally, display other ticket details like booking date */}
                  {/* <p className="text-sm text-gray-600">
                    <span className="font-bold">Booking Date:</span> {new Date(ticket.bookingDate).toLocaleDateString()}
                  </p> */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">You have no booked tickets.</p>
        )}
      </div>
    </div>
  );
};

export default OpenTickets;


























// Old Code
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const OpenTickets = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = location.state || {};
  
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch the user's tickets when the component mounts
//   useEffect(() => {
//     if (!user) {
//       alert("You need to be logged in to view your tickets.");
//       navigate('/'); // Redirect to the homepage or login if the user is not logged in
//       return;
//     }


//     const fetchTickets = async () => {
//         try {
//           const response = await axios.get('http://localhost:3001/api/v1/tickets', {
//             withCredentials: true,
//           });
//           setTickets(response.data.tickets || []);
//         } catch (error) {
//           console.error("Failed to fetch tickets:", error);
//           alert("Failed to fetch tickets. Please try again later.");
//         } finally {
//           setLoading(false);
//         }
//       };

//     fetchTickets();
//   }, [user, navigate]);
//   if (!user) {
//     alert("You need to be logged in to view your tickets.");
//     navigate('/'); // Redirect to login or homepage
//     return null;
//   }
  

//   if (loading) {
//     return <div>Loading tickets...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-100 rounded shadow-lg">
//       <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Booked Tickets</h1>
//       {tickets.length > 0 ? (
//         <ul className="space-y-4">
//           {tickets.map((ticket) => (
//             <li key={ticket.flightId} className="p-4 bg-white rounded shadow">
//              <p
//                 onClick={() => {
//                   navigate('/ticket-details', {
//                     state: { ticketID: ticket.flightId },
//                   });
//                 }}
//               >
//                 <span className="font-bold">Ticket ID:</span> {ticket.flightId}
//               </p>
//               {/* <p>
//                 <span className="font-bold">Booking Date:</span>
//                  {new Date(ticket.bookingDate).toLocaleDateString()}
//               </p> */}
//               {/* Add more ticket details as needed */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-600">You have no booked tickets.</p>
//       )}
//     </div>
//   );
// };

// export default OpenTickets;
