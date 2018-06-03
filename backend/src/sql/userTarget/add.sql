INSERT INTO t_user_target(id_user, id_target)
VALUES (${id_user}, ${id_target})
RETURNING *