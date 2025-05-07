-- DropIndex
DROP INDEX `Applicant_applicant_id_created_at_idx` ON `Applicant`;

-- CreateIndex
CREATE INDEX `Applicant_applicant_id_created_at_full_name_idx` ON `Applicant`(`applicant_id`, `created_at`, `full_name`);
