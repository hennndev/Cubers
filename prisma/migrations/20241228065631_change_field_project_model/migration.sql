/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `group_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `group_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `project_member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "group_member_username_key" ON "group_member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "group_member_groupId_key" ON "group_member"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "project_member_username_key" ON "project_member"("username");

-- CreateIndex
CREATE INDEX "project_member_username_idx" ON "project_member"("username");

-- CreateIndex
CREATE INDEX "project_member_projectId_idx" ON "project_member"("projectId");
