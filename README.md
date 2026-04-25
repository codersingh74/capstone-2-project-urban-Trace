# Urban Trace — Backend (Django)

## Setup & Run

```bash
cd urbantrace-backend

# 1. Virtual environment banao
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. Dependencies install karo
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt channels django-filter pillow

# 3. Database migrate karo
python manage.py migrate

# 4. (Optional) Admin user banao
python manage.py createsuperuser

# 5. Server start karo
python manage.py runserver
```

Backend `http://127.0.0.1:8000` pe chalega.

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/issues/` | Saare issues list |
| POST | `/api/issues/` | Naya issue submit (FormData) |
| GET | `/api/issues/{id}/` | Ek issue detail |
| PATCH | `/api/issues/{id}/` | Issue update (status etc.) |
| DELETE | `/api/issues/{id}/` | Issue delete |
| GET | `/api/stats/` | Dashboard stats |
| POST | `/api/issues/{id}/assign/` | Issue assign karo |

## POST /api/issues/ — Required Fields

```
title        (string)
description  (string)
category     (road | sanitation | electricity | water)
latitude     (float)
longitude    (float)
image        (file, optional)
```

## Fixes Applied

1. `created_by` field ab optional (null=True) — anonymous submission works
2. `IssueSerializer` — server-side fields read-only
3. `ALLOWED_HOSTS` — localhost add kiya
4. `NotificationView` — anonymous user crash fix
5. `perform_create` — user required nahi
6. New migration `0002_fix_created_by_nullable.py` added
