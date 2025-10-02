import { create } from 'zustand';
import { getNumericalColumns } from '@/lib/utils';
export type ChartType = 'bar' | 'line' | 'pie' | 'area';
export type DataRow = {
  [key: string]: string | number;
};
interface DataState {
  data: DataRow[];
  headers: string[];
  numericalColumns: string[];
  visibleColumns: string[];
  selectedChartType: ChartType;
  isLoading: boolean;
  error: string | null;
  fileName: string | null;
  columnFilters: Record<string, string[]>;
  setData: (data: DataRow[], fileName: string) => void;
  setSelectedChartType: (chartType: ChartType) => void;
  toggleColumnVisibility: (column: string) => void;
  setColumnFilter: (column: string, values: string[]) => void;
  clearColumnFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
const initialState = {
  data: [],
  headers: [],
  numericalColumns: [],
  visibleColumns: [],
  selectedChartType: 'bar' as ChartType,
  isLoading: false,
  error: null,
  fileName: null,
  columnFilters: {},
};
export const useDataStore = create<DataState>((set) => ({
  ...initialState,
  setData: (data, fileName) => {
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      const numericalColumns = getNumericalColumns(headers, data);
      set({
        data,
        headers,
        numericalColumns,
        visibleColumns: numericalColumns,
        fileName,
        error: null,
        isLoading: false,
        columnFilters: {},
      });
    } else {
      set({
        ...initialState,
        error: "No data found in the file or the file is empty.",
        isLoading: false,
      });
    }
  },
  setSelectedChartType: (chartType) => set({ selectedChartType: chartType }),
  toggleColumnVisibility: (column) =>
    set((state) => {
      const visibleColumns = state.visibleColumns.includes(column)
        ? state.visibleColumns.filter((c) => c !== column)
        : [...state.visibleColumns, column];
      return { visibleColumns };
    }),
  setColumnFilter: (column, values) =>
    set((state) => {
      const newFilters = { ...state.columnFilters };
      if (values.length > 0) {
        newFilters[column] = values;
      } else {
        delete newFilters[column];
      }
      return { columnFilters: newFilters };
    }),
  clearColumnFilters: () => set({ columnFilters: {} }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () => set(initialState),
}));