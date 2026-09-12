# ARFA.DEV — Personal Developer Platform

> Dokumen acuan utama untuk pengembangan project portfolio fullstack pribadi.
>
> Gunakan dokumen ini sebagai product specification, technical guideline, dan development roadmap.

---

## 1. Visi Project

ARFA.DEV bukan sekadar website portfolio statis. Project ini adalah **Personal Developer Platform** yang sekaligus menjadi:

- Personal portfolio
- Project showcase
- Developer blog
- Technical notes / knowledge base
- Experience & certificate showcase
- GitHub activity dashboard
- Contact management system
- Admin CMS
- Analytics dashboard
- Demonstrasi kemampuan fullstack development

Project ini harus terlihat seperti aplikasi production-ready yang benar-benar digunakan, bukan sekadar template portfolio.

---

## 2. Tujuan Utama

Project harus membantu menunjukkan kemampuan dalam:

- Frontend development
- Backend development
- Database design
- REST API
- Authentication & authorization
- File management
- Realtime features
- Queue & background jobs
- Testing
- Security
- Git & GitHub workflow
- Docker
- CI/CD
- Cloud deployment
- Software architecture

Portfolio harus dapat berkembang terus tanpa perlu mengubah source code untuk setiap penambahan project, artikel, skill, sertifikat, atau pengalaman.

---

## 3. Prinsip Pengembangan

### 3.1 Production-minded

Setiap fitur harus dibuat dengan mempertimbangkan:

- Maintainability
- Security
- Performance
- Scalability
- Testability
- Accessibility
- Good UX

### 3.2 Tidak Overengineering di Awal

Mulai sederhana, kemudian tingkatkan kompleksitas berdasarkan kebutuhan nyata.

Urutan umum:

1. CRUD yang bersih
2. Validation
3. Authorization
4. API
5. Caching
6. Queue
7. Realtime
8. Testing
9. Deployment
10. Optimization

### 3.3 Single Source of Truth

Data portfolio disimpan di database dan dikelola melalui Admin CMS.

Frontend publik tidak boleh menyimpan data portfolio secara hard-code apabila data tersebut seharusnya dapat diubah dari admin.

---

# 4. Tech Stack

## Backend

- Laravel 13
- PHP 8.5
- Laravel Inertia
- Laravel Fortify
- Laravel Sanctum jika API authentication diperlukan
- Laravel Notifications
- Laravel Queues
- Laravel Reverb

## Frontend

- Vue 3
- TypeScript
- Inertia.js
- Tailwind CSS
- shadcn-vue
- Pinia
- Axios hanya ketika dibutuhkan untuk request di luar pola Inertia

## Database

- PostgreSQL 18

## Cache / Queue

- Redis

## Testing

- Pest
- Laravel Feature Tests
- Playwright untuk E2E/browser testing

## DevOps

- Docker
- Docker Compose
- Git
- GitHub
- GitHub Actions

## Storage

- Local storage untuk development
- S3-compatible object storage untuk production

## Optional / Advanced

- Apache ECharts untuk analytics
- GitHub API
- AI API untuk Portfolio Assistant
- PWA
- Meilisearch apabila PostgreSQL Full Text Search sudah tidak mencukupi

---

# 5. Arsitektur Aplikasi

Project menggunakan pendekatan **Laravel Monolith + Vue + Inertia**.

```text
Browser
   |
   v
Vue 3 + TypeScript
   |
   v
Inertia.js
   |
   v
Laravel 13
   |
   +-------------------+
   |                   |
   v                   v
PostgreSQL            Redis
   |                   |
   |                   +--> Cache
   |                   +--> Queue
   |                   +--> Realtime support
   |
   +--> Media / File Storage
```

Admin dan public website tetap berada dalam satu aplikasi Laravel.

---

# 6. Area Aplikasi

## Public Area

