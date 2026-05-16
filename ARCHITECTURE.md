# Solana AI Gaming Ecosystem - System Architecture

## Executive Overview

The Solana AI Gaming Ecosystem is a production-grade, full-stack platform that seamlessly integrates WLFI's USD1 stablecoin as the core reward and transaction layer. The platform leverages the WLFI AgentPay SDK for autonomous AI-driven gameplay, moderation, and reward distribution. The architecture combines a luxury black-and-gold glassmorphism UI with institutional-grade backend infrastructure, delivering a premium trading terminal fused with a futuristic gaming hub.

---

## Technology Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with custom glassmorphism components
- **UI Components**: Shadcn/ui with custom dark-themed variants
- **Animation**: Framer Motion 12 for smooth, interactive dashboards
- **State Management**: TanStack React Query 5 with tRPC
- **Wallet Integration**: Solana Web3.js with Phantom and Backpack support
- **Charts & Analytics**: Recharts for real-time data visualization

### Backend
- **Runtime**: Node.js with Express 4 and TypeScript
- **API Layer**: tRPC 11 for end-to-end type safety
- **Database**: MySQL/TiDB with Drizzle ORM
- **Vector Database**: PostgreSQL with pgvector extension for AI embeddings
- **Caching**: Redis for real-time state and rate limiting
- **Authentication**: Manus OAuth with JWT session management

### Blockchain & Payment
- **Blockchain**: Solana mainnet/devnet
- **Smart Contracts**: Anchor framework for Solana programs
- **Token Swaps**: Jupiter API for DEX aggregation
- **Stablecoin**: WLFI USD1 (1:1 USD-backed)
- **Reward Distribution**: WLFI AgentPay SDK with policy enforcement
- **Wallet Support**: Phantom and Backpack

### AI & LLM
- **LLM Provider**: OpenAI GPT-4 for AI opponent matching and personalization
- **Embeddings**: OpenAI embeddings for player behavior analysis
- **Voice**: Deepgram for voice-to-text in social features
- **Real-time Communication**: LiveKit for voice/video in tournaments

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (React 19)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Luxury Black-and-Gold Glassmorphism UI                   │   │
│  │ • Dashboard with Framer Motion animations                │   │
│  │ • Wallet connection (Phantom + Backpack)                 │   │
│  │ • Real-time leaderboards and notifications               │   │
│  │ • PvP arena, tournaments, prediction markets, staking    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (tRPC)                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Type-safe RPC procedures with automatic validation       │   │
│  │ • Public procedures (wallet connection, market viewing)  │   │
│  │ • Protected procedures (wagers, staking, referrals)      │   │
│  │ • Admin procedures (tournament management, moderation)   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND SERVICES LAYER                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Core Business Logic                                      │   │
│  │ • Wallet & USD1 management                               │   │
│  │ • PvP matchmaking and battle orchestration               │   │
│  │ • AI tournament bracket generation                       │   │
│  │ • Prediction market settlement                           │   │
│  │ • Staking and reward accrual                             │   │
│  │ • Leaderboard ranking calculations                       │   │
│  │ • Referral tracking and bonus distribution               │   │
│  │ • Real-time notification delivery                        │   │
│  │ • AI personalization and recommendations                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA & CACHE LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ MySQL/TiDB: Persistent game state, user data, history    │   │
│  │ PostgreSQL + pgvector: AI embeddings for personalization │   │
│  │ Redis: Real-time leaderboards, session cache, rate limit │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  BLOCKCHAIN & EXTERNAL SERVICES                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Solana RPC: Transaction submission and state queries     │   │
│  │ Jupiter API: Token swap routing and pricing              │   │
│  │ AgentPay SDK: Policy-enforced USD1 reward distribution   │   │
│  │ OpenAI: LLM for AI opponent matching and personalization │   │
│  │ Deepgram: Voice transcription for social features        │   │
│  │ LiveKit: Real-time voice/video for tournaments           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Data Model

### User & Authentication
- **users**: Core user identity with Manus OAuth integration
- **wallets**: Linked Solana wallets (Phantom, Backpack) with USD1 balances
- **user_profiles**: Gaming profile with stats, preferences, and tier information
- **sessions**: JWT-based session management

