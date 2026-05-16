# Solana AI Gaming Ecosystem - Deployment Guide

## Overview

This document provides comprehensive deployment instructions for the Solana AI Gaming Ecosystem on Railway, including environment setup, database configuration, and production best practices.

## Prerequisites

- Railway account (https://railway.app)
- GitHub repository connected to Railway
- PostgreSQL database (provided by Railway)
- Redis cache (optional, provided by Railway)
- Solana RPC endpoint (Helius or QuickNode)
- Jupiter API key
- OpenAI API key
- Deepgram API key (optional)

## Environment Variables

### Required Secrets

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-jwt-secret-key-min-32-chars
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
VITE_APP_ID=your-manus-app-id

# Solana & Blockchain
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
JUPITER_API_KEY=your-jupiter-api-key
SOLANA_NETWORK=mainnet-beta

# AI & LLM
OPENAI_API_KEY=sk-your-openai-key
DEEPGRAM_API_KEY=your-deepgram-key

# USD1 Stablecoin
USD1_TOKEN_MINT=your-usd1-mint-address
AGENTPAY_SDK_KEY=your-agentpay-sdk-key

# Frontend URLs
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key

# Application
VITE_APP_TITLE=Solana Arena
VITE_APP_LOGO=https://your-logo-url.png
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
```

## Railway Deployment Steps

### 1. Connect Repository

```bash
# Push your code to GitHub
git add .
git commit -m "Initial commit: Solana AI Gaming Ecosystem"
git push origin main
```

### 2. Create Railway Project

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your repository
5. Select the main branch

### 3. Add Services

#### PostgreSQL Database

```bash
# In Railway dashboard:
# 1. Click "+ Add Service"
# 2. Select "Database"
# 3. Choose "PostgreSQL"
# 4. Configure:
#    - Name: postgres
#    - Version: 14+
#    - RAM: 512MB
```

#### Redis Cache (Optional)

```bash
# In Railway dashboard:
# 1. Click "+ Add Service"
# 2. Select "Database"
# 3. Choose "Redis"
# 4. Configure:
#    - Name: redis
#    - Version: 7+
```

### 4. Configure Environment Variables

In Railway dashboard:

1. Go to your project
2. Select the web service
3. Click "Variables"
4. Add all required environment variables from the list above
5. Click "Deploy"

### 5. Configure Build & Deploy Settings

```bash
# Build Command
pnpm install && pnpm build

# Start Command
pnpm start

# Node Version
18.16.0 or higher
```

### 6. Set Up Custom Domain

1. In Railway dashboard, go to "Settings"
2. Click "Domains"
3. Add your custom domain
4. Configure DNS records as shown

## Database Migrations

### Initial Setup

```bash
# Generate migrations
pnpm drizzle-kit generate

# Apply migrations
pnpm db:push
```

### Seed Initial Data

```bash
# Create seed script
cat > server/seed.ts << 'EOF'
import { getDb } from "./db";

async function seed() {
  const db = await getDb();
  if (!db) {
    console.error("Database connection failed");
    process.exit(1);
  }

  // Add initial tournaments, markets, etc.
  console.log("Database seeded successfully");
}

seed().catch(console.error);
EOF

# Run seed
pnpm tsx server/seed.ts
```

## Monitoring & Logging

### Railway Logs

```bash
# View logs in Railway dashboard
# 1. Select your service
# 2. Click "Logs" tab
# 3. Filter by date/severity
```

### Application Metrics

- CPU Usage
- Memory Usage
- Request Count
- Error Rate
- Response Time

### Health Checks

```bash
# Configure health check endpoint
GET /api/health

# Response:
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-05-16T10:00:00Z"
}
```

## Performance Optimization

### Caching Strategy

```typescript
// Redis caching for leaderboard
const leaderboardKey = "leaderboard:global";
const cachedLeaderboard = await redis.get(leaderboardKey);

if (cachedLeaderboard) {
  return JSON.parse(cachedLeaderboard);
}

