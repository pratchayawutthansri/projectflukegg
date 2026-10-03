# 🏋️ Gym Gym Gym | Fit & Finance OS

> **WebApp สำหรับบันทึกการออกกำลังกาย + จัดการการเงินส่วนตัว**
> A personal fitness & finance tracking Progressive Web App (PWA)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Cloud_Sync-3FCF8E?logo=supabase)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8)

---

## 📋 สารบัญ / Table of Contents

- [ภาพรวม / Overview](#-ภาพรวม--overview)
- [ฟีเจอร์หลัก / Features](#-ฟีเจอร์หลัก--features)
- [เทคโนโลยี / Tech Stack](#-เทคโนโลยี--tech-stack)
- [เริ่มต้นใช้งาน / Getting Started](#-เริ่มต้นใช้งาน--getting-started)
- [โครงสร้างโปรเจค / Project Structure](#-โครงสร้างโปรเจค--project-structure)
- [ระบบธีม / Theme System](#-ระบบธีม--theme-system)
- [การ Deploy / Deployment](#-การ-deploy--deployment)
- [Environment Variables](#-environment-variables)

---

## 🌟 ภาพรวม / Overview

**Gym Gym Gym** เป็น Progressive Web App (PWA) ที่รวมระบบบันทึกการออกกำลังกายและระบบบัญชีรายรับ-รายจ่ายไว้ในแอพเดียว ออกแบบมาให้ใช้งานง่ายบนมือถือ รองรับการติดตั้งลงหน้า Home Screen ทั้ง iOS และ Android

**Gym Gym Gym** is a Progressive Web App that combines workout tracking and personal finance management in one mobile-first application. It supports installation on both iOS and Android home screens.

### ✨ จุดเด่น / Highlights

- 📱 **Mobile-First** — ออกแบบมาสำหรับมือถือโดยเฉพาะ รองรับ Safe Area (Notch/Dynamic Island)
- 🌐 **2 ภาษา** — รองรับภาษาไทย 🇹🇭 และอังกฤษ 🇺🇸 สลับได้ทันที
- 🎨 **7 ธีมสี** — เปลี่ยนธีมได้ตามใจ (Yellow, Green, Cyan, Orange, Purple, Pink, Monochrome)
- ☁️ **Cloud Sync** — ซิงค์ข้อมูลผ่าน Supabase (ไม่บังคับ)
- 💾 **Offline-First** — ข้อมูลเก็บลง LocalStorage ใช้งานได้แม้ไม่มีเน็ต

---

## 🚀 ฟีเจอร์หลัก / Features

### 1. 🏠 แดชบอร์ด (Dashboard)
- ภาพรวมการออกกำลังกายวันนี้
- สถิติแคลอรี่ที่เบิร์น, จำนวนเซ็ต, ท่าที่ทำ
- สรุปรายรับ-รายจ่ายวันนี้
- Circular Progress แสดงเป้าหมายแคลอรี่

### 2. 💪 บันทึกการออกกำลังกาย (Workout Tracker)
- บันทึกท่าออกกำลังกาย พร้อมน้ำหนัก, จำนวนเซ็ต, จำนวนครั้ง
- คลังท่าออกกำลังกายในตัว (Exercise Library) แยกตามกลุ่มกล้ามเนื้อ
- รองรับ Running / Cardio (วิ่ง 1-20 กม.)
- คำนวณแคลอรี่อัตโนมัติ
- เพิ่ม/ลบเซ็ตอิสระ

### 3. 📅 ปฏิทินวางแผน (Calendar & Smart Scheduler)
- วางแผนตารางออกกำลังกายล่วงหน้า
- Smart Scheduler — ระบบวางแผนอัตโนมัติตามกลุ่มกล้ามเนื้อ
- ดูสถานะ pending / completed
- กำหนดเวลา, ท่าฝึก, ระยะวิ่ง, หมายเหตุ

### 4. 💰 ระบบการเงิน (Finance Tracker)
- บันทึกรายรับ-รายจ่ายพร้อมหมวดหมู่
- **หมวดหมู่ค่าใช้จ่ายเริ่มต้น 7 หมวด** (อาหาร, อาหารเสริม, สมาชิกยิม, อุปกรณ์กีฬา, เดินทาง, กาแฟ, ทั่วไป)
- **หมวดหมู่รายรับเริ่มต้น 4 หมวด** (เงินเดือน, ฟรีแลนซ์, ธุรกิจ, อื่นๆ)
- ➕ **สร้างหมวดหมู่เองได้** — เพิ่มชื่อ (TH/EN), เลือกไอคอน, ลบได้
- สรุปยอดรายงานประจำวัน (Daily Cashflow Report)
- กรองดูเฉพาะรายรับ / เฉพาะรายจ่าย / ทั้งหมด
- แสดงสัดส่วนค่าใช้จ่ายตามหมวดหมู่ (Pie breakdown)

### 5. 📊 สรุปรายวัน (Daily Summary)
- รวมข้อมูลออกกำลังกาย + การเงินในหน้าเดียว
- ดูย้อนหลังเลือกวันได้ (Date Stepper)
- สรุปเครื่องเล่น, จำนวนเซ็ต, ระยะวิ่ง, แคลอรี่
- สรุปรายรับ-รายจ่าย แยกหมวดหมู่

### 6. ⚙️ ตั้งค่า (Settings)
- แก้ไขโปรไฟล์ (ชื่อ, น้ำหนัก, ส่วนสูง, อายุ)
- เปลี่ยนเป้าหมายแคลอรี่ต่อวัน
- สลับธีมสี (7 ธีม)
- สลับภาษา ไทย/อังกฤษ
- ล้างข้อมูลทั้งหมด
- ดู Member ID

### 7. 🔐 ระบบสมาชิก (Authentication)
- สมัครสมาชิก / ล็อกอินผ่าน Supabase Auth
- ได้รับ Member ID อัตโนมัติ (เช่น `FX-007`)
- ซิงค์ข้อมูลขึ้น Cloud
- Landing Page สำหรับผู้ใช้ใหม่

---

## 🛠 เทคโนโลยี / Tech Stack

| ส่วน | เทคโนโลยี |
|---|---|
| **Frontend Framework** | React 19 + TypeScript 6.0 |
| **Build Tool** | Vite 8.3 |
| **Styling** | Vanilla CSS + CSS Variables (Theme System) |
| **Icons** | Lucide React |
| **Fonts** | Google Fonts — Outfit (EN) + Prompt (TH) |
| **Backend / Auth** | Supabase (PostgreSQL + Auth + RLS) |
| **Storage** | LocalStorage (Offline) + Supabase (Cloud Sync) |
| **PWA** | Service Worker + Web App Manifest |
| **Deployment** | Vercel |
| **Linting** | OxLint |

---

## 🏁 เริ่มต้นใช้งาน / Getting Started

### ข้อกำหนด / Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### ติดตั้ง / Installation

```bash
# 1. Clone repository
git clone https://github.com/pratchayawutthansri/projectflukegg.git
cd projectflukegg

# 2. ติดตั้ง dependencies
npm install

# 3. ตั้งค่า environment variables (ไม่บังคับ — ถ้าไม่ใส่จะใช้ offline mode)
cp .env.example .env
# แก้ไข .env ใส่ Supabase URL และ Anon Key

# 4. รัน development server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

### Scripts ที่ใช้งานได้

| คำสั่ง | คำอธิบาย |
|---|---|
| `npm run dev` | รัน development server (Vite) |
| `npm run build` | Build production bundle (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ตรวจสอบ code ด้วย OxLint |

---

## 📁 โครงสร้างโปรเจค / Project Structure

```
projectflukegg/
├── public/                     # Static assets
│   ├── flukexd-logo.png        # โลโก้ Gym Gym Gym (Phoenix)
│   ├── icon-192.png            # PWA icon 192x192
│   ├── icon-512.png            # PWA icon 512x512
│   ├── manifest.json           # Web App Manifest (PWA)
│   └── sw.js                   # Service Worker
│
├── src/
│   ├── components/             # React Components
│   │   ├── AuthModal.tsx       # ระบบ Login / Register
│   │   ├── CalendarTab.tsx     # ปฏิทินวางแผน
│   │   ├── CircularProgress.tsx # Circular progress ring
│   │   ├── DashboardTab.tsx    # หน้าแรก Dashboard
│   │   ├── DesktopShowcase.tsx # หน้า Desktop showcase
│   │   ├── FinanceTab.tsx      # ระบบการเงิน + Custom Categories
│   │   ├── HeaderWave.tsx      # Header bar + theme wave
│   │   ├── LandingPage.tsx     # Landing page สำหรับผู้ใช้ใหม่
│   │   ├── ProfileModal.tsx    # แก้ไขโปรไฟล์
│   │   ├── SettingsTab.tsx     # หน้าตั้งค่า
│   │   ├── SmartSchedulerModal.tsx # วางแผนอัตโนมัติ
│   │   ├── SummaryTab.tsx      # สรุปรายวัน
│   │   ├── TermsModal.tsx      # เงื่อนไขการใช้งาน
│   │   └── WorkoutTab.tsx      # บันทึกการออกกำลังกาย
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   │
│   ├── utils/
│   │   ├── exerciseLibrary.ts  # คลังท่าออกกำลังกาย (40+ ท่า)
│   │   ├── financeEngine.ts    # คำนวณการเงิน + Custom Categories
│   │   ├── storage.ts          # LocalStorage manager
│   │   ├── supabaseClient.ts   # Supabase client config
│   │   ├── supabaseSync.ts     # Cloud sync functions
│   │   ├── theme.ts            # Theme system (7 themes)
│   │   ├── translations.ts     # ระบบ 2 ภาษา (TH/EN)
│   │   └── workoutEngine.ts    # คำนวณแคลอรี่ + Workout logic
│   │
│   ├── App.tsx                 # Main App component + routing
│   ├── App.css                 # Global component styles
│   ├── index.css               # Design system + CSS variables
│   └── main.tsx                # React entry point
│
├── supabase_schema.sql         # Database schema + RLS policies
├── vercel.json                 # Vercel deployment config
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── .env.example                # Environment variables template
└── package.json                # Dependencies & scripts
```

---

## 🎨 ระบบธีม / Theme System

แอพรองรับ **7 ธีมสี** ที่สลับได้จากหน้าตั้งค่า:

| ธีม | Primary Color | Card Background |
|---|---|---|
| 🟡 **Yellow** (Default) | `#ffe500` | `#0a0a0c` |
| 🟢 **Green** | `#10b981` | `#0a0a0c` |
| 🔵 **Cyan** | `#06b6d4` | `#0a0a0c` |
| 🟠 **Orange** | `#f97316` | `#0a0a0c` |
| 🟣 **Purple** | `#a855f7` | `#0a0a0c` |
| 🩷 **Pink** | `#ec4899` | `#0a0a0c` |
| ⚫ **Monochrome** | `#ffffff` | `#0a0a0c` |

ธีมทำงานผ่าน CSS Custom Properties (`--theme-primary`, `--theme-card-bg`, etc.) ที่ set ผ่าน `utils/theme.ts`

---

## 🚢 การ Deploy / Deployment

### Deploy บน Vercel (แนะนำ)

1. Push โค้ดขึ้น GitHub
2. เชื่อม repository กับ [Vercel](https://vercel.com)
3. ตั้งค่า Environment Variables บน Vercel Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy อัตโนมัติทุกครั้งที่ push

### Build สำหรับ Production

```bash
npm run build
```

ผลลัพธ์อยู่ในโฟลเดอร์ `dist/`

---

## 🔑 Environment Variables

สร้างไฟล์ `.env` จาก `.env.example`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

> **หมายเหตุ:** Supabase ไม่บังคับ — ถ้าไม่ตั้งค่า แอพจะทำงานแบบ offline-only โดยเก็บข้อมูลลง LocalStorage

### ตั้งค่า Supabase Database

ใช้ไฟล์ `supabase_schema.sql` สร้างตาราง:

```bash
# รันผ่าน Supabase SQL Editor
# หรือ Supabase CLI:
supabase db push
```

ตารางที่สร้าง:
- `profiles` — ข้อมูลสมาชิก
- `workout_sessions` — บันทึกการออกกำลังกาย
- `scheduled_plans` — แผนการฝึก
- `transactions` — รายการรายรับ-รายจ่าย

---

## 📝 License

Private Project — © 2026 Gym Gym Gym
