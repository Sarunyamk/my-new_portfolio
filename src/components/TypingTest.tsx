
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const TypingTest = () => {
    const { t } = useLanguage();
    const [text, setText] = useState('');
    const [targetText, setTargetText] = useState('');
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [testComplete, setTestComplete] = useState(false);

    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog.",
        "Coding is both an art and a science that requires practice.",
        "A portfolio website should showcase your best work and skills.",
        "React is a JavaScript library for building user interfaces.",
        "TypeScript adds static typing to JavaScript to improve development."
    ];

    const startTest = () => {
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setTargetText(randomText);
        setText('');
        setIsTestRunning(true);
        setTestComplete(false);
        setStartTime(Date.now());
        setElapsedTime(0);
        setWpm(0);
        setAccuracy(100);

        // Start the timer
        const timer = setInterval(() => {
            if (isTestRunning) {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }
        }, 1000);

        return () => clearInterval(timer);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        setText(inputText);

        // Check if the test is complete
        if (inputText === targetText) {
            setIsTestRunning(false);
            setTestComplete(true);

            // Calculate WPM: (characters / 5) / (time in minutes)
            const timeInMinutes = (Date.now() - startTime) / 60000;
            const words = targetText.length / 5;
            const calculatedWpm = Math.round(words / timeInMinutes);
            setWpm(calculatedWpm);

            toast({
                title: t('interactive.typing.complete'),
                description: t('interactive.typing.result', { wpm: calculatedWpm }),
            });
        } else {
            // Calculate accuracy
            let correctChars = 0;
            for (let i = 0; i < inputText.length; i++) {
                if (i < targetText.length && inputText[i] === targetText[i]) {
                    correctChars++;
                }
            }

            const calculatedAccuracy = Math.round((correctChars / inputText.length) * 100) || 100;
            setAccuracy(calculatedAccuracy);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" />
                    {t('interactive.typing.title')}
                </CardTitle>
                <CardDescription>{t('interactive.typing.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!isTestRunning && !testComplete ? (
                    <Button onClick={startTest} className="w-full">
                        {t('interactive.typing.start')}
                    </Button>
                ) : (
                    <>
                        <div className="p-3 bg-secondary rounded-md">
                            <p>{targetText}</p>
                        </div>

                        <input
                            type="text"
                            value={text}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-md ${isTestRunning ? 'border-blue-500 focus:border-blue-500' : 'border-green-500'
                                }`}
                            placeholder={t('interactive.typing.placeholder')}
                            disabled={testComplete}
                            autoFocus
                        />

                        <div className="flex justify-between text-sm">
                            <div>{t('interactive.typing.time')}: {elapsedTime}s</div>
                            <div>{t('interactive.typing.accuracy')}: {accuracy}%</div>
                        </div>

                        {testComplete && (
                            <div className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-center">
                                <p className="font-bold">{t('interactive.typing.wpm')}: {wpm}</p>
                            </div>
                        )}

                        {testComplete && (
                            <Button onClick={startTest} className="w-full">
                                {t('interactive.typing.restart')}
                            </Button>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default TypingTest;