# 🏙️ UrbanTrace — Civic Issue Reporting Platform

> A full-stack web application that allows citizens to report civic issues (road damage, water problems, electricity faults, sanitation) by pinning a location on an interactive map. Authorities receive instant email alerts and can track all reports through a dashboard.

---

## 📸 Overview

UrbanTrace is built with a **Django REST Framework** backend and a **React + TypeScript + Vite** frontend. Citizens can drop a pin anywhere on the map, fill in a short form, and submit a verified report — no login required. Every submission triggers an automated email alert to the concerned authority.

---

## 🗂️ Project Structure

```
urbantrace/
├── urbantrace-backend/        # Django REST API
│   ├── accounts/              # Custom user model
│   ├── config/                # Settings, URLs, ASGI/WSGI
│   ├── dashboard/             # Stats & notifications
│   ├── issues/                # Core issue CRUD + email
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── email_utils.py     # Email alert logic
│   │   └── migrations/
│   └── manage.py
│
└── Urban-Trace-main/          # React + Vite Frontend
    └── src/
        ├── components/
        │   └── map/
        │       └── IssueMap.tsx     # Leaflet interactive map
        ├── features/
        │   └── citizen/
        │       ├── CitizenPortal.tsx
        │       └── IssueReportForm.tsx
        ├── service/
        │   └── api.ts               # All API calls
        ├── types/
        │   └── issue.ts             # TypeScript types
        └── data/
            └── mockIssues.ts        # Fallback mock data
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Map | Leaflet.js |
| Backend | Django 5, Django REST Framework |
| Database | SQLite (development) |
| Real-time | Django Channels (WebSocket) |
| Email | Django SMTP via Gmail |
| CORS | django-cors-headers |

---

## 🔧 What Was Fixed & Built

### Backend Fixes

**1. Anonymous Issue Submission (`issues/models.py`)**
The `created_by` field previously required a logged-in user, causing every public submission to fail with a database error. It was made optional (`null=True, blank=True`) so citizens can report issues without any account.

**2. Serializer Read-Only Fields (`issues/serializers.py`)**
Fields like `id`, `created_at`, `created_by`, `status`, and `assigned_to` are now marked as `read_only`. This prevents accidental overwriting of server-managed data from incoming form submissions.

**3. View Logic & Router Fix (`issues/views.py`)**
The `IssueViewSet` was missing a class-level `queryset` attribute, which caused Django REST Framework's router to crash with an `AssertionError` on startup. A proper `queryset` was added alongside `get_queryset()` for runtime filtering. The `perform_create` method was also fixed to not require a user.

**4. Notification Crash Fix (`issues/views.py`)**
The `update` method tried to create a `Notification` object even when `created_by` was `None` (anonymous submission), which caused a database integrity error. It now checks for a user before creating the notification.

**5. WebSocket Resilience (`issues/views.py`)**
WebSocket broadcast in the `update` method is now wrapped in a `try/except` block so that the response is not broken if the channel layer is unavailable.

**6. CORS & Allowed Hosts (`config/settings.py`)**
`ALLOWED_HOSTS` was an empty list, blocking all requests in development. `localhost` and `127.0.0.1` were added. `CORS_ALLOW_ALL_ORIGINS = True` was set to allow the frontend dev server to communicate freely.

**7. Dashboard Anonymous User Fix (`dashboard/views.py`)**
`NotificationView` assumed `request.user` was always authenticated. With authentication disabled, this caused a crash. It now returns an empty list for unauthenticated requests.

**8. Admin Registration (`issues/admin.py`, `dashboard/admin.py`)**
`Issue` and `Notification` models were not registered in Django Admin. Both are now registered with useful list displays and filters.

**9. New Migration (`issues/migrations/0002_fix_created_by_nullable.py`)**
A new migration was added to apply the `created_by` nullable change to existing databases without data loss.

**10. Email Alert System (`issues/email_utils.py`)**
A new `email_utils.py` module was created. Every time an issue is submitted, a professionally formatted plain-text email is sent to the authority inbox, containing the issue title, category, description, GPS coordinates, and a direct Google Maps link. Email failures are logged but do not block the submission response.

---

### Frontend Fixes

**1. Field Name Mismatch (`src/types/issue.ts`)**
The `Issue` TypeScript type used `lat` and `lng`, but the Django backend returns `latitude` and `longitude`. The type was corrected to match the backend response, with optional `lat`/`lng` aliases retained for backward compatibility with mock data.

**2. Mock Data Updated (`src/data/mockIssues.ts`)**
All mock issue entries used `lat`/`lng` (old format) and string IDs like `"UT-1001"`. These were updated to use `latitude`/`longitude` and numeric IDs to match the real backend schema.

**3. Map Compatibility Fix (`src/components/map/IssueMap.tsx`)**
`IssueMap` used `issue.lat` and `issue.lng` directly, which would silently return `undefined` for real backend data, causing pins to not appear on the map. Helper functions `getIssueLat()` and `getIssueLng()` were added to read `latitude`/`longitude` with a `lat`/`lng` fallback. Invalid `0,0` coordinates are now filtered out before rendering. The popup text was also updated to gracefully handle missing `locationLabel`.

**4. Complete API Service (`src/service/api.ts`)**
The original file only had `getIssues()`. The full API service was built out with:
- `createIssue(formData)` — POST new report with FormData (supports image uploads)
- `updateIssueStatus(id, status)` — PATCH for authority status updates
- `deleteIssue(id)` — DELETE endpoint
- `getDashboardStats()` — GET stats summary

**5. Form Submission Wired to Backend (`src/features/citizen/IssueReportForm.tsx`)**
The form was not connected to any API. It now builds a `FormData` object from the form fields and calls `createIssue()`. Loading state, success confirmation, and error messages from the API are all handled and displayed to the user.

**6. Live Data in Citizen Portal (`src/features/citizen/CitizenPortal.tsx`)**
`CitizenPortal` was using static mock data. It now calls `getIssues()` on mount to load real reports from the backend. A refresh button allows reloading without a page reload. New submissions are added to the list immediately (optimistic update) so the user sees their report on the map right away.

---

## 🚀 Running the Project

### Prerequisites

- Python 3.10+
- Node.js 18+
- pip
- npm

---

### Step 1 — Backend Setup

```bash
# 1. Navigate to the backend folder
cd urbantrace-backend

