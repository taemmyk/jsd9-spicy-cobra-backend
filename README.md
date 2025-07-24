# 🎮 Spicy Cobra | Unleash Indie Game. Limitless Creativity.

**Spicy Cobra** is an e-commerce platform focused on **selling Thai indie games** — aiming to connect **developers**, **gamers**, and **investors** in one creative space.  
This project was developed as part of the **Junior Software Developer Bootcamp – Cohort 9**.

## 🚀 Features

- **CRUD Operations** – Manage games and orders (create, read, update, delete).
- **User Authentication** – JWT-based secure routes.
- **Forget Password + Email Reset** – Sends secure reset link via email with unique token (OAuth 2.0)
- **Search with Debouncing** – Efficient game search experience.
- **Tag Filtering** – Discover games by genre or category.
- **Related Game Suggestions** – Personalized game recommendations.
- **Future-ready** – Placeholder components for devlogs and news.

## 🛠️ Technologies Used
### Core Stack
- **Language**: JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Frontend**: [React](https://reactjs.org/), [Material UI (MUI)](https://mui.com/), [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)

### Database
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

### Security
- [Helmet.js](https://helmetjs.github.io/)
- CORS, Rate Limiting, bcrypt
- JWT for authentication
- Secure client-side with `localStorage` for tokens

### Environment
- `dotenv`

### Deployment
- **Frontend** – [Vercel - Live Site](https://jsd9-spicy-cobra-frontend.vercel.app/)
- **Backend** – [Render - API Endpoint](https://jsd9-spicy-cobra-backend.onrender.com)

## 🌐 Deployment

Scribbly is deployed on the following platforms:
- **Frontend** – Deployed via [Vercel](https://vercel.com/)
  - 🔗 [Live Frontend App](https://jsd9-mini-project-scribbly.vercel.app/)
- **Backend** – Deployed via [Render](https://render.com/)
  - 🔗 [Live Backend API](https://jsd9-mini-project-scribbly-backend.onrender.com)

## 💻 Installation (Local Development)
1. **Clone both frontend and backend repositories**
   ```bash
   git clone https://github.com/taemmyk/jsd9-spicy-cobra-frontend.git
   git clone https://github.com/taemmyk/jsd9-spicy-cobra-backend.git
   ```
2. **Install dependencies**
   - Frontend
   ```bash
   cd ../spicy-cobra-frontend
   npm install
   ```
   - Backend
   ```bash
   cd ../spicy-cobra-backend
   npm install
   ```
3. **Set up environment variables**
   - Copy .env.example to .env in the *backend* folder and configure values accordingly.
   ```bash
   cp .env.example .env
   ```
4. **Run the app locally**
   - Frontend
   ```bash
   cd spicy-cobra-frontend
    npm run dev
   ```
   - Backend
   ```bash
   cd spicy-cobra-backend
    npm run dev
   ```