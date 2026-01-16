import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider';
import { themes, type ThemeName } from '../../config/themes';

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const { currentTheme, setTheme } = useTheme();
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close popover when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popoverRef.current &&
                buttonRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const handleThemeSelect = (themeName: ThemeName) => {
        setTheme(themeName);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <motion.button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                aria-label="Switch theme"
            >
                <Palette className="w-5 h-5" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={popoverRef}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-4 z-50"
                    >
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Choose Theme</h3>
                            <p className="text-xs text-gray-500 dark:text-dark-400 mt-0.5">
                                Select your visual style
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {Object.values(themes).map((theme) => (
                                <motion.button
                                    key={theme.id}
                                    onClick={() => handleThemeSelect(theme.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${currentTheme === theme.id
                                            ? 'border-primary-500 bg-primary-500/5'
                                            : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-gray-50 dark:bg-white/5'
                                        }`}
                                >
                                    {/* Preview Gradient */}
                                    <div
                                        className={`w-full h-16 rounded-lg mb-3 bg-gradient-to-br ${theme.previewGradient}`}
                                    />

                                    {/* Theme Info */}
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {theme.name}
                                            </h4>
                                            {currentTheme === theme.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                                                >
                                                    <Check className="w-3 h-3 text-white" />
                                                </motion.div>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-dark-400">
                                            {theme.mood}
                                        </p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10">
                            <p className="text-xs text-gray-400 dark:text-dark-500 text-center">
                                Theme persists across sessions
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
