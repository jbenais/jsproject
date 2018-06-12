INSERT INTO t_user(email, firstname, lastname, age, is_male)
VALUES (${email}, ${firstname}, ${lastname}, ${age}, ${is_male})
RETURNING *