import { useEffect, useState } from 'react';
import { GetArtistById } from '../Music/Music';

export const useArtistById = (ArtistId) => {
	const [hasError, setErrors] = useState(false);
	const [artist, setArtist] = useState(undefined);

	useEffect(() => {
		GetArtistById(ArtistId)
			.then((Artist) => setArtist(Artist))
			.catch((err) => setErrors(err));
	}, [ArtistId]);

	return { artist, hasError };
};
