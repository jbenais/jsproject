SELECT * FROM t_user
WHERE id <> ${id} 
AND (id_orientation = ${op_orientation_first} OR id_orientation = ${op_orientation_second})
AND birthdate BETWEEN ${op_birthdate_min} AND ${op_birthdate_max}