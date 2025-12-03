# Contact App API - Postman Testing Guide

## Base URL
```
http://localhost:3000
```

---

## 🔵 1. CREATE CONTACT (POST)

**Endpoint:** `POST /contacts`

**Description:** Create a new contact in the database.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62812345678"
}
```

**Request Body (Minimal - Email Optional):**
```json
{
  "name": "Jane Smith",
  "phone": "+6289876543210"
}
```

**Success Response (201):**
```json
{
  "_id": "65764abc123456789012abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62812345678",
  "createdAt": "2025-12-03T11:30:00.000Z",
  "updatedAt": "2025-12-03T11:30:00.000Z",
  "__v": 0
}
```

**Error Response (400 - Validation Error):**
```json
{
  "message": [
    "name must be a string",
    "email must be an email",
    "phone must be a valid phone number"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 🟢 2. GET ALL CONTACTS (GET)

**Endpoint:** `GET /contacts`

**Description:** Retrieve all contacts from the database.

**Headers:** None required

**Success Response (200):**
```json
[
  {
    "_id": "65764abc123456789012abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+62812345678",
    "createdAt": "2025-12-03T11:30:00.000Z",
    "updatedAt": "2025-12-03T11:30:00.000Z",
    "__v": 0
  },
  {
    "_id": "65764abc123456789012abce",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+6289876543210",
    "createdAt": "2025-12-03T11:31:00.000Z",
    "updatedAt": "2025-12-03T11:31:00.000Z",
    "__v": 0
  }
]
```

**Empty Response (200):**
```json
[]
```

---

## 🟡 3. GET SINGLE CONTACT BY ID (GET)

**Endpoint:** `GET /contacts/{id}`

**Description:** Retrieve a specific contact by MongoDB ObjectId.

**Example URL:**
```
http://localhost:3000/contacts/65764abc123456789012abcd
```

**Success Response (200):**
```json
{
  "_id": "65764abc123456789012abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62812345678",
  "createdAt": "2025-12-03T11:30:00.000Z",
  "updatedAt": "2025-12-03T11:30:00.000Z",
  "__v": 0
}
```

**Error Response (404 - Not Found):**
```json
{
  "message": "Contact not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 🟠 4. UPDATE CONTACT (PATCH)

**Endpoint:** `PATCH /contacts/{id}`

**Description:** Update an existing contact. All fields are optional.

**Example URL:**
```
http://localhost:3000/contacts/65764abc123456789012abcd
```

**Headers:**
```
Content-Type: application/json
```

**Request Body (Full Update):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+62898765432"
}
```

**Request Body (Partial Update - Only Name):**
```json
{
  "name": "Jane Doe Updated"
}
```

**Request Body (Partial Update - Only Phone):**
```json
{
  "phone": "+62811111111"
}
```

**Success Response (200):**
```json
{
  "_id": "65764abc123456789012abcd",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+62898765432",
  "createdAt": "2025-12-03T11:30:00.000Z",
  "updatedAt": "2025-12-03T11:35:00.000Z",
  "__v": 0
}
```

**Error Response (404 - Not Found):**
```json
{
  "message": "Contact not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 🔴 5. DELETE CONTACT (DELETE)

**Endpoint:** `DELETE /contacts/{id}`

**Description:** Delete a contact permanently.

**Example URL:**
```
http://localhost:3000/contacts/65764abc123456789012abcd
```

**Success Response (200):**
```json
{
  "_id": "65764abc123456789012abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62812345678",
  "createdAt": "2025-12-03T11:30:00.000Z",
  "updatedAt": "2025-12-03T11:30:00.000Z",
  "__v": 0
}
```

**Error Response (404 - Not Found):**
```json
{
  "message": "Contact not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 📋 VALIDATION RULES

| Field   | Type        | Required | Rules                                    |
|---------|-------------|----------|------------------------------------------|
| name    | string      | ✅ Yes   | Must be a string                         |
| email   | string      | ❌ No    | Must be valid email format (e.g. user@domain.com) |
| phone   | string      | ✅ Yes   | Must be valid phone number (e.g. +62812345678) |

---

## 🔑 Quick Test Sequence

1. **Create a contact** → Copy the `_id` from response
2. **Get all contacts** → Verify your new contact appears
3. **Get single contact** → Use the copied `_id`
4. **Update contact** → Modify name/email/phone
5. **Delete contact** → Remove the contact

---

## 💾 Import into Postman

1. Open Postman
2. Click **Import**
3. Select **Upload Files**
4. Choose `Postman_Contact_API.postman_collection.json`
5. Click **Import**
6. All 5 endpoints will be ready to test!

---

## 🚀 Getting Started

Make sure your backend is running:
```bash
cd backend
npm run start:dev
```

Then start testing the endpoints in Postman!
