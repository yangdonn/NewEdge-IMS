/*
  Warnings:

  - You are about to drop the column `adminId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryManager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesInvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreIncharge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemReports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StoreInchargeItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserReports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InventoryReport" DROP CONSTRAINT "InventoryReport_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_managerId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseReport" DROP CONSTRAINT "PurchaseReport_reportId_fkey";

-- DropForeignKey
ALTER TABLE "SalesInvoice" DROP CONSTRAINT "SalesInvoice_reportId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminId_fkey";

-- DropForeignKey
ALTER TABLE "_ItemReports" DROP CONSTRAINT "_ItemReports_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemReports" DROP CONSTRAINT "_ItemReports_B_fkey";

-- DropForeignKey
ALTER TABLE "_StoreInchargeItems" DROP CONSTRAINT "_StoreInchargeItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreInchargeItems" DROP CONSTRAINT "_StoreInchargeItems_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserReports" DROP CONSTRAINT "_UserReports_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserReports" DROP CONSTRAINT "_UserReports_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adminId",
DROP COLUMN "role";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "InventoryManager";

-- DropTable
DROP TABLE "InventoryReport";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "PurchaseReport";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "SalesInvoice";

-- DropTable
DROP TABLE "StoreIncharge";

-- DropTable
DROP TABLE "_ItemReports";

-- DropTable
DROP TABLE "_StoreInchargeItems";

-- DropTable
DROP TABLE "_UserReports";
