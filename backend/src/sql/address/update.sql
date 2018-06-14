UPDATE t_address SET 
    latitude = ${latitude},
    longitude = ${longitude}
WHERE id_user = ${id_user}
RETURNING *