```text
/
/about
/projects
/projects/{slug}
/skills
/experience
/education
/certificates
/blog
/blog/{slug}
/notes
/notes/{slug}
/journey
/lab
/contact
```

## Admin Area

```text
/admin
/admin/dashboard
/admin/projects
/admin/skills
/admin/experiences
/admin/educations
/admin/certificates
/admin/articles
/admin/notes
/admin/media
/admin/messages
/admin/analytics
/admin/activity-logs
/admin/settings
```

---

# 7. Fitur Public Website

## 7.1 Home

Home harus menampilkan:

- Hero section
- Short introduction
- Featured projects
- Current focus
- Skills overview
- Recent articles
- GitHub activity
- Developer journey preview
- Contact CTA

Hero harus langsung menjelaskan:

- Siapa saya
- Apa yang saya kerjakan
- Teknologi utama
- Call to action

---

## 7.2 About

Menampilkan:

- Personal introduction
- Developer philosophy
- Areas of interest
- Current learning focus
- Short profile

---

## 7.3 Projects

Project list mendukung:

- Search
- Category filter
- Technology filter
- Status filter
- Featured filter
- Pagination
- Sorting

Setiap project mempunyai detail lengkap.

### Project detail harus dapat menampilkan

- Title
- Slug
- Short description
- Full description
- Problem
- Goals
- Features
- Architecture
- Challenges
- Solutions
- Lessons learned
- Technologies
- Screenshots
- Demo URL
- GitHub URL
- Status
- Dates
- Team / role jika relevan

---

## 7.4 Skills

Skill dikelompokkan berdasarkan kategori:

- Frontend
- Backend
- Database
- DevOps
- Tools
- IoT
- Other

Setiap skill dapat memiliki:

- Name
- Icon
- Category
- Level
- Description
- Featured flag

Jangan menampilkan level skill sebagai klaim absolut. Gunakan sebagai representasi internal/portfolio atau label seperti Beginner, Intermediate, Advanced berdasarkan konteks yang jelas.

---

## 7.5 Experience

Menampilkan:

- Organization / company
- Position
- Description
- Start date
- End date
- Technologies
- Achievements

---

## 7.6 Education

Menampilkan:

- Institution
- Program
- Description
- Start date
- End date

---

## 7.7 Certificates

Menampilkan:

- Certificate name
- Issuer
- Issue date
- Credential ID
- Credential URL
- Certificate image/PDF

---

## 7.8 Blog

Blog digunakan untuk tulisan yang lebih panjang dan publik.

Fitur:

- Article listing
- Category
- Tags
- Search
- Featured article
- Reading time
- Cover image
- Publish date
- Related articles

---

## 7.9 Technical Notes

Notes berbeda dari blog.

Notes berisi dokumentasi teknis singkat seperti:

- Laravel troubleshooting
- Vue patterns
- PostgreSQL notes
- Docker commands
- Git workflow
- Deployment notes
- API notes

---

## 7.10 Developer Lab

Lab digunakan untuk eksperimen dan mini project.

Contoh:

- Redis Queue experiment
- WebSocket experiment
- AI experiment
- Docker experiment
- WebRTC experiment
- Search experiment
- OAuth experiment

Setiap Lab item memiliki status:

- Experimental
- In Progress
- Completed
- Archived

---

## 7.11 Developer Journey

Menampilkan timeline perkembangan skill dan project.

Contoh:

```text
2024
  Started Web Development
        |
2025
  Learned Laravel
  Learned Vue
        |
2026
  Built SIMPESMA
  Built IoT projects
  Learned DevOps
        |
Future
  Production-scale projects
```

---

## 7.12 GitHub Integration

Integrasi GitHub harus dapat menampilkan data seperti:

- Public repositories
- Repository name
- Description
- Stars
- Main language
- Recent activity
- Contribution/activity summary jika tersedia

GitHub data sebaiknya disimpan/cached sehingga public website tidak bergantung penuh pada request API real-time setiap page load.

