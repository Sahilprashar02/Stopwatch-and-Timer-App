# ⏱ Stopwatch and Timer App

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)
![Build](https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge)

**A premium Stopwatch & Timer application with a stunning glassmorphism dark theme UI.**

[Live Preview](https://stopwatch-and-timer-app.vercel.app/) · [Report Bug](https://github.com/Sahilprashar02/Stopwatch-and-Timer-App/issues) · [Request Feature](https://github.com/Sahilprashar02/Stopwatch-and-Timer-App/issues)

</div>

---

## ✨ Features

### ⏱ Stopwatch
- **Start / Pause / Resume / Reset** controls
- **Lap tracking** with split time differences
- **Best & Worst lap** highlighted in green/red
- **Centisecond precision** with drift-free `Date.now()` timing

### ⏳ Timer
- **Custom time input** — Hours, Minutes, Seconds
- **Quick presets** — 1, 3, 5, 10, 15, 30 minutes
- **Circular progress ring** with gradient SVG fill
- **Color-coded warnings** — Orange at 25%, Red at 10%
- **Celebration overlay** when timer completes

### 🎨 Design
- Premium **dark glassmorphism** theme
- **JetBrains Mono** for time displays, **Inter** for UI
- Gradient accents — Cyan (Stopwatch) / Purple-Pink (Timer)
- Smooth **micro-animations** and hover effects
- **Fully responsive** from desktop to mobile

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **npm** (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sahilprashar02/Stopwatch-and-Timer-App.git

# Navigate to the project
cd Stopwatch-and-Timer-App

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠 Tech Stack

<div align="center">

| Technology | Purpose |
|:---:|:---:|
| **React 19** | Component-based UI |
| **Vite 8** | Lightning-fast dev server |
| **Vanilla CSS** | Glassmorphism styling |
| **Google Fonts** | Inter + JetBrains Mono |

</div>

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Stopwatch.jsx    # Stopwatch with lap tracking
│   └── Timer.jsx        # Countdown timer with presets
├── App.jsx              # Main app with tab switching
├── App.css              # Component styles
├── index.css            # Design tokens & resets
└── main.jsx             # Entry point
```

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Built with ❤️ by [Sahil Prashar](https://github.com/Sahilprashar02)

</div>
