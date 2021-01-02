import { useEffect, useState } from 'react';
import { GetAccount } from '../Authentication/Auth';

export const useAccount = () => {
	const [hasError, setErrors] = useState(false);
	const [account, setAccount] = useState(undefined);

	useEffect(() => {
		GetAccount()
			.then((Album) => setAccount(Album))
			.catch((err) => setErrors(err));
	}, []);

	return { account, hasError };
};
