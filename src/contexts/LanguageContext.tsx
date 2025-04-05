import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

// Simplified translations object
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'profile.title': 'Hello, I am',
        'profile.subtitle1': 'Frontend Developer',
        'profile.subtitle2': 'UX/UI Designer',
        'profile.subtitle3': 'Problem Solver',
        'profile.description': 'I design and build beautiful, responsive web applications with a focus on user experience.',
        'skills.title': 'My Skills',
        'projects.title': 'My Projects',
        'contact.title': 'Get in Touch',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.subject': 'Subject',
        'contact.message': 'Message',
        'contact.submit': 'Send Message',
        'contact.success': 'Message sent successfully!',
        'contact.error': 'There was an error sending your message. Please try again.',
    },
    th: {
        'nav.home': 'หน้าหลัก',
        'nav.skills': 'ทักษะ',
        'nav.projects': 'โปรเจกต์',
        'nav.contact': 'ติดต่อ',
        'profile.title': 'สวัสดี, ฉันคือ',
        'profile.subtitle1': 'นักพัฒนาเว็บไซต์',
        'profile.subtitle2': 'นักออกแบบประสบการณ์ผู้ใช้',
        'profile.subtitle3': 'นักแก้ไขปัญหา',
        'profile.description': 'ฉันออกแบบและสร้างเว็บแอปพลิเคชันที่สวยงาม ตอบสนองได้ดี โดยเน้นที่ประสบการณ์ผู้ใช้',
        'skills.title': 'ทักษะของฉัน',
        'projects.title': 'โปรเจกต์ของฉัน',
        'contact.title': 'ติดต่อฉัน',
        'contact.name': 'ชื่อ',
        'contact.email': 'อีเมล',
        'contact.subject': 'หัวข้อ',
        'contact.message': 'ข้อความ',
        'contact.submit': 'ส่งข้อความ',
        'contact.success': 'ส่งข้อความสำเร็จ!',
        'contact.error': 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองอีกครั้ง',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language | null;
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string): string => {
        const translation = translations[language][key as keyof typeof translations[typeof language]];
        return translation || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
