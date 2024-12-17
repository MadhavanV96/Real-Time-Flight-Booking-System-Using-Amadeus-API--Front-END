// import React from 'react'
// import LoginButton from './LoginButton';
// import { useNavigate } from 'react-router-dom';



// const NavigationBar = () => {
//   const navigate = useNavigate();
//   return (
//     <div className='bg-[#014085] p-[32px] font-oxygen flex justify-between text-white font-extrabold'>
//     <p className='cursor-pointer' onClick={()=>{navigate('/')}}> BookYourTicket.com </p>
//     <LoginButton />
//     </div>
//   )
// }

// export default NavigationBar


// New NavigationBar
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ toggleLoginModal, user, onLogout }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#014085] p-[32px] font-oxygen flex justify-between items-center text-white font-extrabold">
      <p className="cursor-pointer" onClick={()=>{navigate('/')}}>
        BookYourTicket.com
      </p>
      {
        user ? (
          <div
          className="cursor-pointer hover:underline"
          onClick={() => {
            navigate('/Tickets', { state: { user } });
          }}
        >
          Booked Tickets
        </div>
        
        ):(<> </>)
      }



      {user ? (
        <div className="flex items-center">
          <p className="mr-4">Welcome, {user.name}</p>
          <button
            className="text-white font-bold bg-red-500 px-4 py-2 rounded"
            onClick={onLogout} // Trigger logout when clicked
          >
            Logout
          </button>
        </div>
      ) : (
        <div >
        <button 
          className="text-white font-bold bg-blue-600 mx-4 px-4 py-2 rounded"
          onClick={toggleLoginModal}
        >
          Login
        </button>
        <button
          className="text-white font-bold bg-blue-600 px-4 py-2 rounded"
          onClick={()=>{navigate('/userRegistration')}}
        >
          Register (New User)
        </button>
        </div>
        
        
      )}
    </div>
  );
};

export default NavigationBar;


