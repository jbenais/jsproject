-- Delete and recreate the MeetMyType database
\c postgres
DROP DATABASE IF EXISTS meetmytype;
CREATE DATABASE meetmytype;
\c meetmytype
-- Create tables

CREATE TABLE T_Address (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  Latitude          REAL              NOT NULL,
  Longitude         REAL              NOT NULL
);

CREATE TABLE T_Orientation (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  Name              VARCHAR(64)       UNIQUE NOT NULL
);

CREATE TABLE T_Target (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  Name              VARCHAR(128)      UNIQUE NOT NULL
);

CREATE TABLE T_Profession (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  Name              VARCHAR(64)       UNIQUE NOT NULL
);

CREATE TABLE T_MBTI (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  Name              VARCHAR(4)        UNIQUE NOT NULL
);

CREATE TABLE T_Strength (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  Name              VARCHAR(64)       UNIQUE NOT NULL
);

CREATE TABLE T_Weakness (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  Name              VARCHAR(64)       UNIQUE NOT NULL
);

CREATE TABLE T_MBTI_Strength (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  IdMBTI            BIGINT            NOT NULL REFERENCES T_MBTI(Id),
  IdStrength        BIGINT            NOT NULL REFERENCES T_Strength(Id)
);

CREATE TABLE T_MBTI_Weakness (
  Id                SERIAL            PRIMARY KEY NOT NULL,
  IdMBTI            BIGINT            NOT NULL REFERENCES T_MBTI(Id),
  IdWeakness        BIGINT            NOT NULL REFERENCES T_Weakness(Id)
);

CREATE TABLE T_User (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Email             VARCHAR(64)     UNIQUE NOT NULL,
  Firstname         VARCHAR(64)     NOT NULL,
  Lastname          VARCHAR(64)     NOT NULL,
  Password          VARCHAR(64)     NOT NULL,
  Age               SMALLINT        NOT NULL,
  IsMale            BOOLEAN         NOT NULL DEFAULT TRUE,
  Description       VARCHAR(512)    ,
  IdProfession      BIGINT          NOT NULL REFERENCES T_Profession(Id),
  IdAddress         BIGINT          NOT NULL REFERENCES T_Address(Id),
  IdMBTI            BIGINT          NOT NULL REFERENCES T_MBTI(Id),
  IdOrientation     BIGINT          NOT NULL REFERENCES T_Orientation(Id)
);

CREATE TABLE T_User_MBTI_Preferences (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  IdUser            BIGINT          NOT NULL REFERENCES T_User(Id),
  IdMBTI            BIGINT          NOT NULL REFERENCES T_MBTI(Id)
);

CREATE TABLE T_User_Target (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  IdUser            BIGINT          NOT NULL REFERENCES T_User(Id),
  IdTarget          BIGINT          NOT NULL REFERENCES T_Target(Id)
);

CREATE TABLE T_User_Picture (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  IdUser            BIGINT          NOT NULL REFERENCES T_User(Id),
  Url               VARCHAR(256)
);

CREATE TABLE T_Matches (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  IdUser            BIGINT          NOT NULL REFERENCES T_User(Id),
  IdUserTarget      BIGINT          NOT NULL REFERENCES T_User(Id),
  IsMatched         BOOLEAN         NOT NULL DEFAULT FALSE
);