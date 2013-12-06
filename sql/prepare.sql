CREATE TABLE "Teachers" (
  "id" INTEGER NOT NULL,
  "login" TEXT NOT NULL,
  "hash" TEXT NOT NULL,
  "originHash" TEXT NOT NULL,
  "accessType" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "surname" TEXT NOT NULL,
  "patronymic" TEXT NOT NULL,
  
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_Users_AccessType_1" FOREIGN KEY ("accessType") REFERENCES "AccessType" ("id"),
  CONSTRAINT "uniqueTeacherId" UNIQUE ("id")
);

CREATE TABLE "AccessType" (
  "id" INTEGER NOT NULL,
  "description" TEXT NOT NULL,
  
  PRIMARY KEY ("id")
);

INSERT INTO "AccessType" VALUES (1, "Teacher access");
INSERT INTO "AccessType" VALUES (2, "Administrator access");

CREATE TABLE "Groups" (
  "id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "isDistanced" INTEGER,
  
  PRIMARY KEY ("id")
);

CREATE TABLE "Students" (
  "id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "surname" TEXT NOT NULL,
  "patronymic" TEXT NOT NULL,
  "group" INTEGER NOT NULL,
  
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_Students_Groups_1" FOREIGN KEY ("group") REFERENCES "Groups" ("id"),
  CONSTRAINT "uniqueStudentId" UNIQUE ("id")
);

CREATE TABLE "Course" (
  "id" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "teacher" INTEGER NOT NULL,
  "group" INTEGER NOT NULL,
  "year" INTEGER NOT NULL,
  
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_Course_Teachers_1" FOREIGN KEY ("teacher") REFERENCES "Teachers" ("id"),
  CONSTRAINT "fk_Course_Groups_1" FOREIGN KEY ("group") REFERENCES "Groups" ("id")
);

CREATE TABLE "Marks" (
  "id" INTEGER NOT NULL,
  "student" INTEGER NOT NULL,
  "weight" REAL NOT NULL,
  "lab" INTEGER NOT NULL,
  
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_Marks_Students_1" FOREIGN KEY ("student") REFERENCES "Students" ("id"),
  CONSTRAINT "fk_Marks_Labs_1" FOREIGN KEY ("id") REFERENCES "Labs" ("id")
);

CREATE TABLE "Labs" (
  "id" INTEGER,
  "course" INTEGER,
  "refMark" REAL,
  "name" TEXT,
  
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_Labs_Course_1" FOREIGN KEY ("course") REFERENCES "Course" ("id"),
  CONSTRAINT "uniqueLabId" UNIQUE ("id")
);