---

## 7.13 Contact

Form:

- Name
- Email
- Subject
- Message

Flow:

```text
Visitor
  |
  v
Vue/Inertia
  |
  v
Laravel validation
  |
  v
Database
  |
  +--> Notification
  +--> Email
  +--> Admin dashboard
```

Gunakan rate limiting dan validation.

---

# 8. Admin CMS

Admin CMS adalah bagian penting dari project.

Admin tidak boleh membutuhkan perubahan kode untuk tugas rutin seperti:

- Menambah project
- Mengedit project
- Menambah artikel
- Mengedit artikel
- Mengubah skill
- Menambah certificate
- Menambah experience
- Mengelola media
- Membaca contact messages

---

# 9. Authentication & Authorization

Gunakan authentication yang sesuai ecosystem Laravel.

Minimum:

- Login
- Logout
- Forgot password
- Reset password
- Email verification
- Session management

Role minimal:

```text
Super Admin
Editor
Author
```

Permission berbasis resource.

Contoh:

```text
project.view
project.create
project.update
project.delete

article.view
article.create
article.update
article.delete

media.view
media.create
media.delete
```

Gunakan Laravel Policies/Gates untuk authorization.

Jangan hanya menyembunyikan tombol di frontend. Authorization wajib dilakukan di backend.

---

# 10. Activity Log

Semua aktivitas penting admin dapat dicatat.

Contoh:

```text
Admin logged in
Created project
Updated project
Published article
Deleted media
Changed site settings
```

Minimal data log:

- User
- Action
- Resource type
- Resource ID
- Description
- IP jika memang diperlukan
- User agent jika memang diperlukan
- Timestamp

Hindari menyimpan secret atau data sensitif secara sembarangan.

---

# 11. Media Library

Media Library menangani:

- Project screenshots
- Project thumbnails
- Article covers
- Certificate images
- Documents
- Avatar/profile assets

Fitur:

- Upload
- Preview
- Search
- Delete
- Metadata
- File type validation
- File size validation
- Private/public visibility sesuai kebutuhan

File public jangan otomatis dianggap aman hanya karena URL-nya diketahui. File yang seharusnya private harus diproteksi melalui backend/storage access control.

---

# 12. Analytics

Admin dashboard minimal menampilkan:

- Total visitors
- Project views
- Article views
- GitHub clicks
- Contact messages
- Most viewed project
- Most viewed article
- Traffic trend

Analytics event minimal:

```text
page_view
project_view
article_view
github_click
contact_submit
external_link_click
```

Jangan mengumpulkan data pribadi yang tidak dibutuhkan.

---

# 13. Realtime Features

Gunakan Laravel Reverb untuk fitur realtime yang memang membutuhkan update langsung.

Prioritas awal:

- New contact message notification
- Admin notification
- Realtime activity updates

Jangan menggunakan realtime untuk data yang sebenarnya tidak membutuhkannya.

---

# 14. Queue / Background Jobs

Gunakan queue untuk proses yang tidak perlu memblokir request utama.

Contoh:

- Send email
- GitHub synchronization
- Image processing
- Analytics aggregation
- Notification delivery

Redis menjadi driver queue/cache pada environment yang mendukungnya.

---

# 15. Database Design

Tabel inti yang direncanakan:

```text
users
roles
permissions
role_user
permission_role

projects
project_categories
project_technologies
project_images

skills
skill_categories

experiences
experience_technologies

educations
certificates

articles
article_categories
tags
article_tags

notes
note_categories

media
contact_messages
notifications
activity_logs

analytics_events

github_repositories
github_stats

site_settings
social_links
```

Foreign key, index, unique constraint, nullable field, dan cascade behavior harus ditentukan dengan sengaja.

Jangan menambahkan tabel hanya untuk mengikuti teori. Setiap tabel harus memiliki alasan fungsional yang jelas.

---

