# Gym Gym Gym | Fit & Finance OS 🏋️‍♂️💰

> **Smart Workout Routine & Daily Financial Discipline Web Application**  
> เว็บแอปพลิเคชันบริหารการออกกำลังกายเข้มข้น (ระบบเครื่องเล่นเซ็ตละ 15 ที & วิ่งเก็บระยะ) ควบคู่กับระบบควบคุมกระแสเงินสดรายวัน (Fit & Daily Finance)

---

## 🌐 ลิงก์ระบบโปรดักชัน & แหล่งจัดเก็บโค้ด (Production & Repository)

* **🚀 Production URL (ใช้งานจริง)**: [https://projectflukegg.vercel.app](https://projectflukegg.vercel.app)
* **🐙 GitHub Repository**: [https://github.com/pratchayawutthansri/projectflukegg](https://github.com/pratchayawutthansri/projectflukegg)
* **⚡ CI/CD Pipeline**: Git Push Trigger Auto-Deployment (Vercel Edge Network)
* **📲 Application Type**: Progressive Web App (PWA) — ติดตั้งลงมือถือและคอมพิวเตอร์ได้เต็มจอ

---

## 📱 ระบบ Progressive Web App (PWA) & การติดตั้งลงเครื่อง

แอปพลิเคชันได้รับการยกระดับเป็น **Native-like Web App** เต็มรูปแบบ:

1. **โหมดการแสดงผล (Standalone Display)**: แสดงผลเต็มจอไร้แถบ URL เสมือนแอปพลิเคชัน Native
2. **ระบบแคชออฟไลน์ (Offline-Ready Service Worker `sw.js`)**: บันทึกและเรียกดูข้อมูลได้แม้สัญญาณอินเทอร์เน็ตขาดหาย
3. **ไอคอนความละเอียดสูง (Adaptive High-Res Icons)**: รองรับความละเอียด 192x192 และ 512x512 พร้อม Maskable Icon บน Android และ Apple Touch Icon บน iOS
4. **ปุ่มติดตั้งในตัว (In-App Install Trigger)**: เข้าไปที่แท็บ **ตั้งค่า (Settings)** เพื่อกดติดตั้งลงเครื่องได้ในคลิกเดียว

### 📌 วิธีติดตั้งลงอุปกรณ์:
* **iPhone / iPad (Safari)**: กดปุ่มแชร์ **(Share 📤)** -> เลือก **"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen ➕)**
* **Android (Chrome)**: กดปุ่ม **"ติดตั้งแอป" (Install App)** บนแถบแจ้งเตือน หรือกดจุด 3 จุด **(⋮)** -> เลือก **"ติดตั้งแอป"**
* **Windows / macOS (Chrome / Edge)**: กดไอคอนรูปคอมพิวเตอร์/ติดตั้ง บนแถบ Address Bar ขวาบน

---

## 🗺️ แผนการพัฒนาโปรเจกต์ (Project Roadmap)

- [x] **Phase 1: Local-First Core Application**
  - ดีไซน์ระบบ Neo-Brutalist Minimalism ผสาน Fluid Organic Wave
  - ระบบจัดตารางซ้อมอัจฉริยะ (15 ที/เซ็ต) คำนวณระยะทางวิ่งและแคลอรี
  - ระบบบันทึกรายรับ-รายจ่ายและคำนวณ Net Balance เรียลไทม์
  - ระบบประมวลผล LocalStorage ภายในเครื่อง (ข้อมูลคงอยู่ตลอด ไม่หายแม้ปิดเว็บ)
- [x] **Phase 1.5: Production Deployment & PWA Installation**
  - ติดตั้ง Git Version Control และ Push ขึ้น GitHub
  - ตั้งค่า CI/CD Auto-Deploy ขึ้น Vercel Edge Network
  - พัฒนา Service Worker, Web Manifest และรองรับการติดตั้งลงหน้าจอโฮมมือถือ
- [ ] **Phase 2: Cloud Database & Cross-Device Sync (Next Milestone)**
  - ออกแบบ Cloudflare D1 / Cloud Database เชื่อมต่อกับ Backend API
  - ระบบบัญชีสมาชิกบนคลาวด์ (Cloud Authentication)
  - ซิงค์ข้อมูลอัตโนมัติข้ามเครื่องแบบไร้รอยต่อ (มือถือ ↔ คอมพิวเตอร์)

---

## 🔒 ลำดับความปลอดภัยและการเข้าใช้งาน (Strict Authentication Gate)

เมื่อเปิด Web App หรือ Deploy ขึ้นโปรดักชัน:
* **ระบบล็อกอินด่านแรก (Login Gate First)**: ผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบจะไม่สามารถเข้าถึงหรือมองเห็นแดชบอร์ด ข้อมูล หรือฟังก์ชันภายในได้ (ไม่มีปุ่มปิดหรือข้ามเพื่อดูข้อมูล)
* **การสมัครและยืนยันตัวตน**: บันทึกข้อมูลบัญชีและตรวจสอบรหัสผ่านอย่างรัดกุมก่อนอนุญาตให้เข้าสู่ระบบ
* **ระบบออกจากระบบ (Logout)**: เมื่อกดออกจากระบบในแท็บการตั้งค่า สิทธิ์การเข้าถึงจะถูกเพิกถอนทันที และนำผู้ใช้กลับสู่หน้าล็อกอินด่านแรกเสมอ

---

## 🗄️ โครงสร้างฐานข้อมูล Supabase PostgreSQL (Cloud Database Schema)

โปรเจกต์ใช้ **Supabase (PostgreSQL + Auth + Row Level Security)** เพื่อการซิงค์ข้อมูลแบบเรียลไทม์ข้ามเครื่อง โดยมีไฟล์ Migration พร้อมใช้งานใน [supabase_schema.sql](file:///d:/projectflukegg/supabase_schema.sql)

### โครงสร้าง 4 ตารางหลัก:
1. **`public.profiles`**: เก็บข้อมูลส่วนตัว, น้ำหนัก, ส่วนสูง, เป้าหมายแคลอรี และธีม (เชื่อมกับ `auth.users`)
2. **`public.workout_sessions`**: เก็บประวัติการซ้อมจริง, ระยะเวลา, แคลอรีที่เผาผลาญ
3. **`public.scheduled_plans`**: เก็บลูปตารางซ้อมล่วงหน้า, เครื่องเล่น (JSONB), ระยะทางวิ่ง
4. **`public.transactions`**: เก็บบัญชีรายรับ-รายจ่าย Fit & Finance

### 🔒 ความปลอดภัย (Row Level Security - RLS):
ทุกตารางเปิดใช้งาน **RLS** 100% ทำให้ผู้ใช้งานแต่ละคนสามารถ อ่าน/เขียน/ลบ ได้เฉพาะข้อมูลของบัญชีตัวเองเท่านั้น ปลอดภัยต่อความเป็นส่วนตัวระดับสูงสุด


---

## 🚀 การติดตั้งและรันในเครื่อง (Local Development)

```bash
# ติดตั้ง dependencies
npm install

# รันเซิร์ฟเวอร์จำลองการพัฒนา (Local Dev Server)
npm run dev

# ทดสอบตรวจสอบไวยากรณ์และคอมไพล์โปรดักชัน
npm run build
```

---

## 📂 โครงสร้างโฟลเดอร์หลัก (Project Structure)

```
projectflukegg/
├── public/
│   ├── icon-192.png          # High-Res PWA App Icon (192x192)
│   ├── icon-512.png          # High-Res PWA App Icon (512x512)
│   ├── flukexd-logo.png      # Original Phoenix Logo
│   ├── manifest.json         # Web App Manifest Configuration
│   └── sw.js                 # PWA Service Worker (Offline Cache)
├── src/
│   ├── components/           # UI Components (Dashboard, Workout, Calendar, Finance, Summary, Settings, Auth)
│   ├── utils/                # Workout Calculator, Finance Engine, LocalStorage Manager
│   ├── types/                # TypeScript Type Definitions
│   ├── App.tsx               # Main Application Router & Authentication Guard
│   ├── index.css             # Neo-Brutalist CSS Tokens & Responsive Styles
│   └── main.tsx              # React Entry Point & SW Registration
├── vercel.json               # Vercel SPA Routing Configuration
├── index.html                # HTML Document & Viewport Configuration
└── README.md                 # Project Documentation & Architecture
```
