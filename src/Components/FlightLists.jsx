import React from 'react'
import { useNavigate } from 'react-router-dom';
import airports from '../Data/airpots';

const FlightLists = ({flight, index,formatDuration}) => {
  const navigate = useNavigate();
  const LocationData=(iataCode)=>{
        
    const airportData = airports.find((airport) => airport.iata === iataCode);
    if (airportData) {
        return `${airportData.airport}`;
    } else {
        return 'Unknown Location';
    }

}
  return (
    <div
      key={index}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
    >
      <div>
        <p className="text-lg font-semibold mb-2">
          {LocationData(flight.itineraries[0].segments[0].departure.iataCode)} →{" "}
          {LocationData(flight.itineraries[0].segments[flight.itineraries[0].segments.length-1].arrival.iataCode)}
        </p>
        <p className="text-gray-600">
          Departure:{" "}
          {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()}
        </p>
        <p className="text-gray-600">
          Arrival:{" "}
          {new Date(flight.itineraries[0].segments[0].arrival.at).toLocaleString()}
        </p>
        <p className="text-gray-600">Duration: {formatDuration(flight.itineraries[0].duration)}</p>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">₹{(flight.price.total * 89.46).toFixed(2)}</p>
        <button onClick={()=>{navigate('/Ticket-Booking-Page',{ state: { flight} });}} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Book Now
        </button>
      </div>
    </div>
  )
}

export default FlightLists