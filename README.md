<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=230&color=0:0f172a,30:1e293b,70:ea580c,100:fb923c&text=COOLIE&fontSize=68&fontColor=ffffff&animation=twinkling&fontAlignY=38&desc=Digitizing%20Railway%20Luggage%20Assistance&descAlignY=60" alt="COOLIE banner" />

<h1>
  <span style="background: linear-gradient(90deg,#fb923c,#f97316,#f59e0b); -webkit-background-clip:text; color:transparent;">COOLIE</span>
</h1>

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=22&duration=2600&pause=850&color=F97316&center=true&vCenter=true&multiline=true&width=900&height=80&lines=Book+Verified+Railway+Porters+in+Seconds;Passenger+Flow+%7C+Porter+Dashboard+%7C+Admin+Overview;Next.js+16+%2B+React+19+%2B+TypeScript+%2B+Three.js" alt="Typing animation" />

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-0.1.0-f97316?style=for-the-badge)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey?style=for-the-badge)

</div>

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=120&section=header&color=0:0b1020,50:ea580c,100:0b1020&reversal=true" alt="divider" />

## ⚡ Tech Stack

> Stack below is extracted from the current codebase (`package.json`, configs, and source files).

### Frontend
<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,html,css" />
</p>

### Animation & UI
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.38.0-0055ff?style=flat-square)
![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88ce02?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-0.184.0-black?style=flat-square&logo=three.js)
![Lucide](https://img.shields.io/badge/Lucide%20React-Icons-f97316?style=flat-square)
![shadcn](https://img.shields.io/badge/shadcn-UI-111827?style=flat-square)
![Base UI](https://img.shields.io/badge/Base%20UI-React%20Primitives-0f172a?style=flat-square)

### Backend / Database / APIs
- **Backend:** No server/API routes implemented yet (client-side app).
- **Database:**No database integration yet.
- **External APIs:** None currently used.
- **Data Source:** Local mock data (`src/lib/data.ts`).

### Tools
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,npm,eslint,postcss" />
</p>

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&height=2&color=0:fb923c,100:0f172a" alt="divider" />

## 🎯 Real Features (from code)

- 🎨 **Modern animated landing page** with GSAP reveal effects and Framer Motion transitions.
- 🧳 **3D hero visual** (interactive suitcase scene) rendered with Three.js.
- 📊 **Stats section** with key platform metrics (mocked).
- 🌐 **Multilingual UI** (`en`, `hi`, `ta`, `te`) with dictionary-driven content and runtime language switching.
- 🌙 **Dark mode toggle** persisted in `localStorage`.
- 👤 **Passenger booking flow** with:
  - PNR input validation (10-digit numeric)
  - Station + drop location selection
  - Porter selection and price negotiation
  - Payment method selection (UPI/Card/Wallet)
  - Booking confirmation view
- 🧑‍🔧 **Porter dashboard** with:
  - Incoming job request handling (accept/decline)
  - Earnings and completion KPIs
  - Job history and ratings views
- 🛠️ **Admin panel** with:
  - Booking/porter tabs
  - KPI cards
  - Search and status filtering visuals
  - Desktop table + mobile card adaptations

---

## 🧠 System Architecture

```mermaid
flowchart LR
  U[User] --> N[Next.js App Router Frontend]
  N --> L[State + UI Components]
  L --> I[I18n Context + Dictionaries]
  L --> D[Mock Data Layer src/lib/data.ts]
  D --> V[Passenger / Porter / Admin Views]
  I --> V

  X[Current implementation is fully client-side.\nNo backend API or DB in repository yet.]
  D -.-> X
```

---

## 🖥️ Live Preview

<p align="center">
  <img src="https://placehold.co/1100x620/0f172a/f8fafc?text=Landing+Page+Preview+%28Add+GIF%29" alt="Landing preview placeholder" width="100%" />
</p>

<p align="center">
  <img src="https://placehold.co/1100x620/1e293b/f8fafc?text=Booking+Flow+Preview+%28Add+GIF%29" alt="Booking preview placeholder" width="100%" />
</p>

---

## ⚙️ How It Works

### Passenger Flow
`Enter PNR & Station` ➜ `Choose Porter` ➜ `Confirm Details` ➜ `Pay` ➜ `Booking Confirmed`

### Porter Flow
`Receive Job Requests` ➜ `Accept/Reject` ➜ `Complete Trip` ➜ `Track Earnings & Ratings`

### Admin Flow
`Review KPIs` ➜ `Search Bookings/Porters` ➜ `Monitor Status & Revenue`

---

## 📁 Project Structure

```bash
COOLIE/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/page.tsx
│   │   ├── book/page.tsx
│   │   ├── porter/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── HeroCanvas.tsx
│   │   ├── I18nProvider.tsx
│   │   ├── LandingPage.tsx
│   │   ├── Navbar.tsx
│   │   ├── PorterCard.tsx
│   │   └── StatsBar.tsx
│   └── lib/
│       ├── data.ts
│       ├── i18n.ts
│       └── utils.ts
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🛠️ Installation

```bash
git clone https://github.com/lavansh1306/COOLIE.git
cd COOLIE
npm ci
```

```bash
# development
npm run dev

# lint
npm run lint

# production build
npm run build

# start production server
npm run start
```

---

## 📊 GitHub Analytics

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api?username=lavansh1306&show_icons=true&theme=transparent&title_color=f97316&icon_color=f97316&text_color=cbd5e1&border_color=334155" />
  <img height="170" src="https://streak-stats.demolab.com?user=lavansh1306&theme=transparent&ring=f97316&fire=f97316&currStreakLabel=f97316&border=334155" />
</p>

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api/top-langs/?username=lavansh1306&layout=compact&theme=transparent&title_color=f97316&text_color=cbd5e1&border_color=334155" />
</p>

<p align="center">
  <img width="100%" src="https://github-readme-activity-graph.vercel.app/graph?username=lavansh1306&bg_color=0f172a&color=f8fafc&line=f97316&point=fb923c&area=true&hide_border=true" />
</p>

---

## 🔗 Project Links

- Repository: [lavansh1306/COOLIE](https://github.com/lavansh1306/COOLIE)
- Issues: [Open Issues](https://github.com/lavansh1306/COOLIE/issues)

---

<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=130&section=footer&color=0:0f172a,30:1e293b,70:ea580c,100:fb923c" alt="footer wave" />
  <h3>Made with ❤️ by Team Thinkode</h3>
</div>
