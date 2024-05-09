-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "dateRegistered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT
);
INSERT INTO "new_User" ("country", "dateRegistered", "email", "id", "lastName", "name", "password") SELECT "country", "dateRegistered", "email", "id", "lastName", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
