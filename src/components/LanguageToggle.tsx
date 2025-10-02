import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/button';
export function LanguageToggle() {
  const { lang, toggleLang } = useUIStore();
  return (
    <Button onClick={toggleLang} variant="ghost" size="sm" className="w-12">
      {lang.toUpperCase()}
    </Button>
  );
}