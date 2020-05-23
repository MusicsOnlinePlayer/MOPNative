import React from 'react';
import { Icon, Input, Layout } from '@ui-kitten/components';

const SearchIcon = (props) => <Icon {...props} name="search" />;

export const SearchScreen = () => {
	const [value, setValue] = React.useState('');

	return (
		<Layout style={{ height: '100%' }}>
			<Input
				value={value}
				style={{ padding: '1%' }}
				placeholder="Search for musics"
				accessoryLeft={SearchIcon}
				onChangeText={(nextValue) => setValue(nextValue)}
			/>
		</Layout>
	);
};
