AngularJS frontend (standalone) for Contact App

Files are under `frontend/angularjs/` and can be served as static files.

How to run locally:
1. From project root, run a static file server in that folder, for example with Python:

```powershell
cd frontend/angularjs
python -m http.server 8080
```

2. Open `http://localhost:8080` in the browser.

Notes:
- The frontend expects the backend API at `http://localhost:3000` (see `services/contactService.js`).
- Login is local-only (stored in localStorage). No authentication against backend yet.
- Use Postman or existing backend to seed contacts.
