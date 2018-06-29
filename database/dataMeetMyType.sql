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
  VALUES  (DEFAULT, 'natalie.portman@gmail.com', 'Natalie', 'Portman', '9/06/1981', false, 'I like men', 'Try me', 150, 20, 30, 12, 1, true),
          (DEFAULT, 'brigitte.bardot@gmail.com', 'Brigitte', 'Bardot', '28/09/1934', false, 'I like men', 'Save animals', 150, 20, 30, 12, 1, true),
          (DEFAULT, 'ellen.degeneres@gmail.com', 'Ellen', 'DeGeneres', '26/01/1958', false, 'I like women', 'Come to my personal show', 500, 20, 30, 12, 2, true),
          (DEFAULT, 'cara.delevigne@gmail.com', 'Cara', 'Delevigne', '12/08/1992', false, 'I like both', 'Try me', 200, 20, 30, 4, 3, true),
          (DEFAULT, 'freddie.mercury@gmail.com', 'Freddie', 'Mercury', '5/07/1946', true, 'I like men', 'I want to break free', 1000, 20, 30, 1, 1, true),
          (DEFAULT, 'jim.parsons@gmail.com', 'Jim', 'Parsons', '24/03/1973', true, 'I like men', 'I m going to be the big bang of your life', 700, 20, 30, 7, 1, true),
          (DEFAULT, 'zac.efron@gmail.com', 'Zac ', 'Efron', '18/10/1987', true, 'I like women', 'Be my prom girl', 700, 20, 30, 8, 2, true),
          (DEFAULT, 'donald.glover@gmail.com', 'Donald ', 'Glover', '25/09/1983', true, 'I like women', 'I m Childish Gambino', 100, 20, 30, 10, 2, true),
          (DEFAULT, 'sam.smith@gmail.com', 'Sam', 'Smith', '25/09/1983', true, 'I like both', 'Stay with me', 100, 20, 30, 7, 3, true),
          (DEFAULT, 'leonardo.dicaprio@gmail.com', 'Leonardo', 'DiCaprio', '11/11/1974', true, 'I like women', 'Be my wolf', 1000, 18, 25, 14, 2, true),
          (DEFAULT, 'quentin.pre@gmail.com', 'Quentin', 'Pre', '12/12/1992', true, 'I like women', 'Déstructure comme le JS', 500, 18, 35, 13, 2, true),
          (DEFAULT, 'paul.semel@gmail.com', 'Paul', 'Semel', '12/07/1995', true, 'I like women', 'Tu seras plus que le LSE', 1000, 18, 25, 4, 2, true),
          (DEFAULT, 'jonathan.espiard@gmail.com', 'Jonathan', 'Espiard', '02/05/1995', true, 'I like both', 'J aime les motards', 1000, 18, 60, 6, 3, true),
          (DEFAULT, 'yoan.feijoeiro@gmail.com', 'Yoan', 'Feijoeiro', '02/05/1995', true, 'I like men', 'J aime les hommes à barbe', 1000, 18, 60, 5, 1, true),
          (DEFAULT, 'farah.nedjadi@gmail.com', 'Farah', 'Nedjadi', '28/12/1996', true, 'I like both', 'Ned Flanders', 1000, 18, 60, 13, 3, true);
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
  Leonardo Di     : Femme
  Quentin Pré     : Femme
  Paul Semel      : Femme
  Jonathan Espiard: Bi
  Yoan Feijoeiro  : Homme
  Farah Nedjadi   : Bi
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
  Leonardo Di     : Relation sérieuse/Partenaire de travail
  Quentin Pré     : Relation sérieuse/Amitié et plus/Amitié,
  Paul Semel      : Relation sérieuse
  Jonathan Espiard: Amitié et plus/partenaire de travail
  Yoan Feijoeiro  : TOUT
  Farah Nedjadi   : Amitié/Amitié et plus
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
         (DEFAULT, 9, 1),
         (DEFAULT, 10, 1),
         (DEFAULT, 10, 4),
         (DEFAULT, 11, 1),
         (DEFAULT, 11, 2),
         (DEFAULT, 11, 3),
         (DEFAULT, 12, 1),
         (DEFAULT, 13, 2),
         (DEFAULT, 13, 4),
         (DEFAULT, 15, 2),
         (DEFAULT, 15, 3);

/*
  Natalie Portman : Paris
  Brigitte Bardot : Lyon
  Ellen DeGeneres : Lyon
  Cara Delevingne : Paris
  Freddie Mercury : Marseille
  Jim Parsons     : Gouvieux
  Zac Efron       : Paris
  Donald Glover   : Paris
  Sam Smith       : Marseille
  Leonardo Di     : Los Angeles
  Quentin Pré     : Paris
  Paul Semel      : Rouen
  Jonathan Espiard: Lisieux
  Yoan Feijoeiro  : Dreux
  Farah Nedjadi   : Alger
*/

INSERT INTO t_address
  VALUES (DEFAULT, 1, 48.856614, 2.3522219000000177),
         (DEFAULT, 2, 45.764043, 4.835658999999964),
         (DEFAULT, 3, 45.764043, 4.835658999999964),
         (DEFAULT, 4, 48.856614, 2.3522219000000177),
         (DEFAULT, 5, 43.296482, 5.369779999999992),
         (DEFAULT, 6, 49.192878, 2.4093359999999393),
         (DEFAULT, 7, 48.856614, 2.3522219000000177),
         (DEFAULT, 8, 48.856614, 2.3522219000000177),
         (DEFAULT, 9, 43.296482, 5.369779999999992),         
         (DEFAULT, 10, 34.052235, -118.243683),
         (DEFAULT, 11, 45.764043, 4.835658999999964),
         (DEFAULT, 12, 49.439903, 1.094819),
         (DEFAULT, 13, 49.1466, 0.2293),
         (DEFAULT, 14, 40.416500, -3.7025600),
         (DEFAULT, 15, 36.8189700, 10.1657900);