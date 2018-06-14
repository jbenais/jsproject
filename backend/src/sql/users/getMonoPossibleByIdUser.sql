SELECT * FROM t_user
WHERE id <> ${id} 
AND is_male = ${op_is_male}
AND (id_orientation = ${op_orientation_first} OR id_orientation = ${op_orientation_second})
AND birthdate BETWEEN ${op_birthdate_min} AND ${op_birthdate_max}