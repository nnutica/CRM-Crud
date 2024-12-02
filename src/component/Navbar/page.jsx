import React from 'react'
import '../Navbar/component.css'
import Link from 'next/link'

function Navbar() {
    return (

        <nav className="bg-gray-900 border-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                    CRM-Customer Relation Management
                </span>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-800 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-400 md:p-0" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0">About</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar