INSERT INTO t_messages(id_sender, id_receiver, content, content_type, created_at, id_channel)
VALUES (${id_sender}, ${id_receiver}, ${content}, ${content_type}, ${created_at}, ${id_channel})
RETURNING *