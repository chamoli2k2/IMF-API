# **IMF Gadget API**

The Impossible Missions Force (IMF) Gadget API is a secure backend service for managing gadgets used in missions. Built with **Node.js**, **Express**, and **PostgreSQL**, this API includes features like authentication, authorization, gadget management, and mission-critical functionality like a self-destruct sequence.

---

## **API Documentation**
Postman Documentation : [Link](https://documenter.getpostman.com/view/40904074/2sAYQggTFv)

## **Features**

- **Gadget Management**:
  - Retrieve a list of gadgets with a random "mission success probability."
  - Add, update, and mark gadgets as decommissioned.
  - Self-destruct a specific gadget with a confirmation code.

- **Authentication and Authorization**:
  - **Register**: Create user accounts with roles (`admin` or `user`).
  - **Login**: Generate JWT tokens for secure access.
  - Role-based access control for restricted operations.

- **Filtering**:
  - Filter gadgets by status (`Available`, `Deployed`, `Destroyed`, `Decommissioned`).
  - Automatically exclude "Decommissioned" gadgets when no status is specified.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Sequelize ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render
- **Environment Variables**: `dotenv`

---

## **Environment Variables**
Create a `.env` file in the root directory and add the following:
```
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret_key
PORT=3000
```
---

## **API Endpoints**

### **Authentication**
| Method | Endpoint        | Description               |
|--------|-----------------|---------------------------|
| POST   | `/auth/register` | Register a new user       |
| POST   | `/auth/login`    | Login and generate a token|

### **Gadget Management**
| Method | Endpoint                  | Description                                                      |
|--------|---------------------------|------------------------------------------------------------------|
| GET    | `/gadgets`                | Retrieve all gadgets (excludes `Decommissioned` by default)     |
| GET    | `/gadgets?status={status}`| Retrieve gadgets filtered by status                              |
| POST   | `/gadgets/add`                | Add a new gadget (admin only)                                    |
| PATCH  | `/gadgets/:id`            | Update a gadget (admin only)                                     |
| DELETE | `/gadgets/:id`            | Mark a gadget as `Decommissioned` (admin only)                  |
| POST   | `/gadgets/:id/self-destruct`| Trigger self-destruct for a gadget                              |

---

## **Data Models**

### **Gadget**
| Field           | Type           | Description                                         |
|------------------|----------------|-----------------------------------------------------|
| `id`            | UUID           | Unique identifier for the gadget                   |
| `name`          | String         | Name of the gadget                                 |
| `status`        | Enum           | Gadget status (`Available`, `Deployed`, `Destroyed`, `Decommissioned`) |
| `decommissionedAt` | Date         | Timestamp when the gadget was decommissioned       |

### **User**
| Field     | Type    | Description                               |
|-----------|---------|-------------------------------------------|
| `id`      | UUID    | Unique identifier for the user            |
| `username`| String  | User's username                           |
| `password`| String  | User's hashed password                    |
| `role`    | Enum    | User role (`admin` or `user`)             |

---

## **Authorization Rules**

- **Admins**:
  - Can get, add, update, delete, self-destruct gadgets.
  - Access all endpoints.

- **Users**:
  - Can view, add gadgets.
  - Trigger the self-destruct sequence.
