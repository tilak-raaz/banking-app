# SecureBank - Modern Banking Application

A modern, secure banking application built with Next.js, NextAuth.js, and Tailwind CSS.

## Features

### 🔐 Authentication

- **Secure Sign In/Sign Up**: Email and password authentication
- **OAuth Integration**: Google authentication support
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure session handling with NextAuth.js

### 📊 Dashboard

- **Account Balance**: Real-time balance display with toggle visibility
- **Transaction History**: Comprehensive transaction listing
- **Quick Actions**: Send money, request money, pay bills
- **Financial Overview**: Monthly income, expenses, and savings goals
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS

### 👤 User Profile

- **Profile Management**: Edit personal information
- **Security Settings**: Password change, 2FA setup
- **Account Information**: View account details and number

## Demo Account

You can test the application using the demo account:

- **Email**: demo@example.com
- **Password**: password123

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js
- **UI Components**: Custom components with Lucide React icons
- **Type Safety**: JavaScript (can be upgraded to TypeScript)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the `.env.local` file and update the values:

   ```bash
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Generate NextAuth Secret**

   ```bash
   openssl rand -base64 32
   ```

   Add this value to `NEXTAUTH_SECRET` in your `.env.local`

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## OAuth Setup (Optional)

### Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env.local`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   └── transactions/          # Transaction API
│   ├── auth/
│   │   ├── signin/               # Sign in page
│   │   └── signup/               # Sign up page
│   ├── dashboard/                # Main dashboard
│   ├── profile/                  # User profile page
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Landing page
├── components/
│   ├── ui/                      # Reusable UI components
│   └── AuthProvider.js          # Session provider
├── lib/
│   └── utils.js                 # Utility functions
└── middleware.js                # Route protection
```

## Key Features Explained

### Authentication Flow

- Users can sign up with email/password or Google OAuth
- Sessions are managed securely with NextAuth.js
- Protected routes automatically redirect unauthenticated users

### Dashboard Features

- **Balance Display**: Shows current account balance with visibility toggle
- **Transaction History**: Lists recent transactions with type indicators
- **Quick Actions**: Buttons for common banking operations
- **Financial Insights**: Overview cards showing income, expenses, and savings

### Security Features

- **Protected Routes**: Middleware prevents unauthorized access
- **Secure Sessions**: JWT-based session management
- **Password Hashing**: Bcrypt for password security
- **Environment Variables**: Sensitive data stored securely

## Customization

### Adding New Features

1. **New Pages**: Add to `src/app/` directory
2. **API Routes**: Add to `src/app/api/` directory
3. **Components**: Add to `src/components/` directory
4. **Styling**: Modify Tailwind classes or `globals.css`

### Database Integration

Currently uses mock data. To add a real database:

1. Choose a database (PostgreSQL, MySQL, MongoDB)
2. Set up Prisma or another ORM
3. Update API routes to use database
4. Modify authentication to work with database

### Deployment

1. **Vercel** (Recommended for Next.js)
2. **Netlify**
3. **AWS/Azure/GCP**

Remember to:

- Set environment variables in production
- Configure OAuth redirect URIs for production domain
- Set up database in production environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