### Gaming Features
- **pvp_matches**: PvP arena match records with wager amounts and outcomes
- **pvp_participants**: Match participants with battle history
- **tournaments**: Tournament metadata, brackets, and prize pools
- **tournament_participants**: Player enrollment and bracket positions
- **tournament_matches**: Individual tournament match records
- **prediction_markets**: Market metadata, outcomes, and settlement status
- **market_positions**: User positions in prediction markets with USD1 amounts
- **market_settlements**: Settlement records with on-chain transaction hashes

### Staking & Rewards
- **staking_positions**: User staking records with lock-up periods
- **staking_rewards**: Accrued and claimed reward history
- **reward_distributions**: Automated USD1 payouts from AgentPay SDK
- **leaderboard_snapshots**: Historical leaderboard rankings

### Social & Engagement
- **referral_links**: Unique referral codes per user
- **referral_conversions**: Tracked referral signups and bonuses
- **notifications**: In-app notification queue and delivery status
- **player_achievements**: Badges, milestones, and rank-up events

### AI & Personalization
- **player_embeddings**: pgvector embeddings of player behavior and preferences
- **ai_recommendations**: LLM-generated game recommendations per player
- **player_analytics**: Aggregated stats for personalization engine

---

## Database Schema (Drizzle ORM)

```typescript
// Core User Tables
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  role: mysqlEnum("role", ["user", "admin", "moderator"]).default("user"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export const userProfiles = mysqlTable("userProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  displayName: varchar("displayName", { length: 128 }),
  avatar: text("avatar"),
  tier: mysqlEnum("tier", ["bronze", "silver", "gold", "platinum"]).default("bronze"),
  totalWins: int("totalWins").default(0),
  totalLosses: int("totalLosses").default(0),
  totalUSD1Earned: decimal("totalUSD1Earned", { precision: 20, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const wallets = mysqlTable("wallets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  publicKey: varchar("publicKey", { length: 88 }).notNull().unique(),
  walletType: mysqlEnum("walletType", ["phantom", "backpack"]).notNull(),
  usd1Balance: decimal("usd1Balance", { precision: 20, scale: 2 }).default("0"),
  lastSyncedAt: timestamp("lastSyncedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// PvP Arena Tables
export const pvpMatches = mysqlTable("pvpMatches", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 64 }).notNull().unique(),
  wagerAmountUSD1: decimal("wagerAmountUSD1", { precision: 20, scale: 2 }).notNull(),
  winnerId: int("winnerId").references(() => users.id),
  loserId: int("loserId").references(() => users.id),
  status: mysqlEnum("status", ["pending", "active", "completed", "cancelled"]).default("pending"),
  transactionHash: varchar("transactionHash", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow(),
  completedAt: timestamp("completedAt"),
});

// Tournament Tables
export const tournaments = mysqlTable("tournaments", {
  id: int("id").autoincrement().primaryKey(),
  tournamentId: varchar("tournamentId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  prizePoolUSD1: decimal("prizePoolUSD1", { precision: 20, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["draft", "active", "completed"]).default("draft"),
  bracketData: json("bracketData"),
  createdAt: timestamp("createdAt").defaultNow(),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
});

// Prediction Market Tables
export const predictionMarkets = mysqlTable("predictionMarkets", {
  id: int("id").autoincrement().primaryKey(),
  marketId: varchar("marketId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  outcomes: json("outcomes").notNull(),
  totalVolumeUSD1: decimal("totalVolumeUSD1", { precision: 20, scale: 2 }).default("0"),
  status: mysqlEnum("status", ["open", "locked", "settled"]).default("open"),
  settlementOutcome: varchar("settlementOutcome", { length: 256 }),
  onChainTxHash: varchar("onChainTxHash", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow(),
  settledAt: timestamp("settledAt"),
});

export const marketPositions = mysqlTable("marketPositions", {
  id: int("id").autoincrement().primaryKey(),
  marketId: int("marketId").notNull().references(() => predictionMarkets.id),
  userId: int("userId").notNull().references(() => users.id),
  outcome: varchar("outcome", { length: 256 }).notNull(),
  amountUSD1: decimal("amountUSD1", { precision: 20, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Staking Tables
export const stakingPositions = mysqlTable("stakingPositions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  amountUSD1: decimal("amountUSD1", { precision: 20, scale: 2 }).notNull(),
  apyPercentage: decimal("apyPercentage", { precision: 5, scale: 2 }).default("12.5"),
  lockedUntil: timestamp("lockedUntil"),
  status: mysqlEnum("status", ["active", "unstaking", "completed"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const stakingRewards = mysqlTable("stakingRewards", {
  id: int("id").autoincrement().primaryKey(),
  stakingPositionId: int("stakingPositionId").notNull().references(() => stakingPositions.id),
  accruedUSD1: decimal("accruedUSD1", { precision: 20, scale: 2 }).default("0"),
  claimedUSD1: decimal("claimedUSD1", { precision: 20, scale: 2 }).default("0"),
  lastClaimedAt: timestamp("lastClaimedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

// Leaderboard Tables
export const leaderboardSnapshots = mysqlTable("leaderboardSnapshots", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  rank: int("rank").notNull(),
  wins: int("wins").notNull(),
  losses: int("losses").notNull(),
  usd1Earned: decimal("usd1Earned", { precision: 20, scale: 2 }).notNull(),
  snapshotAt: timestamp("snapshotAt").defaultNow(),
});

// Referral Tables
export const referralLinks = mysqlTable("referralLinks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  referralCode: varchar("referralCode", { length: 64 }).notNull().unique(),
  referralUrl: text("referralUrl").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const referralConversions = mysqlTable("referralConversions", {
  id: int("id").autoincrement().primaryKey(),
  referrerId: int("referrerId").notNull().references(() => users.id),
  referredUserId: int("referredUserId").notNull().references(() => users.id),
  bonusUSD1: decimal("bonusUSD1", { precision: 20, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "completed"]).default("pending"),
  distributedAt: timestamp("distributedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Notification Tables
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  type: mysqlEnum("type", [
    "match_result",
    "reward_payout",
    "tournament_update",
    "staking_milestone",
    "rank_up",
    "referral_bonus",
  ]).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content"),
  read: boolean("read").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

// AI Personalization Tables
export const playerEmbeddings = pgvectorTable("playerEmbeddings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  embedding: vector("embedding", { dimensions: 1536 }),
  behaviorMetrics: json("behaviorMetrics"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export const aiRecommendations = mysqlTable("aiRecommendations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  recommendationType: mysqlEnum("recommendationType", [
    "game_suggestion",
    "difficulty_adjustment",
    "market_opportunity",
  ]).notNull(),
  recommendation: text("recommendation").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow(),
});
```

