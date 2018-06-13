export function login(data) {
	return function action(dispatch) {
		let state = {
				type:      'LOGIN',
				payload:    ''};
		return fetch('http://localhost:8888/user', {
				method: 'POST',
				headers: {
					'ACCEPT': 'application/json, text/plain, */*',
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					access_token: data.access_token,
					is_google: data.is_google
				})
			})
			.then((resp) => resp.json())
			.then((response) => {
				state.payload = response.data;
				dispatch(state)
			});
	}
}

export function logout() {
	return {
		type: 	'LOGOUT'
	};
}