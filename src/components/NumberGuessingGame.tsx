
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Joystick } from 'lucide-react';

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
                title: "Invalid guess",
                description: "Please enter a number between 1 and 100.",
                variant: "destructive",
            });
            return;
        }

        setAttempts(attempts + 1);

        if (userGuess === targetNumber) {
            setMessage(t('interactive.numberGame.correct'));
            setGameWon(true);
            toast({
                title: "Congratulations!",
                description: "You guessed the correct number in " + attempts + " attempts.",
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
                    {t('interactive.numberGame.tab')}
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
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="1-100"
                            disabled={gameWon}
                        />
                    </div>
                    {message && (
                        <div className={`p-3 rounded-md ${message === t('interactive.numberGame.correct') ? 'bg-green-100 dark:bg-green-900' : 'bg-secondary'}`}>
                            <p>{message}</p>
                        </div>
                    )}
                    <p>{t('interactive.numberGame.attempts')} {attempts}</p>
                </div>
            </CardContent>
            <CardFooter>
                {!gameWon ? (
                    <div onClick={handleGuess} className="px-6 mb-4 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                        {t('interactive.numberGame.guess')}
                    </div>

                ) : (
                    <div onClick={resetGame} className="px-6 mb-4 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                        {t('interactive.numberGame.playAgain')}
                    </div>

                )}
            </CardFooter>
        </Card>
    );
};

export default NumberGuessingGame;