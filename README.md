# Easy Rent - Vehicle Rental System API Documentation

> A comprehensive vehicle rental management system with user authentication, vehicle management, and booking capabilities.

**Live Server:** https://easyrent-server.vercel.app/  
**Version:** 1.0.0

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth Endpoints](#auth-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Vehicle Endpoints](#vehicle-endpoints)
  - [Booking Endpoints](#booking-endpoints)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Authentication & Authorization](#authentication--authorization)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/kaziMuntasirRahman/easy_rent_server.git

# Navigate to project directory
cd easy_rent_server

# Install dependencies
npm install

# Set up environment variables
# Create a .env file and configure your database and JWT secret

# Start development server
npm run dev

# Build for production
npm run build
```

### Base URL

```
https://easyrent-server.vercel.app/api/v1
```

For local development:

```
http://localhost:5000/api/v1
```

---

## 🔐 Authentication

### Getting Started with Authentication

The Easy Rent API uses **JWT (JSON Web Token)** for authentication. To access protected endpoints:

1. **Register** a new account using the signup endpoint
2. **Login** to receive a JWT token
3. **Include the token** in the `Authorization` header for protected requests

### Token Usage

Include the token in all protected requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration

- **Validity:** 5 days
- **After expiration:** Re-login to get a new token

### User Roles

The system supports two roles:

- **Admin:** Full access to all resources
- **Customer:** Limited access (only own data and public vehicles)

---

## 📡 API Endpoints

### Auth Endpoints

#### 1. User Registration (Sign Up)

Register a new user account in the system.

**Endpoint:**

```
POST /api/v1/auth/signup
```

**Access:** Public (No authentication required)

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```

**Request Body Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User's full name |
| email | string | Yes | Valid email address (must be unique) |
| password | string | Yes | Password (minimum 6 characters) |
| phone | string | Yes | Contact phone number |
| role | string | No | User role ('admin' or 'customer', defaults to 'customer') |

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "01712345678",
    "role": "customer"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Invalid input"
}
```

**Usage Example:**

```bash
curl -X POST https://easyrent-server.vercel.app/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "phone": "01712345678",
    "role": "customer"
  }'
```

---

#### 2. User Login (Sign In)

Authenticate user and receive a JWT token.

**Endpoint:**

```
POST /api/v1/auth/signin
```

**Access:** Public (No authentication required)

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Request Body Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Registered email address |
| password | string | Yes | Account password |

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIn0...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "01712345678",
      "role": "customer"
    }
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Login failed"
}
```

**Usage Example:**

```bash
curl -X POST https://easyrent-server.vercel.app/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

---

### User Endpoints

#### 3. Get All Users

Retrieve all users in the system.

**Endpoint:**

```
GET /api/v1/users
```

**Access:** Admin only

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**URL Parameters:** None

**Query Parameters:** None

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "01712345678",
      "role": "customer"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "01787654321",
      "role": "admin"
    }
  ]
}
```

**Error Response (401 Unauthorized):**

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

**Usage Example:**

```bash
curl -X GET https://easyrent-server.vercel.app/api/v1/users \
  -H "Authorization: Bearer <jwt_token>"
```

---

#### 4. Update User

Update user information.

**Endpoint:**

```
PUT /api/v1/users/:userId
```

**Access:** Admin (any user) or Customer (own profile only)

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | integer | Yes | ID of the user to update |

**Request Body (all fields optional):**

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "01799999999",
  "role": "customer"
}
```

**Request Body Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Updated user name |
| email | string | No | Updated email address |
| phone | string | No | Updated phone number |
| role | string | No | Updated role ('admin' or 'customer') |

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "01799999999",
    "role": "customer"
  }
}
```

**Error Response (403 Forbidden):**

```json
{
  "success": false,
  "message": "You don't have permission to change this data."
}
```

**Usage Example:**

```bash
curl -X PUT https://easyrent-server.vercel.app/api/v1/users/1 \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "phone": "01799999999"
  }'
```

