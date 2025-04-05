
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '@/utils/project';


const ProjectsSection: React.FC = () => {

    const projects: Project[] = [
        {
            id: 1,
            title: 'Individual Project : M&M Restaurant',
            description: 'A full-featured e-commerce platform with cart, checkout, and payment integration.',
            videoUrl: 'https://www.youtube.com/embed/_JBIgbiFiKc?si=3X-UcyIPrsykJOBU',
            githubUrl: 'https://github.com/yourusername/ecommerce',
            liveUrl: 'https://example.com',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            imageUrl: 'https://via.placeholder.com/600/4834d4',
            style: 'standard'
        },

    ];

    const { t } = useLanguage();
    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
                    {t('projects.title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (

                        <FuturisticProjectCard
                            key={project.id}
                            project={project}
                        />


                    ))}
                </div>
            </div>
        </section>
    );
};


const FuturisticProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="h-96 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >

            <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-20 rounded-xl -z-10 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="absolute inset-0 backdrop-blur-sm rounded-xl border border-white/10 -z-10" />

            <motion.div
                className="absolute inset-0 rounded-xl -z-20"
                animate={{
                    boxShadow: isHovered
                        ? '0 0 30px 5px rgba(138, 43, 226, 0.3)'
                        : '0 0 0px 0px rgba(138, 43, 226, 0)'
                }}
                transition={{ duration: 0.6 }}
            />

            <div className="relative h-1/2 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.8 }}
                />

                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                            className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full border border-white/10"
                        >
                            react
                        </motion.span>
                    ))}
                </div>

                <motion.div
                    className="absolute bottom-0 left-0 w-full p-4 z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h3 className="text-xl font-bold text-white">
                        {project.title}
                    </h3>
                </motion.div>
            </div>

            <div className="p-4 h-1/2 flex flex-col justify-between">
                <motion.p
                    className="text-sm text-foreground/80 line-clamp-2"
                    animate={{ opacity: isHovered ? 1 : 0.8 }}
                >
                    {project.description}
                </motion.p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                    <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center py-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <Github size={20} className="mb-1" />
                        <span className="text-xs">Code</span>
                    </motion.a>

                    <motion.a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center py-2 rounded-lg bg-muted/50 hover:bg-accent/20 transition-colors"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <Play size={20} className="mb-1" />
                        <span className="text-xs">Demo</span>
                    </motion.a>
                </div>

                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-primary to-accent rounded-b-xl"
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {[0, 1, 2, 3].map((corner) => (
                <motion.div
                    key={`corner-${corner}`}
                    className="absolute w-5 h-5 border-primary z-20"
                    style={{
                        top: corner < 2 ? -2 : 'auto',
                        bottom: corner >= 2 ? -2 : 'auto',
                        left: corner % 2 === 0 ? -2 : 'auto',
                        right: corner % 2 === 1 ? -2 : 'auto',
                        borderTopWidth: corner === 0 || corner === 1 ? '2px' : 0,
                        borderRightWidth: corner === 1 || corner === 3 ? '2px' : 0,
                        borderBottomWidth: corner === 2 || corner === 3 ? '2px' : 0,
                        borderLeftWidth: corner === 0 || corner === 2 ? '2px' : 0,
                        borderTopLeftRadius: corner === 0 ? '8px' : 0,
                        borderTopRightRadius: corner === 1 ? '8px' : 0,
                        borderBottomLeftRadius: corner === 2 ? '8px' : 0,
                        borderBottomRightRadius: corner === 3 ? '8px' : 0,
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0.3,
                        width: isHovered ? 12 : 5,
                        height: isHovered ? 12 : 5,
                    }}
                    transition={{ duration: 0.3 }}
                />
            ))}
        </motion.div>
    );
};

export default ProjectsSection;