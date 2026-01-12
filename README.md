# BlueTech Shop - E-Commerce Platform

A modern full-stack e-commerce platform built with Next.js 15 and Cloudflare Workers.

## 🏗️ Architecture

This project uses a **hybrid architecture** with separate frontend and backend:

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Cloudflare Workers (Edge Computing)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (Image Storage)

## ✨ Features

### Frontend (Next.js)
- 🎨 Modern, responsive UI with Tailwind CSS
- 🏠 Homepage with featured products and categories
- 📦 Product listing and detail pages
- 📧 Customer inquiry submission
- 🔐 Complete admin dashboard

### Backend (Cloudflare Workers)
- 🛒 Product management (CRUD operations)
- 📨 Inquiry management system
- 👥 Admin authentication with JWT
- ⚙️ Website settings management
- 📤 Image upload to R2 storage
- 🔒 Role-based access control (super_admin, admin)

## 📁 Project Structure

```
.
├── fk002/                        # Next.js Frontend
│   ├── app/
│   │   ├── admin/               # Admin dashboard pages
│   │   │   ├── dashboard/       # Dashboard overview
│   │   │   ├── products/        # Product management
│   │   │   ├── inquiries/       # Inquiry management
│   │   │   ├── settings/        # Site settings
│   │   │   └── login/           # Admin login
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   └── admin/               # Admin components
│   ├── lib/
│   │   ├── api.ts               # API client
│   │   └── admin.ts             # Admin utilities
│   └── .env.local               # Environment variables
│
└── bluetech-shop-backend/        # Cloudflare Workers Backend
    ├── src/
    │   ├── index.js             # Worker entry point
    │   ├── api/
    │   │   ├── router.js        # API router
    │   │   └── handlers/        # API endpoints
    │   ├── utils/auth.js        # JWT & password utils
    │   └── middleware/cors.js   # CORS handling
    ├── schema/schema.sql        # Database schema
    └── wrangler.toml            # Cloudflare config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (free tier works)
- Wrangler CLI

### Step 1: Deploy Backend

```bash
# 1. Navigate to backend directory
cd /Users/raowenjie/bluetech-shop-backend

# 2. Install dependencies
npm install

# 3. Login to Cloudflare
npm run dev  # First time? Run: wrangler login

# 4. Create D1 database
wrangler d1 create bluetech_shop_db

# 5. Update wrangler.toml with your database IDs
# Edit wrangler.toml and replace YOUR_DATABASE_ID

# 6. Run database migrations
wrangler d1 execute bluetech_shop_db --file=schema/schema.sql

# 7. Create R2 bucket for images
wrangler r2 bucket create bluetech-product-images

# 8. Deploy to Cloudflare
npm run deploy

# 9. Note your Worker URL from the output
# Example: https://bluetech-shop-backend.your-subdomain.workers.dev
```

### Step 2: Configure Frontend

```bash
# 1. Navigate to frontend directory
cd /Users/raowenjie/fk002

# 2. Install dependencies
npm install

# 3. Update .env.local with your Worker URL
echo "NEXT_PUBLIC_API_URL=https://your-worker-url.workers.dev" > .env.local

# 4. Run development server
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 🔑 Default Admin Credentials

After deploying the backend, you can login to the admin panel at `/admin/login`:

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change this password immediately after first login!

## 📚 API Documentation

### Products API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | List products | Public |
| GET | `/api/products/featured` | Get featured products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Super Admin |
| PUT | `/api/products/:id` | Update product | Super Admin |
| DELETE | `/api/products/:id` | Delete product | Super Admin |

### Inquiries API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/inquiries` | Submit inquiry | Public |
| GET | `/api/inquiries` | List inquiries | Admin |
| PUT | `/api/inquiries/:id/status` | Update status | Admin |

### Admin API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/login` | Admin login | Public |
| GET | `/api/admin/stats` | Dashboard stats | Admin |

### Settings API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/settings` | Get settings | Public |
| PUT | `/api/settings` | Update settings | Super Admin |

## 🎯 Admin Dashboard

Access the admin panel at `/admin/dashboard`:

- **Dashboard**: Overview with statistics
- **Products**: Full CRUD management
- **Inquiries**: Customer inquiry management
- **Settings**: Website configuration

## 🔧 Configuration

### Backend (wrangler.toml)

```toml
name = "bluetech-shop-backend"
main = "src/index.js"
compatibility_date = "2025-01-01"

# Update these with your actual IDs
[[d1_databases]]
binding = "DB"
database_name = "bluetech_shop_db"
database_id = "YOUR_DATABASE_ID"

[[r2_buckets]]
binding = "IMAGES"
bucket_name = "bluetech-product-images"

[vars]
JWT_SECRET = "change-this-in-production"
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://your-worker-url.workers.dev
```

## 📦 Database Schema

### Tables

- **products**: Product catalog with images, pricing, inventory
- **categories**: Product categories
- **inquiries**: Customer inquiries
- **admins**: Admin users with RBAC
- **settings**: Website configuration

See `/bluetech-shop-backend/schema/schema.sql` for full schema.

## 🔒 Security

- JWT authentication with 24-hour expiration
- Password hashing using SHA-256
- Role-based access control (super_admin, admin)
- CORS protection (configure in production)
- SQL injection prevention (prepared statements)

## 💰 Cost Estimate

**Cloudflare Free Tier** includes:
- 100,000 Workers requests/day
- 5GB D1 storage
- 10GB R2 storage

**Estimated cost**: $0-30/month for small to medium traffic

## 🚢 Deployment

### Frontend (Vercel)

```bash
# Push to GitHub (auto-deploys on Vercel)
git push origin main
```

### Backend (Cloudflare)

```bash
cd bluetech-shop-backend
npm run deploy
```

## 🛠️ Development

### Frontend Development

```bash
cd fk002
npm run dev
# Visit http://localhost:3000
```

### Backend Development

```bash
cd bluetech-shop-backend
npm run dev
# Visit http://localhost:8787
```

## 📖 Useful Commands

### Backend

```bash
npm run dev          # Start dev server
npm run dev:local    # Start with local mode
npm run deploy       # Deploy to Cloudflare
npm run d1:create    # Create D1 database
npm run d1:migrate   # Run migrations
npm run r2:create    # Create R2 bucket
```

### Frontend

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Customize colors and fonts in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles

### Adding New Features

1. **Backend**: Add new handler in `src/api/handlers/`
2. **Frontend**: Add API methods in `lib/api.ts`
3. **Admin UI**: Create new page in `app/admin/`

## 🐛 Troubleshooting

### Backend Issues

**Database not found**:
```bash
wrangler d1 list  # Check your databases
wrangler d1 execute bluetech_shop_db --file=schema/schema.sql
```

**Worker not responding**:
```bash
wrangler tail     # View worker logs
```

### Frontend Issues

**API not connecting**:
- Check `.env.local` has correct URL
- Verify backend is deployed
- Check browser console for errors

**Login not working**:
- Clear browser cookies
- Verify JWT_SECRET matches in wrangler.toml
- Check database has admin user

## 📞 Support

For issues or questions:
- Check the backend README: `/bluetech-shop-backend/README.md`
- Review Cloudflare Workers docs: https://developers.cloudflare.com/workers/

## 📄 License

MIT

---

Built with ❤️ using Next.js and Cloudflare Workers
