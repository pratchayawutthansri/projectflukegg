# Gym Gym Gym | Fit & Finance OS 🏋️‍♂️💰

> **Smart Workout Routine & Daily Financial Discipline Web Application**  
> เว็บแอปพลิเคชันบริหารการออกกำลังกายเข้มข้น (ระบบเครื่องเล่นเซ็ตละ 15 ที & วิ่งเก็บระยะ) ควบคู่กับระบบควบคุมกระแสเงินสดรายวัน (Fit & Daily Finance) บนสถาปัตยกรรม Local-First ผสานคลาวด์ PostgreSQL

---

## 🌐 ข้อมูลระบบโปรดักชัน & การเข้าใช้งาน (Production & Repository)

| รายการ | รายละเอียด | ลิงก์ / คำอธิบาย |
|---|---|---|
| **🚀 Production URL** | ระบบใช้งานจริงระดับสากล | [https://projectflukegg.vercel.app](https://projectflukegg.vercel.app) |
| **🐙 Source Code Repository** | แหล่งจัดเก็บโค้ดหลักบน GitHub | [https://github.com/pratchayawutthansri/projectflukegg](https://github.com/pratchayawutthansri/projectflukegg) |
| **⚡ Hosting Infrastructure** | คลาวด์เซิร์ฟเวอร์แบบ Serverless Edge | **Vercel Edge Network** (Global Anycast CDN) |
| **🐘 Cloud Database** | ระบบจัดการฐานข้อมูลเชิงสัมพันธ์ | **Supabase (PostgreSQL 15)** — โซน Singapore (ap-southeast-1) |
| **📲 Application Format** | สถาปัตยกรรมแอปพลิเคชัน | **PWA (Progressive Web App)** ติดตั้งลงมือถือได้แบบ Standalone |
| **🔄 CI/CD Automation** | ระบบประกอบและส่งมอบซอฟต์แวร์ | Automated Git Push -> Vite Production Build -> Zero-Downtime Deploy |

---

## 📌 ภาพรวมและปรัชญาการออกแบบ (Product Vision & Philosophy)

**Gym Gym Gym** ถูกสร้างขึ้นบนแนวคิด **"Dual-Track Discipline (วินัยคู่ขนาน)"** ซึ่งผสานสองเสาหลักสำคัญของชีวิต:
1. **Physical Health Track (Fit)**:
   * **ระบบเครื่องเล่น 15 ที/เซ็ต (The 15-Rep Hypertrophy Protocol)**: กำหนดมาตรฐานการฝึกเครื่องเล่นแต่ละเซ็ตให้ครบ 15 ครั้งเพื่อการสร้างกล้ามเนื้อและเผาผลาญไขมันสูงสุด
   * **ระบบวิ่งสะสมระยะ (Cardio Running Engine)**: บันทึกระยะทางวิ่ง (1, 2, 5, 10, 15, 20 กม.) คำนวณแคลอรีที่เผาผลาญตามน้ำหนักตัวจริงของผู้ใช้อย่างแม่นยำ
   * **Smart Scheduler**: ระบบอัลกอริทึมสุ่มและจัดตารางซ้อมอัจฉริยะตามกลุ่มกล้ามเนื้อ (Chest, Back, Legs, Shoulders, Arms, Abs, Cardio)
   * **Rest Timer**: ตัวจับเวลานับถอยหลังระหว่างพักเซ็ต ช่วยรักษาระดับอัตราการเต้นของหัวใจ
2. **Financial Discipline Track (Finance)**:
   * **Fit & Daily Cash Flow**: บันทึกรายรับ-รายจ่ายทั้งในหมวดหมู่สุขภาพ (เวย์โปรตีน, อาหารคลีน, ค่าฟิตเนส) และค่าใช้จ่ายชีวิตประจำวัน
   * **Realtime Net Balance**: คำนวณยอดเงินคงเหลือสุทธิและสรุปสถานะการเงินทันทีเมื่อมีรายการใหม่
3. **Design System, Multi-Theme & Bilingual Experience**:
   * **Multi-Color Theme Engine**: รองรับการเลือกธีมสีหลักได้ถึง 6 โทนสีตามสไตล์ของผู้ใช้ (Electric Yellow ⚡, Neon Lime 🍏, Cyber Cyan 💎, Lava Orange 🔥, Ultra Violet 🔮, Stealth Monochrome 🏁) พร้อมระบบ Dynamic CSS Injection ที่ปรับแต่งสีเส้นขอบ, ปุ่มกด และเงากลอสแบบเรียลไทม์
   * **Bilingual Toggle (TH / EN)**: สลับภาษาระหว่างภาษาไทยและภาษาอังกฤษได้ใน 1 วินาที ทั้งผ่านปุ่ม Toggle บน Top Header Wave ด้านบนสุด และในแท็บตั้งค่า (Settings)
   * **Neo-Brutalist Minimalism**: ใช้เส้นขอบคมชัด (Borders 1.5–2px), คอนทราสต์สูง, แถบสีพรีเมียม, ฟอนต์สากลระดับพรีเมียม **Outfit** (อังกฤษ) และ **Prompt** (ไทย)
   * **Fluid Organic Wave**: กราฟิกเส้นสายของเหลวโค้งมนสีดำด้านบนของหน้าจอ ช่วยเพิ่มมิติความพรีเมียม
   * **Lucide Icons 100%**: ดีไซน์สะอาดตา ปราศจาก Emoji พื้นฐาน ใช้ Vector Icons ทันสมัยทั้งหมด

---

## 📱 ระบบ Progressive Web App (PWA) & การติดตั้งลงมือถือ

แอปพลิเคชันได้รับการตั้งค่าตามมาตรฐาน **W3C Progressive Web App** ทำให้สามารถติดตั้งและเปิดใช้งานได้เสมือน Native Mobile App 100%:

```
[ เบราว์เซอร์มือถือ / Safari / Chrome ]
              │
              ▼  (กด Add to Home Screen / ติดตั้งแอป)
┌────────────────────────────────────────────────────────┐
│               INSTALLED PWA STANDALONE                 │
│                                                        │
│  • ไร้แถบ URL / Navigation Bar (Full Screen 100%)       │
│  • รองรับ Safe Area Notch / Dynamic Island บน iPhone   │
│  • ไอคอนคมชัด Adaptive 192x192 & 512x512 Phoenix Logo  │
│  • เปิดแอปได้ทันทีแม้ไม่มีสัญญาณเน็ต (Offline Cache)    │
└────────────────────────────────────────────────────────┘
```

### 1. ไฟล์การกำหนดค่า PWA:
* **`public/manifest.json`**: กำหนดชื่อแอป, สีธีม (`#0a0a0c`), รูปแบบการแสดงผล (`standalone`), และไอคอน Maskable
* **`public/sw.js`**: Service Worker สำหรับแคชไฟล์ Static (HTML, CSS, JS, รูปภาพ) ด้วยกลยุทธ์ **Cache-First** สำหรับ Assets และ **Network-First** สำหรับหน้าหลัก
* **`src/main.tsx`**: สคริปต์ลงทะเบียน Service Worker อัตโนมัติเมื่อโหลดหน้าเว็บ
* **`src/components/SettingsTab.tsx`**: การ์ดติดตั้งแอปในหน้าตั้งค่า ดักจับอีเวนต์ `beforeinstallprompt` เพื่อให้กดติดตั้งได้ในคลิกเดียว

### 2. คู่มือการติดตั้งสำหรับผู้ใช้งาน:
* **🍏 สำหรับ iPhone / iPad (Safari)**:
  1. เปิดเบราว์เซอร์ **Safari** ไปที่ [https://projectflukegg.vercel.app](https://projectflukegg.vercel.app)
  2. แตะปุ่มแชร์ **(Share 📤)** ที่แถบเมนูด้านล่าง
  3. ปัดหน้าต่างขึ้น แล้วแตะเลือก **"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen ➕)**
  4. แตะปุ่ม **"เพิ่ม" (Add)** มุมบนขวา
* **🤖 สำหรับ Android (Google Chrome)**:
  1. เปิดเบราว์เซอร์ **Google Chrome** ไปที่ [https://projectflukegg.vercel.app](https://projectflukegg.vercel.app)
  2. แตะปุ่ม **"ติดตั้งแอป" (Install App)** บนแถบแจ้งเตือนด้านล่าง หรือแตะจุด 3 จุด **(⋮)** มุมขวาบน -> เลือก **"ติดตั้งแอป"**
  3. กดยืนยัน **"ติดตั้ง"**
* **💻 สำหรับ Windows / macOS (Chrome / Edge)**:
  1. คลิกไอคอนรูปคอมพิวเตอร์/ติดตั้ง บนแถบ Address Bar ขวาบน แล้วกดยืนยัน Install

---

## 🗄️ สถาปัตยกรรมฐานข้อมูล Supabase PostgreSQL (Cloud Database Architecture)

โปรเจกต์ใช้สถาปัตยกรรม **Hybrid Local-First + Cloud Synchronization** โดยข้อมูลจะถูกบันทึกและตอบสนองบนเครื่องทันที (Zero Latency) พร้อมกับส่งข้อมูลไปจัดเก็บบน **Supabase PostgreSQL** ในเบื้องหลัง

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT TIER (PWA)                             │
│                                                                         │
│   [ React UI State ]                                                    │
│          │                                                              │
│          ├──> [ localStorage ] (Offline & Instant Local-First Access)   │
│          │                                                              │
│          └──> [ supabaseSync.ts ] (Asynchronous Background Replicator)  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                        HTTPS / TLS 1.3 REST API
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SUPABASE CLOUD (PostgreSQL 15)                     │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ 1. public.profiles                                              │   │
│   │    - id (UUID PK -> auth.users)                                 │   │
│   │    - display_name, member_id, weight_kg, height_cm, age         │   │
│   │    - daily_calorie_target, gym_name, theme_mode, updated_at     │   │
│   ├─────────────────────────────────────────────────────────────────┤   │
│   │ 2. public.workout_sessions                                      │   │
│   │    - id (UUID PK), user_id (FK), session_date, title            │   │
│   │    - duration_minutes, calories_burned, created_at              │   │
│   ├─────────────────────────────────────────────────────────────────┤   │
│   │ 3. public.scheduled_plans                                       │   │
│   │    - id (UUID PK), user_id (FK), plan_date, title               │   │
│   │    - muscle_group, routine_items (JSONB), running_distance_km   │   │
│   ├─────────────────────────────────────────────────────────────────┤   │
│   │ 4. public.transactions                                          │   │
│   │    - id (UUID PK), user_id (FK), tx_date, title, tx_type        │   │
│   │    - category, amount, note, created_at                         │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   🔒 ROW LEVEL SECURITY (RLS): แยกข้อมูลผู้ใช้งานขาดจากกัน 100%           │
│   ⚡ TRIGGER: on_auth_user_created สร้างโปรไฟล์เริ่มต้นอัตโนมัติ            │
└─────────────────────────────────────────────────────────────────────────┘
```

### สคริปต์โครงสร้างฐานข้อมูล ([supabase_schema.sql](file:///d:/projectflukegg/supabase_schema.sql)):
ไฟล์ SQL Migration ถูกเขียนขึ้นตามมาตรฐาน 3NF ประกอบด้วย:
* การสร้าง 4 ตารางหลัก พร้อม Foreign Key เชื่อมโยงกับ `auth.users(id)` แบบ `ON DELETE CASCADE`
* การเปิดใช้งาน **Row Level Security (RLS)** ในทุกตาราง เพื่อให้ผู้ใช้สามารถอ่าน-เขียนได้เฉพาะข้อมูลที่เป็นเจ้าของ (`auth.uid() = user_id`)
* การสร้าง **Database Function & Trigger (`handle_new_user`)** ที่จะทำการสร้างแถวข้อมูลในตาราง `profiles` ให้อัตโนมัติเมื่อมีการสมัครสมาชิกใหม่

---

## 🔐 การตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables)

เพื่อความปลอดภัยสูงสุด ค่ากุญแจ API จะไม่ถูก Hardcode ลงในโค้ด แต่จะถูกเรียกผ่าน `import.meta.env`:

| ตัวแปร | ความหมาย | ค่าตัวอย่าง / การตั้งค่า |
|---|---|---|
| `VITE_SUPABASE_URL` | Endpoint เชื่อมต่อ Supabase REST API | `https://zfwutvcujxznlpqussq.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public Anon API Key สำหรับฝั่ง Client | `sb_publishable_-M7tInPmlHKlmzIISB_-UQ_0sjbWC5o` |

### วิธีการกำหนดค่า:
1. **สำหรับ Local Development**:
   * สร้างไฟล์ `.env` ที่โฟลเดอร์ Root ของโปรเจกต์
   * ระบุค่าตามแม่แบบในไฟล์ [.env.example](file:///d:/projectflukegg/.env.example)
   * *(ไฟล์ `.env` ได้รับการป้องกันใน `.gitignore` เรียบร้อยแล้ว ไม่ถูกส่งขึ้น GitHub)*
2. **สำหรับ Vercel Production**:
   * ไปที่ **Vercel Dashboard** -> โครงการ `projectflukegg` -> แท็บ **Settings**
   * เลือกเมนู **Environment Variables**
   * เพิ่มทั้ง 2 ตัวแปรข้างต้น เลือกประเภทเป็น **`Config`** หรือ **`Plaintext`** แล้วกด **Save**

---

## 🧭 โครงสร้างฟังก์ชันและแท็บการทำงานภายในแอป (Feature Walkthrough)

แอปพลิเคชันแบ่งการทำงานออกเป็น 6 ส่วนหลัก ควบคุมผ่านแถบ Navigation Bar ด้านล่าง:

1. **🏠 แดชบอร์ด (Dashboard Tab)**:
   * วงแหวนเปอร์เซ็นต์ความสำเร็จเป้าหมายแคลอรีประจำวัน (Circular Calorie Ring)
   * สรุปเวลาการซ้อมรวม, แคลอรีที่เผาผลาญ, และยอดเงินคงเหลือสุทธิ (Net Balance)
   * ทางลัดเข้าสู่ระบบจับเวลาซ้อมวันนี้ และตารางซ้อมที่กำหนดไว้
2. **🏋️‍♂️ ซ้อมวันนี้ (Workout Tab)**:
   * ระบบเพิ่มเครื่องเล่นและเซ็ตการยกแบบ **15 ครั้ง/เซ็ต** พร้อมช่องปรับน้ำหนัก (กก.)
   * เช็คบ็อกซ์บันทึกการผ่านแต่ละเซ็ต พร้อมเสียงเตือน/ตัวนับ
   * ตัวจับเวลาพักเซ็ต (Rest Interval Timer: 30s, 60s, 90s, 120s)
   * ระบบบันทึกระยะทางวิ่ง (1, 2, 5, 10, 15, 20 กม.) คำนวณแคลอรีเผาผลาญอัตโนมัติ
3. **📅 ปฏิทินซ้อม (Calendar Tab)**:
   * ปฏิทินรายเดือน/รายสัปดาห์แสดงตารางซ้อมที่วางแผนไว้ล่วงหน้า
   * **Smart Scheduler Modal**: ระบบคำนวณและสุ่มจัดเซ็ตเครื่องเล่น 15 ทีตามกลุ่มกล้ามเนื้อที่เลือก
   * ปุ่มเริ่มซ้อมจากแผนในคลิกเดียว (Start Workout from Plan)
4. **💰 บัญชีเงิน (Finance Tab)**:
   * ฟอร์มบันทึกรายรับ-รายจ่าย พร้อมหมวดหมู่ (อาหาร, อาหารเสริม, ฟิตเนส, ท่องเที่ยว, รายได้)
   * การคำนวณกระแสเงินสดและยอดเงินสุทธิแบบเรียลไทม์
   * ประวัติธุรกรรมย้อนหลังพร้อมปุ่มลบรายการ
5. **📊 สรุปผล (Summary Tab)**:
   * สรุปสถิติการออกกำลังกายรวม (จำนวนเซ็ตที่ยกสำเร็จ, ระยะทางวิ่งรวม, แคลอรีสะสม)
   * กราฟและตัวชี้วัดความสม่ำเสมอของวินัย (Discipline Consistency Metric)
6. **⚙️ ตั้งค่า (Settings Tab)**:
   * ข้อมูลโปรไฟล์ส่วนตัว (ชื่อ, รหัสสมาชิก, น้ำหนัก, ส่วนสูง, อายุ, เป้าหมายแคลอรี)
   * การ์ดติดตั้งแอป PWA ลงเครื่อง
   * ปุ่มสลับธีมสี (เหลืองนีออน / โมโนโครม)
   * ปุ่มล้างข้อมูลทดสอบ (Reset Demo Data)
   * ระบบยืนยันการออกจากระบบอย่างปลอดภัย (Strict Logout)
7. **🔒 ประตูล็อกอินความปลอดภัย (Strict Login Gate)**:
   * เมื่อผู้ใช้ยังไม่เข้าสู่ระบบ ระบบจะแสดง [AuthModal](file:///d:/projectflukegg/src/components/AuthModal.tsx) กั้นไม่ให้เข้าถึงข้อมูลภายใน
   * มีระบบสมัครสมาชิก, ตรวจสอบรหัสผ่าน, และระบบข้อตกลงและเงื่อนไขการใช้งาน ([TermsModal](file:///d:/projectflukegg/src/components/TermsModal.tsx))

---

## 📂 โครงสร้างโฟลเดอร์โปรเจกต์ (Project Directory Tree)

```
projectflukegg/
├── public/
│   ├── favicon.svg           # Vector Phoenix Favicon
│   ├── flukexd-logo.png      # High-Resolution Master Logo (1024x1024)
│   ├── icon-192.png          # PWA Standard Icon (192x192)
│   ├── icon-512.png          # PWA High-Resolution Icon (512x512)
│   ├── manifest.json         # PWA Web App Manifest Configuration
│   └── sw.js                 # PWA Service Worker (Offline Cache & Network Strategies)
├── src/
│   ├── assets/               # Static Visual Assets & SVG Icons
│   ├── components/           # UI Components
│   │   ├── AuthModal.tsx             # Login & Registration Security Gate Modal
│   │   ├── CalendarTab.tsx           # Monthly Workout Routine Calendar
│   │   ├── CircularProgress.tsx      # SVG Calorie Goal Circular Ring
│   │   ├── ContourBackground.tsx     # Modern Fluid Organic Line Art Background
│   │   ├── DashboardTab.tsx          # Overview Stats & Daily Highlights
│   │   ├── DesktopShowcase.tsx       # Responsive Desktop View Frame
│   │   ├── FinanceTab.tsx            # Fit & Daily Cash Flow Ledger
│   │   ├── HeaderWave.tsx            # Fluid Black Organic Wave Header
│   │   ├── LandingPage.tsx           # Public Feature Showcase & Presentation
│   │   ├── ProfileModal.tsx          # Quick Profile Edit Modal
│   │   ├── SettingsTab.tsx           # Settings, PWA Install Card & Logout
│   │   ├── SmartSchedulerModal.tsx   # Automated 15-Rep Workout Routine Generator
│   │   ├── SummaryTab.tsx            # Weekly/Monthly Analytics & Discipline Score
│   │   ├── TermsModal.tsx            # Terms of Service & Privacy Policy Modal
│   │   └── WorkoutTab.tsx            # Live Gym Workout Tracker & Rest Timer
│   ├── types/
│   │   └── index.ts          # TypeScript Type Definitions & Domain Models
│   ├── utils/
│   │   ├── financeEngine.ts  # Cash Flow Calculations & Balance Utilities
│   │   ├── storage.ts        # Local-First LocalStorage Manager & Sanitizer
│   │   ├── supabaseClient.ts # Supabase SDK Client Instance & Safe Env Handler
│   │   ├── supabaseSync.ts   # Asynchronous Cloud PostgreSQL Sync Service
│   │   └── workoutEngine.ts  # METs Calorie Formula & 15-Rep Routine Generator
│   ├── App.css               # Component Layout Enhancements
│   ├── App.tsx               # Root State Orchestrator, Router & Sync Triggers
│   ├── index.css             # Neo-Brutalist CSS Tokens, Fonts & Fluid Styles
│   └── main.tsx              # React Entry Point & Service Worker Registration
├── .env                      # Local Environment Secrets (Git Ignored)
├── .env.example              # Template Environment Variables
├── .gitignore                # Git Exclusion Rules (Node modules, dist, .env)
├── index.html                # HTML Entry, Viewport & PWA Headers
├── package.json              # Project Dependencies & Build Scripts
├── supabase_schema.sql       # Database Migration Script & RLS Policies
├── tsconfig.json             # TypeScript Configuration
├── vercel.json               # Vercel SPA Fallback Rewrite Configuration
└── README.md                 # Complete System Architecture & Documentation
```

---

## 🛠️ ขั้นตอนการรันและการคอมไพล์ในเครื่อง (Development Guide)

### 1. ความต้องการของระบบ (Prerequisites):
* **Node.js**: เวอร์ชัน 18.0.0 ขึ้นไป (แนะนำ v20 หรือ v24)
* **npm**: เวอร์ชัน 9.0.0 ขึ้นไป

### 2. คำสั่งที่ใช้งานบ่อย:
```bash
# ติดตั้งไลบรารีทั้งหมด
npm install

# รัน Development Server จำลองบนเครื่อง (Local Host: 5173)
npm run dev

# ตรวจสอบความถูกต้องของ Type (Typecheck) และสร้าง Production Bundle
npm run build

# พรีวิวผลลัพธ์ของโฟลเดอร์ dist ก่อน Deploy
npm run preview
```

---

## 👥 คณะทำงานและบทบาทสถาปัตยกรรม (Engineering Council)

โปรเจกต์นี้ได้รับการพัฒนาและตรวจสอบโดยทีมวิศวกรรมซอฟต์แวร์แบบครบวงจร:
* **Senior Software Developer (Lead)**: วางสถาปัตยกรรม Local-First ควบคุมความเข้ากันได้ของระบบ และเชื่อมต่อ Supabase Client
* **Senior Software Engineer**: ออกแบบโมเดลข้อมูล (TypeScript Models) และระบบคำนวณแคลอรีและการเงิน
* **Full Stack Developer**: ออกแบบสกีมาฐานข้อมูล PostgreSQL ([supabase_schema.sql](file:///d:/projectflukegg/supabase_schema.sql)) และระบบ Background Sync
* **Elite UI/UX Designer**: กำหนดทิศทาง Neo-Brutalist Minimalism ผสาน Fluid Organic Wave และการรองรับ PWA Fullscreen
* **Senior DevOps Engineer**: วางระบบ Git Version Control, Pipeline อัตโนมัติบน Vercel Edge Network และระบบความปลอดภัย Environment Variables
* **QA Engineer**: ตรวจสอบคุณภาพโค้ด (Zero Build Errors), ตรวจสอบระบบความปลอดภัย RLS และความถูกต้องของฟิลด์ข้อมูล
* **Senior Engineering Manager**: ควบคุมการส่งมอบคุณค่าตามลำดับเฟส (Phase 1 -> 1.5 -> 2) อย่างตรงเวลาและไร้ Downtime

---

## 📄 ลิขสิทธิ์และการใช้งาน (License)

โปรเจกต์นี้พัฒนาขึ้นเพื่อการบริหารจัดการสุขภาพและการเงินส่วนบุคคลภายใต้ชื่อ **Gym Gym Gym (Fit & Finance OS)**  
ลิขสิทธิ์เป็นของผู้พัฒนา **FLUKEXD (`pratchayawutthansri`)** © 2026 สงวนลิขสิทธิ์ทั้งหมด
