INSERT INTO t_user_mbti_preferences(id_user, id_mbti)
VALUES (${id_user}, ${id_mbti})
RETURNING *