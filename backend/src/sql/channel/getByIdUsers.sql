SELECT * FROM t_channel
WHERE id_user_one = ${id_user_one} AND id_user_two = ${id_user_two}
OR id_user_one = ${id_user_two} AND id_user_two = ${id_user_one}