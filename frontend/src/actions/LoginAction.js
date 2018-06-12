export function login(response) {
	return {
		type:     'LOGIN',
        payload:  response
	};		
}

export function logout() {
	return {
		type: 	'LOGOUT'
	};
}