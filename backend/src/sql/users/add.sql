INSERT INTO t_user(email, firstname, lastname)
VALUES (${email}, ${firstname}, ${lastname})
RETURNING *