---

#### 5. Delete User

Delete a user account from the system.

**Endpoint:**

```
DELETE /api/v1/users/:userId
```

**Access:** Admin only

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | integer | Yes | ID of the user to delete |

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Response (403 Forbidden):**

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

**Usage Example:**

```bash
curl -X DELETE https://easyrent-server.vercel.app/api/v1/users/1 \
  -H "Authorization: Bearer <jwt_token>"
```

---

### Vehicle Endpoints

#### 6. Create Vehicle

Add a new vehicle to the rental system.

**Endpoint:**

```
POST /api/v1/vehicles
```

**Access:** Admin only

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "sedan",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

**Request Body Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| vehicle_name | string | Yes | Name/model of the vehicle |
| type | string | Yes | Type of vehicle (e.g., 'sedan', 'suv', 'truck') |
| registration_number | string | Yes | Vehicle registration/license plate number |
| daily_rent_price | number | Yes | Daily rental price (in your currency) |
| availability_status | string | Yes | Status: 'available' or 'unavailable' |

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "id": 1,
    "vehicle_name": "Toyota Camry 2024",
    "type": "sedan",
    "registration_number": "ABC-1234",
    "daily_rent_price": 50,
    "availability_status": "available"
  }
}
```

**Error Response (500 Server Error):**

```json
{
  "success": false,
  "message": "Failed to add vehicles"
}
```

**Usage Example:**

```bash
curl -X POST https://easyrent-server.vercel.app/api/v1/vehicles \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_name": "Toyota Camry 2024",
    "type": "sedan",
    "registration_number": "ABC-1234",
    "daily_rent_price": 50,
    "availability_status": "available"
  }'
```

---

#### 7. Get All Vehicles

Retrieve all vehicles available for rent.

**Endpoint:**

```
GET /api/v1/vehicles
```

**Access:** Public (No authentication required)

**Query Parameters:** None

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [
    {
      "id": 1,
      "vehicle_name": "Toyota Camry 2024",
      "type": "sedan",
      "registration_number": "ABC-1234",
      "daily_rent_price": 50,
      "availability_status": "available"
    },
    {
      "id": 2,
      "vehicle_name": "Honda Civic 2023",
      "type": "sedan",
      "registration_number": "XYZ-5678",
      "daily_rent_price": 45,
      "availability_status": "available"
    }
  ]
}
```

**Empty List Response (200 OK):**

```json
{
  "success": true,
  "message": "No Vehicles found",
  "data": []
}
```

**Usage Example:**

```bash
curl -X GET https://easyrent-server.vercel.app/api/v1/vehicles
```

---

#### 8. Get Vehicle by ID

Retrieve details of a specific vehicle.

**Endpoint:**

```
GET /api/v1/vehicles/:vehicleId
```

**Access:** Public (No authentication required)

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| vehicleId | integer | Yes | ID of the vehicle to retrieve |

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [
    {
      "id": 2,
      "vehicle_name": "Honda Civic 2023",
      "type": "sedan",
      "registration_number": "XYZ-5678",
      "daily_rent_price": 45,
      "availability_status": "available"
    }
  ]
}
```

**Not Found Response (200 OK):**

```json
{
  "success": true,
  "message": "Vehicle bearing id 999 doesn't exist."
}
```

**Usage Example:**

```bash
curl -X GET https://easyrent-server.vercel.app/api/v1/vehicles/2
```

---

#### 9. Update Vehicle

Update vehicle information.

**Endpoint:**

```
PUT /api/v1/vehicles/:vehicleId
```

**Access:** Admin only

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| vehicleId | integer | Yes | ID of the vehicle to update |

**Request Body (all fields optional):**

```json
{
  "vehicle_name": "Toyota Camry 2024 Updated",
  "type": "sedan",
  "registration_number": "ABC-1234",
  "daily_rent_price": 55,
  "availability_status": "available"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Vehicle updated successfully",
  "data": {
    "id": 1,
    "vehicle_name": "Toyota Camry 2024 Updated",
    "type": "sedan",
    "registration_number": "ABC-1234",
    "daily_rent_price": 55,
    "availability_status": "available"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Vehicle, bearing id 999 doesn't exist."
}
```

**Usage Example:**

```bash
curl -X PUT https://easyrent-server.vercel.app/api/v1/vehicles/1 \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "daily_rent_price": 55
  }'
