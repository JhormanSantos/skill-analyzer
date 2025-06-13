# Skill Gap Analyzer

A full-stack application built for the Torre Technical Test. This tool allows users to analyze the skill gap for a specific job role by searching Torre's database for professionals, fetching their skills, and visualizing the coverage percentage for a given set of desired skills.

### **[🚀 Live Demo Link](https://skill-analyzer.vercel.app/)**


---

## ✨ Features

-   **Dynamic Role Search:** Input any job role to analyze.
-   **Custom Skill Analysis:** Add or remove skills to see how well they are covered within a given role.
-   **Data Visualization:** A clear, horizontal bar chart displays the percentage of professionals who possess each desired skill.
-   **Profile Listing:** View a list of the professionals analyzed for each search.
-   **External Profile Links:** Each profile card links directly to the user's full profile on `torre.ai`.
-   **Responsive Design:** Fully functional and aesthetic on both desktop and mobile devices.
-   **Empty State Handling:** Displays a user-friendly message when no results are found.

---

## 🛠️ Tech Stack

### Frontend

-   **Framework:** React (with Vite)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Data Fetching & State Management:** TanStack Query (React Query)
-   **Charts:** Chart.js

### Backend

-   **Framework:** Node.js with Express
-   **Language:** TypeScript

### Deployment

-   **Backend:** Render
-   **Frontend:** Vercel

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/JhormanSantos/skill-analyzer.git](https://github.com/JhormanSantos/skill-analyzer.git)
    cd skill-analyzer
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    npm run dev
    ```
    The backend server will start on `http://localhost:5000`.

3.  **Setup the Frontend:**
    -   Open a new terminal window.
    -   Navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    -   Create a `.env` file in the `frontend` root directory and add your backend URL:
        ```
        VITE_API_BASE_URL=http://localhost:5000
        ```
    -   Install dependencies and start the development server:
        ```bash
        npm install
        npm run dev
        ```
    The frontend application will be available at `http://localhost:5173`.

---

## 🌐 API Endpoints Used

This project utilizes the following public endpoints from Torre's API:

-   `POST /api/entities/_searchStream`: To search for professionals by role.
-   `GET /api/genome/bios/{username}`: To retrieve detailed profile information, including skills.

## 📜 AI Prompts Log

As per the test requirements, a log of all prompts used with AI/LLM tools (like Gemini) during the development of this project can be found in the following file:

- **[View AI Prompts Used](./PROMPTS.md)**