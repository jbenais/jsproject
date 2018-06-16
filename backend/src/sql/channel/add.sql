INSERT INTO t_channel(id_user_one, id_user_two, uuid)
VALUES (${id_user_one}, ${id_user_two}, ${uuid})
RETURNING *