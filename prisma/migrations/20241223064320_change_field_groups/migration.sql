-- DropForeignKey
ALTER TABLE "group_member" DROP CONSTRAINT "group_member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "group_member" DROP CONSTRAINT "group_member_username_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_groupOwnerId_fkey";

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_groupOwnerId_fkey" FOREIGN KEY ("groupOwnerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
