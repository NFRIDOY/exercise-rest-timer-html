# Contributing to exercise-rest-timer

First off, thank you for taking the time to contribute! 🎉 

Projects like this thrive because of community members like you who help improve code, optimize features, and fix bugs. Please take a moment to review these guidelines before making your first contribution.

---

## 🛠️ How Can I Contribute?

### 1. Reporting Bugs
Before opening a new issue, please search the existing issues to see if it has already been reported. If it hasn't, open a new issue and include:
* A clear, descriptive title.
* Steps to reproduce the problem.
* Expected vs. actual behavior.
* Your browser name and version.

### 2. Suggesting Features
Have an idea to make this tracking dashboard better? Open a feature request issue and explain:
* What the feature is and how it works.
* Why this feature would be useful for fitness or recovery tracking.

### 3. Submitting Pull Requests (PRs)
Ready to write some code? Here is the step-by-step workflow:

1.  **Fork** the repository to your own GitHub account.
2.  **Clone** your fork locally:
    ```bash
    git clone https://github.com/NFRIDOY/exercise-rest-timer-html.git
    ```
3.  **Create a new branch** for your specific changes:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Make your changes.** Keep your code clean, readable, and align with the existing project structure (Vanilla HTML, CSS, and JS).
5.  **Test your changes.** Open `index.html` in your browser and verify that local storage persistence, timers, and visual elements function properly.
6.  **Commit** your changes with a clear and descriptive commit message:
    ```bash
    git commit -m "Fix calculation bug when recovering timers from local storage"
    ```
7.  **Push** to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
8.  **Open a Pull Request** against our `main` branch.

---

## 🎨 Style & Architecture Guidelines

Since this is a lightweight, frontend-only utility application, please respect the current design ethos:

* **Keep it Zero-Dependency:** Do not introduce heavy frontend frameworks (React, Vue, Tailwind, etc.) or external build tooling (Webpack, Vite). Stick to standard, clean Vanilla JavaScript, HTML5, and native CSS.
* **Maintain Local Storage Paradigm:** Any feature involving data tracking must prioritize the client-side `localStorage` system. We do not use external databases or require user logins.
* **Responsive Grid Layout:** Ensure any modifications to the dashboard cards remain highly responsive across mobile, tablet, and desktop viewports.

---

## 🤝 Code of Conduct

We are committed to making participation in this project a harassment-free experience for everyone. Please treat other contributors with kindness, respect, and constructive professionalism.

---

Thank you for contributing to better fitness habits! 💪