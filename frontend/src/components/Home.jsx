import React from 'react'
import '../app.css'
import ThemeToggle from './ThemeToggle'

const Home = () => {
  return (
    <html class="dark">
    <div className="w-full h-16 text-black bg-white shadow flex items-center px-4 justify-between dark:bg-black dark:text-white">
        
        <div className="text-2xl font-bold mr-8 italic">
          Tweet 
        </div>

        <ul className="ml-3 flex space-x-6 text-lg ">
            <li className="cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black hover:text-green-400">Hello</li>
            <li className="cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black hover:text-green-400">Home</li>
            <li className="cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black hover:text-green-400">Create Tweet</li>
        </ul>

        <div className="w-2/3 flex space-x-6 justify-end">
            <ThemeToggle />
            <button className="button">Login</button>
            <button className="button">Register</button>
        </div>
    </div>
    </html>
    
  )
}

export default Home
