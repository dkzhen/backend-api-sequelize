# Backend REST API - ExpressJS Sequelize ORM

Repo untuk test backend MSIB batch 6

## Instalasi

Instruksi langkah demi langkah tentang cara menginstal proyek ini. Termasuk prasyarat sistem dan langkah-langkah instalasi yang dibutuhkan.

> [!IMPORTANT]
> Node.js
> MYSQL

### clone repository

```console
https://github.com/dkzhen/backend-api-sequelize
```

### install library

```console
npm install sequelize sequelize-cli express body-parser cors dotenv mysql2
```

### add .env

```console
PORT = 5000
HOST = "127.0.0.1"
USER = "root"
PASSWORD =
```

### import database

```console
SQL file on utils/store.sql
```

### Run

```console
npm run dev
```

## Routes

### Products

```console
GET : /api/products
GET : /api/products?sort=price&order=asc
POST : /api/products
PUT : /api/products/:id
DELETE : /api/products/:id
```

### Categories

```console
GET : /api/categories
POST : /api/categories
PUT : /api/categories/:id
DELETE : /api/categories/:id
```

### Product Assets

```console
GET : /api/product-assets
POST : /api/product-assets
PUT : /api/product-assets/:id
DELETE : /api/product-assets/:id
```
