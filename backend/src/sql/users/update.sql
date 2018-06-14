UPDATE t_user SET 
    firstname = ${firstname},
    lastname = ${lastname},
    birthdate = ${birthdate},
    is_male = ${is_male},
    description = ${description},
    profession = ${profession},
    max_distance = ${max_distance},
    age_min = ${age_min},
    age_max = ${age_max},
    id_mbti = ${id_mbti},
    id_orientation = ${id_orientation}
WHERE id = ${id_user}
RETURNING *