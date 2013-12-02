INSERT INTO Teachers (login, hash, pubKey, accessType, name, surname, patronymic)
  VALUES (
    "test1",
    "",
    "",
    1,
    "TestName1",
    "TestSurname1",
    "TestPatronymic1"
  );
  
INSERT INTO Teachers (login, hash, pubKey, accessType, name, surname, patronymic)
  VALUES (
    "test2",
    "",
    "",
    1,
    "TestName2",
    "TestSurname2",
    "TestPatronymic2"
  );
  
INSERT INTO Teachers (login, hash, pubKey, accessType, name, surname, patronymic)
  VALUES (
    "test3",
    "",
    "",
    1,
    "TestName3",
    "TestSurname3",
    "TestPatronymic3"
  );
  
INSERT INTO Groups (name, isDistanced)
  VALUES (
    "SP-11",
    0
  );
  
INSERT INTO Groups (name, isDistanced)
  VALUES (
    "SP-11z",
    1
  );
  
INSERT INTO Groups (name, isDistanced)
  VALUES (
    "SP-12-1",
    0
  );
  
INSERT INTO Groups (name, isDistanced)
  VALUES (
    "SP-12-2",
    0
  );
  
INSERT INTO Students (id, name, patronymic, surname, "group")
  VALUES (
    0,
    "TestStudent1",
    "TestStudent1Patronymic",
    "TestStudent1Surname",
    1
  );

INSERT INTO Students (id, name, patronymic, surname, "group")
  VALUES (
    1,
    "TestStudent2",
    "TestStudent2Patronymic",
    "TestStudent2Surname",
    1
  );
  
INSERT INTO Students (id, name, patronymic, surname, "group")
  VALUES (
    2,
    "TestStudent3",
    "TestStudent3Patronymic",
    "TestStudent3Surname",
    1
  );