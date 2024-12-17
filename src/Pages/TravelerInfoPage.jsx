import React, { useState } from 'react';
import AddExistingUser from '../Components/AddExistingUser';
import CreateNewUser from '../Components/CreateNewUser';
import { useLocation } from 'react-router-dom';

const TravelerInfoPage = ({ user }) => {
  const [travelerState, setTravelerState] = useState(true);
  const location = useLocation();

  const { flight } = location.state || {};

  const toggleTravelerInfo = () => {
    setTravelerState(!travelerState);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Traveler Information
        </h1>

        {/* Toggle buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={toggleTravelerInfo}
            className={`py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ${
              travelerState
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            } hover:bg-blue-600 focus:outline-none`}
          >
            Existing User
          </button>
          <button
            onClick={toggleTravelerInfo}
            className={`py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ${
              !travelerState
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            } hover:bg-blue-600 focus:outline-none`}
          >
            New User
          </button>
        </div>

        {/* Render the appropriate component based on the travelerState */}
        {travelerState ? (
          <AddExistingUser
            flight={flight}
            user={user}
            travelerState={travelerState}
            setTravelerState={setTravelerState}
          />
        ) : (
          <CreateNewUser
            travelerState={travelerState}
            setTravelerState={setTravelerState}
          />
        )}
      </div>
    </div>
  );
};

export default TravelerInfoPage;








// Old Code
// import React, { useState } from 'react'
// import AddExistingUser from '../Components/AddExistingUser';
// import CreateNewUser from '../Components/CreateNewUser';
// import { useLocation } from 'react-router-dom';





// const TravelerInfoPage = ({user}) => {
//     const [travelerState, setTravelerState] = useState(true);
//     const location = useLocation();
    

//     const { flight } = location.state || {};
//     // console.log(flight);
    
//     const toggleTravelerInfo = () => {
//         setTravelerState(!travelerState);
//     }
//   return (
//     <>
//     <div> TravelerInfoPage </div>
//     {travelerState ? (<AddExistingUser flight={flight}  user={user}  travelerState={travelerState} setTravelerState={setTravelerState} />):(<CreateNewUser travelerState={travelerState} setTravelerState={setTravelerState} />)}
//     </>
//   )
// }

// export default TravelerInfoPage