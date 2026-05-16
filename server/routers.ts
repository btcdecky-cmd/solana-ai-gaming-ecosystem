import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";

/**
 * Main tRPC router with all GameFi procedures
 * Includes wallet management, PvP arena, tournaments, prediction markets, staking, and more
 */
export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============================================================================
  // Wallet Management
  // ============================================================================

  wallet: router({
    connect: protectedProcedure
      .input(
        z.object({
          publicKey: z.string().min(32),
          walletType: z.enum(["phantom", "backpack"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Validate wallet connection
        if (!input.publicKey || input.publicKey.length < 32) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid public key format",
          });
        }

        return {
          success: true,
          publicKey: input.publicKey,
          walletType: input.walletType,
          message: `${input.walletType} wallet connected successfully`,
        };
      }),

    getBalance: protectedProcedure
      .input(z.object({ publicKey: z.string() }))
      .query(async ({ input }) => {
        // In production, this would fetch from Solana RPC
        return {
          publicKey: input.publicKey,
          usd1Balance: "1000.50",
          solBalance: "5.25",
          lastUpdated: new Date(),
        };
      }),

    swap: protectedProcedure
      .input(
        z.object({
          fromToken: z.string(),
          toToken: z.string(),
          amount: z.string(),
          slippage: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Jupiter API integration would go here
        return {
          success: true,
          transactionSignature: `sig_${Date.now()}`,
          fromAmount: input.amount,
          toAmount: (parseFloat(input.amount) * 0.98).toString(),
          message: "Swap executed successfully",
        };
      }),
  }),

  // ============================================================================
  // PvP Arena
  // ============================================================================

  pvp: router({
    createMatch: protectedProcedure
      .input(
        z.object({
          opponentId: z.number().optional(),
          wagerUSD1: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const matchId = `match_${Date.now()}`;

        return {
          success: true,
          matchId,
          status: "waiting_for_opponent",
          wagerUSD1: input.wagerUSD1,
          createdAt: new Date(),
        };
      }),

    getMatches: protectedProcedure.query(async ({ ctx }) => {
      // Return mock match history
      return [
        {
          id: 1,
          matchId: "match_1234567890",
          opponent: "Player_123",
          wagerUSD1: "50",
          result: "won",
          earnedUSD1: "50",
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: 2,
          matchId: "match_1234567891",
          opponent: "Player_456",
          wagerUSD1: "25",
          result: "lost",
          earnedUSD1: "-25",
          createdAt: new Date(Date.now() - 172800000),
        },
      ];
    }),
  }),

  // ============================================================================
  // Tournaments
  // ============================================================================

  tournament: router({
    list: publicProcedure.query(async () => {
      return [
        {
          id: 1,
          name: "Weekly Championship",
          prizePoolUSD1: "10000",
          participants: 256,
          status: "active",
          startDate: new Date(),
          endDate: new Date(Date.now() + 604800000),
        },
        {
          id: 2,
          name: "Monthly Grand Prix",
          prizePoolUSD1: "50000",
          participants: 512,
          status: "upcoming",
          startDate: new Date(Date.now() + 604800000),
          endDate: new Date(Date.now() + 2592000000),
        },
      ];
    }),

    join: protectedProcedure
      .input(z.object({ tournamentId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return {
          success: true,
          tournamentId: input.tournamentId,
          message: "Successfully joined tournament",
        };
      }),

    getMyTournaments: protectedProcedure.query(async ({ ctx }) => {
      return [
        {
          id: 1,
          name: "Weekly Championship",
          status: "active",
          rank: 12,
          wins: 3,
          losses: 1,
        },
      ];
    }),
  }),

  // ============================================================================
  // Prediction Markets
  // ============================================================================

  market: router({
    list: publicProcedure.query(async () => {
      return [
        {
          id: 1,
          title: "Bitcoin Price > $50k by EOY",
          description: "Will BTC reach $50k?",
          outcomes: ["Yes", "No"],
          odds: { Yes: "1.8", No: "2.1" },
          totalVolume: "250000",
          status: "open",
          expiresAt: new Date(Date.now() + 2592000000),
        },
        {
          id: 2,
          title: "Solana Network TPS > 10k",
          description: "Will Solana reach 10k TPS?",
          outcomes: ["Yes", "No"],
          odds: { Yes: "1.5", No: "2.5" },
          totalVolume: "150000",
          status: "open",
          expiresAt: new Date(Date.now() + 1296000000),
        },
      ];
    }),

    placeBet: protectedProcedure
      .input(
        z.object({
          marketId: z.number(),
          outcome: z.string(),
          amountUSD1: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return {
          success: true,
          betId: `bet_${Date.now()}`,
          marketId: input.marketId,
          outcome: input.outcome,
          amountUSD1: input.amountUSD1,
          potentialPayout: (parseFloat(input.amountUSD1) * 1.8).toString(),
        };
      }),

    getMyBets: protectedProcedure.query(async ({ ctx }) => {
      return [
        {
          id: 1,
          marketId: 1,
          outcome: "Yes",
          amountUSD1: "100",
          potentialPayout: "180",
          status: "pending",
        },
      ];
    }),
  }),

  // ============================================================================
  // Staking
  // ============================================================================

  staking: router({
    stake: protectedProcedure
      .input(
        z.object({
          amountUSD1: z.string(),
          lockupDays: z.number().default(30),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const stakingId = `stake_${Date.now()}`;
        const apy = "12.5";
        const dailyReward = (
          (parseFloat(input.amountUSD1) * parseFloat(apy)) /
          365
        ).toFixed(2);

        return {
          success: true,
          stakingId,
          amountUSD1: input.amountUSD1,
          apy,
          dailyReward,
          lockupDays: input.lockupDays,
          unlocksAt: new Date(Date.now() + input.lockupDays * 86400000),
        };
      }),

    getPositions: protectedProcedure.query(async ({ ctx }) => {
      return [
        {
          id: 1,
          amountUSD1: "1000",
          apy: "12.5",
          accruedRewards: "45.50",
          lockupDays: 30,
          createdAt: new Date(Date.now() - 864000000),
          unlocksAt: new Date(Date.now() + 432000000),
        },
      ];
    }),

    claimRewards: protectedProcedure
      .input(z.object({ stakingId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return {
          success: true,
          stakingId: input.stakingId,
          claimedUSD1: "45.50",
          transactionSignature: `sig_${Date.now()}`,
        };
      }),

    unstake: protectedProcedure
      .input(z.object({ stakingId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return {
          success: true,
          stakingId: input.stakingId,
          withdrawnUSD1: "1045.50",
          transactionSignature: `sig_${Date.now()}`,
        };
      }),
  }),

  // ============================================================================
  // Leaderboard
  // ============================================================================

  leaderboard: router({
    getGlobal: publicProcedure
      .input(z.object({ limit: z.number().default(100) }))
      .query(async ({ input }) => {
        return [
          {
            rank: 1,
            playerId: 1,
            playerName: "ShadowNinja",
            wins: 145,
            losses: 12,
            usd1Earned: "45000",
            tier: "Platinum",
          },
          {
            rank: 2,
            playerId: 2,
            playerName: "GoldenEagle",
            wins: 98,
            losses: 25,
            usd1Earned: "28500",
            tier: "Gold",
          },
          {
            rank: 3,
            playerId: 3,
            playerName: "CryptoKing",
            wins: 87,
            losses: 30,
            usd1Earned: "24200",
            tier: "Gold",
          },
        ];
      }),

    getPlayerRank: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return {
          rank: 42,
          userId: input.userId,
          playerName: "You",
          wins: 45,
          losses: 18,
          usd1Earned: "8500",
          tier: "Silver",
        };
      }),

    updateRank: protectedProcedure
      .input(
        z.object({
          wins: z.number(),
          losses: z.number(),
          usd1Earned: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return {
          success: true,
          newRank: 41,
          message: "Rank updated successfully",
        };
      }),
  }),

  // ============================================================================
  // Referral System
  // ============================================================================

  referral: router({
    generateLink: protectedProcedure.mutation(async ({ ctx }) => {
      const referralCode = `ref_${ctx.user.id}_${Date.now()}`;

      return {
        success: true,
        referralCode,
        referralUrl: `https://solana-arena.com?ref=${referralCode}`,
      };
    }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      return {
        referralCode: `ref_${ctx.user.id}_123456`,
        totalReferrals: 5,
        activeReferrals: 3,
        totalBonusEarned: "50",
        pendingBonus: "10",
      };
    }),

    trackReferral: publicProcedure
      .input(
        z.object({
          referralCode: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return {
          success: true,
          bonusUSD1: "10",
          message: "Referral tracked successfully",
        };
      }),
  }),

  // ============================================================================
  // Notifications
  // ============================================================================

  notification: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ ctx, input }) => {
        return [
          {
            id: 1,
            type: "match_result",
            title: "Match Won!",
            message: "You won 50 USD1 against Player_123",
            read: false,
            createdAt: new Date(Date.now() - 3600000),
          },
          {
            id: 2,
            type: "reward_payout",
            title: "Staking Reward",
            message: "You earned 5.25 USD1 in staking rewards",
            read: false,
            createdAt: new Date(Date.now() - 7200000),
          },
          {
            id: 3,
            type: "tournament_update",
            title: "Tournament Started",
            message: "Weekly Championship has started",
            read: true,
            createdAt: new Date(Date.now() - 86400000),
          },
        ];
      }),

    markAsRead: protectedProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(async ({ input }) => {
        return {
          success: true,
          notificationId: input.notificationId,
        };
      }),
  }),

  // ============================================================================
  // AI Personalization
  // ============================================================================

  ai: router({
    getRecommendations: protectedProcedure
      .input(z.object({ type: z.string().optional() }))
      .query(async ({ ctx, input }) => {
        return [
          {
            id: 1,
            type: "game_suggestion",
            title: "Try PvP Arena",
            description:
              "Based on your win rate, you might enjoy high-stakes PvP matches",
            confidence: "0.92",
          },
          {
            id: 2,
            type: "difficulty_adjustment",
            title: "Challenge Increased",
            description:
              "You've won 5 consecutive matches. Try higher wager amounts",
            confidence: "0.85",
          },
          {
            id: 3,
            type: "market_opportunity",
            title: "Bitcoin Market",
            description:
              "New prediction market on Bitcoin price with 1.8x odds",
            confidence: "0.78",
          },
        ];
      }),
  }),

  // ============================================================================
  // User Profile
  // ============================================================================

  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return {
        id: ctx.user.id,
        name: ctx.user.name,
        email: ctx.user.email,
        tier: "Silver",
        totalWins: 45,
        totalLosses: 18,
        totalUSD1Earned: "8500",
        joinedAt: new Date(Date.now() - 2592000000),
      };
    }),

    update: protectedProcedure
      .input(
        z.object({
          displayName: z.string().optional(),
          avatar: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return {
          success: true,
          message: "Profile updated successfully",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
