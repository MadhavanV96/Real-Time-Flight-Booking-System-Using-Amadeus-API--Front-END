import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TicketDetails = () => {
  const { state } = useLocation();
  const { ticketID } = state || {};
  console.log("Ticket : ", ticketID);

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticketID) {
      alert("Ticket ID is missing. Redirecting...");
      return;
    }

    const fetchTicketDetails = async () => {
      try {
        console.log("Fetching Ticket Details");

        // Send ticketID as part of the request body
        const response = await axios.post('http://localhost:3001/api/v1/getTickets', 
          { ticketID }, // Send ticketID in the body as expected by your backend
          { withCredentials: true } // Ensure credentials are included for authentication
        );

        // Set the fetched ticket details to state
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        alert("Failed to fetch ticket details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketID]);

  if (loading) {
    return <div>Loading ticket details...</div>;
  }

  if (!orderDetails) {
    return <div>No ticket details available.</div>;
  }

  const { data } = orderDetails;
  const { travelers, flightOffers, associatedRecords } = data;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-100 rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Flight Ticket Details</h1>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold text-gray-800">Booking Information</h2>
        <p>Booking ID: <span className="font-bold">{data.id}</span></p>
        <p>Reference: <span className="font-bold">{associatedRecords[0]?.reference}</span></p>
        <p>Queuing Office ID: <span className="font-bold">{data.queuingOfficeId}</span></p>
      </div>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold text-gray-800">Traveler Information</h2>
        {travelers.map((traveler) => (
          <div key={traveler.id} className="p-2 bg-gray-50 rounded mb-2">
            <p>Name: <span className="font-bold">{traveler.name.firstName} {traveler.name.lastName}</span></p>
            <p>Date of Birth: <span className="font-bold">{traveler.dateOfBirth}</span></p>
            <p>Gender: <span className="font-bold">{traveler.gender}</span></p>
            <p>Document: <span className="font-bold">{traveler.documents[0]?.number} ({traveler.documents[0]?.documentType})</span></p>
            <p>Contact: <span className="font-bold">{traveler.contact?.phones[0]?.countryCallingCode}-{traveler.contact?.phones[0]?.number}</span></p>
            <p>Email: <span className="font-bold">{traveler.contact?.emailAddress}</span></p>
          </div>
        ))}
      </div>

      {flightOffers.map((offer, idx) => (
        <div key={offer.id} className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800">Flight Offer {idx + 1}</h2>
          <p>Airline: <span className="font-bold">{offer.validatingAirlineCodes?.join(', ')}</span></p>
          <p>Last Ticketing Date: <span className="font-bold">{offer.lastTicketingDate}</span></p>
          <p>Total Price: <span className="font-bold">{offer.price.currency} {offer.price.grandTotal}</span></p>

          <div className="mt-4">
            {offer.itineraries.map((itinerary, itineraryIdx) => (
              <div key={itineraryIdx} className="p-4 bg-gray-50 rounded mb-4">
                <h3 className="text-md font-semibold text-gray-700">Itinerary {itineraryIdx + 1}</h3>
                {itinerary.segments.map((segment, segmentIdx) => (
                  <div key={segmentIdx} className="p-2">
                    <p>Segment {segmentIdx + 1}:</p>
                    <p>
                      Departure: <span className="font-bold">{segment.departure.iataCode}</span> at <span className="font-bold">{segment.departure.at}</span>
                    </p>
                    <p>
                      Arrival: <span className="font-bold">{segment.arrival.iataCode}</span> at <span className="font-bold">{segment.arrival.at}</span>
                    </p>
                    <p>Flight: <span className="font-bold">{segment.carrierCode} {segment.number}</span></p>
                    <p>Duration: <span className="font-bold">{segment.duration}</span></p>
                    <p>Aircraft: <span className="font-bold">{segment.aircraft.code}</span></p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold text-gray-800">Remarks</h2>
        {data.remarks.general.map((remark, idx) => (
          <p key={idx} className="text-gray-700">{remark.text}</p>
        ))}
      </div>
    </div>
  );
};

export default TicketDetails;
