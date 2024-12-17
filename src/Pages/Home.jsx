import React from 'react'
import LoginButton from '../Components/LoginButton'
import SearchField from '../Components/SearchField'
import { useNavigate } from 'react-router-dom';

const Home = ({user}) => {
  const navigate = useNavigate();
  return (
    <div>
    {/* Search Field */}

    <div>
        <SearchField />
    </div>


    </div>
  )
}

export default Home