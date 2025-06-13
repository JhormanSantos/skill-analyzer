## AI/LLM Prompts Used

This file documents key prompts used to solve specific technical challenges during the development of the Skill Gap Analyzer application.


### 1. Debugging a persistent PostCSS configuration error loop with Vite and Tailwind CSS

**Tool:** Gemini
**Model:** Gemini Pro
**Prompt:** I am stuck in a frustrating configuration loop and need a definitive solution. My Vite + React + TypeScript project fails to start, showing contradictory PostCSS errors. 
First, it says: `[postcss] It looks like you're trying to use 'tailwindcss' directly... install '@tailwindcss/postcss'`.
After trying to fix that with various `postcss.config.js` formats (object syntax, array syntax, `.cjs` extension), I get a different error like `Invalid PostCSS Plugin found` or it reverts to the first error. I have already run `npm install` with `tailwindcss`, `postcss`, `autoprefixer`, and `@tailwindcss/postcss`. Nothing seems to work. The project is using a pre-release version of Tailwind CSS (v4). Can you diagnose this problem and provide a final, guaranteed solution to fix the build toolchain, assuming the issue might be a deep incompatibility between these specific package versions?

---

### 2. Fixing a bug where profile data and images were not displaying correctly

**Tool:** Gemini
**Model:** Gemini Pro
**Prompt:** I am facing a data mapping issue in my Node.js backend. My frontend is not displaying profile pictures, and I've encountered a `TypeError: Cannot read properties of undefined (reading 'username')`. Through debugging, I've discovered two things:
1. The raw JSON response from Torre's `_searchStream` API for my own profile shows that the image URL is under the key `imageUrl`, not `picture` as I initially thought.
2. After inspecting the raw data from the API stream, I found that the profile data (name, username, imageUrl) is at the top level of each object, not inside a nested `person` object as I had previously assumed based on other API explorations.

My current backend code is crashing because it's trying to access `profile.person.username` and is looking for a `picture` property. Can you provide the corrected and final version of my Express route handler that adapts to this flat data structure and uses the correct `imageUrl` key, ensuring the application no longer crashes and displays all profile information correctly?

---

### 3. Request to refactor React components for better HTML semantics and mobile-responsiveness

**Tool:** Gemini
**Model:** Gemini Pro
**Prompt:** My application is now functional, but I want to improve the code quality before submission. Could you review the React components (`ResultsDashboard`, `AnalysisSummary`, `ProfileCard`) and refactor them? Please focus on two areas:
1.  **HTML Semantics:** Replace generic `div` tags with more appropriate semantic tags where applicable (e.g., `section`, `article`, `dl`, `dt`, `dd`) to improve accessibility and document structure.
2.  **Mobile Responsiveness:** Apply a "mobile-first" approach using Tailwind CSS utility classes. The layout should stack cleanly on small screens and adapt to a multi-column or wider layout on larger (`md` or `lg`) screens.
Please provide the complete, refactored code for each component.

## 📜 AI Prompts Log

As per the test requirements, a log of all prompts used with AI/LLM tools (like Gemini) during the development of this project can be found in the following file:

- **[View AI Prompts Used](./PROMPTS.md)**