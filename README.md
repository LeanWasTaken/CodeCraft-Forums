# CodeCraft - Technologies and Coding Focused Forums

## Overview

CodeCraft is a forum platform designed for technology enthusiasts and coders. It provides a space where users can discuss various topics related to coding, share knowledge, and connect with others in the tech community.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Login/Register)
- Profile Management
- Post and Comment Functionality
- Middleware for Route Protection
- Responsive Design
- Persistent User Sessions

## Technologies Used

- **Frontend**: Vue.js, Vuetify
- **Backend**: Node.js, Express
- **Database**: MySQL, Prisma
- **State Management**: Pinia
- **Validation**: Vuelidate
- **Routing**: Vue Router

## Project Structure

```bash
./src
├── App.vue
├── api
│   ├── controllers
│   ├── middlewares
│   ├── routers
│   └── server.js
├── assets
├── components
│   ├── AppFooter.vue
│   ├── comments
│   ├── home
│   ├── profile
│   └── ui
├── layouts
│   └── default.vue
├── main.js
├── middleware
│   └── auth.js
├── pages
│   ├── auth
│   └── profile
├── plugins
│   ├── index.js
│   └── vuetify.js
├── prisma
│   └── schema.prisma
├── router
│   └── index.js
├── stores
│   ├── app.js
│   ├── auth.js
│   └── index.js
└── styles
    └── settings.scss
```

### Prerequisites

- Node.js
- npm
- MySQL

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/LeanWasTaken/CodeCraft-Forums.git
   cd CodeCraft-Forums
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. Start the backend development server:

   ```bash
   npm run server
   ```

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Register a new account or log in with an existing one.
3. Explore the forums, create posts, and interact with the "community".

### Contributing

This is a school project, so, sadly others can't contribute :/
