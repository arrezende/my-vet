/*
  Warnings:

  - You are about to drop the column `horaio` on the `Consulta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Consulta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT,
    "horario" TEXT,
    "descricao" TEXT,
    "animalId" INTEGER NOT NULL,
    "profissionalId" INTEGER,
    CONSTRAINT "Consulta_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Consulta" ("animalId", "data", "descricao", "id", "profissionalId") SELECT "animalId", "data", "descricao", "id", "profissionalId" FROM "Consulta";
DROP TABLE "Consulta";
ALTER TABLE "new_Consulta" RENAME TO "Consulta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
