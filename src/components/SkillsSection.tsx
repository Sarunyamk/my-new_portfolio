import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { skills } from '@/utils/skill'

const SkillsSection: React.FC = () => {
  const { t } = useLanguage()

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
              className="bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-md p-6 card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="flex flex-col items-center">
                <div
                  className=" text-4xl mb-4 w-16 h-16 flex items-center justify-center rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${skill.color}30, transparent)`,
                    boxShadow: `0 0 15px ${skill.color}50`,
                  }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className=" object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                  <motion.div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
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
                    color: skill.color,
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
  )
}

export default SkillsSection