```

---

#### 10. Delete Vehicle

Remove a vehicle from the system.

**Endpoint:**

```
DELETE /api/v1/vehicles/:vehicleId
```

**Access:** Admin only

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| vehicleId | integer | Yes | ID of the vehicle to delete |

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Vehicle deleted successfully"
}
```

**Error Response (500 Server Error):**

```json
{
  "success": false,
  "message": "Failed to delete"
}
```

**Usage Example:**

```bash
curl -X DELETE https://easyrent-server.vercel.app/api/v1/vehicles/1 \
  -H "Authorization: Bearer <jwt_token>"
```

---

### Booking Endpoints

#### 11. Create Booking

Create a new vehicle rental booking.

**Endpoint:**

```
POST /api/v1/bookings
```

**Access:** Admin and Customer

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-02-01",
  "rent_end_date": "2024-02-05"
}
```

**Request Body Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| customer_id | integer | Yes | ID of the customer making the booking |
| vehicle_id | integer | Yes | ID of the vehicle to rent |
| rent_start_date | string (date) | Yes | Rental start date (YYYY-MM-DD format) |
| rent_end_date | string (date) | Yes | Rental end date (YYYY-MM-DD format) |

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "customer_id": 1,
    "vehicle_id": 2,
    "rent_start_date": "2024-02-01",
    "rent_end_date": "2024-02-05",
    "status": "booked"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Input missing"
}
```

**Usage Example:**

```bash
curl -X POST https://easyrent-server.vercel.app/api/v1/bookings \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "vehicle_id": 2,
    "rent_start_date": "2024-02-01",
    "rent_end_date": "2024-02-05"
  }'
```

---

#### 12. Get All Bookings

Retrieve bookings based on user role.

**Endpoint:**

```
GET /api/v1/bookings
```

**Access:** Admin and Customer

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**Behavior:**

- **Admin users:** Get all bookings in the system
- **Customer users:** Get only their own bookings

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "id": 1,
      "customer_id": 1,
      "vehicle_id": 2,
      "rent_start_date": "2024-02-01",
      "rent_end_date": "2024-02-05",
      "status": "booked"
    },
    {
      "id": 2,
      "customer_id": 1,
      "vehicle_id": 3,
      "rent_start_date": "2024-03-10",
      "rent_end_date": "2024-03-15",
      "status": "booked"
    }
  ]
}
```

**No Bookings Response (200 OK):**

```json
{
  "success": true,
  "message": "No booking found"
}
```

**Usage Example:**

```bash
curl -X GET https://easyrent-server.vercel.app/api/v1/bookings \
  -H "Authorization: Bearer <jwt_token>"
```

---

#### 13. Update Booking Status

Update the status of a booking (mark as returned or cancelled).

**Endpoint:**

```
PUT /api/v1/bookings/:bookingId
```

**Access:** Admin and Customer

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| bookingId | integer | Yes | ID of the booking to update |

**Request Body:**

```json
{
  "status": "returned"
}
```

**Request Body Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| status | string | Yes | New status: 'returned' or 'cancelled' |

**Status Change Rules:**

- **Admin:** Can mark booking as "returned" (vehicle becomes available)
- **Customer:** Can mark booking as "cancelled"

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Booking marked as returned. Vehicle is now available",
  "data": {
    "id": 1,
    "customer_id": 1,
    "vehicle_id": 2,
    "rent_start_date": "2024-02-01",
    "rent_end_date": "2024-02-05",
    "status": "returned"
  }
}
```

**Error Response (403 Forbidden):**

