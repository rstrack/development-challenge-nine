-- CreateTable
CREATE TABLE `Patient` (
    `id` VARCHAR(36) NOT NULL,
    `birthDate` DATE NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(36) NOT NULL,
    `zipCode` VARCHAR(8) NOT NULL,
    `publicPlace` VARCHAR(100) NOT NULL,
    `number` VARCHAR(6) NOT NULL,
    `complement` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `patientId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `Address_patientId_key`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
