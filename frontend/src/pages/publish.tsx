import React, { useState, useEffect } from 'react';
import { PublishComp } from '../components/publishComp';
import { TaskBar } from '../components/taskbar';

export const Publish = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has scrolled down the page
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const page: React.CSSProperties = {
        height: '100vh',
        width: '100vw',

        background : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,46,46,0.8493522408963585) 100%)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        display: 'flex',
        paddingLeft: '40px',
        paddingTop: '40px'
    };

    const writer: React.CSSProperties = {
        height: '80%',
        width: '80%',
        paddingLeft: '4rem',
        paddingTop: '4rem',
        backgroundClip : '#5c8bee'
    };

    return (
        <div style={page}>
            {!isScrolled && <TaskBar />} {/* Render TaskBar only if not scrolled */}
            <div style={writer}>
                <PublishComp />
            </div>
        </div>
    );
};
