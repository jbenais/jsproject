UPDATE t_user SET 
    firstname = ${firstname},
    lastname = ${lastname},
    birthdate = ${birthdate},
    profession = ${profession},
    is_male = ${is_male},
    description = ${description},
    id_mbti = ${id_mbti},
    id_orientation = ${id_orientation}
WHERE id = ${id_user}
RETURNING *