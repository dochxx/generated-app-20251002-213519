import { useDataStore } from '@/store/useDataStore';
import { useShallow } from 'zustand/react/shallow';
import { ChartDisplay } from './ChartDisplay';
import { DataTable } from './DataTable';
import { UploadCloud } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
export function DataVisualizer() {
  const t = useTranslation();
  const { data } = useDataStore(
    useShallow((state) => ({
      data: state.data,
    }))
  );
  const hasData = data.length > 0;
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {hasData ? (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <DataTable />
          </div>
          <div>
            <ChartDisplay />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24 px-6 border-2 border-dashed border-border rounded-lg bg-card/50">
          <UploadCloud className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold tracking-tight">{t('welcomeToVizEdge')}</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            {t('getStarted')}
          </p>
        </div>
      )}
    </div>
  );
}