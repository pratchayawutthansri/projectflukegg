# Gym Gym Gym | Fit & Finance OS 🏋️‍♂️💰

> **Smart Workout Routine & Daily Financial Discipline Web Application**  
> เว็บแอปพลิเคชันบริหารการออกกำลังกายเข้มข้น (ระบบเครื่องเล่นเซ็ตละ 15 ที & วิ่งเก็บระยะ) ควบคู่กับระบบควบคุมกระแสเงินสดรายวัน (Fit & Daily Finance)

---

## 🌐 ลิงก์ระบบโปรดักชัน & แหล่งจัดเก็บโค้ด (Production & Repository)

* **🚀 Production Live URL (ใช้งานจริงบนมือถือและคอม)**: [https://projectflukegg.vercel.app](https://projectflukegg.vercel.app)
* **🐙 GitHub Repository**: [https://github.com/pratchayawutthansri/projectflukegg](https://github.com/pratchayawutthansri/projectflukegg)
* **⚡ CI/CD Automation**: GitHub Push Trigger Auto-Deployment บน **Vercel Edge Network**
* **📲 Application Type**: Progressive Web App (PWA) — ติดตั้งลงหน้าจอโฮมมือถือได้เสมือนแอปแท้ 100%
* **🐘 Cloud Database**: **Supabase (PostgreSQL)** พร้อมระบบ Realtime Background Sync และ Row Level Security (RLS)

---

## 🗺️ สรุปแผนการพัฒนาโปรเจกต์ (Project Milestones & Achievements)

- [x] **Phase 1: Local-First Core Application (เสร็จสมบูรณ์)**
  - ออกแบบระบบด้วยสไตล์ **Neo-Brutalist Minimalism** ผสาน **Fluid Organic Wave** สีดำตัดเหลืองนีออน
  - ระบบจัดตารางซ้อมอัจฉริยะ (Smart Scheduler) เครื่องเล่นเซ็ตละ 15 ที พร้อมตัวคำนวณแคลอรีและระยะทางวิ่ง
  - ระบบบันทึกรายรับ-รายจ่ายสุขภาพและการเงินรายวัน พร้อมคำนวณ Net Balance เรียลไทม์
  - ระบบประมวลผล Local-First ผ่าน LocalStorage (ข้อมูลในเครื่องไม่สูญหายแม้ปิดเว็บ)
- [x] **Phase 1.5: Production Deployment & PWA Installation (เสร็จสมบูรณ์)**
  - ติดตั้ง Git Version Control และสร้าง Initial Commit (41 files)
  - เชื่อมต่อ GitHub Remote Repository และ Deploy หน้าบ้านขึ้น **Vercel**
  - สร้างไฟล์ไอคอนความละเอียดสูง (192x192, 512x512) จากโลโก้ฟีนิกซ์แท้
  - เขียนและลงทะเบียน **Service Worker (`sw.js`)** รองรับ Offline Caching
  - รองรับการติดตั้งแบบ Standalone ไร้แถบ URL บนทั้ง **iOS (Safari)** และ **Android (Chrome)**
  - เพิ่มการ์ด "ติดตั้งแอพพลิเคชัน (Install App)" ในแท็บตั้งค่า
- [x] **Phase 2: Cloud Database & Realtime Sync (เสร็จสมบูรณ์)**
  - Provision ฐานข้อมูล **Supabase (PostgreSQL)** ในโซน Singapore (ap-southeast-1)
  - รัน Migration สคริปต์ [supabase_schema.sql](file:///d:/projectflukegg/supabase_schema.sql) สร้าง 4 ตารางหลัก
  - ตั้งค่าระบบความปลอดภัย **Row Level Security (RLS)** 100% ป้องกันข้อมูลข้ามผู้ใช้
  - ติดตั้ง `@supabase/supabase-js` SDK และสร้าง Client ([supabaseClient.ts](file:///d:/projectflukegg/src/utils/supabaseClient.ts))
  - สร้างระบบ **Cloud Sync Service** ([supabaseSync.ts](file:///d:/projectflukegg/src/utils/supabaseSync.ts)) ซิงค์ข้อมูลการซ้อม, ตาราง, และบัญชีขึ้นคลาวด์อัตโนมัติ
  - ตั้งค่า **Environment Variables** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) ทั้งในเครื่องและบน Vercel Production

---

## 📱 ระบบ Progressive Web App (PWA) & วิธีติดตั้งลงมือถือ

เว็บแอปพลิเคชันทำงานในรูปแบบ **PWA (Progressive Web App)** เต็มรูปแบบ:

1. **โหมดการแสดงผล (Standalone Display)**: แสดงผลเต็มจอ ไร้แถบ URL กวนใจ ให้ประสบการณ์เหมือนดาวน์โหลดจาก App Store
2. **ระบบแคชออฟไลน์ (Offline-Ready Service Worker)**: ใช้งานและบันทึกข้อมูลได้แม้สัญญาณอินเทอร์เน็ตหลุด
3. **Adaptive Icons**: แสดงผลไอคอนนกฟีนิกซ์สีทองคมชัดทุกหน้าจอ (192x192, 512x512, Maskable & Apple Touch Icon)

### 📌 ขั้นตอนการติดตั้งลงอุปกรณ์:
* **🍏 iPhone / iPad (Safari)**:
  1. เปิด Safari เข้าเว็บ `projectflukegg.vercel.app`
  2. แตะปุ่มแชร์ **(Share 📤)** ที่แถบด้านล่าง
  3. ปัดหน้าต่างขึ้น แล้วเลือก **"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen ➕)**
  4. กด **"เพิ่ม" (Add)** มุมขวาบน -> ไอคอนแอปจะไปอยู่ที่หน้าจอโฮมทันที
* **🤖 Android (Chrome)**:
  1. เปิด Chrome เข้าเว็บ `projectflukegg.vercel.app`
  2. แตะปุ่ม **"ติดตั้งแอป" (Install App)** บนแถบแจ้งเตือน หรือกดจุด 3 จุด **(⋮)** -> เลือก **"ติดตั้งแอป"**
* **💻 คอมพิวเตอร์ (Chrome / Edge)**:
  1. กดไอคอนรูปคอมพิวเตอร์/ติดตั้ง บนแถบ Address Bar ขวาบน

---

## 🗄️ สถาปัตยกรรมฐานข้อมูล Supabase PostgreSQL (Cloud Database Architecture)

ฐานข้อมูลทำงานคู่ขนานกับ Local-First Storage เพื่อให้ผู้ใช้งานได้รับความเร็วสูงสุด พร้อมการสำรองข้อมูลขึ้นคลาวด์อย่างปลอดภัย:

```
┌────────────────────────────────────────────────────────┐
│                   USER DEVICE / PWA                    │
│                                                        │
│  [ React Frontend ] ──> [ Local-First LocalStorage ]  │
│          │                                             │
│          └──> [ Supabase Client (supabaseSync.ts) ]    │
└──────────────────────────┬─────────────────────────────┘
                           │
                 HTTPS / REST API (SSL)
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│             SUPABASE CLOUD (PostgreSQL 15)             │
│                                                        │
│  1. public.profiles        (ข้อมูลผู้ใช้ & เป้าหมาย)       │
│  2. public.workout_sessions (ประวัติการซ้อมจริง)          │
│  3. public.scheduled_plans  (ตารางซ้อมล่วงหน้า)          │
│  4. public.transactions     (บัญชีรายรับ-รายจ่าย)         │
│                                                        │
│  🔒 Row Level Security (RLS) Enabled on All Tables     │
└────────────────────────────────────────────────────────┘
```

### โครงสร้าง 4 ตารางหลัก ([supabase_schema.sql](file:///d:/projectflukegg/supabase_schema.sql)):
1. **`public.profiles`**: เก็บข้อมูลผู้ใช้, ส่วนสูง, น้ำหนัก, เป้าหมายแคลอรี, สิทธิ์สมาชิก (ผูกกับ `auth.users`)
2. **`public.workout_sessions`**: เก็บประวัติการออกกำลังกาย, เวลาที่ใช้, แคลอรีที่เผาผลาญ
3. **`public.scheduled_plans`**: เก็บลูปตารางซ้อมล่วงหน้า, เครื่องเล่น (JSONB), ระยะทางวิ่ง
4. **`public.transactions`**: เก็บบัญชีรายรับ-รายจ่าย และยอดคงเหลือ Fit & Finance

---

## 🔐 การตั้งค่าสภาพแวดล้อมและความปลอดภัย (Environment Variables)

โปรเจกต์ใช้ Environment Variables ในการเชื่อมต่อ API อย่างปลอดภัย:

| Variable Name | Description | Placement |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase Project REST Endpoint | `.env` (Local) / Vercel Settings (Production) |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anonymous Public Key | `.env` (Local) / Vercel Settings (Production) |

* ไฟล์ `.env` ในเครื่องถูกใส่ไว้ใน `.gitignore` เพื่อป้องกันไม่ให้ข้อมูล Credentials หลุดสู่สาธารณะ

---

## 🚀 การติดตั้งและรันในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies ทั้งหมด
npm install

# 2. ตั้งค่าไฟล์ Environment Variables
cp .env.example .env
# กรอกค่า VITE_SUPABASE_URL และ VITE_SUPABASE_ANON_KEY ในไฟล์ .env

# 3. รัน Development Server
npm run dev

# 4. ทดสอบ Typecheck & Build สำหรับ Production
npm run build
```

---

## 📂 โครงสร้างโฟลเดอร์โปรเจกต์ (Project Directory Structure)

```
projectflukegg/
├── public/
│   ├── icon-192.png          # High-Res PWA App Icon (192x192)
│   ├── icon-512.png          # High-Res PWA App Icon (512x512)
│   ├── flukexd-logo.png      # High-Resolution Phoenix Logo
│   ├── manifest.json         # Web App Manifest (Standalone PWA Spec)
│   └── sw.js                 # PWA Service Worker (Offline Cache & Network Strategies)
├── src/
│   ├── components/           # UI Components (Dashboard, Workout, Calendar, Finance, Settings, Auth)
│   ├── utils/
│   │   ├── financeEngine.ts  # Daily Cash Flow & Net Balance Calculator
│   │   ├── workoutEngine.ts  # 15-Rep Machine & Running Calorie Engine
│   │   ├── storage.ts        # LocalStorage Manager (Local-First Fallback)
│   │   ├── supabaseClient.ts # Supabase SDK Client Configuration
│   │   └── supabaseSync.ts   # Cloud PostgreSQL Background Synchronization Service
│   ├── types/                # TypeScript Interfaces (Workout, Finance, User, Plans)
│   ├── App.tsx               # Main Router, Navigation Tabs & Authentication Guard
│   ├── index.css             # Neo-Brutalist CSS Tokens & Fluid Wave Styling
│   └── main.tsx              # React Entry Point & SW Registration
├── supabase_schema.sql       # Database Migration Script & RLS Policies
├── vercel.json               # Vercel SPA Routing Configuration (Prevents 404)
├── index.html                # HTML Document, Viewport & Apple Touch Icons
└── README.md                 # Complete Project Documentation & Technical Overview
```
