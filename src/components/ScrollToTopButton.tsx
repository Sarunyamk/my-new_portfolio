
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <div
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full hover:scale-105 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;
