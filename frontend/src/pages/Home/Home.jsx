import React from 'react'
import Hero from './hero-Section/Hero'
import ShopCollection from './shop-collection/ShopCollection'
import Contact from './contact-Section/contact';
import Information from './Info-Section/info';



function Home() {
  return (
    <div>
        <Hero />
        <ShopCollection />
        <Information />
        <Contact />
        
        
    </div>
  )
}

export default Home