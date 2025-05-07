-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` CHAR(36) NOT NULL,
    `fullName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` TEXT NULL,
    `role` ENUM('ADMIN') NOT NULL DEFAULT 'ADMIN',
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_fullName_email_idx`(`fullName`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Applicant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicantId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `yearsOfExperience` INTEGER NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `Applicant_applicantId_key`(`applicantId`),
    UNIQUE INDEX `Applicant_userId_key`(`userId`),
    INDEX `Applicant_applicantId_createdAt_idx`(`applicantId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicantId` CHAR(36) NOT NULL,
    `resumeUrl` TEXT NOT NULL,
    `jobRole` VARCHAR(191) NOT NULL,
    `status` ENUM('CANDIDATE_REJECTED', 'OFFER_ACCEPTED', 'INTERVIEW_DONE', 'APPLIED', 'CONTACTED', 'HIRED', 'OFFER_MADE', 'INTERVIEW_SCHEDULED') NOT NULL DEFAULT 'APPLIED',
    `appliedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Application_applicantId_idx`(`applicantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant`(`applicantId`) ON DELETE RESTRICT ON UPDATE CASCADE;
