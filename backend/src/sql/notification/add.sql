INSERT INTO t_notification(id_user, id_channel)
VALUES (${id_user}, ${id_channel})
RETURNING *