# 16. API Guidelines

Walaupun aplikasi menggunakan Inertia, endpoint API dapat dibuat untuk integrasi tertentu.

Contoh:

```text
GET    /api/projects
GET    /api/projects/{project}
GET    /api/skills
GET    /api/articles
GET    /api/articles/{article}
POST   /api/contact
GET    /api/github
```

Gunakan:

- API Resources
- Form Requests
- Consistent response format
- Correct HTTP status codes
- Pagination
- Filtering
- Validation
- Authorization

Jangan mengembalikan model database mentah secara sembarangan jika response contract seharusnya lebih terkontrol.

---

# 17. Backend Coding Rules

## Controller

Controller harus tipis.

Hindari business logic panjang di controller.

Contoh pola yang disukai:

```text
Request
  ↓
Controller
  ↓
Action/Service
  ↓
Model/Repository jika benar-benar diperlukan
  ↓
Response/Resource
```

## Form Request

Semua input yang membutuhkan validation harus divalidasi menggunakan Form Request atau mekanisme validation yang konsisten.

## Service / Action

Gunakan Action/Service ketika logic sudah cukup kompleks atau reusable.

Jangan membuat Service class hanya untuk membungkus satu baris kode tanpa alasan.

## Model

Model berisi relationship, casts, scopes, dan behavior yang memang dekat dengan data/domain.

## Policy

Semua authorization sensitif wajib diverifikasi di backend.

---

# 18. Frontend Coding Rules

Gunakan Vue 3 Composition API.

Preferensi:

```text
<script setup lang="ts">
```

Gunakan TypeScript untuk:

- Props
- Emits
- Form state bila kompleks
- API response contract
- Reusable utilities

Buat reusable components jika terdapat pola UI yang berulang.

Jangan membuat komponen terlalu besar. Pecah berdasarkan responsibility.

Contoh:

```text
ProjectDetail.vue
  ├── ProjectHero.vue
  ├── ProjectMeta.vue
  ├── ProjectFeatures.vue
  ├── ProjectArchitecture.vue
  ├── ProjectGallery.vue
  └── ProjectLinks.vue
```

---

# 19. UI / UX Guidelines

Design direction:

- Modern
- Clean
- Developer-focused
- Professional
- Minimal tetapi tidak kosong
- Mobile-first
- Responsive
- Accessible

Gunakan visual hierarchy yang jelas.

Hindari:

- Terlalu banyak animasi
- Gradient berlebihan
- Glassmorphism berlebihan
- Terlalu banyak badge
- Skill percentage yang terlihat tidak objektif
- Text terlalu panjang di homepage

Animasi harus membantu UX, bukan sekadar dekorasi.

---

# 20. Responsive Design

Minimal support:

- Mobile
- Tablet
- Laptop
- Desktop

Semua halaman public dan admin harus usable tanpa horizontal scrolling yang tidak diperlukan.

---

# 21. SEO

Public pages harus memiliki:

- Semantic HTML
- Title
- Meta description
- Open Graph metadata
- Canonical URL jika relevan
- Clean slug
- Structured data jika relevan
- Sitemap
- robots.txt

Project dan article harus memiliki metadata yang dapat dikelola.

---

# 22. Accessibility

Minimal:

- Keyboard navigation
- Visible focus state
- Proper labels
- Alt text
- Semantic elements
- Sufficient contrast
- Form error messages

Jangan mengandalkan warna sebagai satu-satunya penanda status.

---

# 23. Performance

Prioritas:

- Database indexing
- Pagination
- Lazy loading image
- Responsive image
- Caching
- Queue
- Avoid N+1 query
- Minimize unnecessary API requests
- Cache GitHub data

Gunakan eager loading dengan sadar.

Contoh:

```php
Project::with(['technologies', 'images'])->paginate();
```

Jangan melakukan query di dalam loop jika bisa dihindari.

---

# 24. Testing Strategy

