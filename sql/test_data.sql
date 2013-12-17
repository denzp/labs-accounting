INSERT INTO "Teachers" ("login", "hash", "originHash", "accessType", "name", "surname", "patronymic")
  VALUES (
    "test1",
    "test1SecretPw",
    "",
    1,
    "TestName1",
    "TestSurname1",
    "TestPatronymic1"
  );
  
INSERT INTO "Teachers" ("login", "hash", "originHash", "accessType", "name", "surname", "patronymic")
  VALUES (
    "test2",
    "test2SecretPw",
    "",
    1,
    "TestName2",
    "TestSurname2",
    "TestPatronymic2"
  );
  
INSERT INTO "Teachers" ("login", "hash", "originHash", "accessType", "name", "surname", "patronymic")
  VALUES (
    "test3",
    "test3SecretPw",
    "",
    1,
    "TestName3",
    "TestSurname3",
    "TestPatronymic3"
  );
  
INSERT INTO "Groups" ("name", "isDistanced")
  VALUES (
    "SP-11",
    0
  );

INSERT INTO "Groups" ("name", "isDistanced")
  VALUES (
    "SP-11z",
    1
  );

INSERT INTO "Groups" ("name", "isDistanced")
  VALUES (
    "SP-12-1",
    0
  );
  
INSERT INTO "Groups" ("name", "isDistanced")
  VALUES (
    "SP-12-2",
    0
  );
  
INSERT INTO "Students" ("id", "name", "patronymic", "surname", "group")
  VALUES (
    0,
    "TestStudent1",
    "TestStudent1Patronymic",
    "TestStudent1Surname",
    1
  );

INSERT INTO "Students" ("id", "name", "patronymic", "surname", "group")
  VALUES (
    1,
    "TestStudent2",
    "TestStudent2Patronymic",
    "TestStudent2Surname",
    1
  );
  
INSERT INTO "Students" ("id", "name", "patronymic", "surname", "group")
  VALUES (
    2,
    "TestStudent3",
    "TestStudent3Patronymic",
    "TestStudent3Surname",
    1
  );
  
INSERT INTO "Course" ("teacher", "title", "group", "quarter")
  VALUES (
    1,
    "TestCourse1",
    1,
    1
  );
  
INSERT INTO "Course" ("teacher", "title", "group", "quarter")
  VALUES (
    1,
    "TestCourse2",
    2,
    2
  );
  
INSERT INTO "Course" ("teacher", "title", "group", "quarter")
  VALUES (
    2,
    "TestCourse3",
    2,
    3
  );
  
INSERT INTO "Course" ("teacher", "title", "group", "quarter")
  VALUES (
    2,
    "TestCourse4",
    3,
    4
  );

INSERT INTO "Labs" ("course", "refMark", "name")
  VALUES (
    1,
    10,
    "Lab1"
  );
  
INSERT INTO "Labs" ("course", "refMark", "name")
  VALUES (
    1,
    10,
    "Lab2"
  );
  
INSERT INTO "Labs" ("course", "refMark", "name")
  VALUES (
    1,
    5,
    "Lab3"
  );
  
INSERT INTO "Labs" ("course", "refMark", "name")
  VALUES (
    1,
    20,
    "Lab4"
  );
  
INSERT INTO "Labs" ("course", "refMark", "name")
  VALUES (
    3,
    10,
    "Lab1"
  );
  
INSERT INTO "Labs" ("course", "refMark", "name")
  VALUES (
    3,
    7,
    "Lab2"
  );
  
INSERT INTO "Labs" ("course", "refMark", "name")
  VALUES (
    3,
    5,
    "Lab3"
  );