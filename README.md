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

## 🗄️ โครงสร้างฐานข้อมูลสำหรับ Phase 2 (Cloud Database Schema)

เตรียมพร้อมสำหรับการเชื่อมต่อ **Cloudflare D1 (Serverless SQLite)** ในก้าวถัดไป:

```sql
-- 1. ตารางข้อมูลผู้ใช้งาน (Users & Authentication)
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    member_id TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    weight_kg REAL DEFAULT 70,
    height_cm REAL DEFAULT 175,
    age INTEGER DEFAULT 25,
    daily_calorie_target INTEGER DEFAULT 650,
    gym_name TEXT DEFAULT 'Gym Gym Gym',
    theme_mode TEXT DEFAULT 'yellow',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. ตารางบันทึกการซ้อมจริง (Workout Sessions)
CREATE TABLE workout_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    session_date DATE NOT NULL,
    title TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. ตารางตารางซ้อมที่วางแผนล่วงหน้า (Scheduled Plans)
CREATE TABLE scheduled_plans (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    plan_date DATE NOT NULL,
    title TEXT NOT NULL,
    muscle_group TEXT NOT NULL,
    routine_items_json TEXT NOT NULL, -- บันทึกเครื่องเล่นและน้ำหนักในรูปแบบ JSON
    running_distance_km REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. ตารางบันทึกรายรับ-รายจ่าย (Fit & Daily Finance Transactions)
CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    tx_date DATE NOT NULL,
    title TEXT NOT NULL,
    tx_type TEXT CHECK(tx_type IN ('income', 'expense')) NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

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