## Unit Test

Untuk logic terisolasi.

## Feature Test

Untuk use case Laravel.

Contoh:

```text
Admin can create project
Admin can update project
Admin cannot edit unauthorized project
Visitor can view published project
Draft project is not visible publicly
```

## E2E Test

Dengan Playwright untuk flow penting:

```text
Login
Create project
Publish project
Visit public project
Submit contact form
```

---

# 25. Security Checklist

Sebelum production:

- Authentication tested
- Authorization tested
- Rate limit sensitive endpoints
- Validation implemented
- File upload restrictions
- Secure headers
- CSRF protection
- No secrets in repository
- Environment variables used correctly
- SQL queries parameterized through framework
- Production debug disabled
- Logs reviewed
- Admin routes protected

---

# 26. Environment Variables

Contoh kelompok konfigurasi:

```text
APP_NAME
APP_ENV
APP_URL

DB_CONNECTION
DB_HOST
DB_PORT
DB_DATABASE
DB_USERNAME
DB_PASSWORD

REDIS_HOST
REDIS_PORT

MAIL_MAILER
MAIL_HOST
MAIL_PORT
MAIL_USERNAME
MAIL_PASSWORD

FILESYSTEM_DISK

GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
GITHUB_TOKEN

AI_API_KEY
```

Secret tidak boleh di-commit ke Git.

Gunakan `.env.example` tanpa credential nyata.

---

# 27. Git Workflow

Branch utama:

```text
main
```

Feature branch:

```text
feature/project-management
feature/blog
feature/github-integration
feature/analytics
```

Bugfix:

```text
fix/contact-validation
fix/project-slug
```

Commit sebaiknya jelas.

Contoh:

```text
feat: add project management
feat: add github repository sync
fix: prevent draft project exposure
refactor: extract project creation action
```

---

# 28. Definition of Done

Sebuah fitur dianggap selesai jika:

- Requirement terpenuhi
- UI selesai
- Backend selesai
- Validation selesai
- Authorization selesai
- Error handling selesai
- Responsive
- Tested
- Tidak menghasilkan regression pada fitur penting
- Dokumentasi teknis cukup jelas

---

# 29. Development Phases

## Phase 1 — Foundation

- Laravel setup
- Vue setup
- Inertia setup
- TypeScript
- Tailwind
- PostgreSQL
- Git repository
- Base layout
- Theme

## Phase 2 — Public Portfolio

- Home
- About
- Projects
- Skills
- Experience
- Education
- Certificates
- Contact

## Phase 3 — Admin CMS

- Authentication
- Dashboard
- Project CRUD
- Skill CRUD
- Experience CRUD
- Education CRUD
- Certificate CRUD
- Media Library
- Contact inbox

## Phase 4 — Content System

- Blog
- Categories
- Tags
- Notes
- Search
- SEO

## Phase 5 — Developer Integrations

- GitHub API
- Repository sync
- GitHub statistics
- Activity display

## Phase 6 — Advanced Backend

- Redis
- Queue
- Notifications
- Reverb
- Activity logs
- Analytics

## Phase 7 — Quality & Production

- Pest tests
- Playwright E2E
- Docker
- CI/CD
- Security hardening
- Performance optimization
- Deployment

## Phase 8 — Advanced Optional

- AI Portfolio Assistant
- PWA
- Multi-language
- Theme engine
- Advanced search

---

# 30. MVP Scope

MVP pertama tidak boleh terlalu besar.

MVP harus hanya mencakup:

```text
Public:
- Home
- About
- Projects
- Project detail
- Skills
- Experience
- Contact

Admin:
- Login
- Dashboard
- Project CRUD
- Skill CRUD
- Experience CRUD
- Contact messages
```

Setelah MVP stabil, baru lanjut ke Blog, GitHub, Analytics, Realtime, Docker, dan fitur advanced.

---

# 31. Portfolio Content yang Harus Disiapkan

