import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Calculator } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CustomButton from './CustomButton';

const BMICalculator = () => {
    const { t } = useLanguage();
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmiResult] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState('');

    const calculateBMI = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height) / 100;

        if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {
            toast({
                title: "Error",
                description: "Please enter valid weight and height.",
                variant: "destructive",
            });
            return;
        }

        const bmi = weightNum / (heightNum * heightNum);
        setBmiResult(parseFloat(bmi.toFixed(2)));

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
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    {t('interactive.bmi.tab')}
                </CardTitle>
                <CardDescription>{t('interactive.bmi.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 ">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="weight">
                            {t('interactive.bmi.weight')}
                        </label>
                        <input
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="70"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="height">
                            {t('interactive.bmi.height')}
                        </label>
                        <input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="170"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                <CustomButton onClick={calculateBMI} text={t('interactive.bmi.button')} />
                {bmiResult !== null && (
                    <div className="w-full p-4 rounded-md bg-secondary">
                        <p className="font-bold text-lg">
                            {t('interactive.bmi.result')}: {bmiResult}
                        </p>
                        <p>{t('interactive.bmi.category')}: {bmiCategory}</p>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default BMICalculator;