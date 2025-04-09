/*
  Warnings:

  - Made the column `userId` on table `ProfileImg` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ProfileImg` DROP FOREIGN KEY `ProfileImg_userId_fkey`;

-- AlterTable
ALTER TABLE `ProfileImg` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProfileImg` ADD CONSTRAINT `ProfileImg_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
