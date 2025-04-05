
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Placeholder images - replace with your actual profile images
const profileImage1 = 'https://images.unsplash.com/photo-1741986947217-d1a0ecc39149?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8';
const profileImage2 = 'https://images.unsplash.com/photo-1741986947217-d1a0ecc39149?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8';

const ProfileSection: React.FC = () => {
    const { t } = useLanguage();
    const [isFlipped, setIsFlipped] = useState(false);
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    const subtitles = [
        t('profile.subtitle1'),
        t('profile.subtitle2'),
        t('profile.subtitle3')
    ];

    // Rotate through subtitles
    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
                setVisible(true);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, [subtitles]);

    const handleImageClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <section id="profile" className="min-h-screen pt-24 pb-16 flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Profile Image */}
                    <div className="w-64 h-64 relative perspective-1000">
                        <div
                            className={`w-full h-full rounded-full overflow-hidden transition-all duration-500 shadow-xl cursor-pointer relative ${isFlipped ? 'rotate-y-180' : ''
                                }`}
                            onClick={handleImageClick}
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        >
                            <img
                                src={profileImage1}
                                alt="Profile"
                                className="absolute w-full h-full object-cover backface-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                            />
                            <img
                                src={profileImage2}
                                alt="Alternate Profile"
                                className="absolute w-full h-full object-cover backface-hidden"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="max-w-lg text-center md:text-left">
                        <h2 className="text-2xl font-semibold mb-2">
                            {t('profile.title')}
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                            John Doe
                        </h1>
                        <div className="h-8 mb-4">
                            <p
                                className={`text-xl ${visible ? 'text-animate' : 'opacity-0'} transition-opacity duration-300`}
                            >
                                {subtitles[subtitleIndex]}
                            </p>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            {t('profile.description')}
                        </p>

                        <div className="mt-8 flex gap-4 justify-center md:justify-start">
                            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all">
                                Download CV
                            </button>
                            <button
                                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg shadow-md hover:shadow-lg transition-all"
                                onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