# 2. Create a virtual environment
python -m venv .venv

# 3. Activate it
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

# 4. Install dependencies
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt channels django-filter pillow

# 5. Apply database migrations
python manage.py migrate

# 6. (Optional) Create an admin account to access /admin
python manage.py createsuperuser

# 7. Start the backend server
python manage.py runserver
```

Backend will be live at: **http://127.0.0.1:8000**

---

### Step 2 — Email Configuration

Open `config/settings.py` and fill in your Gmail details at the bottom of the file:

```python
EMAIL_HOST_USER = 'your_gmail@gmail.com'
EMAIL_HOST_PASSWORD = 'xxxx xxxx xxxx xxxx'   # Gmail App Password (16 digits)
DEFAULT_FROM_EMAIL = 'UrbanTrace Alerts <your_gmail@gmail.com>'
REPORT_RECIPIENT_EMAIL = 'authority@example.com'  # Where alerts will be sent
```

**How to get a Gmail App Password:**
1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** if not already on
3. Go back to Security → **App Passwords**
4. Select App: **Mail**, Device: **Other** → give it a name like `UrbanTrace`
5. Copy the 16-character password and paste it above

---

### Step 3 — Frontend Setup

```bash
# 1. Navigate to the frontend folder
cd Urban-Trace-main

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Frontend will be live at: **http://localhost:5173**

> Make sure the backend is running first before opening the frontend.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/issues/` | List all reported issues |
| `POST` | `/api/issues/` | Submit a new issue (FormData) |
| `GET` | `/api/issues/{id}/` | Get a single issue |
| `PATCH` | `/api/issues/{id}/` | Update issue (e.g. status change) |
| `DELETE` | `/api/issues/{id}/` | Delete an issue |
| `POST` | `/api/issues/{id}/assign/` | Assign issue to a user |
| `GET` | `/api/stats/` | Dashboard statistics |
| `GET` | `/api/notifications/` | User notifications |

### POST `/api/issues/` — Required Fields

```
title         string      Issue title
description   string      Full description of the problem
category      string      road | sanitation | electricity | water
latitude      float       GPS latitude (from map click)
longitude     float       GPS longitude (from map click)
image         file        (optional) Photo of the issue
```

---

## 📧 Email Alert Sample

When a report is submitted, an email like this is sent automatically:

```
Subject: [UrbanTrace] New Issue Reported — 🛣️ Road Damage | #1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        URBAN TRACE — CIVIC ISSUE ALERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Issue ID     :  #1
  Title        :  Road damage near bus stop
  Category     :  🛣️ Road Damage
  Status       :  Pending Review
  Reported At  :  25 April 2026, 10:30 AM

  Description  :  Large pothole causing vehicles to swerve...

  Latitude     :  28.633324
  Longitude    :  77.218437

  View on Map  :
  https://www.google.com/maps?q=28.633324,77.218437

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Automated alert from UrbanTrace Civic Portal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🗺️ How It Works — User Flow

```
1. Citizen opens the app
         ↓
2. Clicks on the map to pin the damaged location
         ↓
3. Coordinates auto-fill in the form
         ↓
4. Fills in: Title, Description, Category
         ↓
5. Clicks "Submit Verified Report"
         ↓
6. Frontend sends POST request to /api/issues/
         ↓
7. Backend saves the issue to the database
         ↓
8. Backend sends an email alert to the authority
         ↓
9. Report appears live on the map for everyone
```

---

## 🛡️ Security Notes

- Never commit real Gmail credentials to a public repository. Move `EMAIL_HOST_PASSWORD` to an environment variable before going public:
  ```python
  import os
  EMAIL_HOST_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD')
  ```
- Set `DEBUG = False` and configure a proper `SECRET_KEY` for production.
- Replace SQLite with PostgreSQL for any production deployment.

---

## 📄 License

This project is for educational and civic use. All rights reserved to the UrbanTrace team.
