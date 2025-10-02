import { useUIStore } from '@/store/useUIStore';
const translations = {
  en: {
    // Header & Footer
    vizEdgeTitle: 'VizEdge',
    uploadFile: 'Upload File',
    processing: 'Processing...',
    dropFileHere: 'Drop file here',
    newFile: 'New File',
    builtWithLove: 'Built with ❤�� at Cloudflare',
    chartType: 'Chart Type',
    // Chart Types
    barChart: 'Bar Chart',
    lineChart: 'Line Chart',
    pieChart: 'Pie Chart',
    areaChart: 'Area Chart',
    // Data Visualizer Empty State
    welcomeToVizEdge: 'Welcome to VizEdge',
    getStarted: 'To get started, upload a CSV or XLSX file using the "Upload File" button in the header. Your data will be instantly visualized here.',
    // Chart Display
    chart: 'Chart',
    uploadToVisualize: 'Upload a file to visualize the data.',
    noNumericalData: 'No Numerical Data',
    noNumericalDataDesc: 'The uploaded file does not contain any numerical columns to chart.',
    pieChartDesc: (col: string) => `Visualizing distribution of the first numerical column: ${col}`,
    multiSeriesDesc: (count: number) => `Visualizing all ${count} numerical columns.`,
    pieLegend: (col: string) => `Values from ${col}`,
    // Data Table
    dataTable: 'Data Table',
    uploadToSeeContents: 'Upload a file to see its contents here.',
    noDataToDisplay: 'No data to display',
    displayingRows: (count: number, fileName: string) => `Displaying ${count} rows from`,
    tableTheme: 'Table Theme',
    defaultTheme: 'Default',
    blueTheme: 'Blue',
    greenTheme: 'Green',
    redTheme: 'Red',
    purpleTheme: 'Purple',
    orangeTheme: 'Orange',
    yellowTheme: 'Yellow',
    // Advanced Filters
    filters: 'Filters',
    selectColumn: 'Select column...',
    selectValues: 'Select values...',
    clearFilters: 'Clear Filters',
    noValuesFound: 'No values found.',
    // File Uploader Errors
    parseError: "Failed to parse the file. Please ensure it's a valid CSV or XLSX file.",
    readError: "Failed to read the file.",
    emptyError: "File content is empty.",
  },
  tr: {
    // Header & Footer
    vizEdgeTitle: 'VizEdge',
    uploadFile: 'Dosya Yükle',
    processing: 'İşleniyor...',
    dropFileHere: 'Dosyayı buraya bırak��n',
    newFile: 'Yeni Dosya',
    builtWithLove: 'Cloudflare\'de ❤️ ile geliştirildi',
    chartType: 'Grafik Türü',
    // Chart Types
    barChart: 'Çubuk Grafik',
    lineChart: 'Çizgi Grafik',
    pieChart: 'Pasta Grafik',
    areaChart: 'Alan Grafiği',
    // Data Visualizer Empty State
    welcomeToVizEdge: 'VizEdge\'e Hoş Geldiniz',
    getStarted: 'Başlamak için üst bilgideki "Dosya Yükle" düğmesini kullanarak bir CSV veya XLSX dosyası yükleyin. Verileriniz burada anında görselleştirilecektir.',
    // Chart Display
    chart: 'Grafik',
    uploadToVisualize: 'Verileri görselleştirmek için bir dosya yükleyin.',
    noNumericalData: 'Sayısal Veri Yok',
    noNumericalDataDesc: 'Yüklenen dosya, grafik oluşturulacak herhangi bir sayısal sütun içermiyor.',
    pieChartDesc: (col: string) => `İlk sayısal sütunun dağılımı görselleştiriliyor: ${col}`,
    multiSeriesDesc: (count: number) => `Tüm ${count} sayısal sütun görselleştiriliyor.`,
    pieLegend: (col: string) => `${col} sütunundan değerler`,
    // Data Table
    dataTable: 'Veri Tablosu',
    uploadToSeeContents: 'İçeriğini görmek için bir dosya yükleyin.',
    noDataToDisplay: 'Görüntülenecek veri yok',
    displayingRows: (count: number, fileName: string) => `dosyasından ${count} satır görüntüleniyor`,
    tableTheme: 'Tablo Teması',
    defaultTheme: 'Varsayılan',
    blueTheme: 'Mavi',
    greenTheme: 'Yeşil',
    redTheme: 'Kırmızı',
    purpleTheme: 'Mor',
    orangeTheme: 'Turuncu',
    yellowTheme: 'Sarı',
    // Advanced Filters
    filters: 'Filtreler',
    selectColumn: 'Sütun seçin...',
    selectValues: 'Değerleri seçin...',
    clearFilters: 'Filtreleri Temizle',
    noValuesFound: 'Değer bulunamadı.',
    // File Uploader Errors
    parseError: "Dosya ayrıştırılamadı. Lütfen geçerli bir CSV veya XLSX dosyası olduğundan emin olun.",
    readError: "Dosya okunamadı.",
    emptyError: "Dosya içeriği boş.",
  },
};
export const useTranslation = () => {
  const lang = useUIStore((state) => state.lang);
  return (key: keyof typeof translations.en, ...args: any[]) => {
    const translation = translations[lang][key] || translations.en[key];
    if (typeof translation === 'function') {
      return (translation as (...args: any[]) => string)(...args);
    }
    return translation;
  };
};