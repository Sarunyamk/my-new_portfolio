
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Dices, Calculator, Gamepad2, Dumbbell, Sparkles } from 'lucide-react';
import MemoryGame from './MemoryGame';
import BMICalculator from './BMICalculator';
import NumberGuessingGame from './NumberGuessingGame';
import RockPaperScissors from './RockPaperScissors';
import ColorMatcher from './ColorMatcher';


const InteractiveSection: React.FC = () => {
    const { t } = useLanguage();

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
                        <TabsList className="grid grid-cols-5 mb-8">
                            <TabsTrigger value="bmi" className="gap-2 hover:scale-105 transition duration-300 ">
                                <Calculator className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.bmi.tab')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="number-game" className="gap-2 hover:scale-105 transition duration-300">
                                <Dices className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.numberGame.tab')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="rps" className="gap-2 hover:scale-105 transition duration-300">
                                <Gamepad2 className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.rps.tab')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="color" className="gap-2 hover:scale-105 transition duration-300">
                                <Sparkles className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.colorGame.tab')}</span>
                            </TabsTrigger>

                            <TabsTrigger value="memory" className="gap-2 hover:scale-105 transition duration-300">
                                <Dumbbell className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:inline">{t('interactive.memory.tab')}</span>
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
                            <TabsContent value="memory">
                                <MemoryGame />
                            </TabsContent>
                        </div>
                    </Tabs>
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveSection;
