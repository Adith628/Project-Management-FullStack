-- DropIndex
DROP INDEX "Project_name_key";

-- DropIndex
DROP INDEX "Team_teamName_key";

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "fileName" DROP NOT NULL;
