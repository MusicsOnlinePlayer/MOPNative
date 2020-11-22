import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
	Spinner, List, ListItem,
} from '@ui-kitten/components';
import { AlbumItem } from './GroupItem/AlbumItem';

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class AlbumGroup extends React.Component {
	static propTypes = {
		IsFetching: PropTypes.bool.isRequired,
		DetailType: PropTypes.string,
		Albums: PropTypes.arrayOf(PropTypes.shape({

		})),
		ShowDetailType: PropTypes.bool,
		navigation: PropTypes.shape({
			navigate: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		DetailType: undefined,
		ShowDetailType: false,
		Albums: undefined,
	}

	OnItemClick = (Album) => {
		const { navigation } = this.props;
		navigation.navigate('Album', { AlbumId: Album._id });
	}

	render() {
		const {
			IsFetching, DetailType, Albums, ShowDetailType,
		} = this.props;

		if (IsFetching) {
			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" />}
					<View style={styles.loading}>
						<Spinner />
					</View>
				</>
			);
		}

		if (Albums) {
			const AlbumItemWithEvent = (props) => <AlbumItem {...props} OnItemClick={this.OnItemClick} />;

			return (
				<>
					{!ShowDetailType || <ListItem title={DetailType} level="2" onPress={this.onDetailPress} />}

					<List
						data={Albums}
						renderItem={AlbumItemWithEvent}
						onEndReachedThreshold={0.5}
						onEndReached={() => {}}
					/>
				</>
			);
		}

		return <></>;
	}
}

export default AlbumGroup;
