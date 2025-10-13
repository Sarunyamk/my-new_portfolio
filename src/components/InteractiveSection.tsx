import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Calculator, Dices, Dumbbell, Gamepad2, Sparkles } from 'lucide-react'
import React from 'react'

import BMICalculator from './games/BMICalculator'

import { useTheme } from '@/contexts/ThemeContext'
import CustomTabsTrigger from './customs/CustomTabsTrigger'
import ColorMatcher from './games/ColorMatcher'
import MemoryGame from './games/MemoryGame'
import NumberGuessingGame from './games/NumberGuessingGame'
import RockPaperScissors from './games/RockPaperScissors'

const InteractiveSection: React.FC = () => {
  const { t } = useLanguage()
  const { theme } = useTheme()
  console.log('theme :>> ', theme)
  const tabList =
    theme === 'dark' ? 'bg-background/50' : 'bg-[#6475c8] text-black'

  return (
    <section id="interactive" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 gradient-text">
            {t('interactive.title')}
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            {t('interactive.subtitle')}
          </p>

          <Tabs defaultValue="bmi" className="max-w-4xl mx-auto">
            <TabsList className={`${tabList} grid grid-cols-5 mb-8 `}>
              <CustomTabsTrigger
                value="bmi"
                icon={Calculator}
                text={t('interactive.bmi.tab')}
              />
              <CustomTabsTrigger
                value="number-game"
                icon={Dices}
                text={t('interactive.numberGame.tab')}
              />
              <CustomTabsTrigger
                value="rps"
                icon={Gamepad2}
                text={t('interactive.rps.tab')}
              />
              <CustomTabsTrigger
                value="color"
                icon={Sparkles}
                text={t('interactive.colorGame.tab')}
              />
              <CustomTabsTrigger
                value="memory"
                icon={Dumbbell}
                text={t('interactive.memory.tab')}
              />
            </TabsList>

            <div className="bg-background/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border">
              <TabsContent value="bmi">
                <BMICalculator />
              </TabsContent>
              <TabsContent value="number-game">
                <NumberGuessingGame />
              </TabsContent>
              <TabsContent value="rps">
                <RockPaperScissors />
              </TabsContent>
              <TabsContent value="color">
                <ColorMatcher />
              </TabsContent>
              <TabsContent value="memory">
                <MemoryGame />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveSection
