import { useLanguage } from '@/contexts/LanguageContext'
import { Gamepad2 } from 'lucide-react'
import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CustomButton from '../customs/CustomButton'

const RockPaperScissors = () => {
  const { t } = useLanguage()
  const [playerChoice, setPlayerChoice] = useState<string | null>(null)
  const [computerChoice, setComputerChoice] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [score, setScore] = useState({ player: 0, computer: 0 })

  const choices = ['rock', 'paper', 'scissors']

  const play = (choice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)]
    setPlayerChoice(choice)
    setComputerChoice(computerChoice)

    if (choice === computerChoice) {
      setResult('tie')
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('win')
      setScore({ ...score, player: score.player + 1 })
    } else {
      setResult('lose')
      setScore({ ...score, computer: score.computer + 1 })
    }
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setScore({ player: 0, computer: 0 })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5" />
          {t('interactive.rps.tab')}
        </CardTitle>
        <CardDescription>{t('interactive.rps.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4 mb-6">
          {choices.map((choice) => (
            <div
              key={choice}
              onClick={() => play(choice)}
              className="min-w-[80px] cursor-pointer border border-muted-foreground rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted-foreground/10 transition duration-300"
            >
              {choice === 'rock' ? '👊' : choice === 'paper' ? '📄' : '✂️'}
              <span className="sr-only">{choice}</span>
            </div>
          ))}
        </div>

        {playerChoice && computerChoice && (
          <div className="text-center space-y-2">
            <div className="flex justify-center items-center gap-4">
              <div className="text-center">
                <p className="text-sm">{t('interactive.rps.you')}</p>
                <div className="text-3xl">
                  {playerChoice === 'rock'
                    ? '👊'
                    : playerChoice === 'paper'
                    ? '📄'
                    : '✂️'}
                </div>
              </div>
              <div className="text-xl font-bold">VS</div>
              <div className="text-center">
                <p className="text-sm">{t('interactive.rps.computer')}</p>
                <div className="text-3xl">
                  {computerChoice === 'rock'
                    ? '👊'
                    : computerChoice === 'paper'
                    ? '📄'
                    : '✂️'}
                </div>
              </div>
            </div>

            <div
              className={`mt-4 p-2 rounded-md font-bold text-center
              ${
                result === 'win'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : result === 'lose'
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              }`}
            >
              {result === 'win'
                ? t('interactive.rps.youWin')
                : result === 'lose'
                ? t('interactive.rps.youLose')
                : t('interactive.rps.tie')}
            </div>

            <div className="mt-4 font-medium">
              {t('interactive.rps.score')}: {score.player} - {score.computer}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        {result && (
          <CustomButton onClick={resetGame} text={t('interactive.rps.reset')} />
        )}
      </CardFooter>
    </Card>
  )
}

export default RockPaperScissors
