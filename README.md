# VizEdge: Dynamic Data Visualizer

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dochxx/generated-app-20251002-213519)

VizEdge is a sophisticated, single-page web application designed for rapid data visualization. It empowers users to upload CSV or XLSX files and instantly generate interactive charts and a corresponding data table. The core principle is a unique 'No-XY' visualization model where the chart's X-axis represents the data's row index, and the Y-axis plots the values from a single, user-selected numerical column. The interface is meticulously crafted for an intuitive experience, featuring a sleek two-panel layout with the chart on the left and the data table on the right. A centralized control panel at the top allows for dynamic selection of numerical columns and chart types (Bar, Line, Pie), with all visualizations updating in real-time.

## Key Features

-   **Instant File Visualization:** Upload CSV or XLSX files and see charts and tables generated immediately.
-   **Unique "No-XY" Charting:** Visualizes data from a single numerical column against its row index, offering a unique perspective on sequential data.
-   **Interactive Controls:** Dynamically switch between numerical columns and chart types (Bar, Line, Pie) with real-time updates.
-   **Dual-Panel Layout:** A clean, intuitive interface with a large chart display and a scrollable raw data table.
-   **Client-Side Processing:** All data parsing and visualization happens in your browser, ensuring data privacy and speed.
-   **Modern & Responsive:** Built with a stunning, modern design that works flawlessly on all devices.

## Technology Stack

-   **Framework:** React (with Vite)
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Charting:** Recharts
-   **State Management:** Zustand
-   **File Parsing:** SheetJS (xlsx)
-   **File Uploads:** react-dropzone
-   **Animations:** Framer Motion
-   **Icons:** Lucide React
-   **Deployment:** Cloudflare Pages & Workers

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/vizedge-dynamic-data-visualizer.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd vizedge-dynamic-data-visualizer
    ```
3.  **Install dependencies:**
    ```bash
    bun install
    ```

### Running Locally

To start the development server, run the following command:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1.  Open the application in your browser.
2.  Drag and drop a `.csv` or `.xlsx` file onto the designated area, or click to open the file selector.
3.  Once the file is processed, a default chart (Bar chart of the first numerical column) and the full data table will be displayed.
4.  Use the "Select Column" dropdown to choose a different numerical column to visualize.
5.  Use the "Select Chart Type" dropdown to switch between Bar, Line, and Pie charts.
6.  The chart will update instantly with each selection.

## Development

-   **Linting:** To check for code quality and style issues, run:
    ```bash
    bun run lint
    ```
-   **Building for Production:** To create a production-ready build of the application, run:
    ```bash
    bun run build
    ```
    The output will be in the `dist` directory.

## Deployment

This project is optimized for deployment on the Cloudflare network.

### One-Click Deploy

You can deploy this application to your own Cloudflare account with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dochxx/generated-app-20251002-213519)

### Manual Deployment with Wrangler

1.  **Login to Wrangler:**
    ```bash
    bunx wrangler login
    ```
2.  **Deploy the application:**
    ```bash
    bun run deploy
    ```
    This command will build the application and deploy it to Cloudflare Pages, as configured in `wrangler.toml`.

## License

This project is licensed under the MIT License.