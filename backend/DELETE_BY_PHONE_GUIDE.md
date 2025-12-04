# Contact CRUD API - Updated Endpoints

## Base URL
```
http://localhost:3000
```

---

## 🔵 1. CREATE CONTACT (POST)

**Endpoint:** `POST /contacts`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62812345678"
}
```

**Success (201):**
```json
{
  "_id": "65764abc123456789012abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62812345678",
  "createdAt": "2025-12-03T11:30:00.000Z",
  "updatedAt": "2025-12-03T11:30:00.000Z"
}
```

---

## 🟢 2. GET ALL CONTACTS (GET)

**Endpoint:** `GET /contacts`

**Success (200):** Returns array of all contacts

---

## 🟡 3. GET CONTACT BY ID (GET)

**Endpoint:** `GET /contacts/{id}`

**Example:**
```
GET /contacts/65764abc123456789012abcd
```

**Success (200):** Returns single contact

---

## 🟠 4. UPDATE CONTACT (PATCH)

**Endpoint:** `PATCH /contacts/{id}`

**Example:**
```
PATCH /contacts/65764abc123456789012abcd
```

**Body:**
```json
{
  "name": "Jane Doe",
  "phone": "+62898765432"
}
```

**Success (200):** Returns updated contact

---

## 🔴 5. DELETE CONTACT BY ID (DELETE)

**Endpoint:** `DELETE /contacts/{id}`

**Example:**
```
DELETE /contacts/65764abc123456789012abcd
```

**Success (200):** Returns deleted contact

**Error (404):**
```json
{
  "message": "Contact not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 🟣 6. DELETE CONTACT BY PHONE NUMBER (DELETE) ⭐ NEW

**Endpoint:** `DELETE /contacts/phone/{phone}`

**Example:**
```
DELETE /contacts/phone/+62812345678
```

**Success (200):** Returns deleted contact
```json
{
  "_id": "65764abc123456789012abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62812345678",
  "createdAt": "2025-12-03T11:30:00.000Z",
  "updatedAt": "2025-12-03T11:30:00.000Z"
}
```

**Error (404):**
```json
{
  "message": "Contact with phone +62812345678 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 📋 All Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contacts` | Create new contact |
| GET | `/contacts` | Get all contacts |
| GET | `/contacts/{id}` | Get contact by ID |
| PATCH | `/contacts/{id}` | Update contact by ID |
| DELETE | `/contacts/{id}` | Delete contact by ID |
| DELETE | `/contacts/phone/{phone}` | **Delete contact by phone** ⭐ |

---

## 🧪 Test in Postman

### Delete by Phone Example:
```
Method: DELETE
URL: http://localhost:3000/contacts/phone/+62812345678
```

### Tips:
- Phone number must be URL-encoded if it contains special characters
- `+` is safe in URLs
- For complex phone numbers, use proper URL encoding

---

## 🚀 How to Use

1. Get all contacts to find the phone number you want to delete:
   ```
   GET /contacts
   ```

2. Delete using that phone number:
   ```
   DELETE /contacts/phone/+62812345678
   ```

3. Verify it's deleted by getting all contacts again:
   ```
   GET /contacts
   ```

That's it! 🎉
