# 🛍️ ecommerceApi

A **Node.js + Express + MySQL (Sequelize ORM)** backend API for building a scalable **E-commerce platform**.
This project provides authentication, user management, product handling, and address management APIs with a clean and modular structure.

---

## 📂 Project Structure

```
ecommerceApi/
│── controllers/    # Business logic for each route (auth, products, users, etc.)
│── helpers/        # Utility/helper functions
│── middleware/     # Middlewares (auth, validations, product details)
│── models/         # Sequelize models & database schemas
│── routes/         # API route definitions
│── utilities/      # Additional utilities & configurations
│── app.js          # Application entry point
│── package.json    # Dependencies & project metadata
│── .gitignore      # Ignored files
│── README.md       # Documentation
```

---

## 🚀 Features

* 🔐 **Authentication** – JWT-based login & registration
* 👤 **User Management** – Profile & multiple addresses
* 🛒 **Products API** – Add, update, list, delete products
* 📦 **Cart & Orders** – Extendable structure for shopping flow
* 🛠️ **Middleware Support** – Auth check, product validation
* 🧩 **Sequelize ORM** – Easy database management with migrations

---

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MySQL
* **ORM**: Sequelize
* **Authentication**: JWT

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/theshubhamy/ecommerceApi.git
cd ecommerceApi
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Setup Database (MySQL + Sequelize)

Run migrations & seeders:

```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

### 6️⃣ Start Production Server

```bash
npm start
```

---

## 🧪 Testing

Run tests (if configured):

```bash
npm test
```

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to branch (`git push origin feature/awesome`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---
