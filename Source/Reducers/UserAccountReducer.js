import { LOG_ACCOUNT } from '../Action/AccountAction';

const InitialState = {
	IsLogged: false,
};

export default function UserAccountReducer(state = InitialState, action) {
	switch (action.type) {
	case LOG_ACCOUNT:
		return {
			...state,
			IsLogged: action.IsLogged,
		};
	default:
		return state;
	}
}
