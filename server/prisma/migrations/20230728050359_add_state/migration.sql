/*
  Warnings:

  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `state` VARCHAR(100) NOT NULL;