Project awal yang dapat dimasukkan:

1. SIMPESMA
2. Stunting Care
3. IoT Water Quality Monitoring
4. Project academic lainnya
5. Eksperimen kecil / Lab

Untuk setiap project, usahakan tersedia:

- Screenshot
- Deskripsi
- Problem
- Solution
- Features
- Tech stack
- Architecture
- Lessons learned
- GitHub URL
- Demo URL jika tersedia

---

# 32. AI Agent Rules

Dokumen ini dapat digunakan sebagai referensi oleh AI coding agent.

Saat mengerjakan task:

1. Baca dokumen ini terlebih dahulu.
2. Pertahankan arsitektur yang sudah ada.
3. Jangan mengubah stack utama tanpa alasan teknis yang kuat.
4. Jangan melakukan refactor besar jika tidak diperlukan task.
5. Jangan membuat fitur yang belum diminta hanya karena terlihat menarik.
6. Prioritaskan security dan authorization.
7. Gunakan existing component/service/util sebelum membuat duplikasi.
8. Ikuti naming convention Laravel dan Vue.
9. Tambahkan test untuk behavior penting.
10. Jelaskan perubahan besar yang berdampak pada architecture.

---

# 33. AI Agent Development Workflow

Untuk setiap task, ikuti urutan:

```text
Understand
   ↓
Inspect existing code
   ↓
Identify affected modules
   ↓
Plan
   ↓
Implement
   ↓
Validate
   ↓
Test
   ↓
Review
```

Jangan langsung mengubah banyak file sebelum memahami struktur project.

---

# 34. Prioritas Pengembangan

Gunakan urutan:

```text
P0 = Critical
P1 = Important
P2 = Enhancement
P3 = Experimental
```

Contoh:

```text
P0
Authentication
Project management
Contact

P1
Blog
Media library
GitHub

P2
Analytics
Realtime
PWA

P3
AI assistant
Advanced search
```

---

# 35. Final Product Vision

Ketika project selesai, visitor harus dapat melihat:

```text
Who I am
What I build
How I build it
What technologies I use
What projects I have built
What problems I solved
What I am learning
How to contact me
```

Sedangkan recruiter/client/developer harus dapat melihat bukti bahwa project ini dibangun dengan:

```text
Frontend
Backend
Database
Authentication
Authorization
API
Testing
Security
Realtime
Queue
Caching
Git
Docker
CI/CD
Cloud
```

Tujuan akhir bukan membuat website portfolio yang terlihat canggih.

Tujuan akhirnya adalah membuat **bukti nyata kemampuan software engineering melalui portfolio itu sendiri**.

---

# 36. Non-Goals

Untuk tahap awal, jangan memasukkan:

- Microservices
- Kubernetes
- Event-driven architecture kompleks
- Multiple frontend frameworks sekaligus
- Multiple databases tanpa kebutuhan
- AI untuk semua fitur
- Complex distributed systems

Fitur tersebut boleh dipelajari sebagai eksperimen terpisah, tetapi tidak boleh membuat core portfolio menjadi sulit dirawat.

---

# 37. Success Criteria

Project dianggap berhasil apabila:

- Public portfolio terlihat profesional
- Semua konten utama dapat dikelola dari CMS
- Project dapat ditambahkan tanpa mengubah source code public secara manual
- Authentication dan authorization bekerja
- Contact form bekerja
- Test penting tersedia
- Project dapat dijalankan lewat documented setup
- Project dapat di-deploy
- GitHub repository rapi
- Architecture dapat dijelaskan dalam interview

---

# 38. Current Development Rule

**Build small, verify often, document important decisions, and improve architecture when the real requirement justifies it.**

Dokumen ini adalah acuan awal. Ketika requirement berkembang, perubahan besar terhadap architecture harus didokumentasikan dalam bagian Architecture Decision Record (ADR) atau dokumen teknis terpisah.
