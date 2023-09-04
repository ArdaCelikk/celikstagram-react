import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                        Made with <Link to="https://www.react.dev" className="text-blueGray-500 hover:text-gray-800">React JS</Link> by <Link to="https://www.ardacelik.com" className="text-blueGray-500 hover:text-blueGray-800" > Arda Çelik</Link>.
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer