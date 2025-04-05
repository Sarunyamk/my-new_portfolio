
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import profileImage1 from '../assets/profile.jpg'
import profileImage2 from '../assets/S__19365892.jpg'
import { TypeAnimation } from "react-type-animation";


const ProfileSection: React.FC = () => {
    const { t } = useLanguage();
    const [isFlipped, setIsFlipped] = useState(false);

    const handleImageClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <section id="profile" className="max-h-screen pt-40 pb-32 flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
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

                            />
                            <img
                                src={profileImage2}
                                alt="Alternate Profile"
                                className="absolute w-full h-full object-cover backface-hidden"

                            />
                        </div>
                    </div>

                    <div className="max-w-lg text-center md:text-left">
                        <h2 className="text-2xl font-semibold mb-2">
                            {t('profile.title')}
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                            {t("profile.name")}
                        </h1>
                        <div className="h-8 mb-4">
                            <TypeAnimation
                                sequence={[
                                    "Frontend Developer",
                                    1500,
                                    "Backend Developer",
                                    1500,
                                    "Full Stack Developer",
                                    1500,
                                    "Web Developer",
                                    1500,
                                ]}
                                speed={50}
                                omitDeletionAnimation={true}
                                repeat={Infinity}
                                className="md:font-head text-muted-foreground mb-6"
                            />
                        </div>

                        <p className="text-lg text-muted-foreground">
                            {t("profile.aboutDesc")}
                        </p>

                        <div className="mt-8 flex gap-4 justify-center md:justify-start">
                            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all">
                                {t("button.cv")}
                            </button>
                            <button
                                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg shadow-md hover:shadow-lg transition-all"
                                onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {t("button.contact")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
