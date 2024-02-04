-- CreateTable
CREATE TABLE "users" (
    "id" BIGINT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "lang" VARCHAR(5) NOT NULL,
    "joined_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "id" PRIMARY KEY ("id")
);
