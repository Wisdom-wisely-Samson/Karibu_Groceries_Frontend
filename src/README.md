# Frontend – Produce Sales Management System (Vue.js)

## Overview

This is the **frontend application** for the Produce Sales Management System.
It is built with **Vue.js 3** and provides the user interface for managing produce inventory, sales transactions, credit sales, and branch analytics.

The frontend communicates with the backend REST API to retrieve and update data, while providing a responsive dashboard experience for different user roles.

---

## Features

### Authentication

* User login interface
* JWT-based authentication
* Role-based access routing

### Role-Based Dashboards

Different users see different dashboards depending on their role:

**Director**

* View branch analytics
* Compare performance across branches
* View revenue, stock, and sales charts

**Manager**

* Manage branch produce inventory
* Monitor sales and credit transactions

**Sales Agent**

* Record sales
* Record credit sales
* View recent transactions

---

## Modules

### Dashboard

Displays important business statistics such as:

* Total sales
* Outstanding credit
* Stock levels
* Revenue analytics

### Produce Module

Allows managers to:

* Add produce inventory
* Track tonnage per branch
* Monitor stock availability

### Sales Module

Allows users to:

* Record new sales
* Edit sales
* Delete sales
* View transaction history

### Credit Sales Module

Tracks:

* Sales made on credit
* Outstanding balances
* Due payments

### Analytics Module

Displays charts showing:

* Revenue per branch
* Sales vs credit
* Stock distribution

---

## Technology Stack

* **Vue.js 3** – Frontend framework
* **Pinia** – State management
* **Vue Router** – Page navigation
* **Axios** – API communication
* **Chart.js** – Data visualization
* **TailwindCSS / CSS** – UI styling

---

## Project Structure

```
src/
 ├── components
 │    ├── DashboardCard.vue
 │    ├── SideBar.vue
 │    └── TopBar.vue
 │
 ├── modules
 │    ├── auth
 │    ├── dashboard
 │    ├── produce
 │    ├── sales
 │    ├── credit
 │    └── analytics
 │
 ├── stores
 │    ├── authStore.js
 │    ├── salesStore.js
 │    ├── produceStore.js
 │    └── analyticsStore.js
 │
 ├── router
 │    └── index.js
 │
 ├── services
 │    └── api.js
 │
 ├── layouts
 │    ├── AppLayout.vue
 │    └── AuthLayout.vue
 │
 ├── App.vue
 └── main.js
```

---

## Installation

### 1. Install Dependencies

```
npm install
```

### 2. Start Development Server

```
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

## API Configuration

The frontend communicates with the backend using Axios.

Example API configuration:

```
src/services/api.js
```

```
axios.defaults.baseURL = "http://localhost:5000/api"
```

---

## State Management

Pinia stores manage application data including:

* Authentication
* Sales
* Produce inventory
* Credit sales
* Branch analytics

Stores fetch data from the backend API and update the UI reactively.

---

## Routing

Vue Router is used to manage navigation between pages.

Example routes:

* `/` → Login
* `/manager` → Manager dashboard
* `/agent` → Agent dashboard
* `/director` → Director dashboard
* `/sales` → Sales list
* `/produce` → Produce management
* `/credit` → Credit sales
* `/analytics` → Branch analytics

Route guards ensure only authorized users access specific pages.

---

## UI Components

Reusable components include:

* Sidebar navigation
* Top navigation bar
* Dashboard statistic cards
* Modal forms for adding and editing data
* Data tables for records

---

## Future Improvements

Potential improvements for the frontend include:

* Mobile responsive interface
* Dark mode support
* Export analytics reports
* Advanced charts and filters

---

## Author

This frontend was developed as part of the **Produce Sales Management System**, designed to improve sales tracking and analytics for produce businesses.
