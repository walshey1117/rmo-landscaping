-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'FIELD_WORKER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('LAWN_MOWING', 'GARDENING', 'TREE_TRIMMING', 'LANDSCAPING', 'SNOW_REMOVAL');

-- CreateEnum
CREATE TYPE "ServiceFrequency" AS ENUM ('ONE_TIME', 'WEEKLY', 'BI_WEEKLY', 'MONTHLY', 'QUARTERLY');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ASSIGNED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('LAWN', 'GARDEN', 'DRIVEWAY', 'TREES', 'LANDSCAPE_BED');

-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('MOWER', 'TRIMMER', 'BLOWER', 'VEHICLE', 'HAND_TOOL', 'POWER_TOOL');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('AVAILABLE', 'IN_USE', 'MAINTENANCE', 'REPAIR', 'RETIRED');

-- CreateEnum
CREATE TYPE "EquipmentAssignmentStatus" AS ENUM ('ASSIGNED', 'IN_USE', 'RETURNED', 'DAMAGED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'BANK_TRANSFER', 'CHECK', 'CASH');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('BEFORE', 'AFTER', 'ISSUE', 'DOCUMENTATION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "notes" TEXT,
    "preferences" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    "totalValue" DECIMAL(10,2) NOT NULL,
    "terms" TEXT,
    "notes" TEXT,
    "documents" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- More tables and indexes will be added here...

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE INDEX "User.role_index" ON "User"("role");
CREATE INDEX "User.active_index" ON "User"("active");
CREATE INDEX "User.createdAt_index" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "Contract.customerId_index" ON "Contract"("customerId");
CREATE INDEX "Contract.status_index" ON "Contract"("status");
CREATE INDEX "Contract.startDate_index" ON "Contract"("startDate");
CREATE INDEX "Contract.endDate_index" ON "Contract"("endDate");
