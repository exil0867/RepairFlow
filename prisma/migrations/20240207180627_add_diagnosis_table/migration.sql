-- CreateTable
CREATE TABLE "DiagnosedApplication" (
    "id" SERIAL NOT NULL,
    "issue" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,

    CONSTRAINT "DiagnosedApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiagnosedApplication_applicationId_key" ON "DiagnosedApplication"("applicationId");

-- AddForeignKey
ALTER TABLE "DiagnosedApplication" ADD CONSTRAINT "DiagnosedApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
