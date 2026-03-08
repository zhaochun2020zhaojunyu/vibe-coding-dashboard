# Vibe Coding Dashboard

> Neo-brutalism style data visualization dashboard for tracking Vibe Coding progress

![Neo-brutalism](https://img.shields.io/badge/style-Neo--brutalism-FFE500?style=flat-square&logoColor=1A1A1A)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![ECharts](https://img.shields.io/badge/ECharts-5.0-AA344D?style=flat-square)

🔗 **Live Demo**: https://em5qbwlnkqbpy.ok.kimi.link

---

## Features

- **3 Interactive Charts**
  - Time Trend (Line/Area) - 7/30/90 day switchable
  - Skill Radar - 6-dimensional skill tracking
  - Project Stack - Completion status by category

- **Neo-brutalism Design**
  - Bold yellow background (#FFE500)
  - Thick black borders (3px)
  - Hard shadows (6px offset)
  - Zero border radius
  - Space Grotesk typography

- **Animations**
  - Page load entrance animations
  - Number counting animation
  - Card hover lift effect
  - Chart data transitions

---

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- ECharts 5
- shadcn/ui components

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── StatCard.tsx
│   └── charts/
│       ├── TimeTrendChart.tsx
│       ├── SkillRadarChart.tsx
│       └── ProjectStackChart.tsx
├── App.tsx
├── App.css
└── index.css
```

---

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#FFE500` |
| Text | `#1A1A1A` |
| Primary | `#0066FF` |
| Secondary | `#FF0066` |
| Border | `3px solid #1A1A1A` |
| Shadow | `6px 6px 0px #1A1A1A` |

---

Built with Vibe 🎨
