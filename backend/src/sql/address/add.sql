INSERT INTO t_address(id_user, latitude, longitude)
VALUES (${id_user}, ${latitude}, ${longitude})
RETURNING *