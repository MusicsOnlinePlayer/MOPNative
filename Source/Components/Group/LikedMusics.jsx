import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { GetLikedMusics } from '../../Api/Music/Music';
import MusicGroup from './MusicGroup';
import { CONTEXT_SEARCH } from './Extras/Constants';

export class LikedMusics extends React.Component {
	static propTypes = {
		BaseCount: PropTypes.number,
	}

	static defaultProps = {
		BaseCount: 10,
	}

	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
			IsFetching: false,
			CurrentPage: 0,
		};
	}

	componentDidMount() {
		const { CurrentPage } = this.state;
		const { BaseCount } = this.props;
		this.setState({ IsFetching: true });
		GetLikedMusics(CurrentPage, BaseCount)
			.then((ApiResult) => {
				this.setState({ ApiResult, IsFetching: false });
			})
			.catch(() => {});
	}

	OnEndReached = () => {
		const { CurrentPage } = this.state;
		const { BaseCount } = this.props;

		GetLikedMusics(CurrentPage, BaseCount)
			.then((newResults) => {
				this.setState((prevState) => ({
					ApiResult: [...prevState.ApiResult, ...newResults],
					CurrentPage: prevState.CurrentPage + 1,
				}));
			})
			.catch(() => {});
	}

	render() {
		const { ApiResult, IsFetching } = this.state;

		return (
			<Layout level="2" style={{ height: '100%' }}>
				<MusicGroup
					DetailType="Liked Musics"
					ShowDetailType
					ContextType={CONTEXT_SEARCH}
					Musics={ApiResult || undefined}
					IsFetching={IsFetching}
					OnEndReached={this.OnEndReached}
				/>
			</Layout>
		);
	}
}
