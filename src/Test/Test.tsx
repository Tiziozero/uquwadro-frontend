// src/Test.js
import React, { useState, useEffect } from 'react';
import './Test.css';

function Test() {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
            const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const newOpacity = Math.min(scrollY / windowHeight, 1);
            setOpacity(newOpacity);

            };

            window.addEventListener('scroll', handleScroll);

            return () => {
            window.removeEventListener('scroll', handleScroll);
            };

            }, []);

    return (
            <div className="home">
            <div className="h-screen w-screen flex justify-center items-center" style={{ opacity: 1 - opacity }}>
            <h1 className="text-white">Welcome</h1>
            </div>
            <div className="h-screen w-screen flex justify-center items-center" style={{ opacity }}>
            <div>
            <h1 className='text-white'>Main Page Content</h1>
            <p>Your main page content goes here.</p>
            </div>
            </div>
            </div>

           );

}


export default Test;

