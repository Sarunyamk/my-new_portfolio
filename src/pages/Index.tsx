
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InteractiveSection from '@/components/InteractiveSection';
import ProfileSection from '@/components/ProfileSection';
import ProjectsSection from '@/components/ProjectsSection';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import SkillsSection from '@/components/SkillsSection';
import { useEffect } from 'react';

import CustomCursor from '@/components/customs/CustomCursor';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('section').forEach((section) => {
            observer.observe(section);
        });

        return () => {
            document.querySelectorAll('section').forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <CustomCursor />
            <Header />
            <AnimatePresence>
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ProfileSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <InteractiveSection />
                </motion.main>
            </AnimatePresence>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default Index;
