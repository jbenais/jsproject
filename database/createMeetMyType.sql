-- Delete and recreate the MeetMyType database
\c postgres
DROP DATABASE IF EXISTS meetmytype;
CREATE DATABASE meetmytype;
\c meetmytype
-- Create tables
CREATE TABLE T_Orientation (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Name              VARCHAR(64)     UNIQUE NOT NULL
);

CREATE TABLE T_Target (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Name              VARCHAR(128)    UNIQUE NOT NULL
);

CREATE TABLE T_MBTI (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Name              VARCHAR(4)      UNIQUE NOT NULL
);

CREATE TABLE T_Strength (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Name              VARCHAR(64)     UNIQUE NOT NULL
);

CREATE TABLE T_Weakness (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Name              VARCHAR(64)     UNIQUE NOT NULL
);

CREATE TABLE T_MBTI_Strength (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_MBTI           SMALLINT        NOT NULL REFERENCES T_MBTI(Id),
  Id_Strength       SMALLINT        NOT NULL REFERENCES T_Strength(Id)
);

CREATE TABLE T_MBTI_Weakness (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_MBTI           SMALLINT        NOT NULL REFERENCES T_MBTI(Id),
  Id_Weakness       SMALLINT        NOT NULL REFERENCES T_Weakness(Id)
);

CREATE TABLE T_User (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Email             VARCHAR(64)     UNIQUE NOT NULL,
  Firstname         VARCHAR(64)     NOT NULL,
  Lastname          VARCHAR(64)     NOT NULL,
  Birthdate         DATE            ,
  Is_Male           BOOLEAN         ,
  Description       VARCHAR(512)    , 
  Profession        VARCHAR(64)     ,
  Max_distance      SMALLINT        NOT NULL DEFAULT 1000,
  Age_Min           SMALLINT        NOT NULL DEFAULT 18,
  Age_Max           SMALLINT        NOT NULL DEFAULT 65,
  Id_MBTI           SMALLINT        REFERENCES T_MBTI(Id),
  Id_Orientation    SMALLINT        REFERENCES T_Orientation(Id)
);

CREATE TABLE T_Address (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User           SMALLINT        UNIQUE NOT NULL REFERENCES T_User(Id),
  Latitude          REAL            NOT NULL,
  Longitude         REAL            NOT NULL
);

CREATE TABLE T_User_MBTI_Preferences (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User           SMALLINT        NOT NULL REFERENCES T_User(Id),
  Id_MBTI           SMALLINT        NOT NULL REFERENCES T_MBTI(Id)
);

CREATE TABLE T_User_Target (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User           SMALLINT        NOT NULL REFERENCES T_User(Id),
  Id_Target         SMALLINT        NOT NULL REFERENCES T_Target(Id)
);

CREATE TABLE T_User_Picture (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User           SMALLINT        NOT NULL REFERENCES T_User(Id),
  Url               VARCHAR(256)    ,
  Is_Profile        BOOLEAN         NOT NULL DEFAULT FALSE,
  UNIQUE(Id_User, Is_Profile)
);

CREATE TABLE T_Matches (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User           SMALLINT        NOT NULL REFERENCES T_User(Id),
  Id_User_Love      SMALLINT        NOT NULL REFERENCES T_User(Id),
  Is_Matched        BOOLEAN         NOT NULL DEFAULT FALSE,
  UNIQUE(Id_User, Id_User_Love)
);