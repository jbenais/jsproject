export function login(res) {
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
					data: {
						access_token: res.access_token,
						email: res.email
					},
					is_google: res.is_google
				})
			})
			.then((resp) => resp.json())
			.then((response) => {
				console.log("response");
				console.log(response.data);
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