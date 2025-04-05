
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Calculator, Gamepad2, Dumbbell, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// BMI Calculator Component
const BMICalculator = () => {
    const { t } = useLanguage();
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmiResult] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState('');

    const calculateBMI = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height) / 100; // convert cm to m

        if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {

            return;
        }

        const bmi = weightNum / (heightNum * heightNum);
        setBmiResult(parseFloat(bmi.toFixed(2)));

        // Categorize BMI
        if (bmi < 18.5) {
            setBmiCategory(t('interactive.bmi.underweight'));
        } else if (bmi < 25) {
            setBmiCategory(t('interactive.bmi.normal'));
        } else if (bmi < 30) {
            setBmiCategory(t('interactive.bmi.overweight'));
        } else {
            setBmiCategory(t('interactive.bmi.obese'));
        }
    };

    return (
        <div>

        </div>
        // <Card>
        //     <CardHeader>
        //         <CardTitle className="flex items-center gap-2">
        //             <Calculator className="h-5 w-5" />
        //             {t('interactive.bmi.title')}
        //         </CardTitle>
        //         <CardDescription>{t('interactive.bmi.description')}</CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         <div className="space-y-4">
        //             <div>
        //                 <label className="block text-sm font-medium mb-1" htmlFor="weight">
        //                     {t('interactive.bmi.weight')} (kg)
        //                 </label>
        //                 <input
        //                     id="weight"
        //                     type="number"
        //                     value={weight}
        //                     onChange={(e) => setWeight(e.target.value)}
        //                     className="w-full p-2 border rounded-md"
        //                     placeholder="70"
        //                 />
        //             </div>
        //             <div>
        //                 <label className="block text-sm font-medium mb-1" htmlFor="height">
        //                     {t('interactive.bmi.height')} (cm)
        //                 </label>
        //                 <input
        //                     id="height"
        //                     type="number"
        //                     value={height}
        //                     onChange={(e) => setHeight(e.target.value)}
        //                     className="w-full p-2 border rounded-md"
        //                     placeholder="170"
        //                 />
        //             </div>
        //         </div>
        //     </CardContent>
        //     <CardFooter className="flex flex-col items-start">
        //         <Button onClick={calculateBMI} className="mb-4">
        //             {t('interactive.bmi.calculate')}
        //         </Button>
        //         {bmiResult !== null && (
        //             <div className="w-full p-4 rounded-md bg-secondary">
        //                 <p className="font-bold text-lg">
        //                     {t('interactive.bmi.result')}: {bmiResult}
        //                 </p>
        //                 <p>{t('interactive.bmi.category')}: {bmiCategory}</p>
        //             </div>
        //         )}
        //     </CardFooter>
        // </Card>
    );
};

// Number Guessing Game Component
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

            return;
        }

        setAttempts(attempts + 1);

        if (userGuess === targetNumber) {
            setMessage(t('interactive.numberGame.correct'));
            setGameWon(true);

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
        // <Card>
        //     <CardHeader>
        //         <CardTitle className="flex items-center gap-2">
        //             <Dice className="h-5 w-5" />
        //             {t('interactive.numberGame.title')}
        //         </CardTitle>
        //         <CardDescription>{t('interactive.numberGame.description')}</CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         <div className="space-y-4">
        //             <div>
        //                 <label className="block text-sm font-medium mb-1" htmlFor="guess">
        //                     {t('interactive.numberGame.yourGuess')}
        //                 </label>
        //                 <input
        //                     id="guess"
        //                     type="number"
        //                     value={guess}
        //                     onChange={(e) => setGuess(e.target.value)}
        //                     className="w-full p-2 border rounded-md"
        //                     placeholder="1-100"
        //                     disabled={gameWon}
        //                 />
        //             </div>
        //             {message && (
        //                 <div className={`p-3 rounded-md ${message === t('interactive.numberGame.correct') ? 'bg-green-100 dark:bg-green-900' : 'bg-secondary'}`}>
        //                     <p>{message}</p>
        //                 </div>
        //             )}
        //             <p>{t('interactive.numberGame.attempts')}: {attempts}</p>
        //         </div>
        //     </CardContent>
        //     <CardFooter>
        //         {!gameWon ? (
        //             <Button onClick={handleGuess}>
        //                 {t('interactive.numberGame.guess')}
        //             </Button>
        //         ) : (
        //             <Button onClick={resetGame}>
        //                 {t('interactive.numberGame.playAgain')}
        //             </Button>
        //         )}
        //     </CardFooter>
        // </Card>
        <div>

        </div>
    );
};

