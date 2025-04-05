
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Box, Circle, Square, Star, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
    const [bestScore, setBestScore] = useState<number | null>(null);

    // Define the card icons
    const cardIcons = ['Box', 'Circle', 'Square', 'Star', 'Heart', 'Zap'];

    // Initialize or reset the game
    const initializeGame = () => {
        // Create pairs of cards with icons
        const cardPairs = [...cardIcons, ...cardIcons].map((icon, index) => ({
            id: index,
            icon,
            isFlipped: false,
            isMatched: false,
        }));

        // Shuffle the cards
        const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

        setCards(shuffledCards);
        setFlippedCards([]);
        setMoves(0);
        setGameStarted(true);
        setGameComplete(false);
    };

    // Handle card click
    const handleCardClick = (id: number) => {
        // Ignore click if game is complete or card is already flipped/matched
        if (gameComplete || cards[id].isFlipped || cards[id].isMatched) {
            return;
        }

        // If already have 2 cards flipped and not matched, ignore the click
        if (flippedCards.length === 2) {
            return;
        }

        // Flip the card
        const updatedCards = [...cards];
        updatedCards[id].isFlipped = true;
        setCards(updatedCards);

        // Add the card to flipped cards
        const updatedFlippedCards = [...flippedCards, id];
        setFlippedCards(updatedFlippedCards);

        // If this is the second card flipped
        if (updatedFlippedCards.length === 2) {
            // Increment moves
            setMoves(moves + 1);

            // Check if the cards match
            const [firstCardId, secondCardId] = updatedFlippedCards;
            if (cards[firstCardId].icon === cards[secondCardId].icon) {
                // Match found
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[firstCardId].isMatched = true;
                    matchedCards[secondCardId].isMatched = true;
                    setCards(matchedCards);
                    setFlippedCards([]);

                    // Check if game is complete
                    if (matchedCards.every(card => card.isMatched)) {
                        setGameComplete(true);

                        // Update best score
                        if (bestScore === null || moves + 1 < bestScore) {
                            setBestScore(moves + 1);
                            toast({
                                title: t('interactive.memory.newBest'),
                                description: t('interactive.memory.newBestDesc', { score: moves + 1 }),
                            });
                        } else {
                            toast({
                                title: t('interactive.memory.complete'),
                                description: t('interactive.memory.completeDesc', { moves: moves + 1 }),
                            });
                        }
                    }
                }, 500);
            } else {
                // No match, flip cards back
                setTimeout(() => {
                    const resetFlippedCards = [...cards];
                    resetFlippedCards[firstCardId].isFlipped = false;
                    resetFlippedCards[secondCardId].isFlipped = false;
                    setCards(resetFlippedCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    // Render the appropriate icon component based on the icon name
    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'Box':
                return <Box className="h-8 w-8" />;
            case 'Circle':
                return <Circle className="h-8 w-8" />;
            case 'Square':
                return <Square className="h-8 w-8" />;
            case 'Star':
                return <Star className="h-8 w-8" />;
            case 'Heart':
                return <Heart className="h-8 w-8" />;
            case 'Zap':
                return <Zap className="h-8 w-8" />;
            default:
                return <Box className="h-8 w-8" />;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Box className="h-5 w-5" />
                    {t('interactive.memory.title')}
                </CardTitle>
                <CardDescription>{t('interactive.memory.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                {!gameStarted ? (
                    <Button onClick={initializeGame} className="w-full">
                        {t('interactive.memory.start')}
                    </Button>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between mb-2">
                            <div className="font-medium">{t('interactive.memory.moves')}: {moves}</div>
                            {bestScore !== null && (
                                <div className="font-medium">{t('interactive.memory.best')}: {bestScore}</div>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {cards.map((card) => (
                                <motion.div
                                    key={card.id}
                                    className={`aspect-square cursor-pointer rounded-md shadow-md flex items-center justify-center ${card.isMatched ? 'bg-green-100 dark:bg-green-900' : 'bg-primary'
                                        }`}
                                    whileHover={{ scale: card.isMatched || card.isFlipped ? 1 : 1.05 }}
                                    animate={{
                                        rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                                        backgroundColor: card.isMatched ? 'var(--green-100)' : 'var(--primary)'
                                    }}
                                    transition={{ duration: 0.5 }}
                                    onClick={() => handleCardClick(card.id)}
                                >
                                    <div className="h-full w-full flex items-center justify-center">
                                        {(card.isFlipped || card.isMatched) && (
                                            <motion.div
                                                animate={{ rotateY: 180 }}
                                                transition={{ duration: 0 }}
                                                className="text-primary-foreground"
                                            >
                                                {renderIcon(card.icon)}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="justify-center">
                {gameStarted && (
                    <Button onClick={initializeGame} variant="outline">
                        {gameComplete
                            ? t('interactive.memory.playAgain')
                            : t('interactive.memory.restart')
                        }
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default MemoryGame;