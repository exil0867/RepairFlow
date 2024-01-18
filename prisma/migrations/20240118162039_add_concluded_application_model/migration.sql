-- CreateTable
CREATE TABLE "ConcludedApplication" (
    "id" SERIAL NOT NULL,
    "changes" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,

    CONSTRAINT "ConcludedApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConcludedApplication_applicationId_key" ON "ConcludedApplication"("applicationId");

-- AddForeignKey
ALTER TABLE "ConcludedApplication" ADD CONSTRAINT "ConcludedApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
