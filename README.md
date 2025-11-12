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

```test
server/
|----src/
| |----config/
| |----middleware/
| |----model/
| |----modules/
| | |----auth/
| | | |----auth.controller.js
| | | |----auth.routes.js
| | | |----auth.service.js
| | |----blog/
| | |----comment/
| | |----user/
| |----utils/
| |----server.js
|----.env
|----package.json
```

**Client (features-based)**

```text
client/
|----src/
| |----components/
| |----layout/
| |----router/
| |----feature/
| | |----auth/
| | | |----components/
| | | |----hooks/
| | | |----page/
| | |----blog/
| | |----comment/
| | |----profile/
| | |----about/
| | |----home/
| |----types/
| |----store/
| |----schema/
| |----services/
| |----utils/
| |----main.tsx
| |----index.css
|----.env
|----package.json
|----vite.config.ts
```

## Installation & Setup

clone the repo

```bash
git clone https://github.com/zue-pyae-paing/blog-app.git
cd blog-app/server
npm install
PORT=8080
CLIENT_URL=....
MONGO_URI=....
ACCESS_TOKEN_SECRET=....
REFRESH_TOKEN_SECRET=....
NODE_ENV=production
EMAIL=....
PASSWORD=....
PUBLIC_KEY=....
PRIVATE_KEY=....
URL_ENDPOINT=....
nm run dev
cd ../client
npm install
VITE_SERVER_URI=....
npm run dev
```

## Backend API Entpoints

#### Auth

**Base URL:** `http://localhost:8080/api/auth`

| Method   | Endpoint                          | Description                                      |
| -------- | --------------------------------- | ------------------------------------------------ |
| **POST** | `/api/auth/register`              | Register a new user                              |
| **POST** | `/api/auth/login`                 | Log in and receive access & refresh tokens       |
| **POST** | `/api/auth/refresh-token`         | Refresh access token using a valid refresh token |
| **POST** | `/api/auth/forget-password`       | Send password reset link to user’s email         |
| **PUT**  | `/api/auth/reset-password/:token` | Reset password using provided token              |

### Blog API Endpoints

**Base URL:** `http://localhost:8080/api/blogs`

| Method     | Endpoint       | Description                                                        |
| ---------- | -------------- | ------------------------------------------------------------------ |
| **GET**    | `/`            | Get all published blogs                                            |
| **GET**    | `/my-blogs`    | Get all blogs created by the authenticated user                    |
| **GET**    | `/detail/:id`  | Get a single blog by its ID (optional auth + view count increases) |
| **GET**    | `/trending`    | Get trending blogs                                                 |
| **GET**    | `/category`    | Get all available blog categories                                  |
| **POST**   | `/create`      | Create a new blog (requires authentication & image upload)         |
| **PUT**    | `/update/:id`  | Update an existing blog by its ID                                  |
| **PATCH**  | `/like/:id`    | Like a blog post                                                   |
| **PATCH**  | `/unlike/:id`  | Unlike a blog post                                                 |
| **PATCH**  | `/publish/:id` | Publish or unpublish a blog post                                   |
| **DELETE** | `/delete/:id`  | Delete a blog by its ID                                            |

### Comment

**Base URL:** `http://localhost:8080/api/comments`

| Method     | Endpoint              | Description                                                        |
| ---------- | --------------------- | ------------------------------------------------------------------ |
| **GET**    | `/:blogId`            | Get all comments for a specific blog                               |
| **POST**   | `/create/:blogId`     | Create a new comment for a specific blog (requires authentication) |
| **GET**    | `/:blogId/:id`        | Get a specific comment by its ID (requires authentication)         |
| **PUT**    | `/edit/:blogId/:id`   | Edit a specific comment (requires authentication)                  |
| **DELETE** | `/delete/:blogId/:id` | Delete a specific comment (requires authentication)                |

### User

**Base URL:** `http://localhost:8080/api/user`

| Method     | Endpoint           | Description                                        |
| ---------- | ------------------ | -------------------------------------------------- |
| **GET**    | `/me`              | Get current user profile information               |
| **PUT**    | `/change-username` | Update user's username                             |
| **PUT**    | `/change-email`    | Update user's email address                        |
| **PUT**    | `/change-avatar`   | Update user's avatar image (requires image upload) |
| **PUT**    | `/change-password` | Change user's password                             |
| **POST**   | `/logout`          | Log out the current user                           |
| **DELETE** | `/delete-account`  | Delete the user's account permanently              |

## Author
Developed by **Zue Pyae Paing**
- Email => zupepyaepaing.dev.gmail.com
- GitHub => https://github.com/zue-pyae-paing