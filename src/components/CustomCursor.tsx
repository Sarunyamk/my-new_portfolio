
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseenter', onMouseEnter);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mouseup', onMouseUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseEnter = () => {
            setHidden(false);
        };

        const onMouseLeave = () => {
            setHidden(true);
        };

        const onMouseDown = () => {
            setClicked(true);
        };

        const onMouseUp = () => {
            setClicked(false);
        };

        // Track when cursor is over clickable elements
        const handleLinkHoverEvents = () => {
            document.querySelectorAll('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])')
                .forEach(element => {
                    element.addEventListener('mouseenter', () => setLinkHovered(true));
                    element.addEventListener('mouseleave', () => setLinkHovered(false));
                });


        };

        addEventListeners();
        handleLinkHoverEvents();

        // Periodically check for new elements added to the DOM
        const linkObserverInterval = setInterval(handleLinkHoverEvents, 2000);

        return () => {
            removeEventListeners();
            clearInterval(linkObserverInterval);
            document.body.style.cursor = 'auto';
        };
    }, []);

    // Define cursor circles with theme-aware colors
    const cursorCircles = theme === 'dark' ? [
        { size: 30, color: 'hsl(var(--primary))', opacity: 0.7, delay: 0, offset: 0 },
        { size: 24, color: 'hsl(var(--accent))', opacity: 0.8, delay: 0.05, offset: 5 },
        { size: 18, color: '#FE9D69', opacity: 0.9, delay: 0.1, offset: -5 },
        { size: 12, color: '#FF5274', opacity: 1, delay: 0.15, offset: 8 },
        { size: 8, color: '#FFFFFF', opacity: 1, delay: 0.2, offset: -3 }
    ] : [
        { size: 30, color: 'hsl(var(--primary))', opacity: 0.7, delay: 0, offset: 0 },
        { size: 24, color: 'hsl(var(--accent))', opacity: 0.8, delay: 0.05, offset: 5 },
        { size: 18, color: '#FF7A00', opacity: 0.9, delay: 0.1, offset: -5 },
        { size: 12, color: '#9C27B0', opacity: 1, delay: 0.15, offset: 8 },
        { size: 8, color: '#3F51B5', opacity: 1, delay: 0.2, offset: -3 }
    ];

    // Theme-aware orbiting elements
    const orbitColors = theme === 'dark' ?
        ['#9C6FE2', '#5BC7F7', '#FF64BD'] :
        ['#6A1B9A', '#00838F', '#C2185B'];

    return (
        <>
            {cursorCircles.map((circle, index) => (
                <motion.div
                    key={index}
                    className="custom-cursor fixed z-50"
                    animate={{
                        x: position.x + (clicked ? circle.offset * 0.5 : circle.offset),
                        y: position.y + (clicked ? circle.offset * 0.5 : circle.offset),
                        scale: hidden ? 0 : clicked ? 0.8 : linkHovered ? 1.5 : 1,
                        opacity: hidden ? 0 : 1,
                        display: linkHovered ? 'none' : 'block'
                    }}
                    transition={{
                        duration: 0.15,
                        delay: circle.delay,
                        ease: "backOut"
                    }}
                    style={{
                        width: circle.size,
                        height: circle.size,
                        borderRadius: linkHovered ? '8px' : '50%',
                        backgroundColor: circle.color,
                        opacity: circle.opacity,
                        mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
                        filter: `blur(${index === 0 ? 0 : index}px)`,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                        boxShadow: `0 0 ${circle.size / 2}px ${circle.color}`,
                    }}
                />
            ))}

            {/* Additional orbiting elements */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={`orbit-${i}`}
                    className="fixed pointer-events-none z-40"
                    animate={{
                        x: position.x,
                        y: position.y,
                        opacity: hidden ? 0 : 0.6
                    }}
                    transition={{
                        duration: 0.1,
                        ease: "linear"
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <motion.div
                        className="absolute"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 3 + i,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        style={{
                            width: 60 + i * 20,
                            height: 60 + i * 20,
                        }}
                    >
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                width: 6,
                                height: 6,
                                backgroundColor: orbitColors[i],
                                top: 0,
                                boxShadow: `0 0 10px 2px ${orbitColors[i]}`,
                                opacity: 0.8
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </>
    );
};

export default CustomCursor;
