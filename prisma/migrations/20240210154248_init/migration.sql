-- CreateEnum
CREATE TYPE "SocialNetwork" AS ENUM ('google', 'twitter', 'facebook');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "name" VARCHAR(50),
    "avatar" TEXT,
    "age" INTEGER,
    "country" VARCHAR(20),
    "locale" VARCHAR(3),
    "phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "social_network" "SocialNetwork",
    "social_network_id" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
