import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "./../../public/logo_saylaniwelfare.22bf709605809177256c.png";

function Navbar() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuleft, setIsMenuleft] = useState(false);
    const navigator = useNavigate();

    const toggleMenu = () => {
        setIsMenuVisible((prevState) => !prevState);
    };

    const toggleMenuleft = () => {
        setIsMenuleft((prevState) => !prevState);
    };

    const logoclick = () => {
        navigator("/");
    };

    return (
        <>
            <nav className="bg-white p-3 shadow-lg">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Mobile Menu Button */}
                        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                            <button
                                onClick={toggleMenuleft}
                                type="button"
                                className=" relative inline-flex items-center justify-center text-black  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset "
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Logo */}
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={logoclick}
                            className="flex flex-shrink-0 items-center"
                        >
                            <img
                                className="h-14 w-auto"
                                src={image}
                                alt="Saylani Welfare Logo"
                                border="0"
                            />
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden sm:flex space-x-6">
                            <Link
                                to="/dashboard"
                                className="text-gray-800 hover:text-green-400 dark:text-gray-300 dark:hover:text-white font-medium"
                            >
                                Admin Dashboard
                            </Link>
                            <Link
                                to="/signup"
                                className="text-gray-800 hover:text-green-400 dark:text-gray-300 dark:hover:text-white font-medium"
                            >
                                Registration
                            </Link>
                            <Link
                                to="/login"
                                className="text-gray-800 hover:text-green-400 dark:text-gray-300 dark:hover:text-white font-medium"
                            >
                                Login
                            </Link>

                        </div>

                        {/* Donate and Sponsor Buttons (Hidden on Mobile) */}
                        <div className="hidden sm:flex space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Donate Now
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                Apply Loan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Links */}
                <div
                    style={{ display: isMenuleft ? "block" : "none" }}
                    className="sm:hidden"
                    id="mobile-menu"
                >
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link
                            to="/dashboard"
                            className="block rounded-md bg-green-400 px-3 py-2 text-base font-medium text-black"
                        >
                            Admin Dashboard
                        </Link>
                        <Link
                            to="/signup"
                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-green-400 hover:text-white"
                        >
                            Regiesteration
                        </Link>
                        <Link
                            to="/login"
                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-green-400 hover:text-white"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
