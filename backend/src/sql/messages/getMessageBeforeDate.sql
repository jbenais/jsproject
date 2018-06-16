SELECT * FROM t_messages
WHERE id_channel = ${id_channel}
AND created_at < ${before_date}
LIMIT 20