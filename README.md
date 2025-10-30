# Currnt - News Reader Application

A modern, responsive news reader application built with React, Next.js, and Tailwind CSS. Browse the latest news articles from around the world with an intuitive and visually appealing interface.

## 🎯 Project Overview

Currnt is a frontend capstone project that demonstrates modern web development practices including API integration, state management, responsive design, and user authentication. The application fetches real-time news articles from the NewsAPI and presents them in an engaging, user-friendly interface.

## ✨ Features

### Core Features
- **Browse News Articles** - View the latest news from various categories (Business, Technology, Health, Sports, etc.)
- **Featured Article** - Prominent display of the top trending article
- **Article Details** - Click any article to view full content, author, source, and publication date
- **Search & Filter** - Search articles by keywords and filter by category
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Dark Mode** - Toggle between light and dark themes for comfortable reading

### User Features
- **User Authentication** - Sign up and log in to personalize your experience
- **Save Favorites** - Bookmark articles to read later (requires authentication)
- **Personalized Feed** - Get a "For You" feed based on your reading preferences
- **Trending Articles** - Discover what's trending across all categories
- **Breaking News Notifications** - Opt-in push notifications for breaking news

### Technical Features
- **Error Handling** - Graceful error messages and recovery options
- **Loading States** - Skeleton screens for smooth loading experience
- **Pagination** - Navigate through multiple pages of articles
- **Caching** - Optimized API caching for better performance
- **Accessibility** - WCAG compliant with proper ARIA labels and semantic HTML

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with Next.js 16
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Data Fetching**: Native Fetch API with SWR
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Notifications**: Web Push API
- **API**: NewsAPI (https://newsapi.org)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A free NewsAPI key from [newsapi.org](https://newsapi.org)
- Supabase account (for authentication features)

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
   - Click the "Vars" button in the v0 sidebar
   - Add the following variables:
     - `NEWS_API_KEY` - Your NewsAPI key from https://newsapi.org
     - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
     - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📖 Usage

### Browsing News
1. Visit the home page to see the latest news
2. Use the category filter to browse specific topics
3. Click on any article to view full details
4. Use the search bar to find articles by keywords

### Saving Favorites
1. Sign in to your account
2. Click the heart icon on any article to save it
3. View all saved articles in the "Favorites" section

### Personalized Feed
1. Log in to your account
2. Visit the "For You" section to see personalized recommendations
3. Your feed updates based on your reading history

### Notifications
1. Go to Settings
2. Enable "Breaking News Notifications"
3. Receive push notifications for top stories

## 📁 Project Structure

\`\`\`
currnt/
├── app/
│   ├── (landing)/          # Landing page route group
│   ├── home/               # Home page with news feed
│   ├── article/            # Article detail view
│   ├── search/             # Search results page
│   ├── favorites/          # Saved articles page
│   ├── for-you/            # Personalized feed
│   ├── trending/           # Trending articles
│   ├── auth/               # Authentication pages
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── header.tsx          # Navigation header
│   ├── news-card.tsx       # Article card component
│   ├── news-grid.tsx       # Article grid layout
│   ├── featured-article.tsx # Featured article display
│   └── ...                 # Other components
├── contexts/               # React Context providers
├── lib/
│   ├── news-api.ts         # NewsAPI integration
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
└── styles/                 # Global styles
\`\`\`

## 🔑 Key Components

### NewsCard
Displays individual article with image, title, description, source, and date. Includes favorite button and hover effects.

### FeaturedArticle
Prominent display of the top trending article with full image and detailed information.

### CategoryFilter
Dropdown selector for filtering articles by category (Business, Technology, Health, Sports, Entertainment, Science, General).

### SearchBar
Search functionality to find articles by keywords across all sources.

### Pagination
Navigate through multiple pages of articles with Previous/Next buttons and page indicators.

## 🔐 Authentication

The app uses Supabase for user authentication:
- **Sign Up** - Create a new account with email and password
- **Login** - Access your personalized features
- **Logout** - Securely sign out of your account
- **Profile** - View and manage your account information

## 🎨 Customization

### Changing Colors
Edit the design tokens in `app/globals.css` to customize the color scheme:
\`\`\`css
@theme inline {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... more tokens ... */
}
\`\`\`

### Adding Categories
Update the categories in `lib/types.ts` and the category filter component to add new news categories.

### Adjusting Article Display
Modify the `pageSize` variable in `app/home/page.tsx` to change how many articles load per page.

## 📊 API Integration

### NewsAPI
- **Endpoint**: https://newsapi.org/v2/top-headlines
- **Rate Limit**: 500 requests/day (free tier)
- **Cache Duration**: 5 minutes
- **Categories**: business, entertainment, general, health, science, sports, technology

## 🐛 Troubleshooting

### "API key not configured" Error
1. Go to https://newsapi.org and sign up for a free API key
2. Click "Vars" in the v0 sidebar
3. Add `NEWS_API_KEY` with your API key value
4. Refresh the page

### No Articles Displaying
- Check that your NewsAPI key is valid
- Verify you haven't exceeded the free tier rate limit (500 requests/day)
- Check browser console for error messages

### Authentication Issues
- Ensure Supabase environment variables are correctly set
- Check that your Supabase project is active
- Clear browser cookies and try logging in again

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile** (320px and up) - Single column layout
- **Tablet** (768px and up) - Two column grid
- **Desktop** (1024px and up) - Three column grid
- **Large Desktop** (1280px and up) - Four column grid

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus indicators on interactive elements

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Deploy to Netlify
1. Build the project: `npm run build`
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard

## 📝 License

This project is part of a frontend capstone assignment and is provided as-is for educational purposes.

## 🤝 Contributing

This is a capstone project. For improvements or bug reports, please create an issue or submit a pull request.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the SETUP.md file for detailed setup instructions
3. Check the browser console for error messages
4. Visit https://newsapi.org for API documentation

---

**Happy Reading! 📰**
