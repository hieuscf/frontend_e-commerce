import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link, useNavigate } from "react-router-dom";
import TopBar from '../../components/TopBar/TopBar';


const Home = () => {
  return (
    <Link to="/" className='Home'>
      <TopBar />
      <NavBar />
    </Link>
  )
}

export default Home
