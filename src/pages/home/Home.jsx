import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../configration/firebaseconfig/firebaseconfig'; // Ensure this path is correct
import Herocard from '../../componenet/herocard';

import { Link } from "react-router-dom";
import heroImage1 from "./../../../public/image-removebg-preview (1).png"; // Replace with the correct path
import heroImage2 from "./../../../public/logo_saylaniwelfare.22bf709605809177256c.png"; // Replace with the correct path
import heroImage3 from "./../../../public/logo_saylaniwelfare.22bf709605809177256c.png"; // Replace with the correct path


function Home() {
    const user = auth.currentUser;
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "blogs"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching blogs:", error);
            return []; // Return an empty array on error
        }
    };

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching users:", error);
            return []; // Return an empty array on error
        }
    };

    useEffect(() => {
        setIsLoading(false);
        const loadBlogs = async () => {
            const [fetchedBlogs, fetchedUsers] = await Promise.all([fetchBlogs(), fetchUsers()]);

            // Combine blogs with user data
            const combinedData = fetchedBlogs.map(blog => {
                const user = fetchedUsers.find(user => user.id === blog.uid); // Assuming blog has a userId field
                return {
                    ...blog,
                    profileimg: user ? user.image : '', // Assuming user has an imageUrl field
                    profilefirstname: user ? user.firstname : 'Unknown', // Assuming user has firstname field
                    profilelastname: user ? user.lastname : 'Unknown' // Assuming user has firstname field
                };
            });

            setBlogs(combinedData);
            setIsLoading(true);

        };

        loadBlogs();
    }, []);

    return (



        <section className="bg-white mt-2 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between py-16 lg:py-24">
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                            Welcome to
                            <span className="text-green-600">Saylani Welfare</span>{" "}
                            Microfinance Program
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                            Empowering communities through financial support, the Saylani Welfare Microfinance Program is dedicated to fostering entrepreneurship and financial stability among underprivileged individuals in Pakistan. Our initiative focuses on providing small loans with easy repayment plans to help families and small businesses achieve self-sufficiency and independence.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link
                                to="/explore"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
                            >
                                Explore More →
                            </Link>
                            <Link
                                to="/donate"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 rounded-md shadow"
                            >
                                Donate Now
                            </Link>
                        </div>
                    </div>

                    {/* Images */}
                    <div >
                        <img
                            className="rounded-lg w-full h-auto"
                            src={heroImage1}
                            alt="Saylani Volunteers"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;