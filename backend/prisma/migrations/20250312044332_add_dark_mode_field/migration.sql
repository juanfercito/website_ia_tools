-- DropForeignKey
ALTER TABLE `ProfileImg` DROP FOREIGN KEY `ProfileImg_userId_fkey`;

-- AlterTable
ALTER TABLE `ProfileImg` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `darkMode` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `ProfileImg` ADD CONSTRAINT `ProfileImg_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
