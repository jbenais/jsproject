INSERT INTO t_matches(id_user, id_user_love, is_matched)
VALUES (${id_user}, ${id_user_love}, ${is_matched})
RETURNING *