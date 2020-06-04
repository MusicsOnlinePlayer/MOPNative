import React from 'react';
import { Layout } from '@ui-kitten/components';
import { GetViewedMusics } from '../../Api/Music/Music';
import MusicGroup from './MusicGroup';
import { CONTEXT_SEARCH } from './Extras/Constants';

export class ViewedMusics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: undefined,
			IsFetching: false,
		};
	}

	componentDidMount() {
		this.setState({ IsFetching: true });
		GetViewedMusics()
			.then((ApiResult) => {
				console.log(ApiResult);
				this.setState({ ApiResult, IsFetching: false });
			})
			.catch(() => {});
	}

	render() {
		const { ApiResult, IsFetching } = this.state;

		return (
			<Layout level="2">
				<MusicGroup
					DetailType="History"
					ContextType={CONTEXT_SEARCH}
					MusicIds={ApiResult ? ApiResult.MusicsId : undefined}
					IsFetching={IsFetching}
					Reverse
					Count={20}
				/>
			</Layout>
		);
	}
}
