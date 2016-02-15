import * as types from'./constants';
import { compact_full, autoincrement } from'./utils';

const initialState = {
	layout: [],
	selected: null
};

function createItem(state, next, settings) {
	const { id, x, y, w, h, ...rest } = settings;
	const next_id = id || next(state);
	return {
		next: next_id,
		layout: state.layout.concat({
				i: next_id.toString(),
				x: x || 0,
				y: y || state.layout.reduce((max_y, item) => Math.max(max_y, item.y + item.h), 0),
				w: w || 1,
				h: h || 1,
				... rest
			}
		)
	};
}

function removeItem(state, id) {
	return state.layout.filter(item => (item.i !== id) )
}

function updateItem(state, newItem) {
	return state.layout.map(item => (newItem.i == item.i ? Object.assign({}, item, newItem) : item))
}

export function createGridReducer({ name, next = autoincrement, compactor = compact_full }) {
	return (state = initialState, action) => {
		//TODO: think about testing for action type in case if 'grid' property of action is using by other reducer
		if(action.grid != name) {
			return state;
		}

		switch (action.type) {
			case types.ADD:
				return Object.assign({}, state, createItem(state, next, action.settings));
			case types.REMOVE:
				return Object.assign({}, state, { layout: compactor(removeItem(state, action.id)) });
			case types.UPDATE:
				return Object.assign({}, state, { layout: compactor(updateItem(state, action.item)) });
			case types.LAYOUT_CHANGE:
				return Object.assign({}, state, { layout: compactor(action.layout) });
			case types.COMPACT:
				return Object.assign({}, state, { layout: compactor(state.layout) });
			case types.SELECT:
				return Object.assign({}, state, { selected: action.id });
			case types.DESELECT:
				return Object.assign({}, state, { selected: null });
			default:
				return state;
		}
	}
}