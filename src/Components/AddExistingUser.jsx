import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after success

const AddExistingUser = ({ setTravelerState, flight, user }) => {
  const [customers, setCustomers] = useState([]); // Store customer data
  const [selectedPassengers, setSelectedPassengers] = useState([]); // Store selected passengers
  const navigate = useNavigate(); // Initialize navigation

  // Fetch customers on component mount
  useEffect(() => {
    if (!user) {
      setCustomers([]); // Clear customers when the user is not logged in
      return;
    }

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/customerInfo', { withCredentials: true });
        const transformedCustomers = response.data.map((customer, index) => ({
          id: index + 1, // Add the id (starting from 1)
          ...customer.travelerInfo, // Flatten travelerInfo and include it directly
        }));
        setCustomers(transformedCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
        if (error.response && error.response.status === 401) {
          setCustomers([]); // Clear customers if unauthorized
        }
      }
    };

    fetchCustomers();
  }, [user]);

  // Add passenger to the selected list
  const addPassenger = (customer) => {
    setSelectedPassengers((prevSelected) => {
      const isAlreadySelected = prevSelected.some((passenger) => passenger.documents[0].number === customer.documents[0].number);

      if (isAlreadySelected) {
        return prevSelected; // Do nothing if the passenger is already selected
      }

      const newPassenger = {
        ...customer,
        id: prevSelected.length + 1, // Assign a new ID based on the current length
      };

      return [...prevSelected, newPassenger]; // Add the new passenger to the list
    });
  };

  // Remove passenger by id and adjust remaining IDs
  const removePassenger = (id) => {
    setSelectedPassengers((prevSelected) => {
      const updatedSelected = prevSelected.filter((passenger) => passenger.id !== id);

      return updatedSelected.map((passenger, index) => ({
        ...passenger,
        id: index + 1, // Reassign the ID based on new order
      }));
    });
  };

  const paymentHandler = async () => {
    const paymentData = { amount: 100, currency: 'INR', receipt: 'receiptID' };
    try {
      const paymentResponse = await axios.post('http://localhost:3001/api/v1/payment', paymentData, {
        headers: { 'Content-Type': 'application/json' },
      }, { withCredentials: true });
      console.log('Payment response:', paymentResponse.data.id);
      if (paymentResponse.status === 200) {
        alert('Payment Initialized');
      } else {
        alert('Payment Failed');
      }

      const options = {
        key: import.meta.env.VITE_razorPay_key,
        amount: paymentData.amount,
        currency: 'INR',
        name: 'Testing App Transaction',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: paymentResponse.data.id,
        handler: function (resp) {
          alert(resp.razorpay_payment_id);
          alert(resp.razorpay_order_id);
          alert(resp.razorpay_signature);
        },
        prefill: {
          name: 'Madhavan V',
          email: '13isid4me@gmail.com',
          contact: '9994576279',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (res) {
        alert(res.error.code);
        alert(res.error.description);
        alert(res.error.source);
        alert(res.error.step);
        alert(res.error.reason);
        alert(res.error.metadata.order_id);
        alert(res.error.metadata.payment_id);
      });

      rzp1.open();
    } catch (error) {
      console.log('Payment Error:', error);
    }
  };

  // Handle form submission (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendResponse = { flightOffers: [flight], travelers: selectedPassengers };
      console.log(sendResponse);
      paymentHandler();
      console.log('Logging this...');
      const response = await axios.post('http://localhost:3001/api/v1/placeOrder', sendResponse, { withCredentials: true });
      console.log('Order response:', response.data);

      if (response.status === 200) {
        navigate('/details', { state: { orderDetails: response.data } });
      }
    } catch (error) {
      console.error('Error in placing order:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div onClick={() => setTravelerState(false)} className="text-blue-600 cursor-pointer mb-6">
          <span className="text-lg">Back</span>
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Passengers</h1>

        {/* Dropdown for selecting a customer */}
        <select
          onChange={(e) => {
            const selectedCustomer = customers.find((customer) => customer.id === parseInt(e.target.value));
            if (selectedCustomer) {
              addPassenger(selectedCustomer);
            }
          }}
          className="w-full p-3 border rounded-md mb-6 bg-gray-100 text-gray-700"
        >
          <option value="">Select a Passenger</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name.firstName} {customer.name.lastName} - {customer.dateOfBirth}
            </option>
          ))}
        </select>

        {/* Display selected passengers */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Selected Passengers</h2>
          <ul className="space-y-3">
            {selectedPassengers.map((passenger) => (
              <li key={passenger.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                <span>
                  {passenger.name.firstName} {passenger.name.lastName} - {passenger.dateOfBirth}
                </span>
                <button
                  onClick={() => removePassenger(passenger.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Passengers to Booking
        </button>
      </div>
    </div>
  );
};

export default AddExistingUser;







// Old Code
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation after success

// const AddExistingUser = ({ setTravelerState, flight, user }) => {
//   const [customers, setCustomers] = useState([]); // Store customer data
//   const [selectedPassengers, setSelectedPassengers] = useState([]); // Store selected passengers
//   const navigate = useNavigate(); // Initialize navigation

//   // Fetch customers on component mount
//   useEffect(() => {
//     if (!user) {
//       setCustomers([]); // Clear customers when the user is not logged in
//       return;
//     }

//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/v1/customerInfo', { withCredentials: true });
//         const transformedCustomers = response.data.map((customer, index) => ({
//           id: index + 1, // Add the id (starting from 1)
//           ...customer.travelerInfo, // Flatten travelerInfo and include it directly
//         }));
//         setCustomers(transformedCustomers);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//         if (error.response && error.response.status === 401) {
//           setCustomers([]); // Clear customers if unauthorized
//         }
//       }
//     };

//     fetchCustomers();
//   }, [user]);

//   // Add passenger to the selected list
//   const addPassenger = (customer) => {
//     setSelectedPassengers((prevSelected) => {
//       const isAlreadySelected = prevSelected.some((passenger) => passenger.documents[0].number === customer.documents[0].number);

//       if (isAlreadySelected) {
//         return prevSelected; // Do nothing if the passenger is already selected
//       }

//       const newPassenger = {
//         ...customer,
//         id: prevSelected.length + 1, // Assign a new ID based on the current length
//       };

//       return [...prevSelected, newPassenger]; // Add the new passenger to the list
//     });
//   };

//   // Remove passenger by id and adjust remaining IDs
//   const removePassenger = (id) => {
//     setSelectedPassengers((prevSelected) => {
//       const updatedSelected = prevSelected.filter((passenger) => passenger.id !== id);

//       return updatedSelected.map((passenger, index) => ({
//         ...passenger,
//         id: index + 1, // Reassign the ID based on new order
//       }));
//     });
//   };
//   const paymentHandler =async ()=>{
//     const paymentData={amount:100, currency:"INR", receipt:"receiptID"};
//     try{
//       const paymentResponse = await axios.post('http://localhost:3001/api/v1/payment',paymentData,{headers:{"Content-Type":"application/json"}}, { withCredentials: true });
//       console.log('Payment response:', paymentResponse.data.id);
//       if(paymentResponse.status===200){
//         alert("Payment Initialized");
//       }
//       else{
//         alert("Payment Failed");
//       }
//       // const order = paymentResponse.data;
//       // console.log("Output",order);
//       const  options = {
//         "key": import.meta.env.VITE_razorPay_key, // Enter the Key ID generated from the Dashboard
//         "amount":paymentData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         "currency": "INR",
//         "name": "Testing App Transaction", //your business name
//         "description": "Test Transaction",
//         "image": "https://example.com/your_logo",
//         "order_id": paymentResponse.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "handler": function (resp){
//             alert(resp.razorpay_payment_id);
//             alert(resp.razorpay_order_id);
//             alert(resp.razorpay_signature)
//         },
//         "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
//             "name": "Madhavan V", //your customer's name
//             "email": "13isid4me@gmail.com", //your customer's email 
//             "contact": "9994576279"  //Provide the customer's phone number for better conversion rates 
//         },
//         "notes": {
//             "address": "Razorpay Corporate Office"
//         },
//         "theme": {
//             "color": "#3399cc"
//         }
//     };
//     const  rzp1 = new window.Razorpay(options);
//     rzp1.on('payment.failed', function (res){
//             alert(res.error.code);
//             alert(res.error.description);
//             alert(res.error.source);
//             alert(res.error.step);
//             alert(res.error.reason);
//             alert(res.error.metadata.order_id);
//             alert(res.error.metadata.payment_id);
//     });
//     rzp1.open();
//     // event.preventDefault();

      

//     }
//     catch(error){
//       console.log('Payment Error:', error);
//     }

//   }
//   // Handle form submission (API call)
//   const handleSubmit = async (e) => {
    
//     e.preventDefault();

//     try {
   
//     const sendResponse = { flightOffers: [flight], travelers: selectedPassengers };
//     console.log(sendResponse);
//     paymentHandler();
//     console.log("Logging this...");
//       const response = await axios.post('http://localhost:3001/api/v1/placeOrder', sendResponse, { withCredentials: true });
//       console.log("checking failure..");
      
//       console.log('Order response:', response.data);

//       // Check if the response contains the required data
//       if (response.status === 200) {
//         // Redirect to the details page with order details
        
//         navigate('/details', { state: { orderDetails: response.data } });
//       }
//     } catch (error) {
//       console.error('Error in placing order:', error);
//     }
//   };

//   return (
//     <>
//       <div onClick={() => setTravelerState(false)}>AddExistingUser</div>
//       <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded shadow-lg">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Passengers</h1>

//         {/* Dropdown for selecting a customer */}
//         <select
//           onChange={(e) => {
//             const selectedCustomer = customers.find((customer) => customer.id === parseInt(e.target.value));
//             if (selectedCustomer) {
//               addPassenger(selectedCustomer);
//             }
//           }}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select a Passenger</option>
//           {customers.map((customer) => (
//             <option key={customer.id} value={customer.id}>
//               {customer.name.firstName} {customer.name.lastName} - {customer.dateOfBirth}
//             </option>
//           ))}
//         </select>

//         {/* Display selected passengers */}
//         <div className="mb-6">
//           <h2 className="font-semibold text-gray-800">Selected Passengers</h2>
//           <ul>
//             {selectedPassengers.map((passenger) => (
//               <li key={passenger.id}>
//                 <span>
//                   {passenger.name.firstName} {passenger.name.lastName} - {passenger.dateOfBirth}
//                 </span>
//                 <button
//                   onClick={() => removePassenger(passenger.id)}
//                   className="text-red-500 ml-2"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Submit button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
//         >
//           Add Passengers to Booking
//         </button>
//       </div>
//     </>
//   );
// };

// export default AddExistingUser;
