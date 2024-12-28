import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import OurPolicy from '../Components/OurPolicy/OurPolicy'
import ChatPlugin from './ChatPlugin/ChatPlugin'

const Shop = () => {
    return (
        <div>
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections />
            <OurPolicy />
            <ChatPlugin />
        </div>
    )
}

export default Shop