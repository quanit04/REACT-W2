import React from 'react'
import Header from '../Header'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex justify-around p-20">
        <div className="flex flex-col items-center">
          <NavLink to="/weather" className="text-center">
            <img
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="wta"
              className="w-80 h-80 object-cover"
            />
            <h4 className="text-3xl font-semibold mt-6">Weather App</h4>
          </NavLink>
        </div>
        <div className="flex flex-col items-center">
          <NavLink to="/worklist" className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8344/8344893.png"
              alt="wla"
              className="w-80 h-80 object-cover"
            />
            <h4 className="text-3xl font-semibold mt-6">Worklist App</h4>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Home
