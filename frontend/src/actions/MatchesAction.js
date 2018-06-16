export function match(res) {
	return function action(dispatch) {
        console.log(res);
		let state = {
				type:      'MATCH',
				payload:    ''};
		return fetch('http://localhost:8888/user', {
				method: 'POST',
				headers: {
					'ACCEPT': 'application/json, text/plain, */*',
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					user_matches: {
						id_user: res.id_user,
						id_user_love: res.id_user_love
                    }				
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