const leaderboard = await db.select().from(leaderboardSnapshots);
await redis.setex(leaderboardKey, 3600, JSON.stringify(leaderboard));

return leaderboard;
```

### Database Optimization

```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_users_openid ON users(openId);
CREATE INDEX idx_pvp_matches_user ON pvpMatches(player1Id, player2Id);
CREATE INDEX idx_leaderboard_rank ON leaderboardSnapshots(rank);
CREATE INDEX idx_notifications_user ON notifications(userId, read);
```

### CDN Configuration

- Use Cloudflare or Railway's built-in CDN
- Cache static assets (CSS, JS, images) for 30 days
- Cache HTML for 5 minutes
- Use cache busting for versioned assets

## Security Best Practices

### Secrets Management

- Never commit `.env` files
- Use Railway's secrets vault
- Rotate API keys regularly
- Use separate keys for dev/staging/production

### Database Security

```sql
-- Create read-only user for analytics
CREATE USER readonly_user WITH PASSWORD 'strong_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- Enable SSL connections
-- Configure in DATABASE_URL: ?sslmode=require
```

### API Security

```typescript
// Rate limiting
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

### CORS Configuration

```typescript
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
```

## Disaster Recovery

### Backup Strategy

```bash
# Automated daily backups
# Configure in Railway dashboard:
# 1. Database service
# 2. Settings
# 3. Backups: Enable automatic backups
# 4. Retention: 30 days
```

### Restore from Backup

```bash
# In Railway dashboard:
# 1. Select PostgreSQL service
# 2. Click "Backups"
# 3. Choose backup date
# 4. Click "Restore"
```

## Scaling

### Vertical Scaling

```bash
# Increase RAM/CPU in Railway dashboard
# 1. Select web service
# 2. Click "Settings"
# 3. Adjust "Memory" and "CPU"
# 4. Deploy
```

### Horizontal Scaling

```bash
# Deploy multiple instances
# In Railway dashboard:
# 1. Select web service
# 2. Click "Settings"
# 3. Set "Replicas" to 2+
# 4. Deploy
```

## Troubleshooting

### Database Connection Issues

```bash
# Check DATABASE_URL format
mysql://user:password@host:port/database

# Test connection
pnpm tsx -e "import { getDb } from './server/db'; getDb().then(() => console.log('Connected'))"
```

### Build Failures

```bash
# Check build logs
# 1. Railway dashboard
# 2. Deployments tab
# 3. View build logs

# Common issues:
# - Missing dependencies: pnpm install
# - TypeScript errors: pnpm check
# - Missing env vars: check Variables tab
```

### Performance Issues

```bash
# Monitor database queries
# Enable query logging in PostgreSQL
# Check slow query logs

# Optimize N+1 queries
# Use database joins instead of multiple queries
# Implement caching for frequently accessed data
```

## Rollback Procedure

```bash
# In Railway dashboard:
# 1. Select your service
# 2. Click "Deployments"
# 3. Find previous deployment
# 4. Click "Rollback"
# 5. Confirm rollback
```

## Support & Resources

- Railway Docs: https://docs.railway.app
- Solana Docs: https://docs.solana.com
- tRPC Docs: https://trpc.io
- PostgreSQL Docs: https://www.postgresql.org/docs

## Maintenance Schedule

- **Daily**: Monitor logs and error rates
- **Weekly**: Review performance metrics
- **Monthly**: Backup verification and security audit
- **Quarterly**: Dependency updates and security patches

## Production Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] SSL/TLS certificates installed
- [ ] Backups enabled and tested
- [ ] Monitoring and alerting configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] API keys rotated
- [ ] Security headers configured
- [ ] Load balancing configured (if needed)
- [ ] CDN configured
- [ ] Error tracking enabled
- [ ] Performance monitoring enabled
- [ ] Documentation updated
- [ ] Team trained on deployment process

## Next Steps

1. Deploy to Railway
2. Configure custom domain
3. Set up monitoring and alerting
4. Run load tests
5. Monitor for 24 hours
6. Enable auto-scaling if needed
7. Document any issues and resolutions
