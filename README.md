# Gym Gym Gym | Fit & Finance OS 🏋️‍♂️💰

> **Smart Workout Routine & Daily Financial Discipline Web Application**  
> เว็บแอปพลิเคชันบริหารการออกกำลังกายเข้มข้น (ระบบเครื่องเล่นเซ็ตละ 15 ที & วิ่งเก็บระยะ) ควบคู่กับระบบควบคุมกระแสเงินสดรายวัน (Fit & Daily Finance)

---

## 📌 ภาพรวมโปรเจกต์ (Project Overview)

**Gym Gym Gym** ได้รับการออกแบบภายใต้แนวคิด **Dual-Track Discipline (วินัยคู่ขนาน)**:
1. **Physical Health (Fit)**: ระบบจัดตารางซ้อมอัจฉริยะ (Smart Scheduler) สุ่มเซ็ตเครื่องเล่น 15 ที/เซ็ต ตามกลุ่มกล้ามเนื้อ คำนวณระยะทางวิ่ง แคลอรีที่เผาผลาญ และตัวจับเวลาพักเซ็ต (Rest Timer)
2. **Financial Control (Finance)**: ระบบบันทึกรายรับ-รายจ่ายสุขภาพและชีวิตประจำวัน คำนวณยอดคงเหลือสุทธิ (Net Balance) แบบเรียลไทม์
3. **Design System**: Neo-Brutalist Minimalism ผสานเส้นโค้งของคลื่นของเหลวสีดำ (Fluid Organic Wave), ใช้ฟอนต์ Outfit & Prompt, ไร้ Emoji โดยใช้ไอคอน Lucide 100%

---

## 🔒 ลำดับความปลอดภัยและการเข้าใช้งาน (Strict Authentication Gate)

เมื่อเปิด Web App หรือ Deploy ขึ้นโปรดักชัน:
* **ระบบล็อกอินด่านแรก (Login Gate First)**: ผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบจะไม่สามารถเข้าถึงหรือมองเห็นแดชบอร์ด ข้อมูล หรือฟังก์ชันภายในได้ (ไม่มีปุ่มปิดหรือข้ามเพื่อดูข้อมูล)
* **การสมัครและยืนยันตัวตน**: บันทึกข้อมูลบัญชีและตรวจสอบรหัสผ่านอย่างรัดกุมก่อนอนุญาตให้เข้าสู่ระบบ
* **ระบบออกจากระบบ (Logout)**: เมื่อกดออกจากระบบในแท็บการตั้งค่า สิทธิ์การเข้าถึงจะถูกเพิกถอนทันที และนำผู้ใช้กลับสู่หน้าล็อกอินด่านแรกเสมอ

---

## ☁️ แผนสถาปัตยกรรมคลาวด์และการ Deploy (Cloud Architecture Plan)

โปรเจกต์นี้วางแผนโครงสร้างพื้นฐานและการ Deploy บนสถาปัตยกรรมคลาวด์ยุคใหม่ (Modern Edge Architecture) โดยเน้นความปลอดภัย ความเร็ว และค่าใช้จ่ายศูนย์บาท (Free-Tier Friendly):

### 1. โดเมนและความปลอดภัย (Domain & Edge Security)
* **Custom Domain** เชื่อมต่อและจัดการ DNS ผ่าน **Cloudflare**
* **Cloudflare Web Application Firewall (WAF)** ป้องกันการโจมตี DDoS, บล็อกบอท และสแกนช่องโหว่
* **Cloudflare SSL/TLS**: กำหนดเป็นโหมด **`Full` หรือ `Full (strict)`** เสมอ เพื่อป้องกัน Redirect Loop (`ERR_TOO_MANY_REDIRECTS`)
* **Edge Caching**: แคชไฟล์ Static (HTML, CSS, JS, Assets) กระจายบนเซิร์ฟเวอร์ Cloudflare ทั่วโลก (รวมถึงศูนย์ข้อมูลกรุงเทพฯ) ทำให้เปิดเว็บได้ในระดับเสี้ยววินาที

---

### 2. ทางเลือกการ Deploy และฐานข้อมูล (Deployment & Database Architecture)

#### 🌟 แนวทางแนะนำ: All-in-One Cloudflare (Cloudflare Pages + Cloudflare D1)
รวมศูนย์การทำงานทั้งหมดไว้ที่ Cloudflare ที่เดียว บริหารจัดการง่าย มีโควต้าพื้นที่ใช้งานฟรีมหาศาล

```
[ User Browser / PWA ]
          │
          ▼
┌────────────────────────────────────────────────────────┐
│                   CLOUDFLARE EDGE                      │
│                                                        │
│  1. Cloudflare DNS & WAF (DDoS / Bot Protection)       │
│  2. Cloudflare Pages (Frontend Hosting: React + Vite)   │
│  3. Cloudflare Workers / Functions (Backend REST API)   │
│  4. Cloudflare D1 Database (Serverless SQLite Engine)  │
└────────────────────────────────────────────────────────┘
```

* **Frontend Hosting**: **Cloudflare Pages** เชื่อมต่อ Git Repository Deploy อัตโนมัติทุกครั้งที่ `git push`
* **Database**: **Cloudflare D1 (Serverless Relational SQL)**
  * ความจุฟรี: **5 GB** (มากกว่า Supabase 10 เท่า)
  * โควต้าอ่านฟรี: **5,000,000 rows/วัน**
  * โควต้าเขียนฟรี: **100,000 rows/วัน**
  * อ่านเขียนด้วยความเร็วระดับ Edge Latency ไม่ต้องเปิดพอร์ตฐานข้อมูลภายนอก

---

#### 🔄 แนวทางสำรอง: Hybrid Architecture (Vercel + Cloudflare D1)
สำหรับผู้ที่ต้องการใช้หน้าจัดการแดชบอร์ดของ Vercel สำหรับ Frontend

```
[ User Browser ]
       │
       ▼
 [ Cloudflare DNS / WAF ]
       │
       ├─────────────────────────────────┐
       ▼                                 ▼
[ Vercel Edge Network ]      [ Cloudflare Worker API ]
Frontend (React SPA)                     │
       │                                 ▼
       └────────────── API ──────────> [ Cloudflare D1 Database ]
```

* **Frontend**: Deploy บน **Vercel** พร้อมไฟล์ `vercel.json` รองรับ SPA Rewrite (ป้องกัน Error 404)
* **DNS & Security**: ชี้โดเมนผ่าน **Cloudflare Proxy (เมฆสีส้ม)**
* **Database & API**: **Cloudflare Worker** ต่อเข้าหา **Cloudflare D1** ให้บริการ API แก่หน้าบ้าน Vercel

---

## 🗄️ โครงสร้างฐานข้อมูล Cloudflare D1 (Database Schema Concept)

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
├── src/
│   ├── components/           # UI Components (Dashboard, Workout, Calendar, Finance, Summary, Settings, Auth)
│   ├── utils/                # Workout Calculator, Finance Engine, LocalStorage Manager
│   ├── types.ts              # TypeScript Type Definitions
│   ├── App.tsx               # Main Application Router & Authentication Guard
│   ├── index.css             # Neo-Brutalist CSS Tokens & Responsive Styles
│   └── main.tsx              # React Entry Point
├── public/                   # Static Assets, Logos & PWA Manifest
├── vercel.json               # Vercel SPA Routing Configuration
├── index.html                # HTML Document & Viewport Configuration
└── README.md                 # Project Documentation & Architecture
```
