# Currnt News Reader App - Setup & Deployment Guide

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running Locally](#running-locally)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

## Initial Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher ([Download](https://nodejs.org))
- **npm** or **yarn** package manager (comes with Node.js)
- A text editor (VS Code recommended)
- Git (optional, for version control)

### Project Overview

Currnt is a modern news reader application built with:
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **NewsAPI** - Real-time news data
- **Supabase** - Authentication & database (optional)

## Installation

### Step 1: Download & Extract Project

If you downloaded from v0:
\`\`\`bash
unzip currnt.zip
cd currnt
\`\`\`

Or if cloning from GitHub:
\`\`\`bash
git clone <your-repo-url>
cd currnt
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

This will install all required packages including Next.js, React, Tailwind CSS, and UI components.

### Step 3: Verify Installation

\`\`\`bash
npm run build
\`\`\`

This ensures all dependencies are correctly installed and the project builds successfully.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# News API (Required)
NEWS_API_KEY=your_news_api_key_here

# Supabase (Optional - for authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/home
\`\`\`

### Getting Your NewsAPI Key

1. Visit [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for a free account
4. Copy your API key
5. Add it to `.env.local` as `NEWS_API_KEY`

**Note:** Free tier includes 500 requests/day and access to top headlines and general news.

### Supabase Setup (Optional)

If you want to use Supabase authentication:

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard:
   - Go to **Settings** → **API**
   - Copy your **Project URL** and **Anon Key**
   - Add them to `.env.local`
3. For OAuth (Google login):
   - Go to **Authentication** → **Providers** → **Google**
   - Follow the setup instructions
   - Add redirect URLs:
     - Development: `http://localhost:3000/auth/callback`
     - Production: `https://yourdomain.com/auth/callback`

## Running Locally

### Start Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The app will be available at [http://localhost:3000](http://localhost:3000)

### Development Commands

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
\`\`\`

### Testing the App

1. **Home Page**: Browse news by category
2. **Search**: Use the search bar to find specific news
3. **Favorites**: Click the heart icon to save articles
4. **Login**: Create an account or login (uses localStorage by default)
5. **Profile**: View your saved articles and account info
6. **Settings**: Customize appearance, notifications, and preferences

## Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps:

#### Option 1: Using GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEWS_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` (if using Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (if using Supabase)
6. Click "Deploy"

#### Option 2: Using Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
\`\`\`

### Deploy to Other Platforms

#### Netlify
\`\`\`bash
npm run build
# Deploy the .next folder to Netlify
\`\`\`

#### Docker (Self-hosted)
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Post-Deployment

1. **Update Supabase URLs** (if using Supabase):
   - Add your production domain to OAuth redirect URLs
   - Update `NEXT_PUBLIC_SUPABASE_URL` if needed

2. **Test All Features**:
   - Verify news loading
   - Test authentication
   - Check favorites functionality
   - Test search and filters

3. **Monitor Performance**:
   - Check Vercel Analytics
   - Monitor API usage
   - Review error logs

## Project Structure

\`\`\`
currnt/
├── app/                          # Next.js App Router
│   ├── (landing)/               # Landing page routes
│   ├── auth/                    # Authentication pages
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   └── callback/           # OAuth callback
│   ├── home/                   # Main news feed
│   ├── article/[id]/           # Article detail page
│   ├── favorites/              # Saved articles
│   ├── profile/                # User profile
│   ├── settings/               # App settings
│   ├── about/                  # About page
│   ├── api/                    # API routes
│   │   └── news/              # News fetching endpoint
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   ├── header.tsx              # Top navigation
│   ├── sidebar.tsx             # Left sidebar
│   ├── news-card.tsx           # Article card
│   └── ...                     # Other components
├── contexts/                    # React contexts
│   ├── auth-context.tsx        # Authentication state
│   ├── favorites-context.tsx   # Favorites management
│   ├── theme-context.tsx       # Theme management
│   └── settings-context.tsx    # App settings
├── lib/                        # Utility functions
│   ├── supabase/              # Supabase client
│   ├── types.ts               # TypeScript types
│   └── utils.ts               # Helper functions
├── public/                     # Static assets
├── .env.local                  # Environment variables (create this)
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
\`\`\`

## Features

### Core Features
- ✅ Browse news by category (Business, Tech, Sports, Health, Science, Entertainment)
- ✅ Search articles by keyword
- ✅ Save favorite articles
- ✅ User authentication (localStorage-based by default)
- ✅ User profile with saved articles count
- ✅ Customizable settings (theme, font size, notifications)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support

### Advanced Features
- 🎨 Smooth animations and transitions
- 🔍 Advanced search with filters
- 📱 Mobile-optimized navigation
- 🎯 Personalized "For You" feed
- 📊 Trending topics section
- 🎬 Video news section
- ⚡ Optimized performance with lazy loading
- 🌙 Dark/Light theme toggle

## Troubleshooting

### Common Issues

#### "NEWS_API_KEY is not configured"
**Solution:**
1. Create `.env.local` file in root directory
2. Add `NEWS_API_KEY=your_key_here`
3. Restart development server: `npm run dev`

#### Articles not loading
**Solution:**
1. Verify your NewsAPI key is valid
2. Check if you've exceeded free tier limits (500 requests/day)
3. Open browser DevTools (F12) → Console for error messages
4. Verify internet connection

#### Login/Logout not working
**Solution:**
1. Clear browser cookies and localStorage
2. Open DevTools → Application → Storage → Clear All
3. Refresh the page
4. Try logging in again

#### Styling issues or missing components
**Solution:**
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Rebuild: `npm run build`
4. Restart dev server: `npm run dev`

#### Supabase authentication errors
**Solution:**
1. Verify environment variables are correct
2. Check Supabase dashboard for authentication logs
3. Ensure redirect URLs are properly configured
4. Clear browser cache and try again

#### Deployment fails on Vercel
**Solution:**
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure `package.json` has correct scripts
4. Try deploying again

### Getting Help

1. **Check the code comments** - Most components have detailed comments
2. **Review error messages** - Browser console shows helpful error details
3. **Check Vercel logs** - Deployment issues are logged in Vercel dashboard
4. **Visit documentation**:
   - [Next.js Docs](https://nextjs.org/docs)
   - [NewsAPI Docs](https://newsapi.org/docs)
   - [Supabase Docs](https://supabase.com/docs)

## Performance Tips

1. **Optimize Images**: Use Next.js Image component for automatic optimization
2. **Lazy Loading**: Components load on demand for better performance
3. **Caching**: Browser caches articles to reduce API calls
4. **Pagination**: Large datasets are paginated for faster loading
5. **Code Splitting**: Each route is code-split automatically

## Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use environment variables** for sensitive data
3. **Validate user input** - All forms validate data
4. **HTTPS only** - Always use HTTPS in production
5. **Keep dependencies updated** - Run `npm update` regularly

## Next Steps

1. ✅ Complete initial setup
2. ✅ Get NewsAPI key
3. ✅ Run locally and test
4. ✅ Deploy to Vercel
5. ✅ Share with others!

## Support & Feedback

- Report issues on GitHub
- Check existing documentation
- Contact support at vercel.com/help

---

**Happy reading with Currnt! 📰**
