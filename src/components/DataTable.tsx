import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { useUIStore } from '@/store/useUIStore';
import { useShallow } from 'zustand/react/shallow';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, Filter, ChevronDown, XCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
export function DataTable() {
  const t = useTranslation();
  const { data, headers, fileName, columnFilters, setColumnFilter, clearColumnFilters } = useDataStore(
    useShallow((state) => ({
      data: state.data,
      headers: state.headers,
      fileName: state.fileName,
      columnFilters: state.columnFilters,
      setColumnFilter: state.setColumnFilter,
      clearColumnFilters: state.clearColumnFilters,
    }))
  );
  const { tableTheme, setTableTheme } = useUIStore(
    useShallow((state) => ({
      tableTheme: state.tableTheme,
      setTableTheme: state.setTableTheme,
    }))
  );
  const uniqueColumnValues = React.useMemo(() => {
    const columnValues: Record<string, string[]> = {};
    headers.forEach(header => {
      const values = new Set(data.map(row => String(row[header])));
      columnValues[header] = Array.from(values);
    });
    return columnValues;
  }, [data, headers]);
  const filteredData = React.useMemo(() => {
    if (Object.keys(columnFilters).length === 0) return data;
    return data.filter(row => {
      return Object.entries(columnFilters).every(([column, values]) => {
        if (values.length === 0) return true;
        return values.includes(String(row[column]));
      });
    });
  }, [data, columnFilters]);
  const getRowStyle = (theme: string) => {
    const styleMap: Record<string, string> = {
      blue: 'hsl(var(--table-stripe-blue))',
      green: 'hsl(var(--table-stripe-green))',
      red: 'hsl(var(--table-stripe-red))',
      purple: 'hsl(var(--table-stripe-purple))',
      orange: 'hsl(var(--table-stripe-orange))',
      yellow: 'hsl(var(--table-stripe-yellow))',
      default: 'hsl(var(--table-stripe-default))',
    };
    return { '--stripe-color': styleMap[theme] || styleMap.default } as React.CSSProperties;
  };
  const handleFilterValueChange = (column: string, value: string) => {
    const currentValues = columnFilters[column] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setColumnFilter(column, newValues);
  };
  const activeFilterCount = Object.values(columnFilters).filter(v => v.length > 0).length;
  if (data.length === 0) {
    return (
      <Card className="h-full shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{t('dataTable')}</CardTitle>
          <CardDescription>{t('uploadToSeeContents')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
            <Sheet className="h-16 w-16 mb-4" />
            <p className="text-lg font-medium">{t('noDataToDisplay')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="h-full shadow-md flex flex-col">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div>
            <CardTitle className="text-2xl font-semibold">{t('dataTable')}</CardTitle>
            <CardDescription className="truncate">
              {t('displayingRows', filteredData.length, fileName || '')} <span className="font-medium text-primary">{fileName}</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearColumnFilters} className="relative">
                <XCircle className="mr-2 h-4 w-4" />
                {t('clearFilters')}
                <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5">{activeFilterCount}</Badge>
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Label htmlFor="table-theme-select" className="text-sm font-medium sr-only md:not-sr-only">{t('tableTheme')}</Label>
              <Select value={tableTheme} onValueChange={setTableTheme}>
                <SelectTrigger id="table-theme-select" className="w-[120px]">
                  <SelectValue placeholder={t('tableTheme')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{t('defaultTheme')}</SelectItem>
                  <SelectItem value="blue">{t('blueTheme')}</SelectItem>
                  <SelectItem value="green">{t('greenTheme')}</SelectItem>
                  <SelectItem value="red">{t('redTheme')}</SelectItem>
                  <SelectItem value="purple">{t('purpleTheme')}</SelectItem>
                  <SelectItem value="orange">{t('orangeTheme')}</SelectItem>
                  <SelectItem value="yellow">{t('yellowTheme')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header} className="whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="px-2 py-1 h-auto -ml-2">
                          {header}
                          <ChevronDown className="ml-2 h-4 w-4" />
                          {columnFilters[header]?.length > 0 && <Filter className="ml-2 h-3 w-3 text-primary" />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <ScrollArea className="h-64">
                          {uniqueColumnValues[header].map(value => (
                            <DropdownMenuCheckboxItem
                              key={value}
                              checked={columnFilters[header]?.includes(value) || false}
                              onCheckedChange={() => handleFilterValueChange(header, value)}
                              onSelect={(e) => e.preventDefault()}
                            >
                              {value}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </ScrollArea>
                        <DropdownMenuSeparator />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setColumnFilter(header, [])}
                          disabled={!columnFilters[header] || columnFilters[header].length === 0}
                        >
                          Clear
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="odd:bg-[--stripe-color]" style={getRowStyle(tableTheme)}>
                  {headers.map((header) => (
                    <TableCell key={`${rowIndex}-${header}`} className="whitespace-nowrap">{String(row[header])}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}