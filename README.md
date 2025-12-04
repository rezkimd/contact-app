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

Masukkan String URL MongoDB
MONGODB_URI=mongodb://<username>:<password>@host:<port>/<cluster-name>

4. Running Application :

npm run dev 
note: Script `npm run dev` sudah **dikonfigurasi untuk menjalankan frontend dan backend secara bersamaan**.

