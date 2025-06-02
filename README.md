# Linkify

Linkify is a modern URL shortener that enables users to create and manage short links with ease.

---

## 🛠 Tech Stack

- **Client:** React, Zustand, TailwindCSS, TypeScript, Vite  
- **Server:** Node.js, NestJS, MongoDB, Mongoose, JWT  
- **Dev Tools:** Railway (hosting), Postman/Thunder Client, ESLint, Prettier

---

## 🚀 Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/shamsheedali/linkify.git
cd linkify
```

### 2. Install Dependencies

**Server Dependencies:**
```bash
cd server
npm install
```

**Client Dependencies:**
```bash
cd ../client
npm install
```

### 3. Configure Environment Variables

Create `.env` files in both the `server` and `client` directories with the following example content:


server/.env

```env
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
REFRESH_JWT_SECRET=your_refresh_secret
FRONTEND_URL=http://localhost:5173
```



client/.env

```env
VITE_API_URL=http://localhost:3000/api
VITE_URL_PREFIX=http://localhost:3000/api/url/
```


---

### 4. Start the Application

**Start the Server:**
```bash
cd server
npm run start:dev
```

**Start the Client (in a new terminal window):**
```bash
cd ../client
npm run dev
```

---

## 📂 Project Structure

| Folder   | Description           |
|----------|-----------------------|
| server   | Backend API server    |
| client   | Frontend application  |

---

## 📝 Notes

- Ensure you have **Node.js** and **npm** installed.
- Run the server and client in separate terminal windows during development.
- For additional configuration, refer to the `README.md` files inside the `server` and `client` directories (if available).

---

## 🤝 Connect

- 📧 Email: [shamsheedali0786@gmail.com](mailto:shamsheedali0786@gmail.com)
- 🐙 GitHub: [shamsheedali](https://github.com/shamsheedali)

---