```json
{
  "success": false,
  "message": "You don't have permission to change the booking status to returned."
}
```

**Invalid Request (400 Bad Request):**

```json
{
  "success": false,
  "message": "Invalid Request"
}
```

**Usage Example:**

```bash
curl -X PUT https://easyrent-server.vercel.app/api/v1/bookings/1 \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "returned"
  }'
```

---

## 📊 Response Format

All API responses follow a consistent JSON format:

**Success Response:**

```json
{
  "success": true,
  "message": "Descriptive success message",
  "data": {
    // Response data object or array
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Status Code               | Description                                      |
| ------------------------- | ------------------------------------------------ |
| 200 OK                    | Request successful                               |
| 201 Created               | Resource successfully created                    |
| 400 Bad Request           | Invalid request parameters or data               |
| 401 Unauthorized          | Missing or invalid authentication token          |
| 403 Forbidden             | Authenticated but not authorized for this action |
| 500 Internal Server Error | Server encountered an error                      |

### Common Error Messages

| Error                     | Cause                               | Solution                     |
| ------------------------- | ----------------------------------- | ---------------------------- |
| Invalid input             | Missing or malformed request data   | Check request parameters     |
| Login failed              | Wrong email or password             | Verify credentials           |
| Unauthorized              | Missing JWT token                   | Include Authorization header |
| Invalid role              | Role is not 'admin' or 'customer'   | Use valid role values        |
| You don't have permission | User role doesn't allow this action | Check user permissions       |
| User doesn't exist        | User ID not found                   | Verify user ID               |
| Failed to update/delete   | Database operation failed           | Check if resource exists     |

---

## 🔑 Authentication & Authorization

### Token Validation

The system validates JWT tokens for all protected endpoints:

1. **Token verification:** Checks token signature and expiration
2. **Role verification:** Confirms user has required role
3. **Ownership validation:** For certain operations, verifies user owns the resource

### Protected Endpoints by Role

| Endpoint             | Admin | Customer |
| -------------------- | ----- | -------- |
| POST /auth/signup    | ✓     | ✓        |
| POST /auth/signin    | ✓     | ✓        |
| GET /users           | ✓     | ✗        |
| PUT /users/:id       | ✓     | ✓\*      |
| DELETE /users/:id    | ✓     | ✗        |
| POST /vehicles       | ✓     | ✗        |
| GET /vehicles        | ✓     | ✓        |
| GET /vehicles/:id    | ✓     | ✓        |
| PUT /vehicles/:id    | ✓     | ✗        |
| DELETE /vehicles/:id | ✓     | ✗        |
| POST /bookings       | ✓     | ✓        |
| GET /bookings        | ✓     | ✓\*      |
| PUT /bookings/:id    | ✓\*   | ✓\*      |

_\* With restrictions (limited to own resources)_

---

## 💡 Usage Tips

### 1. Testing with cURL

```bash
# Register new user
curl -X POST https://easyrent-server.vercel.app/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123","phone":"01234567890"}'

# Login
curl -X POST https://easyrent-server.vercel.app/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 2. Using Postman

1. Create a new collection
2. Add environment variable for `token`
3. In signup/login request, add a script to save token:
   ```javascript
   var jsonData = pm.response.json()
   pm.environment.set('token', jsonData.data.token)
   ```
4. Use `{{token}}` in Authorization headers

### 3. Frontend Integration Example

```javascript
// Login and save token
const loginResponse = await fetch(
  'https://easyrent-server.vercel.app/api/v1/auth/signin',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
)
const {
  data: { token }
} = await loginResponse.json()
localStorage.setItem('authToken', token)

// Use token in protected requests
const vehiclesResponse = await fetch(
  'https://easyrent-server.vercel.app/api/v1/vehicles',
  {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  }
)
```

---

## 📞 Support

For issues, questions, or feature requests, please visit the [GitHub Issues](https://github.com/kaziMuntasirRahman/easy_rent_server/issues) page.

---

## 📝 License

ISC License - See package.json for details.
