\c meetmytype

DELETE FROM t_user_picture CASCADE;
ALTER SEQUENCE t_user_picture_id_seq RESTART WITH 1;

DELETE FROM t_user CASCADE;
ALTER SEQUENCE t_user_id_seq RESTART WITH 1;

DELETE FROM t_user_mbti_preferences CASCADE;
ALTER SEQUENCE t_user_mbti_preferences_id_seq RESTART WITH 1;

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
  VALUES (DEFAULT, 'Homme'),
         (DEFAULT, 'Femme'),
         (DEFAULT, 'Bi');

INSERT INTO t_target
  VALUES (DEFAULT, 'Relation serieuse'),
         (DEFAULT, 'Amitie et plus'),
         (DEFAULT, 'Amitie'),
         (DEFAULT, 'Partenaire de travail');

INSERT INTO t_user
  VALUES (DEFAULT, 'natalie.portman@gmail.com', 'Natalie', 'Portman', '9/06/1981', false, 'I like men', 'Try me', 150, 20, 30, 12, 1),
         (DEFAULT, 'brigitte.bardot@gmail.com', 'Brigitte', 'Bardot', '28/09/1934', false, 'I like men', 'Save animals', 150, 20, 30, 12, 1),
         (DEFAULT, 'ellen.degeneres@gmail.com', 'Ellen', 'DeGeneres', '26/01/1958', false, 'I like women', 'Come to my personal show', 500, 20, 30, 12, 2),
         (DEFAULT, 'cara.delevigne@gmail.com', 'Cara', 'Delevigne', '12/08/1992', false, 'I like both', 'Try me', 200, 20, 30, 4, 3),
         (DEFAULT, 'freddie.mercury@gmail.com', 'Freddie', 'Mercury', '5/07/1946', true, 'I like men', 'I want to break free', 1000, 20, 30, 1, 1),
         (DEFAULT, 'jim.parsons@gmail.com', 'Jim', 'Parsons', '24/03/1973', true, 'I like men', 'I m going to be the big bang of your life', 700, 20, 30, 7, 1),
         (DEFAULT, 'zac.efron@gmail.com', 'Zac ', 'Efron', '18/10/1987', true, 'I like women', 'Be my prom girl', 700, 20, 30, 8, 2),
         (DEFAULT, 'donald.glover@gmail.com', 'Donald ', 'Glover', '25/09/1983', true, 'I like women', 'I m Childish Gambino', 100, 20, 30, 10, 2),
         (DEFAULT, 'sam.smith@gmail.com', 'Sam', 'Smith', '25/09/1983', true, 'I like both', 'Stay with me', 100, 20, 30, 7, 3);

/*
  Natalie Portman : Homme
  Brigitte Bardot : Homme
  Ellen DeGeneres : Femme
  Cara Delevingne : Bi
  Freddie Mercury : Homme
  Jim Parsons     : Homme
  Zac Efron       : Femme
  Donald Glover   : Femme
  Sam Smith       : Bi
*/


/*
  Natalie Portman : Relation sérieuse
  Brigitte Bardot : TOUT
  Ellen DeGeneres : Partenaire de travail
  Cara Delevingne : Amitié et plus / Amitie
  Freddie Mercury : Amitié et plus
  Jim Parsons     : Amitie / Partenaire de travail
  Zac Efron       : Relation sérieuse / Amitié
  Donald Glover   : TOUT
  Sam Smith       : Relation sérieuse 
*/

INSERT INTO t_user_target
  VALUES (DEFAULT, 1, 1),
         (DEFAULT, 3, 3),
         (DEFAULT, 4, 2),
         (DEFAULT, 4, 3),
         (DEFAULT, 5, 2),
         (DEFAULT, 6, 3),
         (DEFAULT, 6, 4),
         (DEFAULT, 7, 1),
         (DEFAULT, 7, 3),
         (DEFAULT, 9, 1);