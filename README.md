# 🏦 SecureBank - Professional Banking Application

A modern, full-stack banking application built with Next.js 15, featuring OAuth authentication, realistic demo data, and professional UI/UX design. Perfect for showcasing technical skills in interviews.

## 🚀 Live Demo

**[View Live Application](https://your-deployed-url.vercel.app)** *(Will be available after Vercel deployment)*

## ✨ Features

### 🔐 Authentication & Security
- **Google OAuth** integration with NextAuth.js
- **JWT sessions** for secure state management
- **Route protection** with middleware
- **Real user data** integration (names, emails)

### 🏛️ Banking Features
- **Professional Dashboard** with account overview
- **Realistic Account Balances** ($5,420.75, $8,750.25, etc.)
- **Complete Transaction Histories** with categories
- **Multiple Account Types** (Checking, Savings, Premium, Student)
- **User Profile Management** with banking information

### 🎨 UI/UX
- **Modern Design** with Tailwind CSS 4
- **Responsive Layout** for all devices
- **Professional Banking Interface**
- **Clean, Accessible Components**
- **Interactive Dashboard Elements**

### 🗄️ Database & Backend
- **Prisma ORM** for database management
- **SQLite** for development (easily adaptable to PostgreSQL)
- **Automated Profile Assignment** for new users
- **Seeded Demo Data** for instant functionality

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS 4 |
| **Authentication** | NextAuth.js, Google OAuth |
| **Database** | Prisma ORM, SQLite |
| **Backend** | Next.js API Routes |
| **UI Components** | Custom components with Lucide icons |
| **Deployment** | Vercel (recommended) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Google OAuth credentials
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tilak-raaz/banking-app.git
   cd banking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your credentials to `.env.local`:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

## 🚀 Deployment to Vercel

1. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

2. **Environment Variables**
   Add these to Vercel dashboard:
   ```
   NEXTAUTH_SECRET
   NEXTAUTH_URL
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   DATABASE_URL
   ```

## 👨‍💻 Developer

**Tilak Kumar**
- GitHub: [@tilak-raaz](https://github.com/tilak-raaz)

---

### 🌟 Star this repository if you found it helpful!
