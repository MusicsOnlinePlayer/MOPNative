import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function SearchMusic(query) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(url + '/Music/Search/Music/Name/' + query)
					.then((res) => {
						resolve(res.data);
					})
					.catch((err) => {
						console.log(err);
						reject(err);
					});
			})
			.catch((err) => reject(err));
	});
}
