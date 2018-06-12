INSERT INTO t_user_picture(id_user, url, is_profile)
VALUES (${id_user}, ${url}, ${is_profile})
RETURNING *