---

## API Procedures (tRPC Router)

### Wallet Management
- `wallet.connect`: Connect Phantom or Backpack wallet
- `wallet.getBalance`: Fetch USD1 balance from on-chain
- `wallet.deposit`: Initiate USD1 deposit flow
- `wallet.withdraw`: Initiate USD1 withdrawal with AgentPay policy
- `wallet.swap`: Execute Jupiter API token swap

### PvP Arena
- `pvp.getLobbies`: Fetch active matchmaking lobbies
- `pvp.createMatch`: Initiate PvP match with USD1 wager
- `pvp.submitBattle`: Submit battle results
- `pvp.claimRewards`: Claim USD1 rewards via AgentPay SDK

### Tournaments
- `tournament.list`: Fetch active and upcoming tournaments
- `tournament.join`: Enroll in tournament with entry fee
- `tournament.getBracket`: Fetch tournament bracket
- `tournament.submitResult`: Submit match result
- `tournament.claimPrize`: Claim USD1 prize pool rewards

### Prediction Markets
- `market.list`: Fetch all prediction markets
- `market.create`: Create new prediction market (admin)
- `market.placeBet`: Place USD1 bet on market outcome
- `market.settle`: Settle market and distribute winnings (admin)
- `market.getOdds`: Get real-time odds for market outcomes

