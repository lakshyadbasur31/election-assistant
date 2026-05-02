# 🗳️ Election Process Assistant

A premium, high-contrast digital tool designed for the **Civic Education Challenge**. This application serves as a comprehensive guide for voters, empowering them through interactive process management and digital civic resources.

## 🏛️ Civic Education Vertical

In the digital age, civic participation is often hindered by fragmented information and complex bureaucratic processes. This tool addresses these barriers by:

1.  **Simplifying the Journey**: Demystifying the path from registration to results.
2.  **Contextual Tools**: Providing mock integrations that simulate real-world voter interactions (Maps & Calendar).
3.  **Extreme Accessibility**: Utilizing high-contrast design (Black/White/Neon) to ensure readability for all users, regardless of visual conditions or device quality.

## 🚀 Key Features

### 🗓️ Election Countdown
Calculates days until the next major election (**November 3, 2026**). It uses real-time browser logic to provide an immediate sense of urgency and preparation.

### 🗺️ Interactive Journey Map
A 4-step interactive stepper that guides users through:
- **Voter Registration**: Direct links to status checks and deadlines.
- **Research**: Non-partisan guide discovery.
- **Voting**: Logistics and polling place preparation.
- **Results**: Post-election reporting and certification.

### 📍 Polling Station Locator (Mock Google Maps)
A simulated integration of the Google Maps API. It allows users to:
- Enter a Zip Code.
- View a mocked map interface with simulated markers.
- Get simulated distance and hours of operation.

### 🔔 Election Reminder (Mock Google Calendar)
A simulated Google Calendar integration that "syncs" the election schedule. It demonstrates how digital calendars can be used to prevent voter disenfranchisement caused by missed deadlines.

## 🛠️ Technical Logic

-   **Framework**: React 19 + Vite 8.
-   **Styling**: Tailwind CSS 4 (High-Contrast Theme).
-   **Icons**: Lucide-React for accessible, scalable vector graphics.
-   **Logic**: 
    -   `Date` object manipulation for the countdown timer.
    -   `useState` hooks for managing interactive stepper and search states.
    -   `setTimeout` simulations to mimic asynchronous API calls (Maps/Calendar).

## 🏃 Getting Started

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run in development mode**:
    ```bash
    npm run dev
    ```

---

*Built for the 2026 Civic Education Challenge. Total repository size optimized under 10MB.*
