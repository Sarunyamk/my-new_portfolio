
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Menu, X, Moon, Sun, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'th' : 'en');
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    // Interactive button animations
    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" as const
        }
    };

    const glowVariants = {
        hover: {
            boxShadow: `0 0 8px 2px ${theme === 'dark' ? 'rgba(176, 129, 255, 0.7)' : 'rgba(138, 43, 226, 0.6)'}`,
            backgroundColor: theme === 'dark' ? 'rgba(138, 43, 226, 0.3)' : 'rgba(138, 43, 226, 0.1)',
            transition: { duration: 0.3 }
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold gradient-text">Portfolio</div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <button onClick={() => scrollToSection('profile')} className="hover:text-primary transition-colors">
                            {t('nav.home')}
                        </button>
                        <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">
                            {t('nav.skills')}
                        </button>
                        <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">
                            {t('nav.projects')}
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">
                            {t('nav.contact')}
                        </button>

                        {/* Interactive menu item with special styling */}
                        <motion.button
                            onClick={() => scrollToSection('interactive')}
                            className="relative rounded-md px-4 py-1 text-accent-foreground font-medium"
                            animate={pulseAnimation}
                            whileHover="hover"
                            variants={glowVariants}
                        >
                            <span className="flex items-center gap-1">
                                <Sparkles className="h-4 w-4" />
                                {t('nav.interactive')}
                            </span>
                            <motion.span
                                className="absolute inset-0 rounded-md -z-10 opacity-50"
                                animate={{
                                    background: [
                                        `linear-gradient(90deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`,
                                        `linear-gradient(180deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`,
                                        `linear-gradient(270deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`,
                                        `linear-gradient(0deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.button>
                    </nav>

                    {/* Controls */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-full hover:bg-secondary transition-colors"
                            aria-label="Toggle language"
                        >
                            <Globe size={20} />
                            <span className="ml-1">{language.toUpperCase()}</span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-secondary transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4 glass">
                    <nav className="flex flex-col space-y-4">
                        <button onClick={() => scrollToSection('profile')} className="py-2 hover:text-primary transition-colors">
                            {t('nav.home')}
                        </button>
                        <button onClick={() => scrollToSection('skills')} className="py-2 hover:text-primary transition-colors">
                            {t('nav.skills')}
                        </button>
                        <button onClick={() => scrollToSection('projects')} className="py-2 hover:text-primary transition-colors">
                            {t('nav.projects')}
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="py-2 hover:text-primary transition-colors">
                            {t('nav.contact')}
                        </button>

                        {/* Mobile Interactive menu item with special styling */}
                        <motion.button
                            onClick={() => scrollToSection('interactive')}
                            className="py-2 px-4 rounded-md text-accent-foreground font-medium relative overflow-hidden"
                            whileHover="hover"
                            variants={glowVariants}
                        >
                            <span className="flex items-center gap-1">
                                <Sparkles className="h-4 w-4" />
                                {t('nav.interactive')}
                            </span>
                            <motion.span
                                className="absolute inset-0 -z-10 opacity-50"
                                animate={{
                                    background: [
                                        `linear-gradient(90deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`,
                                        `linear-gradient(180deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`,
                                        `linear-gradient(270deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`,
                                        `linear-gradient(0deg, ${theme === 'dark' ? '#9333ea' : '#c084fc'} 0%, ${theme === 'dark' ? '#4f46e5' : '#818cf8'} 100%)`
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.button>

                        {/* Mobile Controls */}
                        <div className="flex space-x-4 pt-2">
                            <button
                                onClick={toggleLanguage}
                                className="p-2 rounded-full hover:bg-secondary transition-colors"
                                aria-label="Toggle language"
                            >
                                <Globe size={20} />
                                <span className="ml-1">{language.toUpperCase()}</span>
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-secondary transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
