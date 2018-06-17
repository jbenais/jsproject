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
  Id_Orientation    SMALLINT        REFERENCES T_Orientation(Id),
  Is_Completed      BOOLEAN         DEFAULT FALSE
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
  Id_MBTI           SMALLINT        NOT NULL REFERENCES T_MBTI(Id),
  UNIQUE(Id_User, Id_MBTI)
);

CREATE TABLE T_User_Target (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User           SMALLINT        NOT NULL REFERENCES T_User(Id),
  Id_Target         SMALLINT        NOT NULL REFERENCES T_Target(Id),
  UNIQUE(Id_User, Id_Target)
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
  Id_Opposite_User  SMALLINT        NOT NULL REFERENCES T_User(Id),
  Is_Matched        BOOLEAN         NOT NULL DEFAULT FALSE,
  Is_Liked          BOOLEAN         NOT NULL DEFAULT FALSE,
  UNIQUE(Id_User, Id_Opposite_User)
);

CREATE TABLE T_Channel (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User_One       SMALLINT        NOT NULL REFERENCES T_User(Id),
  Id_User_Two       SMALLINT        NOT NULL REFERENCES T_User(Id),
  Uuid              VARCHAR(64)     NOT NULL,
  UNIQUE(Id_User_One, Id_User_Two)
);

CREATE TABLE T_Notification (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_User           SMALLINT        NOT NULL REFERENCES T_User(Id),
  Id_Channel        SMALLINT        NOT NULL REFERENCES T_Channel(Id),
  Is_Read           BOOLEAN         NOT NULL DEFAULT FALSE,
  UNIQUE(Id_User, Id_Channel)
);

CREATE TYPE CONTENT_TYPE AS ENUM ('message', 'picture', 'audio', 'video', 'other');

CREATE TABLE T_Messages (
  Id                SERIAL          PRIMARY KEY NOT NULL,
  Id_Sender         SMALLINT        NOT NULL REFERENCES T_User(Id),
  Id_Receiver       SMALLINT        NOT NULL REFERENCES T_User(Id),
  Content           VARCHAR(256)    NOT NULL,    
  Content_Type      CONTENT_TYPE    NOT NULL DEFAULT 'message',
  Created_At        TIMESTAMP       NOT NULL,
  Id_Channel        SMALLINT        NOT NULL REFERENCES T_Channel(Id)
);