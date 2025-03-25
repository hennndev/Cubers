-- AlterTable
CREATE SEQUENCE detail_student_id_seq;
ALTER TABLE "detail_student" ALTER COLUMN "id" SET DEFAULT nextval('detail_student_id_seq');
ALTER SEQUENCE detail_student_id_seq OWNED BY "detail_student"."id";

-- AlterTable
CREATE SEQUENCE detail_worker_id_seq;
ALTER TABLE "detail_worker" ALTER COLUMN "id" SET DEFAULT nextval('detail_worker_id_seq');
ALTER SEQUENCE detail_worker_id_seq OWNED BY "detail_worker"."id";
