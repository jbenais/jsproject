INSERT INTO t_matches(id_user, id_opposite_user, is_matched, is_liked)
VALUES (${id_user}, ${id_opposite_user}, ${is_matched}, ${is_liked})
RETURNING *