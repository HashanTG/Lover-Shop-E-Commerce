import React from 'react'
import Hero from './hero-Section/Hero'
import ShopCollection from './shop-collection/ShopCollection'
import Contact from './contact-Section/contact';
import Information from './Info-Section/info';
import NewArrivals from './NewArivals-Section/NewArrivals';



function Home() {
  return (
    <div>
        <Hero />
        <NewArrivals />
        <ShopCollection />
        <Information />
        <Contact />
        
        
        
    </div>
  )
}

export default Home