import React, { useEffect } from 'react'
import Hero from './hero-Section/Hero'
import ShopCollection from './shop-collection/ShopCollection'
import Contact from './contact-Section/contact';
import Information from './Info-Section/info';
import NewArrivals from './NewArivals-Section/NewArrivals';
import './home.css'
import { useAuth } from '../../context/AuthContext';
import HomeBackground from '../../components/heroBackground/HeroBackground';




function Home() {
  const { isAuthenticated } = useAuth(); // Destructure isAuthenticated from useAuth()

  useEffect(() => {
    console.log(`auth Status ${isAuthenticated}`); // Log the authentication status when the component mounts
  }, [isAuthenticated]); // Dependency array should watch isAuthenticated

  return (
    <div className='home'>
        <HomeBackground />
        <Hero />
        <NewArrivals />
        <ShopCollection />
        <Information />
        <Contact />
        
    </div>
  )
}

export default Home