import { useLanguage } from '@/contexts/LanguageContext'
import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import profileImage1 from '../assets/profile.jpg'
import profileImage2 from '../assets/profile2.jpg'

const ProfileSection: React.FC = () => {
  const { t } = useLanguage()
  const [isFlipped, setIsFlipped] = useState(false)

  const handleImageClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <section
      id="profile"
      className="max-h-screen mt-40 pb-32 flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-48">
          <div className="w-64 h-64" style={{ perspective: '1000px' }}>
            <div
              onClick={handleImageClick}
              className="w-full h-full relative rounded-full shadow-xl cursor-pointer transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className="absolute w-full h-full rounded-full overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src={profileImage1}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="absolute w-full h-full rounded-full overflow-hidden"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={profileImage2}
                  alt="Alternate Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="max-w-lg text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">
              {t('profile.title')}
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t('profile.name')}
            </h1>
            <div className="h-8 mb-4">
              <TypeAnimation
                sequence={[
                  'Frontend Developer',
                  1500,
                  'Backend Developer',
                  1500,
                  'Full Stack Developer',
                  1500,
                  'Web Developer',
                  1500,
                ]}
                speed={50}
                omitDeletionAnimation={true}
                repeat={Infinity}
                className="md:font-head text-muted-foreground mb-6"
              />
            </div>

            <p className="text-lg text-muted-foreground">
              {t('profile.aboutDesc')}
            </p>

            <div className="mt-4 md:mt-8 flex gap-4 justify-center md:justify-start">
              <div
                onClick={() => window.open('/resume_030325.pdf', '_blank')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                {t('button.cv')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
