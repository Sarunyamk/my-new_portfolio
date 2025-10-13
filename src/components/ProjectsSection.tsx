import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { Project } from '@/utils/project'

const arr = [0, 1, 2, 3]
const ProjectsSection: React.FC = () => {
  const { t } = useLanguage()
  const projects: Project[] = [
    {
      id: 1,
      title: t('projects.name1'),
      description: t('projects.detail1'),
      videoUrl: 'https://www.youtube.com/embed/_JBIgbiFiKc?si=3X-UcyIPrsykJOBU',
      githubUrl:
        'https://github.com/Sarunyamk/Single_Project_restaurant-client',
      technologies: ['React', 'Node.js', 'I18next', 'Shadcn UI', 'Stripe'],
      style: 'standard',
    },
    {
      id: 2,
      title: t('projects.name2'),
      description: t('projects.detail2'),
      videoUrl: 'https://www.youtube.com/embed/dUfj8lUBaIQ?si=V72Jn7Mke48gvohm',
      githubUrl: 'https://github.com/Sarunyamk/Friend_Pow_Client',
      technologies: ['React', 'Node.js', 'I18next', 'Leaflet', 'Stripe'],
      style: 'standard',
    },
    {
      id: 3,
      title: t('projects.name3'),
      description: t('projects.detail3'),
      videoUrl: 'https://www.youtube.com/embed/rZpA83WN1hg?si=Ua_6Coo6XuUBGMD2',
      githubUrl: 'https://github.com/Sarunyamk/Clone-Gravity-React.js-.git',
      technologies: ['React', 'TailwindCSS', 'React Slick', 'Framer Motion'],
      style: 'standard',
    },
    {
      id: 4,
      title: t('projects.name4'),
      description: t('projects.detail4'),
      videoUrl: 'https://www.youtube.com/embed/iAlruy42kiU?si=Fh3RpmnArVRAPWPb',
      githubUrl: 'https://github.com/Sarunyamk/ecommerce-vue.js.git',
      technologies: ['Vue3.js', 'Javascript', 'Pinia'],
      style: 'standard',
    },
    {
      id: 5,
      title: t('projects.name5'),
      description: t('projects.detail5'),
      videoUrl: 'https://www.youtube.com/embed/wz5uYOKw_T0?si=bRx_TQO62nLUDFMs',
      githubUrl:
        'https://github.com/Sarunyamk/workshop_camping-next.js-typescript-.git',
      technologies: ['Next.js', 'Typescript', 'Clerk', 'Supabase', 'Shadcn UI'],
      style: 'standard',
    },
    {
      id: 6,
      title: t('projects.name6'),
      description: t('projects.detail6'),
      videoUrl: 'https://www.youtube.com/embed/IcbrEIYgUco?si=J7jWPODjBK4mgrX-',
      githubUrl: 'https://github.com/Sarunyamk/CC18_Responsive_homeworkCSS.git',
      technologies: ['Only HTML and CSS Responsive'],
      style: 'standard',
    },
    {
      id: 7,
      title: t('projects.name7'),
      description: t('projects.detail7'),
      videoUrl: 'https://www.youtube.com/embed/2JCPQFZ3CJc?si=ityUg7_9EGHY5qGe',
      githubUrl: 'https://github.com/Sarunyamk/46group.git',
      technologies: ['Next.js', 'Typescript', 'TailwindCSS', 'Framer motion', 'Swiper'],
      style: 'standard',
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          {t('projects.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <FuturisticProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FuturisticProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="h-[500px] relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
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
            : '0 0 0px 0px rgba(138, 43, 226, 0)',
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative h-2/3 overflow-hidden rounded-t-xl">
        <iframe
          width="100%"
          height="315"
          src={project.videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="my-4 rounded"
        ></iframe>

        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full border border-white/10"
            >
              {project.technologies[index]}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="p-4 h-1/3 flex flex-col justify-between">
        <motion.p
          className="text-sm text-foreground/80 line-clamp-2"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          {project.description}
        </motion.p>

        <div className="mt-4 flex justify-center h-1/2 w-full ">
          <motion.div
            className="flex flex-col w-40 items-center justify-center py-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors cursor-pointer"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Github size={20} className="mb-1" />
            <a href={project.githubUrl} target="_blank">
              Git Hub
            </a>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-primary to-accent rounded-b-xl"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {arr.map((corner) => (
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
  )
}

export default ProjectsSection
