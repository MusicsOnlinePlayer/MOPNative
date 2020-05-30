import Axios from 'axios';
import { GetApiAddress } from '../ApiUtils';

export function Login(data) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.post(`${url}/User/Login`, data)
					.then((res) => {
						resolve(res.data.success);
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot login'));
					});
			})
			.catch((err) => reject(err));
	});
}

export function Register(data) {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.post(`${url}/User/Register`, data)
					.then((res) => {
						resolve(res.data.success);
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot login'));
					});
			})
			.catch((err) => reject(err));
	});
}

export function Logout() {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/User/Logout`)
					.then(() => {
						resolve();
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot logout'));
					});
			})
			.catch((err) => reject(err));
	});
}

export function GetAccount() {
	return new Promise((resolve, reject) => {
		GetApiAddress()
			.then((url) => {
				Axios.get(`${url}/User/Me`)
					.then((res) => {
						resolve(res.data.account);
					})
					.catch((err) => {
						console.warn(err);
						reject(Error('Cannot logout'));
					});
			})
			.catch((err) => reject(err));
	});
}
