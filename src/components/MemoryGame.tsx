
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Box, Circle, Square, Star, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import CustomButton from './CustomButton';


interface MemoryCard {
    id: number;
    icon: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const MemoryGame: React.FC = () => {
    const { t } = useLanguage();
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { theme } = useTheme();
    const iconColorClass = theme === 'dark' ? 'text-primary-foreground' : 'text-zinc-800';

    const cardIcons = ['Box', 'Circle', 'Square', 'Star', 'Heart', 'Zap'];

    const initializeGame = () => {
        const cardPairs = [...cardIcons, ...cardIcons].map((icon, index) => ({
            id: index,
            icon,
            isFlipped: false,
            isMatched: false,
        }));

        const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setFlippedCards([]);
        setMoves(0);
        setGameStarted(true);
        setGameComplete(false);
        setIsProcessing(false);
    };

    const handleCardClick = (id: number) => {
        if (gameComplete || isProcessing || flippedCards.length === 2) return;

        const cardIndex = cards.findIndex(card => card.id === id);
        if (cardIndex === -1 || cards[cardIndex].isFlipped || cards[cardIndex].isMatched) return;

        const updatedCards = [...cards];
        updatedCards[cardIndex].isFlipped = true;
        setCards(updatedCards);

        const updatedFlippedCards = [...flippedCards, id];
        setFlippedCards(updatedFlippedCards);

        if (updatedFlippedCards.length === 2) {
            setMoves(prev => prev + 1);
            setIsProcessing(true);

            const [firstId, secondId] = updatedFlippedCards;
            const firstIndex = cards.findIndex(c => c.id === firstId);
            const secondIndex = cards.findIndex(c => c.id === secondId);

            if (cards[firstIndex].icon === cards[secondIndex].icon) {
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;
                    setCards(matchedCards);
                    setFlippedCards([]);
                    setIsProcessing(false);


                }, 500);
            } else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                    setIsProcessing(false);
                }, 1000);
            }
        }
    };

    const renderIcon = (iconName: string, colorClass: string) => {
        const IconComponent = {
            Box, Circle, Square, Star, Heart, Zap
        }[iconName as keyof typeof import('lucide-react')];

        return IconComponent ? <IconComponent className={`h-10 w-10 sm:h-12 sm:w-12 ${colorClass}`} /> : <Box className="h-10 w-10" />;
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Box className="h-5 w-5" />
                    {t('interactive.memory.tab')}
                </CardTitle>
                <CardDescription>{t('interactive.memory.description')}</CardDescription>
            </CardHeader>

            <CardContent>
                {!gameStarted ? (

                    <div onClick={initializeGame} className="text-center px-6 mb-4 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                        {t('interactive.memory.start')}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between mb-2 text-sm font-medium">
                            <span>{t('interactive.memory.moves')}: {moves}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {cards.map((card) => (
                                <motion.div
                                    key={card.id}
                                    className={`aspect-square rounded-md shadow-md flex items-center justify-center transition-all duration-300
                    ${card.isMatched ? 'bg-green-700 dark:bg-green-900' :
                                            card.isFlipped ? 'bg-white dark:bg-zinc-800' : 'bg-primary/70 hover:bg-primary'}
                    cursor-pointer`}
                                    whileHover={{ scale: card.isMatched || card.isFlipped ? 1 : 1.05 }}
                                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                                    transition={{ duration: 0.5 }}
                                    onClick={() => handleCardClick(card.id)}
                                >
                                    {(card.isFlipped || card.isMatched) && (
                                        <motion.div
                                            animate={{ rotateY: 180 }}
                                            transition={{ duration: 0 }}
                                        >
                                            {renderIcon(card.icon, iconColorClass)}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="justify-center">
                {gameStarted && (
                    <CustomButton onClick={initializeGame} text={gameComplete ? t('interactive.memory.playAgain') : t('interactive.memory.restart')} />
                )}
            </CardFooter>
        </Card>
    );
};

export default MemoryGame;