// Rock Paper Scissors Game
const RockPaperScissors = () => {
    const { t } = useLanguage();
    const [playerChoice, setPlayerChoice] = useState<string | null>(null);
    const [computerChoice, setComputerChoice] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [score, setScore] = useState({ player: 0, computer: 0 });

    const choices = ['rock', 'paper', 'scissors'];

    const play = (choice: string) => {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        setPlayerChoice(choice);
        setComputerChoice(computerChoice);

        if (choice === computerChoice) {
            setResult('tie');
        } else if (
            (choice === 'rock' && computerChoice === 'scissors') ||
            (choice === 'paper' && computerChoice === 'rock') ||
            (choice === 'scissors' && computerChoice === 'paper')
        ) {
            setResult('win');
            setScore({ ...score, player: score.player + 1 });
        } else {
            setResult('lose');
            setScore({ ...score, computer: score.computer + 1 });
        }
    };

    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
        setScore({ player: 0, computer: 0 });
    };

    return (
        // <Card>
        //     <CardHeader>
        //         <CardTitle className="flex items-center gap-2">
        //             <Gamepad2 className="h-5 w-5" />
        //             {t('interactive.rps.title')}
        //         </CardTitle>
        //         <CardDescription>{t('interactive.rps.description')}</CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         <div className="flex justify-center gap-4 mb-6">
        //             {choices.map((choice) => (
        //                 <Button
        //                     key={choice}
        //                     onClick={() => play(choice)}
        //                     variant="outline"
        //                     className="min-w-[80px]"
        //                 >
        //                     {choice === 'rock' ? '🪨' : choice === 'paper' ? '📄' : '✂️'}
        //                     <span className="sr-only">{choice}</span>
        //                 </Button>
        //             ))}
        //         </div>

        //         {playerChoice && computerChoice && (
        //             <div className="text-center space-y-2">
        //                 <div className="flex justify-center items-center gap-4">
        //                     <div className="text-center">
        //                         <p className="text-sm">{t('interactive.rps.you')}</p>
        //                         <div className="text-3xl">
        //                             {playerChoice === 'rock' ? '🪨' : playerChoice === 'paper' ? '📄' : '✂️'}
        //                         </div>
        //                     </div>
        //                     <div className="text-xl font-bold">VS</div>
        //                     <div className="text-center">
        //                         <p className="text-sm">{t('interactive.rps.computer')}</p>
        //                         <div className="text-3xl">
        //                             {computerChoice === 'rock' ? '🪨' : computerChoice === 'paper' ? '📄' : '✂️'}
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className={`mt-4 p-2 rounded-md font-bold text-center
        //       ${result === 'win' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
        //                         result === 'lose' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
        //                             'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'}`}>
        //                     {result === 'win'
        //                         ? t('interactive.rps.youWin')
        //                         : result === 'lose'
        //                             ? t('interactive.rps.youLose')
        //                             : t('interactive.rps.tie')}
        //                 </div>

        //                 <div className="mt-4 font-medium">
        //                     {t('interactive.rps.score')}: {score.player} - {score.computer}
        //                 </div>
        //             </div>
        //         )}
        //     </CardContent>
        //     <CardFooter className="justify-center">
        //         <Button onClick={resetGame} variant="outline">
        //             {t('interactive.rps.reset')}
        //         </Button>
        //     </CardFooter>
        // </Card>
        <div>

        </div>
    );
};

