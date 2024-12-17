import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ closeModal, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === '') return alert('Please Enter Valid Email');
    if (password === '') return alert('Please Fill Password');

    axios
      .post(
        'http://localhost:3001/api/v1/login',
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log('Login successful:', response.data);
        if (response.data.user) {
          alert('Login Successful');
          setUser({ name: response.data.user }); // Set the user data
          closeModal(); // Close the modal after login
        } else {
          alert('User does not exist. Please register.');
          // Redirect to registration page if the user doesn't exist
          // navigate('/userRegistration');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          console.error('Login failed:', error);
          alert('An error occurred during login. Please try again.');
        }
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-xl font-bold">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="flex items-center">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="p-2 text-sm"
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            Login
          </button>
        </form>
        <button
          onClick={closeModal}
          className="w-full p-2 mt-4 bg-gray-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

















// Old Code
// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginModal = ({ closeModal, setUser }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email === '') return alert('Please Enter Valid Email');
//     if (password === '') return alert('Please Fill Password');

//     axios
//       .post(
//         'http://localhost:3001/api/v1/login',
//         { email, password },
//         { withCredentials: true }
//       )
//       .then((response) => {
//         console.log('Login successful:', response.data);
//         alert('Login Successful');
//         setUser({ name: response.data.user }); // Set the user data
//         closeModal(); // Close the modal after login
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 400) {
//           alert(error.response.data.message);
//         } else {
//           console.error('Login failed:', error);
//           alert('An error occurred during login. Please try again.');
//         }
//       });
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow p-6 space-y-4">
//         <h1 className="text-xl font-bold">Sign In</h1>
//         <form onSubmit={handleLogin}>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <div className="flex items-center">
//               <input
//                 type={isPasswordVisible ? 'text' : 'password'}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setIsPasswordVisible(!isPasswordVisible)}
//                 className="p-2 text-sm"
//               >
//                 {isPasswordVisible ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-600 text-white rounded"
//           >
//             Login
//           </button>
//         </form>
//         <button
//           onClick={closeModal}
//           className="w-full p-2 mt-4 bg-gray-600 text-white rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;