### Staking
- `staking.stake`: Lock USD1 for staking rewards
- `staking.unstake`: Initiate unstaking period
- `staking.claimRewards`: Claim accrued staking rewards
- `staking.getStats`: Fetch staking position and APY

### Leaderboard
- `leaderboard.getGlobal`: Fetch global leaderboard with rankings
- `leaderboard.getPlayerStats`: Fetch individual player stats
- `leaderboard.getRankUpNotification`: Get animated rank-up event data

### Referral
- `referral.generateLink`: Generate unique referral link
- `referral.getStats`: Fetch referral tracking dashboard
- `referral.claimBonus`: Claim USD1 referral bonuses

### Notifications
- `notification.list`: Fetch user notifications
- `notification.markAsRead`: Mark notification as read
- `notification.subscribe`: Subscribe to real-time updates via WebSocket

### AI Personalization
- `ai.getRecommendations`: Fetch personalized game recommendations
- `ai.getDifficultyAdjustment`: Get adaptive difficulty suggestion
- `ai.getPerformanceInsights`: Fetch player performance analysis

---

## Integration Points

### Solana Blockchain
- **RPC Endpoint**: Configured via environment variable
- **Program IDs**: USD1 token contract, custom gaming program
- **Transaction Submission**: Via web3.js with wallet signing

### WLFI AgentPay SDK
- **Policy Engine**: Enforces spending limits on reward distributions
- **Wallet Integration**: Non-custodial local signing on backend
- **Automated Payouts**: Batch USD1 distributions to winners

### Jupiter API
- **Swap Routing**: Query best swap routes for token exchanges
- **Price Feeds**: Real-time token pricing for market odds
- **Slippage Protection**: Configurable slippage tolerance

### OpenAI LLM
- **AI Opponent Matching**: Generate balanced tournament opponents
- **Personalization**: Analyze player behavior for recommendations
- **Embeddings**: Create player behavior vectors for similarity search

### Redis
- **Real-time Leaderboards**: Sorted sets for instant ranking updates
- **Session Cache**: Store active user sessions and wallet state
- **Rate Limiting**: Prevent abuse on sensitive endpoints
- **Pub/Sub**: Broadcast real-time notifications to connected clients

---

## Security Considerations

### Wallet Security
- Private keys never transmitted to backend
- All signing occurs client-side with Phantom/Backpack
- Wallet connections verified via signature verification

### USD1 Transaction Security
- AgentPay SDK policy engine enforces all spending rules
- No code path bypasses policy validation
- All payouts require policy approval before signing

### Data Protection
- All sensitive data encrypted at rest
- TLS 1.3 for all network communication
- JWT tokens with short expiration and refresh rotation

### Access Control
- Role-based access control (user, admin, moderator)
- Protected procedures require authentication
- Admin procedures require elevated permissions

---

## Performance Optimization

### Caching Strategy
- Redis caching for leaderboards (updated every 5 minutes)
- User session caching with 24-hour TTL
- Market odds cached with 30-second TTL

### Database Optimization
- Indexed queries on frequently accessed fields
- Denormalized leaderboard snapshots for fast retrieval
- Batch processing for reward distributions

### Frontend Optimization
- Code splitting with Vite dynamic imports
- Image optimization and lazy loading
- Framer Motion GPU-accelerated animations

---

## Deployment Architecture

### Frontend
- Deployed to Vercel or Netlify with automatic deployments
- CDN for static assets and images
- Environment-specific configuration

### Backend
- Node.js application on Cloud Run or similar serverless platform
- Auto-scaling based on request volume
- Database connection pooling

### Databases
- MySQL/TiDB: Managed database service with automated backups
- PostgreSQL + pgvector: Managed service for AI embeddings
- Redis: Managed cache service with persistence

---

## Monitoring & Observability

- Structured logging with timestamps and request IDs
- Error tracking via Sentry or similar
- Performance monitoring with custom metrics
- Real-time dashboard for system health
- Alerts for critical failures and anomalies

---

## Future Enhancements

- Multi-chain support (Ethereum, Polygon, Arbitrum)
- Mobile app with native wallet integration
- Advanced analytics and player insights dashboard
- Community governance via DAO
- Cross-game tournament federation
- Streaming integration for esports tournaments
