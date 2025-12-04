# contact-app (Fullstack Project: Frontend & Backend)
Proyek ini adalah aplikasi fullstack sebagai technical test IT VICO.

## Tech Stack
- **Backend:** NestJS dengan MongoDB
- **Frontend:** AngularJS
---

## Prasyarat

Sebelum menjalankan proyek ini, pastikan:

- Node.js (versi 18.x atau lebih baru)
- npm (versi 9.x atau lebih baru)
- MongoDB Atlas / Local
---

## Instalasi

1. Clone repository:



git clone https://github.com/rezkimd/contact-app.git
cd contact-app


2. Requirement Installation:


npm install --prefix backend
npm install --prefix frontend


3. Lengkapi file .env

Masukkan String URL MongoDB ke file .env (dir:".backend\.env")
MONGODB_URI=mongodb://<username>:<password>@host:<port>/<cluster-name>

4. Running Application :

npm run dev
 
note: Script `npm run dev` sudah **dikonfigurasi untuk menjalankan frontend dan backend secara bersamaan**.

## Running Unit Test
### Backend (NestJS)


cd backend
npm run test          # menjalankan semua unit test




npm run test:watch    # watch mode, auto rerun saat file berubah




npm run test:cov      # test + coverage


### FrontEnd (Angular)



cd frontend
ng test   


## Additional Note
**Terdapat file READ.ME di dalam backend untuk dokumentasi API**
**dan READ.ME di dalam frontend untuk command dasar menjalankan frontend**
