import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LoginButton from '../Components/LoginButton';
import airports from "../Data/airpots";

const TicketBookingPage = ({user}) => {
    const location = useLocation();
    const { flight } = location.state || {};
    const navigate = useNavigate();
    function formatDuration(duration) {
        // Regular expression to match hours and minutes
        const regex = /PT(\d+H)?(\d+M)?/;
        const matches = duration.match(regex);

        // Extract hours and minutes, if they exist
        const hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
        const minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;

        return `${hours} hours ${minutes} minutes`;
    }

    console.log(flight);

    const LocationData=(iataCode)=>{
        
        const airportData = airports.find((airport) => airport.iata === iataCode);
        if (airportData) {
            return `${airportData.airport}, ${airportData.region_name}`;
        } else {
            return 'Unknown Location';
        }

    }




    if (!flight) {
        return (
            <>
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <h2 className="text-2xl font-bold text-red-600">
                        No flight details available.
                    </h2>
                </div>
            </>

        );
    }

    return (
        <>
           
            <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Flight Details
                </h1>

                <div className="space-y-4">
                    <p>
                        <span className="font-semibold text-gray-700">Flight ID:</span> {flight.id}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-700">Last Ticketing Date:</span> {flight.lastTicketingDate}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-700">Bookable Seats:</span> {flight.numberOfBookableSeats}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-700">Price:</span> ₹ {(flight.price.total * 89.46).toFixed(2)}
                    </p>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Itineraries</h2>
                {flight.itineraries.map((itinerary, index) => (
                    <div
                        key={index}
                        className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                        <p>
                            <span className="font-semibold text-gray-700">Duration:</span>{formatDuration(itinerary.duration)}
                        </p>

                        <h3 className="text-lg font-semibold text-gray-700 mt-4">Segments:</h3>
                        {itinerary.segments.map((segment, idx) => (
                            <div key={idx} className="p-2 border-t border-gray-200">
                                <p>
                                    <span className="font-semibold text-gray-700">Carrier Code:</span> {segment.carrierCode}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Aircraft Code:</span> {segment.aircraft.code}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Departure:</span> {LocationData(segment.departure.iataCode)}, Terminal {segment.departure.terminal} at {segment.departure.at}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Arrival:</span> {LocationData(segment.arrival.iataCode)}, Terminal {segment.arrival.terminal} at {segment.arrival.at}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Duration:</span> {formatDuration(segment.duration)}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="flex justify-center mt-6">
                    <button onClick={()=>navigate('/Traveler-Registration',{ state: { flight} } )} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                        Book Your Tickets
                    </button>
                </div>
            </div>

        </>

    );
};


export default TicketBookingPage