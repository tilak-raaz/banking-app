# 🚀 Deployment Guide - SecureBank

This guide will help you deploy your SecureBank application to Vercel with a production database.

## 📋 Pre-Deployment Checklist

- ✅ Code pushed to GitHub
- ✅ Google OAuth credentials ready
- ✅ Database setup (see options below)

## 🗄️ Database Setup Options

### Option 1: Vercel Postgres (Recommended)

1. **Go to Vercel Dashboard**
2. **Create/Select your project**
3. **Go to Storage tab → Create Database**
4. **Select "Postgres"**
5. **Copy the connection string**

### Option 2: Supabase (Free Tier)

1. **Visit [supabase.com](https://supabase.com)**
2. **Create new project**
3. **Go to Settings → Database**
4. **Copy connection string**
5. **Format**: `postgresql://[user]:[password]@[host]:[port]/[database]`

### Option 3: Railway (Simple Setup)

1. **Visit [railway.app](https://railway.app)**
2. **Create PostgreSQL database**
3. **Copy connection string**

## 🚀 Vercel Deployment Steps

### 1. Import Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import `tilak-raaz/banking-app`
4. Configure project settings

### 2. Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-app-name.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-postgresql-connection-string
```

### 3. Google OAuth Configuration

Update your Google OAuth settings:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project → APIs & Services → Credentials
3. Edit your OAuth 2.0 Client
4. Add authorized redirect URI:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

### 4. Database Migration

After first deployment, run database migration:

1. **In Vercel Dashboard → Functions → Terminal** (or locally):

   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Seed the database** (optional for demo data):
   ```bash
   npm run db:seed
   ```

## 🔧 Build Configuration

Your `package.json` already includes the correct build scripts:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

## ✅ Post-Deployment Checklist

1. **Test OAuth Login**

   - Visit your deployed app
   - Try Google OAuth sign-in
   - Verify profile creation

2. **Check Database**

   - Verify users are being created
   - Confirm banking profiles are assigned
   - Test transaction data

3. **Monitor Logs**
   - Check Vercel function logs
   - Monitor for any errors

## 🐛 Common Issues & Solutions

### Issue: OAuth Redirect Mismatch

**Solution**: Ensure redirect URI in Google Console matches your Vercel URL exactly

### Issue: Database Connection Error

**Solution**: Double-check `DATABASE_URL` format and credentials

### Issue: Environment Variables Not Working

**Solution**:

- Redeploy after adding environment variables
- Check variable names match exactly

### Issue: Prisma Client Not Generated

**Solution**: Ensure `postinstall` script runs: `"postinstall": "prisma generate"`

## 📊 Environment-Specific Configuration

### Development (.env.local)

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
```

### Production (Vercel)

```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_URL=https://your-app.vercel.app
```

## 🔄 Database Schema Updates

When you update the schema:

1. **Development**:

   ```bash
   npx prisma db push
   ```

2. **Production**:
   ```bash
   npx prisma db push --accept-data-loss
   ```

## 🎯 Performance Optimization

1. **Database Indexing**: Already optimized with `@unique` constraints
2. **API Caching**: Consider adding caching for transaction endpoints
3. **Image Optimization**: Next.js automatically optimizes images

## 📈 Monitoring & Analytics

Consider adding:

- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking
- **LogRocket**: User session replay

---

## 🚀 Quick Deploy Command

After setting up database and environment variables:

```bash
# Push any final changes
git add .
git commit -m "Ready for production deployment"
git push origin main

# Vercel will auto-deploy from main branch
```

Your SecureBank application will be live and ready for interviews! 🎉
