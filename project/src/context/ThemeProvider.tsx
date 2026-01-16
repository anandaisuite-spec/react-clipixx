import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { themes, defaultTheme, type ThemeName } from '../config/themes';

interface ThemeContextType {
    currentTheme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    themeData: typeof themes[ThemeName];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('clippixx-theme') as ThemeName | null;
            if (stored && Object.keys(themes).includes(stored)) {
                return stored;
            }
        }
        return defaultTheme;
    });

    const themeData = themes[currentTheme];

    useEffect(() => {
        const root = document.documentElement;

        // Apply theme data attribute
        root.setAttribute('data-theme', currentTheme);

        // Apply CSS custom properties for smooth transitions
        root.style.setProperty('--theme-gradient', themeData.gradient);
        root.style.setProperty('--theme-primary', themeData.colors.primary);
        root.style.setProperty('--theme-accent', themeData.colors.accent);
        root.style.setProperty('--theme-surface', themeData.colors.surface);
        root.style.setProperty('--theme-text', themeData.colors.text);

        // Enable transitions
        root.style.setProperty('transition', 'background 300ms ease, color 300ms ease');
    }, [currentTheme, themeData]);

    const setTheme = (theme: ThemeName) => {
        setCurrentTheme(theme);
        localStorage.setItem('clippixx-theme', theme);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, themeData }}>
            {children}
        </ThemeContext.Provider>
    );
}
