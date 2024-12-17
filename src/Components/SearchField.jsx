import React, { useState } from 'react';
import airports from "../Data/airpots";
import axios from 'axios';
import FlightLists from './FlightLists';

const SearchField = () => {
    const [searchFromTerm, setsearchFromTerm] = useState("");
    const [searchToTerm, setsearchToTerm] = useState("");
    const [fromFilteredAirports, setfromFilteredAirports] = useState([]);
    const [toFilteredAirports, setToFilteredAirports] = useState([]);
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setreturnDate] = useState("");
    const [cabinDetail, setCabinDetail] = useState(false);
    const [travelPersons, setTravelPersons] = useState({ passengers: 0 });
    const [tripType, setTripType] = useState("Return");
    const [flightResults, setFlightResults] = useState([]); // Store flight results
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const apiUrl = `http://localhost:3001/api/v1/flights`;

    function formatDuration(duration) {
        // Regular expression to match hours and minutes
        const regex = /PT(\d+H)?(\d+M)?/;
        const matches = duration.match(regex);
      
        // Extract hours and minutes, if they exist
        const hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
        const minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;
      
        return `${hours} hours ${minutes} minutes`;
      }

    // Handle input change and filter results
    const handleFromSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setsearchFromTerm(value);

        if (value.trim() !== "") {
            const results = airports
                .filter((airport) => {
                    return (
                        airport.country_code.toLowerCase().includes(value) ||
                        airport.region_name.toLowerCase().includes(value) ||
                        airport.airport.toLowerCase().includes(value)
                    );
                })
                .slice(0, 5); // Limit to top 5 results
            setfromFilteredAirports(results);
        } else {
            setfromFilteredAirports([]);
        }
    };
    const handleToSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setsearchToTerm(value);

        if (value.trim() !== "") {
            const results = airports
                .filter((airport) => {
                    return (
                        airport.country_code.toLowerCase().includes(value) ||
                        airport.region_name.toLowerCase().includes(value) ||
                        airport.airport.toLowerCase().includes(value)
                    );
                })
                .slice(0, 5); // Limit to top 5 results
            setToFilteredAirports(results);
        } else {
            setToFilteredAirports([]);
        }
    };
    const decreaseAdult = () => {
        // Prevent Children count from going below 0
        setTravelPersons((prevState) => ({
            ...prevState,
            Adult: Math.max(prevState.Adult - 1, 0),
        }));
    };

    const increaseAdult = () => {
        setTravelPersons((prevState) => ({
            ...prevState,
            passengers: prevState.passengers + 1,
        }));
    };
    const searchFlight = async (e) => {
        e.preventDefault(); // Prevent default form submission



        // Extract and format query parameters
        const depIata = searchFromTerm.split("(")[1]?.replace(")", "").trim()?.toUpperCase();
        const arrIata = searchToTerm.split("(")[1]?.replace(")", "").trim()?.toUpperCase();
        const flightDate = departDate.trim(); // Ensure correct format if required
        const returnDated = returnDate.trim(); // For return date (if applicable)
        const passengers = travelPersons.passengers || 1; // Default to 1 passenger if empty
        // const travelType = travelTypeField || "Economy"; // Default to Economy if empty

        // Validation to ensure required fields are provided
        if (!depIata || !arrIata || !flightDate) {
            alert("Please fill in all the required fields (Departure, Arrival, and Departure Date).");
            return;
        }
        const queryParams = {
            originLocationCode: depIata,
            destinationLocationCode: arrIata,
            departureDate: flightDate,
            adults: passengers,
            max: "5",
        };

        try {
            const response = await axios.post(apiUrl, queryParams);
            const arrData=response.data;
            console.log(arrData.data.data);
            setFlightResults(arrData.data.data);
            
            

            
            // console.log(flightResults);      // Update state with results
        } catch (error) {
            console.error("Failed to fetch flight details:", error);
            alert("An error occurred while fetching flight details.");
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

    return (
        <div>
            <div className="w-full relative bg-no-repeat bg-cover h-[800px] z-0   bg-flight-takeoff">
                <div className="relative top-0 left-0 w-full h-full z-10 bg-black/65 flex items-center justify-center flex-col gap-5  ">
                    <p className='font-blinker text-white font-bold text-6xl '>Take your flights from Anywhere to Everywhere </p>
                    <div className='w-[80vw] p-3'>
                        <form onSubmit={searchFlight}>

                            <div className="bg-[#012a4a] p-6 rounded-lg max-w-5xl mx-auto mt-10">


                                {/* Search Form */}
                                <div className="flex gap-2 flex-wrap bg-[#013a63] p-4 rounded-lg">
                                    {/* From */}

                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">From</label>
                                        <input
                                            type="text"
                                            placeholder="Enter city, country, or airport"
                                            value={searchFromTerm}
                                            onChange={handleFromSearch}
                                            className="w-full p-2 rounded border border-gray-300 text-black"
                                        />

                                        {/* Suggestions */}
                                        {fromFilteredAirports.length > 0 && (
                                            <ul className="bg-white w-[180px] mt-2 rounded shadow-md max-h-48 overflow-auto">
                                                {fromFilteredAirports.map((airport, index) => (
                                                    <li
                                                        key={index}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                                                        onClick={() => { setsearchFromTerm(`${airport.airport} (${airport.iata})`); setfromFilteredAirports([]); }}
                                                    >
                                                        {airport.airport} ({airport.iata}) - {airport.region_name}, {airport.country_code}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>


                                    {/* To */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">From</label>
                                        <input
                                            type="text"
                                            placeholder="Enter city, country, or airport"
                                            value={searchToTerm}
                                            onChange={handleToSearch}
                                            className="w-full p-2 rounded border border-gray-300 text-black"
                                        />
                                        {/* Suggestions */}
                                        {toFilteredAirports.length > 0 && (
                                            <ul className="bg-white w-[180px] mt-2 rounded shadow-md max-h-48 overflow-auto">
                                                {toFilteredAirports.map((airport, index) => (
                                                    <li
                                                        key={index}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                                                        onClick={() => { setsearchToTerm(`${airport.airport} (${airport.iata})`); setToFilteredAirports([]); }}
                                                    >
                                                        {airport.airport} ({airport.iata}) - {airport.region_name}, {airport.country_code}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>


                                    {/* Depart */}
                                    <div >
                                        <label className="block text-white text-sm font-medium mb-2">Depart</label>
                                        <input
                                            type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)}
                                            className="w-full p-2 rounded border border-gray-300 text-black"
                                        />
                                    </div>

                                    {/* Return */}
                                    <div >
                                        <label className="block text-white text-sm font-medium mb-2">Return</label>
                                        <input
                                            type="date" value={returnDate} onChange={(e) => setreturnDate(e.target.value)}
                                            className="w-full p-2 rounded border border-gray-300 text-black"
                                        />
                                    </div>

                                    {/* Travelers and Cabin */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Travellers and cabin class
                                        </label>
                                        <input onClick={() => setCabinDetail(!cabinDetail)}
                                            value={`${travelPersons.passengers} Passengers`}
                                            type="text"
                                            placeholder="1 adult, Economy"
                                            className="w-full p-2 rounded border border-gray-300 text-black"
                                            readOnly
                                        />
                                        {(cabinDetail) && <div className="absolute  bg-white rounded-lg shadow-lg p-6 w-96">
                                            {/* <!-- Cabin className --> */}
                                            <h3 className="text-lg font-semibold mb-4">Cabin className</h3>
                                            <div className="bg-gray-100 text-gray-600 text-sm rounded-lg p-4 mb-6">
                                                We can show only Economy prices for this search.
                                                <br />
                                                To see Business and First className options, please tell us your exact dates and/or destination city.
                                            </div>

                                            {/* <!-- Adults Section --> */}
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <p className="text-sm font-medium">Passengers</p>
                                                    {/* <p className="text-gray-500 text-sm">16+ years</p> */}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button onClick={decreaseAdult}
                                                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                                        type="button"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold text-lg">{travelPersons.passengers}</span>
                                                    <button onClick={increaseAdult}
                                                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                                        type="button"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* <!-- Children Section -->
                                            <div className="flex justify-between items-center mb-6">
                                                <div>
                                                    <p className="text-sm font-medium">Children</p>
                                                    <p className="text-gray-500 text-sm">0–15 years</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button onClick={decreaseChildren}
                                                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                                        type="button"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold text-lg">{travelPersons.Children}</span>
                                                    <button onClick={increaseChildren}
                                                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                                        type="button"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div> */}

                                            {/* <!-- Notes --> */}
                                            <div className="text-gray-500 text-xs mb-4">
                                                Your age at time of travel must be valid for the age category booked. Airlines have restrictions on under 18s
                                                travelling alone.
                                            </div>
                                            {/* <div className="text-gray-500 text-xs">
                                                Age limits and policies for travelling with children may vary so please check with the airline before booking.
                                            </div> */}

                                            {/* <!-- Done Button --> */}
                                            <button onClick={() => setCabinDetail(!cabinDetail)}
                                                className="mt-6 w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-600"
                                                type="button"
                                            >
                                                Done
                                            </button>
                                        </div>}
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="flex justify-end mt-4">
                                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                                        Search
                                    </button>
                                </div>
                            </div>




                        </form>

                    </div>
                </div>
            </div>
            {/* Show loader while fetching */}
            {isLoading && <div className="text-center mt-6">Loading flight details...</div>}

            {/* Display results */}
            <div className="mt-10 p-4">
                {flightResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {flightResults.map((flight, index) => (
                            // old component commented for compatibility
                            // <div
                            //     key={index}
                            //     className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                            // >
                            //     <div>
                            //         <p className="text-lg font-semibold mb-2">
                            //             {flight.itineraries[0].segments[0].departure.iataCode} →{" "}
                            //             {flight.itineraries[0].segments[0].arrival.iataCode}
                            //         </p>
                            //         <p className="text-gray-600">
                            //             Departure:{" "}
                            //             {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()}
                            //         </p>
                            //         <p className="text-gray-600">
                            //             Arrival:{" "}
                            //             {new Date(flight.itineraries[0].segments[0].arrival.at).toLocaleString()}
                            //         </p>
                            //         <p className="text-gray-600">Duration: {formatDuration(flight.itineraries[0].duration)}</p>
                            //     </div>
                            //     <div className="mt-4">
                            //         <p className="text-xl font-bold">₹{(flight.price.total*89.46).toFixed(2)}</p>
                            //         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                            //             Book Now
                            //         </button>
                            //     </div>
                            // </div>
                            <FlightLists flight={flight} index={index} formatDuration={formatDuration} /> 
                        ))}
                    </div>
                ) : (
                    !isLoading && <p className="text-center text-gray-600">No flights found.</p>
                )}
            </div>
        </div>
    )
}

export default SearchField