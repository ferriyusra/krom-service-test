-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` TEXT NULL,
    `role` ENUM('ADMIN') NOT NULL DEFAULT 'ADMIN',
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `User_user_id_key`(`user_id`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_full_name_email_idx`(`full_name`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Applicant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicant_id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `years_of_experience` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `Applicant_applicant_id_key`(`applicant_id`),
    INDEX `Applicant_applicant_id_created_at_idx`(`applicant_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicant_id` CHAR(36) NOT NULL,
    `resume_url` TEXT NOT NULL,
    `job_role` VARCHAR(191) NOT NULL,
    `status` ENUM('CANDIDATE_REJECTED', 'OFFER_ACCEPTED', 'INTERVIEW_DONE', 'APPLIED', 'CONTACTED', 'HIRED', 'OFFER_MADE', 'INTERVIEW_SCHEDULED') NOT NULL DEFAULT 'APPLIED',
    `applied_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Application_applicant_id_idx`(`applicant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_applicant_id_fkey` FOREIGN KEY (`applicant_id`) REFERENCES `Applicant`(`applicant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
