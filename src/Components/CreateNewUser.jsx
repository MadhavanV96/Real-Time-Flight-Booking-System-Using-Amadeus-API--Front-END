import React, { useState } from 'react'
import CallingCode from '../Data/countryCallingCode'
import Countrycode from "../Data/Countrycode";
import axios from 'axios';

const CreateNewUser = ({ setTravelerState }) => {
  const [dialCode, setDialCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countryInput, setCountryInput] = useState('');

  const [travelerInfo, setTravelerInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    Contact_email: "",
    countryCallingCode: "",
    Contact_no: "",
    birthPlace: "",
    issuanceLocation: "",
    issuanceDate: "",
    PP_No: "",
    expiryDate: "",
    issuanceCountry: "",
    validityCountry: "",
    nationality: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(travelerInfo);

    try {
      const response = await axios.post(
        'https://real-time-flight-booking-system-using.onrender.com/api/v1/customer-register',
        {...travelerInfo},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error with the submission:', error.response || error);
    }
  };

  const handleTravelerChange = (field, value) => {
    setTravelerInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Traveler Information</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-4">Personal Details</p>
            {/* First Name */}
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={travelerInfo.firstName}
                onChange={(e) => handleTravelerChange('firstName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={travelerInfo.lastName}
                onChange={(e) => handleTravelerChange('lastName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={travelerInfo.dateOfBirth}
                onChange={(e) => handleTravelerChange('dateOfBirth', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Gender */}
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                value={travelerInfo.gender}
                onChange={(e) => handleTravelerChange('gender', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-4">Contact Information</p>
            {/* Email Address */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                value={travelerInfo.Contact_email}
                onChange={(e) => handleTravelerChange('Contact_email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Number with Country Code */}
            <div className="mt-4">
              <label htmlFor="countryCallingCode" className="block text-sm font-medium text-gray-700 mb-1">
                Country Code
              </label>
              <select
                id="countryCallingCode"
                value={travelerInfo.countryCallingCode}
                onChange={(e) => {
                  const value = e.target.value.replace("+", "");
                  setDialCode(value);
                  handleTravelerChange("countryCallingCode", value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{dialCode}</option>
                {CallingCode.map((country) => (
                  <option key={country.code} value={country.dial_code}>
                    {country.name} ({country.dial_code})
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div className="mt-4">
              <label htmlFor="Contact_no" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="Contact_no"
                type="text"
                value={travelerInfo.Contact_no}
                onChange={(e) => handleTravelerChange("Contact_no", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          {/* Passport Details */}
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-4">Passport Details</p>
            {/* Passport Number */}
            <div>
              <label className="block text-gray-700">Passport Number</label>
              <input
                type="text"
                value={travelerInfo.PP_No}
                onChange={(e) => handleTravelerChange('PP_No', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Place of Birth */}
            <div>
              <label className="block text-gray-700">Place of Birth</label>
              <input
                type="text"
                value={travelerInfo.birthPlace}
                onChange={(e) => handleTravelerChange('birthPlace', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Issuance Location */}
            <div>
              <label className="block text-gray-700">Issuance Location</label>
              <input
                type="text"
                value={travelerInfo.issuanceLocation}
                onChange={(e) => handleTravelerChange('issuanceLocation', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Issuance Date */}
            <div>
              <label className="block text-gray-700">Date of Issue</label>
              <input
                type="date"
                value={travelerInfo.issuanceDate}
                onChange={(e) => handleTravelerChange('issuanceDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Expiry Date */}
            <div>
              <label className="block text-gray-700">Date of Expiry</label>
              <input
                type="date"
                value={travelerInfo.expiryDate}
                onChange={(e) => handleTravelerChange('expiryDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Country Dropdowns */}
          <div>
            <label htmlFor="issuanceCountry" className="block text-sm font-medium text-gray-700 mb-1">Issuance Country</label>
            <select
              id="issuanceCountry"
              value={travelerInfo.issuanceCountry}
              onChange={(e) => handleTravelerChange("issuanceCountry", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a country</option>
              {Countrycode.map((country) => (
                <option key={country["alpha-2"]} value={country["alpha-2"]}>
                  {country.name} ({country["alpha-2"]})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;



// Old Code 
// 
// import React, { useState } from 'react'
// import CallingCode from '../Data/countryCallingCode'
// import Countrycode from "../Data/Countrycode";
// import axios from 'axios';


// const CreateNewUser = ({ setTravelerState }) => {
//   const [dialCode, setDialCode] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [countryInput, setCountryInput] = useState('');

 
//   const [travelerInfo, setTravelerInfo] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     gender: "",
//     Contact_email: "",
//     countryCallingCode: "",
//     Contact_no: "",
//     birthPlace: "",
//     issuanceLocation: "",
//     issuanceDate: "",
//     PP_No: "",
//     expiryDate: "",
//     issuanceCountry: "",
//     validityCountry: "",
//     nationality: ""
//   })

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(travelerInfo);
    
  
//     try {
//       const response = await axios.post(
//         'http://localhost:3001/api/v1/customer-register',
//          {...travelerInfo} , // Send travelerInfo in the request body
//         {
//           withCredentials: true, // Ensure cookies are included in the request
//           headers: {
//             'Content-Type': 'application/json', // Specify that we are sending JSON
//           },
//         }
//       );
  
//       console.log('Response:', response.data); // Handle success response
  
//       // Reset the form or do something else after successful submission
//     } catch (error) {
//       console.error('There was an error with the submission:', error.response || error);
//     }
//   };




//   const handleTravelerChange = (field, value) => {
//     setTravelerInfo((prevState) => ({
//       ...prevState, // Keep all other fields unchanged
//       [field]: value, // Update the specific field with the new value
//     }));
//   };






//   return (
//     <div >
//       <div onClick={() => { setTravelerState(true) }}> Change Button </div>
//       <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded shadow-lg">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Traveler Information</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <p className="text-xl font-bold text-center text-gray-800 mb-2">Personal Details</p>
//           {/* First Name */}
//           <div>
//             <label className="block text-gray-700">First Name</label>
//             <input
//               type="text"
//               value={travelerInfo.firstname}
//               onChange={(e) => handleTravelerChange('firstname', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* Last Name */}
//           <div>
//             <label className="block text-gray-700">Last Name</label>
//             <input
//               type="text"
//               value={travelerInfo.lastname}
//               onChange={(e) => handleTravelerChange('lastname', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* Date of Birth */}
//           <div>
//             <label className="block text-gray-700">Date of Birth</label>
//             <input
//               type="date"
//               value={travelerInfo.dateOfBirth}
//               onChange={(e) => handleTravelerChange('dateOfBirth', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* Gender */}
//           <div>
//             <label className="block text-gray-700">Gender</label>
//             <select
//               value={travelerInfo.gender}
//               onChange={(e) => handleTravelerChange('gender', e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//             </select>
//           </div>
//           {/* Contact Information */}
//           <h4 className="font-semibold text-gray-800 mt-4">Contact Information</h4>
//           <div>
//             <label className="block text-gray-700">Email Address</label>
//             <input
//               type="email"
//               value={travelerInfo.Contact_email}
//               onChange={(e) =>
//                 handleTravelerChange('Contact_email', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* Phone Number with Country Code */}
//           {/* Phone Number Section */}
//           <div className="mb-6">
//             <h4 className="font-semibold text-gray-800 mb-4">Mobile Number</h4>
//             {/* Country Dropdown */}
//             <div className="mb-4">
//               <label
//                 htmlFor="countryCallingCode"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Country Code
//               </label>
//               <select
//                 id="countryCallingCode"
//                 value={travelerInfo.countryCallingCode}
//                 onChange={(e) => {
//                   const value = e.target.value.replace("+", "");
//                   setDialCode(value)
//                   console.log("Selected Value:", value);
//                   handleTravelerChange("countryCallingCode", value);
//                   console.log("Updated State:", travelerInfo);
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >  <option value="">{dialCode}</option>
//                 {CallingCode.map((country) => (
//                   <option key={country.code} value={country.dial_code}>
//                     {country.name} ({country.dial_code})
//                   </option>
//                 ))}
//               </select>
//             </div>


//             {/* Phone Number Input */}
//             <div className="mb-4">
//               <label
//                 htmlFor="Contact_no"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Phone Number
//               </label>
//               <input
//                 id="Contact_no"
//                 type="text"
//                 value={travelerInfo.Contact_no}
//                 onChange={(e) =>
//                   handleTravelerChange("Contact_no", e.target.value)
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter mobile number"
//               />
//             </div>
//           </div>


//           <p className="text-xl font-bold text-center text-gray-800 mb-2">Passport Details</p>
//           {/* PP_No */}
//           <div>
//             <label className="block text-gray-700">Passport Number </label>
//             <input
//               type="text"
//               value={travelerInfo.PP_No}
//               onChange={(e) => handleTravelerChange('PP_No', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* Place of Birth */}
//           <div>
//             <label className="block text-gray-700">Place of Birth</label>
//             <input
//               type="text"
//               value={travelerInfo.birthPlace}
//               onChange={(e) => handleTravelerChange('birthPlace', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* issuanceLocation */}
//           <div>
//             <label className="block text-gray-700">Issuance Location</label>
//             <input
//               type="text"
//               value={travelerInfo.issuanceLocation}
//               onChange={(e) => handleTravelerChange('issuanceLocation', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* issuanceDate */}
//           <div>
//             <label className="block text-gray-700">Date of Issue</label>
//             <input
//               type="date"
//               value={travelerInfo.issuanceDate}
//               onChange={(e) => handleTravelerChange('issuanceDate', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* expiryDate */}
//           <div>
//             <label className="block text-gray-700">Date of Expiry</label>
//             <input
//               type="date"
//               value={travelerInfo.expiryDate}
//               onChange={(e) => handleTravelerChange('expiryDate', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {/* issuanceCountry */}
//           {/* Issuance Country Dropdown */}
//           <div className="mb-6">
//             <label
//               htmlFor="issuanceCountry"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Issuance Country
//             </label>
//             <select
//               id="issuanceCountry"
//               value={travelerInfo.issuanceCountry}
//               onChange={(e) =>
//                 handleTravelerChange("issuanceCountry", e.target.value)
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select a country</option>
//               {Countrycode.map((country) => (
//                 <option key={country["alpha-2"]} value={country["alpha-2"]}>
//                   {country.name} ({country["alpha-2"]})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Validity Country Dropdown */}
//           <div className="mb-6">
//             <label
//               htmlFor="validityCountry"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Validity Country
//             </label>
//             <select
//               id="validityCountry"
//               value={travelerInfo.validityCountry}
//               onChange={(e) =>
//                 handleTravelerChange("validityCountry", e.target.value)
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select a country</option>
//               {Countrycode.map((country) => (
//                 <option key={country["alpha-2"]} value={country["alpha-2"]}>
//                   {country.name} ({country["alpha-2"]})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Nationality Dropdown */}
//           <div className="mb-6">
//             <label
//               htmlFor="nationality"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Nationality
//             </label>
//             <select
//               id="nationality"
//               value={travelerInfo.nationality}
//               onChange={(e) =>
//                 handleTravelerChange("nationality", e.target.value)
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select a country</option>
//               {Countrycode.map((country) => (
//                 <option key={country["alpha-2"]} value={country["alpha-2"]}>
//                   {country.name} ({country["alpha-2"]})
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
//           >
//             Submit Booking
//           </button>











//         </form>


//       </div>
//     </div>
//   )
// }

// export default CreateNewUser





