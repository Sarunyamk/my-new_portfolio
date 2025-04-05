
import React from 'react';
import { useLanguage } from '../../contexts//LanguageContext';
import { motion } from 'framer-motion';

interface Skill {
    id: number;
    name: string;
    icon: string;
    level: number;
    category: string;
    color: string;
}

const skills: Skill[] = [
    {
        id: 1,
        name: 'React',
        icon: '⚛️',
        level: 90,
        category: 'Frontend',
        color: '#61dafb'
    },
    {
        id: 2,
        name: 'JavaScript',
        icon: '🟨',
        level: 95,
        category: 'Frontend',
        color: '#f7df1e'
    },
    {
        id: 3,
        name: 'TypeScript',
        icon: '🔷',
        level: 85,
        category: 'Frontend',
        color: '#3178c6'
    },
    {
        id: 4,
        name: 'Next.js',
        icon: '▲',
        level: 80,
        category: 'Frontend',
        color: '#000000'
    },
    {
        id: 5,
        name: 'Node.js',
        icon: '🟢',
        level: 75,
        category: 'Backend',
        color: '#339933'
    },
    {
        id: 6,
        name: 'Tailwind CSS',
        icon: '🌊',
        level: 90,
        category: 'Styling',
        color: '#38b2ac'
    },
    {
        id: 7,
        name: 'Framer Motion',
        icon: '🔄',
        level: 70,
        category: 'Animation',
        color: '#0055ff'
    },
    {
        id: 8,
        name: 'Express',
        icon: '🔌',
        level: 75,
        category: 'Backend',
        color: '#000000'
    }
];

const SkillsSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="skills" className="py-20 bg-secondary/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
                    {t('skills.title')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            className="glass p-6 rounded-xl card-hover"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className="text-4xl mb-4 w-16 h-16 flex items-center justify-center rounded-full"
                                    style={{
                                        background: `radial-gradient(circle, ${skill.color}30, transparent)`,
                                        boxShadow: `0 0 15px ${skill.color}50`
                                    }}
                                >
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                                <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                                    <motion.div
                                        className="h-2.5 rounded-full"
                                        style={{
                                            width: `${skill.level}%`,
                                            backgroundColor: skill.color
                                        }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                                <motion.div
                                    className="flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: `${skill.color}20`,
                                        color: skill.color
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {skill.category}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
