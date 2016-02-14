import { combineReducers } from 'redux';
import { createGridReducer } from 'redux-react-grid-layout';

export default combineReducers({
	dashboard: createGridReducer('dashboard')
});
