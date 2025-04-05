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
        'nav.interactive': 'interactive',
        'button.cv': 'Download CV',
        'button.contact': 'Contact Me',
        'profile.title': 'Hello, I am a web developer',
        'profile.name': 'Sarunya Vajapattana',
        'profile.aboutDesc': `specializing in React and Node.js, seeking a position as a Full Stack Developer. I am passionate about this field and enjoy developing websites while continuously learning new skills to meet the company's needs. I aspire to be a part of creating high-quality and impactful projects for your company`,
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
        'nav.interactive': 'interactive',
        'button.cv': 'ดาวน์โหลด CV',
        'button.contact': 'ติดต่อฉัน',
        'profile.title': 'สวัสดี, ฉันคือนักพัฒนาเว็บไซต์',
        'profile.name': 'ศรัณยา วาจาพัฒนา',
        'profile.aboutDesc': 'ที่มีความเชี่ยวชาญใน React และ Node.js ซึ่งกำลังมองหาตำแหน่ง Full Stack Developer โดยส่วนตัวแล้วมิ้งชอบในสายงานนี้และอยากเป็นส่วนหนึ่งในการพัฒนาเว็บไซต์ พร้อมกับการเรียนรู้ทักษะใหม่ๆอยู่ตลอด  เพื่อตอบสนองความต้องการของบริษัท  และ อยากเป็นส่วนหนึ่งในการสร้างโปรเจกต์ที่ดีและมีประโยชน์ต่อบริษัทในอนาคต',
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
