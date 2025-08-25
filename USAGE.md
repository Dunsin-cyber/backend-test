

# Paritie Skill Test – Wallet & Donation Service

This project implements a simple wallet and donation API with built-in transaction safety, pagination, and authentication.

---

## 🚀 Features

* **Default Wallet Balance**: Every user automatically gets a wallet with a starting balance of **100,000 units**.
* **Send Funds by Email**: Users can send funds to beneficiaries using their registered email address.
* **Automatic Transaction Rollback**: Built-in safety mechanism in the **create donation** endpoint ensures that if any part of the process fails, funds are **automatically reversed**.
* **Pagination Support**: All resource fetch endpoints (users, donations, wallets) include pagination for efficient data retrieval.
* **Authentication**: Secure login & signup flow. Every request to protected endpoints requires a valid JWT access token.

---

## 🛠️ Getting Started

Follow these steps to set up the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/Dunsin-cyber/backend-test/tree/main

# 2. Install dependencies
yarn install

# 3. Copy environment variables
cp .env.example .env
```

### ⚙️ Environment Setup

You need a PostgreSQL database connection string.
Create a database from any **Postgres provider** and copy the connection URL.
It should look like this:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Set this value in your `.env` file as `DATABASE_URL`.
Also fill in other required values like:

* `NODE_ENV`
* `JWT_SECRET`
* `PORT` etc

---



## ▶️ Running the Project

Start the development server with:

```bash
yarn dev
```

Run the seed data
`yarn run db:seed` to create a paritie system account

If everything is working, you’ll see logs like this:

```bash
[nodemon] starting `ts-node -r tsconfig-paths/register src/server.ts`
Application started with config Loaded up✅
Server running on port [PORT]
API documentation available at 📝📚 http://localhost:[PORT]/api-docs
```

Now you can open the documentation link in your browser to test the APIs.

---

## 🌍 Deployed Service

A hosted version of this service is available at:

* **Backend URL** → [https://backend-test-21ij.onrender.com](https://backend-test-21ij.onrender.com)
* **API Docs** → http://localhost:[PORT]/api-docs

⚠️ **Note**:

* The hosting and database are on **free plans** and may be slow or unavailable.
* The database linked to this project will **expire on September 13, 2025**.

---

## 🔑 Authentication

Most endpoints are **protected**. To access them:

1. **Create an account** or **login** to get an `accessToken`.
2. The token is valid for **15 minutes**.
3. In the API docs (`/api-docs`), click the **Authorize** button (top right).
4. Paste the token into the input field and click **Authorize**.
5. You can now access protected routes directly from the Swagger UI.

---

## ✅ Summary

* Every user starts with **100,000 units** in their wallet.
* Transactions are **safe with auto-reversal** on failure.
* **Pagination** makes large data queries efficient.
* Fully documented and easy to test using Swagger.

