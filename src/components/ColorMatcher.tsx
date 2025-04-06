

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ColorMatcher = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [targetColor, setTargetColor] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [feedback, setFeedback] = useState('');

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const startGame = () => {
        const correctColor = generateRandomColor();
        const colorOptions = [correctColor];

        while (colorOptions.length < 4) {
            const newColor = generateRandomColor();
            if (!colorOptions.includes(newColor)) {
                colorOptions.push(newColor);
            }
        }

        // Shuffle the options
        colorOptions.sort(() => Math.random() - 0.5);

        setTargetColor(correctColor);
        setOptions(colorOptions);
        setGameStarted(true);
        setFeedback('');
    };

    const checkAnswer = (selectedColor: string) => {
        if (selectedColor === targetColor) {
            setScore(score + 1);
            setFeedback(t('interactive.colorGame.correct'));
            toast({
                title: "Good job!",
                description: "You got it right!",
            });

            setTimeout(startGame, 1000);
        } else {
            setFeedback(t('interactive.colorGame.wrong'));
            toast({
                title: "Try again!",
                description: "You got it wrong!",
                variant: "destructive",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    {t('interactive.colorGame.tab')}
                </CardTitle>
                <CardDescription>{t('interactive.colorGame.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                {!gameStarted ? (
                    <div onClick={startGame} className="px-6 mb-4 py-3 bg-primary text-center text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                        {t('interactive.colorGame.start')}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div
                            className="w-full h-24 rounded-md"
                            style={{ backgroundColor: targetColor }}
                        ></div>

                        <div className="grid grid-cols-2 gap-2">
                            {options.map((color, index) => (
                                <div
                                    key={index}
                                    className="h-12 font-mono cursor-pointer rounded-md flex items-center justify-center border border-primary shadow-md hover:shadow-lg hover:scale-105 transition-all"
                                    onClick={() => checkAnswer(color)}
                                >
                                    {color}
                                </div>
                            ))}
                        </div>

                        {feedback && (
                            <div className={`p-2 rounded-md text-center font-medium ${feedback === t('interactive.colorGame.correct')
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                }`}>
                                {feedback}
                            </div>
                        )}

                        <div className="text-center font-bold">
                            {t('interactive.colorGame.score')}: {score}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ColorMatcher;