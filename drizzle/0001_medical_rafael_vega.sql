CREATE TABLE `aiRecommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`recommendationType` enum('game_suggestion','difficulty_adjustment','market_opportunity') NOT NULL,
	`recommendation` text NOT NULL,
	`confidence` decimal(3,2),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `aiRecommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboardSnapshots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`rank` int NOT NULL,
	`wins` int NOT NULL,
	`losses` int NOT NULL,
	`usd1Earned` decimal(20,2) NOT NULL,
	`snapshotAt` timestamp DEFAULT (now()),
	CONSTRAINT `leaderboardSnapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `marketPositions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`marketId` int NOT NULL,
	`userId` int NOT NULL,
	`outcome` varchar(256) NOT NULL,
	`amountUSD1` decimal(20,2) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `marketPositions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('match_result','reward_payout','tournament_update','staking_milestone','rank_up','referral_bonus') NOT NULL,
	`title` varchar(256) NOT NULL,
	`content` text,
	`read` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `predictionMarkets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`marketId` varchar(64) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`outcomes` json NOT NULL,
	`totalVolumeUSD1` decimal(20,2) DEFAULT '0',
	`status` enum('open','locked','settled') DEFAULT 'open',
	`settlementOutcome` varchar(256),
	`onChainTxHash` varchar(256),
	`createdAt` timestamp DEFAULT (now()),
	`settledAt` timestamp,
	CONSTRAINT `predictionMarkets_id` PRIMARY KEY(`id`),
	CONSTRAINT `predictionMarkets_marketId_unique` UNIQUE(`marketId`)
);
--> statement-breakpoint
CREATE TABLE `pvpMatches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(64) NOT NULL,
	`wagerAmountUSD1` decimal(20,2) NOT NULL,
	`winnerId` int,
	`loserId` int,
	`status` enum('pending','active','completed','cancelled') DEFAULT 'pending',
	`transactionHash` varchar(256),
	`createdAt` timestamp DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `pvpMatches_id` PRIMARY KEY(`id`),
	CONSTRAINT `pvpMatches_matchId_unique` UNIQUE(`matchId`)
);
--> statement-breakpoint
CREATE TABLE `referralConversions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`referredUserId` int NOT NULL,
	`bonusUSD1` decimal(20,2) NOT NULL,
	`status` enum('pending','completed') DEFAULT 'pending',
	`distributedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `referralConversions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referralLinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`referralCode` varchar(64) NOT NULL,
	`referralUrl` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `referralLinks_id` PRIMARY KEY(`id`),
	CONSTRAINT `referralLinks_referralCode_unique` UNIQUE(`referralCode`)
);
--> statement-breakpoint
CREATE TABLE `stakingPositions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amountUSD1` decimal(20,2) NOT NULL,
	`apyPercentage` decimal(5,2) DEFAULT '12.5',
	`lockedUntil` timestamp,
	`status` enum('active','unstaking','completed') DEFAULT 'active',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stakingPositions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stakingRewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stakingPositionId` int NOT NULL,
	`accruedUSD1` decimal(20,2) DEFAULT '0',
	`claimedUSD1` decimal(20,2) DEFAULT '0',
	`lastClaimedAt` timestamp,
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stakingRewards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tournamentParticipants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tournamentId` int NOT NULL,
	`userId` int NOT NULL,
	`bracketPosition` int,
	`status` enum('enrolled','active','eliminated','winner') DEFAULT 'enrolled',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `tournamentParticipants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tournaments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tournamentId` varchar(64) NOT NULL,
	`name` varchar(256) NOT NULL,
	`prizePoolUSD1` decimal(20,2) NOT NULL,
	`status` enum('draft','active','completed') DEFAULT 'draft',
	`bracketData` json,
	`createdAt` timestamp DEFAULT (now()),
	`startedAt` timestamp,
	`completedAt` timestamp,
	CONSTRAINT `tournaments_id` PRIMARY KEY(`id`),
	CONSTRAINT `tournaments_tournamentId_unique` UNIQUE(`tournamentId`)
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(128),
	`avatar` text,
	`tier` enum('bronze','silver','gold','platinum') DEFAULT 'bronze',
	`totalWins` int DEFAULT 0,
	`totalLosses` int DEFAULT 0,
	`totalUSD1Earned` decimal(20,2) DEFAULT '0',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProfiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`publicKey` varchar(88) NOT NULL,
	`walletType` enum('phantom','backpack') NOT NULL,
	`usd1Balance` decimal(20,2) DEFAULT '0',
	`lastSyncedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `wallets_id` PRIMARY KEY(`id`),
	CONSTRAINT `wallets_publicKey_unique` UNIQUE(`publicKey`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','moderator') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `aiRecommendations` ADD CONSTRAINT `aiRecommendations_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaderboardSnapshots` ADD CONSTRAINT `leaderboardSnapshots_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `marketPositions` ADD CONSTRAINT `marketPositions_marketId_predictionMarkets_id_fk` FOREIGN KEY (`marketId`) REFERENCES `predictionMarkets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `marketPositions` ADD CONSTRAINT `marketPositions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pvpMatches` ADD CONSTRAINT `pvpMatches_winnerId_users_id_fk` FOREIGN KEY (`winnerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pvpMatches` ADD CONSTRAINT `pvpMatches_loserId_users_id_fk` FOREIGN KEY (`loserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referralConversions` ADD CONSTRAINT `referralConversions_referrerId_users_id_fk` FOREIGN KEY (`referrerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referralConversions` ADD CONSTRAINT `referralConversions_referredUserId_users_id_fk` FOREIGN KEY (`referredUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referralLinks` ADD CONSTRAINT `referralLinks_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stakingPositions` ADD CONSTRAINT `stakingPositions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stakingRewards` ADD CONSTRAINT `stakingRewards_stakingPositionId_stakingPositions_id_fk` FOREIGN KEY (`stakingPositionId`) REFERENCES `stakingPositions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tournamentParticipants` ADD CONSTRAINT `tournamentParticipants_tournamentId_tournaments_id_fk` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tournamentParticipants` ADD CONSTRAINT `tournamentParticipants_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userProfiles` ADD CONSTRAINT `userProfiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallets` ADD CONSTRAINT `wallets_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;