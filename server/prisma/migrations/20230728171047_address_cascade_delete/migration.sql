-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_patientId_fkey`;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
