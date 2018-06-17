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

export function update(res) {
	return function action(dispatch) {
	let state = {
			type:      'UPDATE',
			payload:    ''
	};
	console.log({
		user_general: res.user_general,
		user_address: res.user_address,
		user_preferences: res.user_preferences,
		user_target: res.user_target,
	});
	return fetch('http://localhost:8888/user/' + res.user_general.id_user, {
			method: 'PUT',
			headers: {
				'ACCEPT': 'application/json, text/plain, */*',
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				user_general: res.user_general,
				user_address: res.user_address,
				user_preferences: res.user_preferences,
				user_target: res.user_target,
			})
		})
		.then((resp) => resp.json())
		.then((response) => {
			state.payload = response.data;
			dispatch(state)
		})
		.catch(res => console.log(res));
	}
}