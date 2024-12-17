// import React from 'react'
// import Home from './Pages/Home'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import TicketBookingPage from './Pages/TicketBookingPage'
// import NavigationBar from './Components/NavigationBar'
// import LoginPage from './Pages/LoginPage'
// import TravelerInfoPage from './Pages/TravelerInfoPage'
// const App = () => {
//   // const myName=import.meta.env.VITE_MYNAME
//   return (
//     <div>
//       <Router>
//         <NavigationBar />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/Ticket-Booking-Page' element={<TicketBookingPage />} />
//           <Route path='/Traveler-Registration' element={<TravelerInfoPage />} />
//           <Route path='/login' element={<LoginPage />} />
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App

// Login Changed Code

import React, { useState } from 'react';
import Home from './Pages/Home';
import TicketBookingPage from './Pages/TicketBookingPage';
import TravelerInfoPage from './Pages/TravelerInfoPage';
import LoginModal from './Components/LoginModal';
import NavigationBar from './Components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './Pages/Details';
import OpenTickets from './Components/OpenTickets';
import TicketDetails from './Components/TicketDetails';
import RegistrationForm from './Pages/RegistrationForm';

const App = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [user, setUser] = useState(null); // Store user info here

  const handleLogout = () => {
    // Clear user state and optionally clear cookies/session
    setUser(null);
    alert('You have been logged out.');
  };

  return (
    <div>
      <Router>
        <NavigationBar 
          toggleLoginModal={() => setIsLoginModalVisible(!isLoginModalVisible)} 
          user={user} 
          onLogout={handleLogout} // Pass the logout handler to NavigationBar
        />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/Ticket-Booking-Page" element={<TicketBookingPage user={user} />} />
          <Route path="/Traveler-Registration" element={<TravelerInfoPage user={user} />} />
          {/* <Route path="/details" element={<TravelerInfoPage user={user} />} /> */}
          <Route path="/details" element={<Details user={user} />} />
          <Route path='/Tickets' element={<OpenTickets user={user} />} />
          <Route path='/ticket-details' element={<TicketDetails user={user} />} />
          <Route path='/userRegistration' element={<RegistrationForm />} />
        </Routes>
      </Router>
      {isLoginModalVisible && (
        <LoginModal 
          closeModal={() => setIsLoginModalVisible(false)} 
          setUser={(user) => setUser({ ...user, id: user._id })}
        />
      )}
      

    </div>
  );
};

export default App;
