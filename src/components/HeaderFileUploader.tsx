import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDataStore } from '@/store/useDataStore';
import { parseFile } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, RotateCcw } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useTranslation } from '@/lib/i18n';
export function HeaderFileUploader() {
  const t = useTranslation();
  const { setData, setLoading, setError, isLoading, fileName, reset } = useDataStore(
    useShallow((state) => ({
      setData: state.setData,
      setLoading: state.setLoading,
      setError: state.setError,
      isLoading: state.isLoading,
      fileName: state.fileName,
      reset: state.reset,
    }))
  );
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    const file = acceptedFiles[0];
    setLoading(true);
    try {
      const data = await parseFile(file);
      setData(data, file.name);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }, [setData, setLoading, setError]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
  });
  if (fileName) {
    return (
      <Button onClick={reset} variant="outline" size="sm">
        <RotateCcw className="mr-2 h-4 w-4" />
        {t('newFile')}
      </Button>
    );
  }
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant="default" size="sm" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Upload className="mr-2 h-4 w-4" />
        )}
        {isLoading ? t('processing') : isDragActive ? t('dropFileHere') : t('uploadFile')}
      </Button>
    </div>
  );
}