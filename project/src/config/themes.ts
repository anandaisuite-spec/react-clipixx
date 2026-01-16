export type ThemeName = 'aurora' | 'noir' | 'pearl' | 'pulse';

export interface Theme {
    id: ThemeName;
    name: string;
    mood: string;
    gradient: string;
    previewGradient: string;
    colors: {
        primary: string;
        accent: string;
        surface: string;
        text: string;
    };
}

export const themes: Record<ThemeName, Theme> = {
    aurora: {
        id: 'aurora',
        name: 'Aurora',
        mood: 'Cinematic • Modern',
        gradient: 'linear-gradient(to right top, #f5f0ff, #f0e8ff, #ece4ff, #e8e0ff, #e4dcff, #dfe0ff, #dae4ff, #d6e8ff, #ceeeff, #c6f4ff, #c0f9fc, #bdfdf5)',
        previewGradient: 'from-purple-200 via-blue-200 to-cyan-200',
        colors: {
            primary: '#8b5cf6',
            accent: '#06b6d4',
            surface: 'rgba(139, 92, 246, 0.05)',
            text: '#1f2937',
        },
    },
    noir: {
        id: 'noir',
        name: 'Noir',
        mood: 'Luxury • Dramatic',
        gradient: 'linear-gradient(to right top, #000000, #0a0a0a, #111111, #1a1a1a, #1f1f1f, #212121, #242424, #262626, #262626, #272727, #272727, #282828)',
        previewGradient: 'from-black via-gray-900 to-gray-800',
        colors: {
            primary: '#d4af37',
            accent: '#fbbf24',
            surface: 'rgba(212, 175, 55, 0.1)',
            text: '#ffffff',
        },
    },
    pearl: {
        id: 'pearl',
        name: 'Pearl',
        mood: 'Editorial • Minimal',
        gradient: 'linear-gradient(to right top, #ffffff, #fefefe, #fdfdfd, #fcfcfc, #fafafa, #f7f7f7, #f5f5f5, #f2f2f2, #eeeeee, #eaeaea, #e6e6e6, #e2e2e2)',
        previewGradient: 'from-white via-gray-50 to-gray-100',
        colors: {
            primary: '#374151',
            accent: '#6b7280',
            surface: 'rgba(55, 65, 81, 0.03)',
            text: '#111827',
        },
    },
    pulse: {
        id: 'pulse',
        name: 'Pulse',
        mood: 'Bold • Creator-First',
        gradient: 'linear-gradient(to right top, #0f0f23, #110f2a, #130e30, #150d37, #170c3d, #1a0f42, #1d1247, #20144c, #251a52, #2a1f57, #2f255d, #352a62)',
        previewGradient: 'from-indigo-950 via-purple-900 to-violet-900',
        colors: {
            primary: '#06b6d4',
            accent: '#ec4899',
            surface: 'rgba(6, 182, 212, 0.1)',
            text: '#ffffff',
        },
    },
};

export const defaultTheme: ThemeName = 'aurora';
