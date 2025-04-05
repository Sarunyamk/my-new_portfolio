
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Youtube, ExternalLink, Info, Code, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    githubUrl: string;
    liveUrl?: string;
    technologies: string[];
    imageUrl: string;
    style: 'standard' | 'modern' | 'creative' | 'futuristic';
}

const projects: Project[] = [
    {
        id: 1,
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform with cart, checkout, and payment integration.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        githubUrl: 'https://github.com/yourusername/ecommerce',
        liveUrl: 'https://example.com',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        imageUrl: 'https://via.placeholder.com/600/4834d4',
        style: 'standard'
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'A beautiful and functional task management application with drag and drop features.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        githubUrl: 'https://github.com/yourusername/taskmanager',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
        imageUrl: 'https://via.placeholder.com/600/6c5ce7',
        style: 'futuristic'
    },
    {
        id: 3,
        title: 'Weather Dashboard',
        description: 'Real-time weather dashboard with forecast and historical data visualization.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        githubUrl: 'https://github.com/yourusername/weather',
        liveUrl: 'https://weather.example.com',
        technologies: ['React', 'D3.js', 'OpenWeatherMap API'],
        imageUrl: 'https://via.placeholder.com/600/0984e3',
        style: 'creative'
    }
];

const ProjectsSection: React.FC = () => {
    const { t } = useLanguage();
    const [flippedCard, setFlippedCard] = useState<number | null>(null);

    const toggleFlip = (id: number) => {
        setFlippedCard(flippedCard === id ? null : id);
    };

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
                    {t('projects.title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        project.style === 'futuristic' ? (
                            <FuturisticProjectCard
                                key={project.id}
                                project={project}
                            />
                        ) : (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isFlipped={flippedCard === project.id}
                                toggleFlip={() => toggleFlip(project.id)}
                            />
                        )
                    ))}
                </div>
            </div>
        </section>
    );
};

interface ProjectCardProps {
    project: Project;
    isFlipped: boolean;
    toggleFlip: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isFlipped, toggleFlip }) => {
    const getCardClass = () => {
        const baseClasses = "h-full rounded-xl overflow-hidden transition-all duration-500";

        switch (project.style) {
            case 'modern':
                return `${baseClasses} bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-md border-2 border-primary/30`;
            case 'creative':
                return `${baseClasses} bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20`;
            default:
                return `${baseClasses} bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-md`;
        }
    };

    return (
        <div className="h-96 perspective-1000">
            <div
                className={`relative w-full h-full ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front of card */}
                <div
                    className={`${getCardClass()} absolute w-full h-full backface-hidden`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                            <a
                                href={project.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <Youtube size={18} />
                            </a>
                            <button
                                onClick={toggleFlip}
                                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 3 && (
                                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                                    +{project.technologies.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm hover:text-primary transition-colors"
                            >
                                <Github size={16} className="mr-1" />
                                GitHub
                            </a>

                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className={`${getCardClass()} absolute w-full h-full backface-hidden p-6 flex flex-col`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <button
                        onClick={toggleFlip}
                        className="absolute top-2 right-2 p-2 rounded-full hover:bg-secondary/50"
                    >
                        ✕
                    </button>

                    <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                        {project.description}
                    </p>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 flex-1 py-2 bg-secondary hover:bg-secondary/70 text-secondary-foreground rounded-lg transition-colors"
                        >
                            <Github size={16} />
                            Code
                        </a>
                        <a
                            href={project.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 flex-1 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition-colors"
                        >
                            <Youtube size={16} />
                            Video
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// New futuristic card style
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
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary opacity-20 rounded-xl -z-10 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="absolute inset-0 backdrop-blur-sm rounded-xl border border-white/10 -z-10" />

            {/* Animated glow effect */}
            <motion.div
                className="absolute inset-0 rounded-xl -z-20"
                animate={{
                    boxShadow: isHovered
                        ? '0 0 30px 5px rgba(138, 43, 226, 0.3)'
                        : '0 0 0px 0px rgba(138, 43, 226, 0)'
                }}
                transition={{ duration: 0.6 }}
            />

            {/* Image section */}
            <div className="relative h-1/2 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Floating technology badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                            className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full border border-white/10"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                {/* Project title overlay */}
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

            {/* Content section */}
            <div className="p-4 h-1/2 flex flex-col justify-between">
                <motion.p
                    className="text-sm text-foreground/80 line-clamp-2"
                    animate={{ opacity: isHovered ? 1 : 0.8 }}
                >
                    {project.description}
                </motion.p>

                {/* Interactive buttons with hover effects */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                    <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center py-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <Code size={20} className="mb-1" />
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

                    <motion.a
                        href={project.liveUrl || project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center py-2 rounded-lg bg-muted/50 hover:bg-secondary/50 transition-colors"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <Info size={20} className="mb-1" />
                        <span className="text-xs">Details</span>
                    </motion.a>
                </div>

                {/* Animated line */}
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-primary to-accent rounded-b-xl"
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Animated corner decorations */}
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