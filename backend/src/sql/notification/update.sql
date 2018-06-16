UPDATE t_notification
SET is_read = ${is_read}
WHERE id_user = ${id_user} AND id_channel = ${id_channel}
RETURNING *