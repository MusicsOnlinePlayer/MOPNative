import React from 'react';
import { Layout, ViewPager } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import { ViewedMusics } from '../Components/Group/ViewedMusics';
import { LikedMusics } from '../Components/Group/LikedMusics';


export const SuggestionScreen = () => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	return (
		<>
			<TopBar subtitle="Suggestions" />
			<Layout style={{ height: '100%', padding: '2%' }} level="2">
				<ViewPager
					selectedIndex={selectedIndex}
					onSelect={(index) => setSelectedIndex(index)}
				>
					<ViewedMusics />
					<LikedMusics />
				</ViewPager>

			</Layout>
		</>
	);
};
