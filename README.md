# **Drafty Reader Frontend**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

**Drafty Reader Frontend** is the client-facing web application for browsing and reading blog posts. It consumes the **Drafty API** backend to fetch posts, categories, and comments.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [API Integration](#api-integration)
* [Setup & Installation](#setup--installation)
* [Backend Reference](#backend-repository)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* Browse all posts and categories
* View post details with comments
* Add comments (requires authentication via JWT)
* Responsive design for desktop and mobile

---

## Tech Stack

* **Frontend:** React, CSS Modules, Vite
* **State Management:** React Context
* **API:** REST (consumes Drafty API backend)

---

## API Integration

This frontend communicates with the **Drafty API** for data operations.

Key endpoints used:

* `GET /post` – Fetch all posts
* `GET /post/:id` – Fetch single post details
* `GET /post/:id/comments` – Fetch post comments
* `POST /post/:id/comments` – Add comment (JWT required)

## **Backend Repository:** [Drafty API](https://github.com/danilocasim/drafty-api)

---

## Setup & Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:danilocasim/drafty-client.git
   cd drafty-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`)

   ```env
   VITE_API_URL=https://drafty-api.vercel.app/blog/v1
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Make your changes and commit (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

MIT License – see [LICENSE](LICENSE) for details
