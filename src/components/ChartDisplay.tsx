import React from 'react';
import { useDataStore, ChartType } from '@/store/useDataStore';
import { useShallow } from 'zustand/react/shallow';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];
export function ChartDisplay() {
  const t = useTranslation();
  const { data, selectedChartType, numericalColumns, visibleColumns, toggleColumnVisibility } = useDataStore(
    useShallow((state) => ({
      data: state.data,
      selectedChartType: state.selectedChartType,
      numericalColumns: state.numericalColumns,
      visibleColumns: state.visibleColumns,
      toggleColumnVisibility: state.toggleColumnVisibility,
    }))
  );
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0 || numericalColumns.length === 0) {
      return [];
    }
    return data.map((row, index) => {
      const dataPoint: { name: string; [key: string]: string | number } = {
        name: `Row ${index + 1}`,
      };
      numericalColumns.forEach(col => {
        dataPoint[col] = Number(row[col]) || 0;
      });
      return dataPoint;
    });
  }, [data, numericalColumns]);
  const pieChartData = React.useMemo(() => {
    if (!data || data.length === 0 || numericalColumns.length === 0) {
      return [];
    }
    const firstNumericalColumn = numericalColumns[0];
    return data.map((row, index) => ({
      name: `Row ${index + 1}`,
      value: Number(row[firstNumericalColumn]) || 0,
    }));
  }, [data, numericalColumns]);
  const renderEmptyState = (title: string, message: string, icon: React.ReactNode) => (
    <Card className="h-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
          {icon}
          <p className="text-lg font-medium mt-4">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {payload.map((entry: any, index: number) => {
          const { dataKey, color } = entry;
          const isVisible = visibleColumns.includes(dataKey);
          return (
            <li
              key={`item-${index}`}
              onClick={() => toggleColumnVisibility(dataKey)}
              className={cn(
                "flex items-center cursor-pointer transition-opacity",
                !isVisible && "opacity-50"
              )}
            >
              <span style={{ backgroundColor: color, width: '10px', height: '10px', display: 'inline-block', marginRight: '8px', borderRadius: '2px' }}></span>
              <span className="text-sm">
                {dataKey}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };
  if (data.length === 0) {
    return renderEmptyState(t('chart'), t('uploadToVisualize'), <BarChart2 className="h-16 w-16" />);
  }
  if (numericalColumns.length === 0) {
    return renderEmptyState(t('noNumericalData'), t('noNumericalDataDesc'), <AlertTriangle className="h-16 w-16 text-yellow-500" />);
  }
  const activeNumericalColumns = numericalColumns.filter(col => visibleColumns.includes(col));
  const renderChart = (type: ChartType) => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend content={renderCustomLegend} />
            {activeNumericalColumns.map((col, index) => (
              <Bar key={col} dataKey={col} fill={CHART_COLORS[index % CHART_COLORS.length]} name={col} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend content={renderCustomLegend} />
            {activeNumericalColumns.map((col, index) => (
              <Line key={col} type="monotone" dataKey={col} stroke={CHART_COLORS[index % CHART_COLORS.length]} name={col} dot={false} />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend content={renderCustomLegend} />
            {activeNumericalColumns.map((col, index) => (
              <Area key={col} type="monotone" dataKey={col} stroke={CHART_COLORS[index % CHART_COLORS.length]} fill={CHART_COLORS[index % CHART_COLORS.length]} fillOpacity={0.3} name={col} />
            ))}
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8" label>
              {pieChartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend formatter={() => t('pieLegend', numericalColumns[0])} />
          </PieChart>
        );
      default:
        return null;
    }
  };
  return (
    <Card className="h-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold capitalize">{t(`${selectedChartType}Chart` as any)}</CardTitle>
        <CardDescription>
          {selectedChartType === 'pie'
            ? t('pieChartDesc', numericalColumns[0])
            : t('multiSeriesDesc', numericalColumns.length)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          {renderChart(selectedChartType)}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}