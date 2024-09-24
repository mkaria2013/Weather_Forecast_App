# Weather Forecast App

## Overview

The Weather Forecast App is a modern React application that provides current weather conditions and forecasts using the OpenWeatherMap API. The app includes a map feature to visualize the location of the searched city. Tailwind CSS is used for styling, and Axios handles HTTP requests.

## Features

- **Current Weather**: Displays current weather conditions, including temperature, humidity, and weather description.
- **5-Day Forecast**: Provides a detailed weather forecast for the next 5 days.
- **Location Search**: Allows users to search for weather information by city name.
- **Interactive Map**: Shows the location of the city on an interactive map.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **Vite**: Next-generation frontend tool for fast builds and development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making requests.
- **OpenWeatherMap API**: Provides weather data.
- **Leaflet**: Open-source JavaScript library for interactive maps.
- **React-Leaflet**: React components for Leaflet maps.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn (npm is included with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tejdekiwadiya/Weather_Forecast_App.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Weather_Forcast
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. **Create a `.env` file in the root directory of the project and add your OpenWeatherMap API key:**

   ```env
   VITE_API_KEY=your-api-key-here
   ```

5. **Start the development server:**

   ```bash
    npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Tailwind CSS Configuration

1. **Ensure Tailwind CSS is installed**. If it's not already set up, you can install it via npm:

   ```bash
   npm install tailwindcss
   ```

   or

   ```bash
   yarn add tailwindcss
   ```

2. **Initialize Tailwind CSS** if you haven’t already:

   ```bash
   npx tailwindcss init
   ```

3. **Configure Tailwind to remove unused styles in production** by editing `tailwind.config.js`:

   ```javascript
   /** @type {import('tailwindcss').Config} */
    export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        fontFamily: {
            montserrat: ['Montserrat', 'sans-serif'],
        },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
    }
   ```

4. **Include Tailwind CSS in your project** by adding the following lines to your `src/index.css` (or `src/index.scss` if you are using SCSS):

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Usage

1. **Search for a Location**: Enter a city name into the search bar and press Enter or click the search button.
2. **View Weather Details**: The current weather and 7-day forecast will be displayed for the entered city.
3. **Interactive Map**: The city location will be shown on an interactive map for better visualization.

## API Usage

The application uses the OpenWeatherMap API to fetch weather data. Ensure you have a valid API key and adhere to their usage limits and guidelines provided by OpenWeatherMap.

## Map Integration

The map feature uses Leaflet and React-Leaflet to display the location of the searched city. Ensure that you have included the Leaflet CSS and installed the necessary dependencies.

## Contributing

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Make your changes** and commit them (`git commit -am 'Add new feature'`).
4. **Push to the branch** (`git push origin feature-branch`).
5. **Open a pull request**.

## Contact

For questions or issues, please open an issue on the GitHub repository or contact the maintainer at [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/tejdekiwadiya)