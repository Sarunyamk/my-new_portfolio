import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { toast } from '@/hooks/use-toast'
import { Sparkles } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import CustomButton from '../customs/CustomButton'

const ColorMatcher = () => {
  const { t } = useLanguage()
  const [targetColor, setTargetColor] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [feedback, setFeedback] = useState('')

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const startGame = () => {
    const correctColor = generateRandomColor()
    const colorOptions = [correctColor]

    while (colorOptions.length < 4) {
      const newColor = generateRandomColor()
      if (!colorOptions.includes(newColor)) {
        colorOptions.push(newColor)
      }
    }

    colorOptions.sort(() => Math.random() - 0.5)

    setTargetColor(correctColor)
    setOptions(colorOptions)
    setGameStarted(true)
    setFeedback('')
  }

  const checkAnswer = (selectedColor: string) => {
    if (selectedColor === targetColor) {
      setScore(score + 1)
      setFeedback(t('interactive.colorGame.correct'))

      setTimeout(startGame, 1000)
    } else {
      setFeedback(t('interactive.colorGame.wrong'))
    }
  }

  const resetGame = () => {
    setTargetColor('')
    setOptions([])
    setScore(0)
    setGameStarted(false)
    setFeedback('')
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          {t('interactive.colorGame.tab')}
        </CardTitle>
        <CardDescription>
          {t('interactive.colorGame.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!gameStarted ? (
          <div className="flex justify-center items-center mx-auto">
            <CustomButton
              onClick={startGame}
              text={t('interactive.colorGame.start')}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className="w-full h-24 rounded-md"
              style={{ backgroundColor: targetColor }}
            ></div>

            <div className="grid grid-cols-2 gap-6">
              {options.map((color, index) => (
                <div
                  key={index}
                  className="h-12 font-mono cursor-pointer rounded-md flex items-center justify-center
                  border border-primary shadow-md hover:shadow-lg hover:scale-105 transition-all"
                  onClick={() => checkAnswer(color)}
                >
                  {color}
                </div>
              ))}
            </div>

            {feedback && (
              <div
                className={`p-2 rounded-md text-center font-medium ${
                  feedback === t('interactive.colorGame.correct')
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}
              >
                {feedback}
              </div>
            )}

            <div className="text-center font-bold">
              {t('interactive.colorGame.score')}: {score}
            </div>
          </div>
        )}
      </CardContent>
      {gameStarted && (
        <CardFooter className="justify-center">
          <CustomButton onClick={resetGame} text={t('interactive.rps.reset')} />
        </CardFooter>
      )}
    </Card>
  )
}

export default ColorMatcher
