import React from 'react'
import Informations from './Informations'
import Footer from './Footer'


const Main = (props) => {
  return (
    <section className="relative py-16 bg-blueGray-200">
        <Informations  />
        <Footer />
    </section>
  )
}

export default Main