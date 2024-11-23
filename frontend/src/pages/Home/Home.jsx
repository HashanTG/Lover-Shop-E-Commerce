import React from 'react'
import Hero from './hero-Section/Hero'
import ShopCollection from './shop-collection/ShopCollection'
import CartIndicatorCard from '../../components/shared/CartIndicator/CartIndicatorCard'

function Home() {
  return (
    <div>
        <Hero />
        <ShopCollection />
        <CartIndicatorCard />
    </div>
  )
}

export default Home