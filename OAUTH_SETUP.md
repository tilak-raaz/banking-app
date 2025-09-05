# OAuth Setup Guide for SecureBank

## Google OAuth Setup

### Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**

   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create or Select a Project**

   - Click on the project dropdown at the top
   - Create a new project or select an existing one
   - Name it something like "SecureBank Banking App"

3. **Enable Google+ API**

   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click on it and enable the API

4. **Create OAuth 2.0 Credentials**

   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Name it "SecureBank Web Client"

5. **Configure Authorized Redirect URIs**
   Add these URIs:

   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

6. **Copy Credentials**
   - Copy the "Client ID" and "Client Secret"
   - Add them to your `.env.local` file

### Step 2: Environment Variables

Update your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database (Optional - for production)
DATABASE_URL="your-database-url-here"
```

### Step 3: Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and paste it as the `NEXTAUTH_SECRET` value.

### Step 4: Test OAuth

1. Restart your development server
2. Go to http://localhost:3000
3. Click "Sign In"
4. Click "Continue with Google"
5. Complete the Google authentication flow

## Alternative OAuth Providers

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add to your providers in `route.js`:

```javascript
import GitHubProvider from "next-auth/providers/github";

// Add to providers array:
GitHubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
});
```

### Microsoft OAuth

1. Go to Azure Portal > App registrations
2. Register a new application
3. Add redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
4. Add to providers:

```javascript
import AzureADProvider from "next-auth/providers/azure-ad";

// Add to providers array:
AzureADProvider({
  clientId: process.env.AZURE_AD_CLIENT_ID,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  tenantId: process.env.AZURE_AD_TENANT_ID,
});
```

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Update Google OAuth redirect URI to your Vercel domain

### Environment Variables for Production

```env
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Use different OAuth apps for development and production**
3. **Regularly rotate your secrets**
4. **Use HTTPS in production**
5. **Limit OAuth app permissions to minimum required**

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**

   - Check that your redirect URI exactly matches what's configured in Google Console
   - Make sure there are no trailing slashes

2. **"Application not verified" warning**

   - This is normal for development
   - You can proceed by clicking "Advanced" > "Go to [your app]"

3. **Environment variables not loading**

   - Restart your development server after changing `.env.local`
   - Make sure the file is in the root directory

4. **OAuth provider not working**
   - Check that all environment variables are set correctly
   - Verify the provider is enabled in your OAuth app settings

## Testing

Use these test accounts for development:

- **Demo Account**: demo@example.com / password123
- **Google OAuth**: Use your personal Google account for testing

Remember to test both authentication methods to ensure they work correctly!
