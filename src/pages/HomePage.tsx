import { DataVisualizer } from "@/components/DataVisualizer";
import { HeaderFileUploader } from "@/components/HeaderFileUploader";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";
import { useDataStore, ChartType } from "@/store/useDataStore";
import { BarChart3 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
export function HomePage() {
  const t = useTranslation();
  const { hasData, selectedChartType, setSelectedChartType } = useDataStore(
    useShallow((state) => ({
      hasData: state.data.length > 0,
      selectedChartType: state.selectedChartType,
      setSelectedChartType: state.setSelectedChartType,
    }))
  );
  return (
    <div className="min-h-screen w-full bg-background text-foreground relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-2xl dark:bg-primary/10"></div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[hsl(var(--header-background))] text-primary-foreground shadow-md">
        <div className="container flex h-14 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-2xl font-bold font-display tracking-tight">{t('vizEdgeTitle')}</h1>
          </div>
          <div className="flex items-center gap-2">
            {hasData && (
              <div className="flex items-center gap-2">
                <Label htmlFor="chart-type-select" className="text-sm font-medium sr-only md:not-sr-only">{t('chartType')}</Label>
                <Select
                  value={selectedChartType}
                  onValueChange={(value) => setSelectedChartType(value as ChartType)}
                >
                  <SelectTrigger id="chart-type-select" className="w-[150px] bg-background/20 border-primary-foreground/50 text-primary-foreground placeholder:text-primary-foreground/80 focus:ring-primary-foreground">
                    <SelectValue placeholder={t('chartType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">{t('barChart')}</SelectItem>
                    <SelectItem value="line">{t('lineChart')}</SelectItem>
                    <SelectItem value="area">{t('areaChart')}</SelectItem>
                    <SelectItem value="pie">{t('pieChart')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <HeaderFileUploader />
            <LanguageToggle />
            <ThemeToggle className="relative" />
          </div>
        </div>
      </header>
      <main>
        <DataVisualizer />
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            {t('builtWithLove')}
          </p>
        </div>
      </footer>
    </div>
  );
}