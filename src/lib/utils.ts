import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as XLSX from 'xlsx';
import { DataRow } from '@/store/useDataStore';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const parseFile = (file: File): Promise<DataRow[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryStr = event.target?.result;
        if (!binaryStr) {
          reject(new Error("File content is empty."));
          return;
        }
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json<DataRow>(worksheet);
        resolve(json);
      } catch (error) {
        reject(new Error("Failed to parse the file. Please ensure it's a valid CSV or XLSX file."));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };
    reader.readAsBinaryString(file);
  });
};
export const getNumericalColumns = (headers: string[], data: DataRow[]): string[] => {
  const numericalColumns: string[] = [];
  if (data.length === 0) return numericalColumns;
  headers.forEach(header => {
    let numericalCount = 0;
    const sampleSize = Math.min(data.length, 100); // Check up to 100 rows for performance
    for (let i = 0; i < sampleSize; i++) {
      const value = data[i][header];
      // Check if value is not null, not an empty string, and is a number
      if (value !== null && value !== '' && !isNaN(Number(value))) {
        numericalCount++;
      }
    }
    // Consider a column numerical if at least 80% of the sample is numerical
    if (sampleSize > 0 && (numericalCount / sampleSize) >= 0.8) {
      numericalColumns.push(header);
    }
  });
  return numericalColumns;
};