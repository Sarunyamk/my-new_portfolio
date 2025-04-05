
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Joystick } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
const NumberGuessingGame = () => {
    const { t } = useLanguage();
    const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState('');
    const [gameWon, setGameWon] = useState(false);

    const handleGuess = () => {
        const userGuess = parseInt(guess);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            toast({
                title: t('interactive.numberGame.invalidGuess'),
                description: t('interactive.numberGame.invalidRange'),
                variant: "destructive",
            });
            return;
        }

        setAttempts(attempts + 1);

        if (userGuess === targetNumber) {
            setMessage(t('interactive.numberGame.correct'));
            setGameWon(true);
            toast({
                title: t('interactive.numberGame.congrats'),
                description: t('interactive.numberGame.wonIn', { attempts: attempts + 1 }),
            });
        } else if (userGuess < targetNumber) {
            setMessage(t('interactive.numberGame.higher'));
        } else {
            setMessage(t('interactive.numberGame.lower'));
        }

        setGuess('');
    };

    const resetGame = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setAttempts(0);
        setMessage('');
        setGameWon(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Joystick className="h-5 w-5" />
                    {t('interactive.numberGame.title')}
                </CardTitle>
                <CardDescription>{t('interactive.numberGame.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="guess">
                            {t('interactive.numberGame.yourGuess')}
                        </label>
                        <input
                            id="guess"
                            type="number"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="1-100"
                            disabled={gameWon}
                        />
                    </div>
                    {message && (
                        <div className={`p-3 rounded-md ${message === t('interactive.numberGame.correct') ? 'bg-green-100 dark:bg-green-900' : 'bg-secondary'}`}>
                            <p>{message}</p>
                        </div>
                    )}
                    <p>{t('interactive.numberGame.attempts')}: {attempts}</p>
                </div>
            </CardContent>
            <CardFooter>
                {!gameWon ? (
                    <Button onClick={handleGuess}>
                        {t('interactive.numberGame.guess')}
                    </Button>
                ) : (
                    <Button onClick={resetGame}>
                        {t('interactive.numberGame.playAgain')}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default NumberGuessingGame;