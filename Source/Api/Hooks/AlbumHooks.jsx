import { useEffect, useState } from 'react';
import { GetAlbumById } from '../Music/Music';

export const useAlbumById = (AlbumId) => {
	const [hasError, setErrors] = useState(false);
	const [album, setAlbum] = useState(undefined);

	useEffect(() => {
		GetAlbumById(AlbumId)
			.then((Album) => setAlbum(Album))
			.catch((err) => setErrors(err));
	}, [AlbumId]);

	return { album, hasError };
};
