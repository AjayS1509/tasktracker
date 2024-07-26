import React from 'react'

const Footer = () => {
  return (
<footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 w-full items-center text-center">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023{" "} 
        <a href="https://portfolio-ajaysoni.vercel.app" className="hover:underline">Ajay Soni.</a>{" "}
        All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 justify-center">
        <li>
            <a href="https://portfolio-ajaysoni.vercel.app" className="hover:underline me-4 md:me-6">Portfolio</a>
        </li>
        <li>
            <a href="https://github.com/AjayS1509" className="hover:underline me-4 md:me-6">GitHub</a>
        </li>
        <li>
            <a href="https://www.linkedin.com/in/ajaypsoni" className="hover:underline me-4 md:me-6">Linkedin</a>
        </li>
        <li>
            <a href="mailto:ajaypsoni1509@gmail.com" className="hover:underline me-4 md:me-6">Contact</a>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer