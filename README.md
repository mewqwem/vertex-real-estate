
# RealVertexEstate 🏘️

Vertex Real Estate is a modern platform for searching for real estate (apartments, houses, cottages, and other properties).


## Demo

Live Demo: https://vertex-real-estate-nu.vercel.app/

Backend repository: https://github.com/mewqwem/vertex-real-estate-back


## What site visitors can do:
Search for apartments and houses - easily filter by:

- Location (address)

- Price (from-to)

- Type (apartment, house, cottage, etc.)

- Transactions (buy or rent)

- Number of rooms

- Area

View details of each property:

- Photo gallery with all pictures

- Exact location on Google map

- Description and main characteristics

- Amenities and features (Wi-Fi, parking, air conditioning, 24/7 security, etc.)

- Price, number of rooms, floor

Easy to search on mobile and computer
## Tech Stack

### Core Technologies
*   **Next.js 16.2.4** — React framework for Server-Side Rendering (SSR) and Static Site Generation (SSG)
*   **React** — UI library
*   **React DOM** — For rendering React components in the browser
*   **TypeScript** — Static typing
*   **Node.js** — For ESM modules

### UI & Components
*   **react-icons** — SVG icon set
*   **swiper** — Slider/carousel component for images
*   **rc-slider** — Slider component for price filters
*   **react-loader-spinner** — Loading spinner component
*   **yet-another-react-lightbox** — Lightbox modal for image viewing

### Forms & Validation
*   **formik** — Form state management
*   **yup** — Object schema validation

### API & Data Fetching
*   **axios** — Promise-based HTTP client for API requests
*   **@tanstack/react-query** — Powerful asynchronous state management, caching, and data synchronization

### Maps
*   **@vis.gl/react-google-maps** — Declarative Google Maps integration

### Development Tools
*   **ESLint** — Static code analysis and linting
*   **eslint-config-next** — ESLint configuration for Next.js
*   **babel-plugin-react-compiler** — React Compiler plugin for automatic performance optimization## 🛠️ Installation & Setup

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/mewqwem/vertex-real-estate
cd vertex-real-estate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Create a .env.local file in the root directory of the frontend project and add your API keys and configuration credentials:

```bash
# Database Connection
MONGODB_URI=your_mongodb_connection_string

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Backend API URL (if Node.js is running as a separate service)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the Development Server
Start the local development server with the following command:

```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the application in action.
## Build & Deployment

To create a production-ready build:

```bash
  npm run build
  npm run start
```


## Author

Oleh

Student & Full-stack Developer.

- [@mewqwem](https://github.com/mewqwem)

