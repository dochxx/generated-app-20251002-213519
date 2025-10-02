import { create } from 'zustand';
type Language = 'en' | 'tr';
interface UIState {
  lang: Language;
  tableTheme: string;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  setTableTheme: (theme: string) => void;
}
export const useUIStore = create<UIState>((set) => ({
  lang: 'en',
  tableTheme: 'default',
  toggleLang: () => set((state) => ({ lang: state.lang === 'en' ? 'tr' : 'en' })),
  setLang: (lang) => set({ lang }),
  setTableTheme: (theme) => set({ tableTheme: theme }),
}));