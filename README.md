# Blog Platform (Full-stack)

A Full-stack blog application bulid with **Express.js** Backend and **React** Frontend.
Backend is modular-based, and frontend is feature-based for scalability and maintainability.

## Backend Features

- **Authentication** - Register, Login, Fogot Password, Logout with JWt & bcryptjs
- **User Profile** - Get & update user details, avatar upload (ImageKit + Multer)
- **Blog CRUD** - Create, Read, Update, Delete blogs, page pagination and infinite scroll
- **Comment CRUD** - Add, Edit, Delete comments and infinite scroll
- **Email Service** - Password reset using Nodemailer
- **Image Uploads** - Image storage & management via ImageKit

## Frontend Features

- **Blog Page** - View all blogs, category and search blogs
- **Blog Management** - Create, Edit, Update & Delete blogs (connected to backend API)
- **Comment Management** - Create, Edit, Update & Delete blogs (connected to backend API)
- **User Account** - Login, Register view and edit profile
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

**Backend (Server Modules):**

- Node.js, Express.js, Mongoose
- JWT, bcryptjs, CORS,
- Multer, ImageKit, Nodemailer

**Frontend (Features-based):**

- Ract, Zustand, Typescript
- jwtDecode (jwt key decode for check expiry token)
- TailwindCSS, daisyUi (UI styling)

## Floder Structure

**Server (modules-based)**
```text
server/
|----src/
|  |----config/
|  |----middleware/
|  |----model/
|  |----modules/
|  |  |----auth/
|  |  |  |----auth.controller.js
|  |  |  |----auth.routes.js
|  |  |  |----auth.service.js
|  |  |----blog/
|  |  |----comment/
|  |  |----user/
|  |----utils/
|  |----server.js
|----.env