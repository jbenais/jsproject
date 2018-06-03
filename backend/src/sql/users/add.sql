INSERT INTO t_user(email, firstname, lastname, password, age, is_male, description, id_profession, id_mbti, id_orientation)
VALUES (${email}, ${firstname}, ${lastname},
        ${password}, ${age}, ${is_male}, 
        ${description}, ${id_profession}, 
        ${id_mbti}, ${id_orientation})
RETURNING *