# Currnt - Modern News Reader App

A beautiful, responsive news reader application built with Next.js, React, and Tailwind CSS. Stay informed with real-time news from around the world, personalized feeds, and a seamless reading experience.

![Currnt News Reader](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Features

### Core Features
- 📰 **Browse News by Category** - Business, Technology, Sports, Health, Science, Entertainment, and more
- 🔍 **Advanced Search** - Find articles by keywords with real-time filtering
- ❤️ **Save Favorites** - Bookmark articles to read later
- 👤 **User Authentication** - Create accounts and manage your profile
- 🎨 **Dark Mode** - Comfortable reading in any lighting condition
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance** - Optimized loading with lazy loading and caching

### Advanced Features
- 🎯 **Personalized Feed** - "For You" section with tailored content
- 📊 **Trending Topics** - See what's trending right now
- 🎬 **Video News** - Watch news videos alongside articles
- 📖 **Full Article View** - Read complete articles with author and source info
- 🔔 **Smart Notifications** - Stay updated with important news
- 🌍 **Multi-language Support** - Read news in your preferred language
- 📄 **Pagination** - Browse through multiple pages of articles
- 🎨 **Customizable Settings** - Personalize your reading experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- A NewsAPI key (free at [newsapi.org](https://newsapi.org))

### Installation

1. **Clone or download the project**
   \`\`\`bash
   git clone <repository-url>
   cd currnt
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   NEWS_API_KEY=your_news_api_key_here
   SUPABASE_NEXT_PUBLIC_SUPABASE_URL=your_supabase_url (optiSUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY=your_supabase_key (optional)
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Browsing News
1. Visit the home page to see the latest news
2. Use the category filter to browse specific topics
3. Click on any article to read the full story

### Searching Articles
1. Click the search icon in the top bar
2. Enter your search query
3. Browse filtered results

### Saving Favorites
1. Click the heart icon on any article card
2. View all saved articles in the Favorites section
3. Remove articles by clicking the heart again

### User Account
1. Click "Sign In" to create an account or login
2. View your profile with saved articles count
3. Customize settings in the Settings page

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### State Management & Utilities
- **React Context API** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date formatting
- **Recharts** - Data visualization

### APIs & Services
- **NewsAPI** - Real-time news data
- **Supabase** - Authentication & database (optional)

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Tailwind CSS** - CSS framework

## 📁 Project Structure

\`\`\`
currnt/
├── app/                          # Next.js App Router
│   ├── (landing)/               # Landing page
│   ├── auth/                    # Authentication pages
│   │   ├── login/              # Login page
│   │   └── signup/             # Signup page
│   ├── home/                   # Main news feed
│   ├── article/                # Article detail page
│   ├── favorites/              # Saved articles
│   ├── profile/                # User profile
│   ├── settings/               # App settings
│   ├── search/                 # Search results
│   ├── trending/               # Trending articles
│   ├── for-you/                # Personalized feed
│   ├── videos/                 # Video news
│   ├── api/                    # API routes
│   │   └── news/              # News fetching endpoint
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   ├── header.tsx              # Top navigation
│   ├── sidebar.tsx             # Left sidebar
│   ├── mobile-nav.tsx          # Mobile navigation
│   ├── news-card.tsx           # Article card
│   ├── news-grid.tsx           # Article grid
│   ├── search-bar.tsx          # Search component
│   ├── category-filter.tsx     # Category filter
│   ├── featured-article.tsx    # Featured article
│   ├── trending-sidebar.tsx    # Trending section
│   ├── did-you-know-facts.tsx  # Fun facts carousel
│   └── ...                     # Other components
├── contexts/                    # React contexts
│   ├── auth-context.tsx        # Authentication state
│   ├── favorites-context.tsx   # Favorites management
│   ├── theme-context.tsx       # Theme management
│   └── settings-context.tsx    # App settings
├── lib/                        # Utility functions
│   ├── supabase/              # Supabase client setup
│   ├── types.ts               # TypeScript types
│   └── utils.ts               # Helper functions
├── public/                     # Static assets
│   ├── logo-white.png         # White logo
│   ├── logo-blue.png          # Blue logo
│   └── ...                    # Other assets
├── .env.local                  # Environment variables (create this)
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
├── SETUP.md                    # Setup & deployment guide
└── README.md                   # This file
\`\`\`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Required - Get from newsapi.org
NEWS_API_KEY=your_news_api_key_here

# Optional - For Supabase authentication
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/home
\`\`\`

### Getting a NewsAPI Key

1. Visit [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for a free account
4. Copy your API key
5. Add it to `.env.local`

**Free Tier Limits:**
- 500 requests per day
- Access to top headlines and general news
- 1-month article history

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `NEWS_API_KEY` and any Supabase variables
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app is now live!

### Deploy with Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
\`\`\`

### Deploy to Other Platforms

**Netlify:**
\`\`\`bash
npm run build
# Deploy the .next folder to Netlify
\`\`\`

**Docker (Self-hosted):**
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

## 📚 Available Scripts

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
\`\`\`

## 🎨 Customization

### Change Theme Colors
Edit `app/globals.css` to customize the color scheme:
\`\`\`css
@theme inline {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... more colors ... */
}
\`\`\`

### Add New Categories
Edit the category filter in `components/category-filter.tsx` to add more news categories.

### Customize Layout
Modify components in the `components/` directory to change the layout and design.

## 🐛 Troubleshooting

### Articles Not Loading
- Verify your NewsAPI key is valid
- Check if you've exceeded the free tier limit (500 requests/day)
- Open DevTools (F12) → Console for error messages

### Login/Logout Issues
- Clear browser cookies and localStorage
- Open DevTools → Application → Storage → Clear All
- Refresh the page and try again

### Styling Issues
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Rebuild
npm run build

# Restart dev server
npm run dev
\`\`\`

### Deployment Fails
- Check Vercel build logs for errors
- Verify all environment variables are set
- Ensure `package.json` has correct scripts
- Try deploying again

## 📖 Documentation

- **Setup Guide**: See [SETUP.md](./SETUP.md) for detailed installation and deployment instructions
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **NewsAPI Docs**: [newsapi.org/docs](https://newsapi.org/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org) for providing news data
- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [Vercel](https://vercel.com) for hosting and deployment
- [Next.js](https://nextjs.org) for the amazing framework

## 📞 Support

- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact support at vercel.com/help
- **Documentation**: Check [SETUP.md](./SETUP.md) for detailed guides

## 🎯 Roadmap

- [ ] Push notifications for breaking news
- [ ] Multi-language support
- [ ] Advanced personalization based on reading habits
- [ ] Offline reading mode
- [ ] Article sharing to social media
- [ ] Custom news sources
- [ ] Reading time estimates
- [ ] Article summaries with AI

---

**Made with ❤️ using Next.js and Tailwind CSS**

**Happy reading with Currnt! 📰**
