\c meetmytype

DELETE FROM t_user CASCADE;
ALTER SEQUENCE t_user_id_seq RESTART WITH 1;

DELETE FROM t_user_mbti_preferences CASCADE;
ALTER SEQUENCE t_user_mbti_preferences_id_seq RESTART WITH 1;

DELETE FROM t_user_picture CASCADE;
ALTER SEQUENCE t_user_picture_id_seq RESTART WITH 1;

DELETE FROM t_user_target CASCADE;
ALTER SEQUENCE t_user_target_id_seq RESTART WITH 1;

DELETE FROM t_target CASCADE;
ALTER SEQUENCE t_target_id_seq RESTART WITH 1;

DELETE FROM t_mbti_strength CASCADE;
ALTER SEQUENCE t_mbti_strength_id_seq RESTART WITH 1;

DELETE FROM t_mbti_weakness CASCADE;
ALTER SEQUENCE t_mbti_weakness_id_seq RESTART WITH 1;

DELETE FROM t_address CASCADE;
ALTER SEQUENCE t_address_id_seq RESTART WITH 1;

DELETE FROM t_matches CASCADE;
ALTER SEQUENCE t_matches_id_seq RESTART WITH 1;

DELETE FROM t_mbti CASCADE;
ALTER SEQUENCE t_mbti_id_seq RESTART WITH 1;

DELETE FROM t_orientation CASCADE;
ALTER SEQUENCE t_orientation_id_seq RESTART WITH 1;

DELETE FROM t_profession CASCADE;
ALTER SEQUENCE t_profession_id_seq RESTART WITH 1;

DELETE FROM t_strength CASCADE;
ALTER SEQUENCE t_strength_id_seq RESTART WITH 1;

DELETE FROM t_weakness CASCADE;
ALTER SEQUENCE t_weakness_id_seq RESTART WITH 1;


INSERT INTO t_mbti
  VALUES (DEFAULT, 'ISTJ'),
         (DEFAULT, 'ISFJ'),
         (DEFAULT, 'INFJ'),
         (DEFAULT, 'INTJ'),
         (DEFAULT, 'ISTP'),
         (DEFAULT, 'ISFP'),
         (DEFAULT, 'INFP'),
         (DEFAULT, 'INTP'),
         (DEFAULT, 'ESTP'),
         (DEFAULT, 'ESFP'),
         (DEFAULT, 'ENFP'),
         (DEFAULT, 'ENTP'),
         (DEFAULT, 'ESTJ'),
         (DEFAULT, 'ESFJ'),
         (DEFAULT, 'ENFJ'),
         (DEFAULT, 'ENTJ');

INSERT INTO t_orientation
  VALUES (DEFAULT, 'Heterosexual'),
         (DEFAULT, 'Homosexual'),
         (DEFAULT, 'Bisexual');

INSERT INTO t_target
  VALUES (DEFAULT, 'Serious relationship'),
         (DEFAULT, 'Friends with benefits'),
         (DEFAULT, 'Friends'),
         (DEFAULT, 'Work buddy ');