// Color Matcher Game
const ColorMatcher = () => {
    const { t } = useLanguage();
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

            // Start new round
            setTimeout(startGame, 1000);
        } else {
            setFeedback(t('interactive.colorGame.wrong'));

        }
    };

    return (
        // <Card>
        //     <CardHeader>
        //         <CardTitle className="flex items-center gap-2">
        //             <Sparkles className="h-5 w-5" />
        //             {t('interactive.colorGame.title')}
        //         </CardTitle>
        //         <CardDescription>{t('interactive.colorGame.description')}</CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         {!gameStarted ? (
        //             <Button onClick={startGame} className="w-full">
        //                 {t('interactive.colorGame.start')}
        //             </Button>
        //         ) : (
        //             <div className="space-y-4">
        //                 <div
        //                     className="w-full h-24 rounded-md"
        //                     style={{ backgroundColor: targetColor }}
        //                 ></div>

        //                 <div className="grid grid-cols-2 gap-2">
        //                     {options.map((color, index) => (
        //                         <Button
        //                             key={index}
        //                             variant="outline"
        //                             className="h-12 font-mono"
        //                             onClick={() => checkAnswer(color)}
        //                         >
        //                             {color}
        //                         </Button>
        //                     ))}
        //                 </div>

        //                 {feedback && (
        //                     <div className={`p-2 rounded-md text-center font-medium ${feedback === t('interactive.colorGame.correct')
        //                         ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
        //                         : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        //                         }`}>
        //                         {feedback}
        //                     </div>
        //                 )}

        //                 <div className="text-center font-bold">
        //                     {t('interactive.colorGame.score')}: {score}
        //                 </div>
        //             </div>
        //         )}
        //     </CardContent>
        // </Card>
        <div>

        </div>
    );
};

// Typing Speed Test
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
        // <Card>
        //     <CardHeader>
        //         <CardTitle className="flex items-center gap-2">
        //             <Dumbbell className="h-5 w-5" />
        //             {t('interactive.typing.title')}
        //         </CardTitle>
        //         <CardDescription>{t('interactive.typing.description')}</CardDescription>
        //     </CardHeader>
        //     <CardContent className="space-y-4">
        //         {!isTestRunning && !testComplete ? (
        //             <Button onClick={startTest} className="w-full">
        //                 {t('interactive.typing.start')}
        //             </Button>
        //         ) : (
        //             <>
        //                 <div className="p-3 bg-secondary rounded-md">
        //                     <p>{targetText}</p>
        //                 </div>

        //                 <input
        //                     type="text"
        //                     value={text}
        //                     onChange={handleInputChange}
        //                     className={`w-full p-2 border rounded-md ${isTestRunning ? 'border-blue-500 focus:border-blue-500' : 'border-green-500'
        //                         }`}
        //                     placeholder={t('interactive.typing.placeholder')}
        //                     disabled={testComplete}
        //                     autoFocus
        //                 />

        //                 <div className="flex justify-between text-sm">
        //                     <div>{t('interactive.typing.time')}: {elapsedTime}s</div>
        //                     <div>{t('interactive.typing.accuracy')}: {accuracy}%</div>
        //                 </div>

        //                 {testComplete && (
        //                     <div className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-center">
        //                         <p className="font-bold">{t('interactive.typing.wpm')}: {wpm}</p>
        //                     </div>
        //                 )}

        //                 {testComplete && (
        //                     <Button onClick={startTest} className="w-full">
        //                         {t('interactive.typing.restart')}
        //                     </Button>
        //                 )}
        //             </>
        //         )}
        //     </CardContent>
        // </Card>
        <div>

        </div>
    );
};

const InteractiveSection: React.FC = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();

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

                    {/* <Tabs defaultValue="bmi" className="max-w-4xl mx-auto">
                        <TabsList className="grid grid-cols-5 mb-8">
                            <TabsTrigger value="bmi" className="gap-2">
                                <Calculator className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.bmi.tab')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="number-game" className="gap-2">
                                <Dice className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.numberGame.tab')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="rps" className="gap-2">
                                <Gamepad2 className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.rps.tab')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="color" className="gap-2">
                                <Sparkles className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.colorGame.tab')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="typing" className="gap-2">
                                <Dumbbell className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.typing.tab')}</span>
                            </TabsTrigger>
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
                            <TabsContent value="typing">
                                <TypingTest />
                            </TabsContent>
                        </div>
                    </Tabs> */}
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveSection;
