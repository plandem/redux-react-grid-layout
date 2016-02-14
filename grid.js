import { connect } from 'react-redux';
import * as actions from './actions';

export const reduxGrid = (name, options = { withRef: true }) => component => {
	function mapDispatchToProps(dispatch) {
		return {
			addItem: (settings) => dispatch(actions.add(name, settings)),
			removeItem: (id) => dispatch(actions.remove(name, id)),
			updateItem: (item) => dispatch(actions.update(name, item)),
			select: (id) => dispatch(actions.select(name, id)),
			deselect: () => dispatch(actions.deselect(name)),
			compact: () => dispatch(actions.compact(name)),
			onDragStart:(id, x, y, e) => dispatch(actions.dragStart(name, id, x, y, e)),
			onDrag: (id, x, y, e) => dispatch(actions.drag(name, id, x, y, e)),
			onDragStop: (id, x, y, e) => dispatch(actions.dragStop(name, id, x, y, e)),
			onResizeStart: (id, w, h, e) => dispatch(actions.resizeStart(name, id, w, h, e)),
			onResize: (id, w, h, e) => dispatch(actions.resize(name, id, w, h, e)),
			onResizeStop: (id, w, h, e) => dispatch(actions.resizeStop(name, id, w, h, e)),
			onBreakpointChange: (breakpoint, cols) => dispatch(actions.breakpointChange(name, breakpoint, cols)),
			onLayoutChange: (layout, allLayout) => dispatch(actions.layoutChange(name, layout, allLayout)),
			onWidthChange: (width, margin, cols) => dispatch(actions.widthChange(name, width, margin, cols))
		}
	}

	return connect(
		state => ({ ...state[name] }),
		mapDispatchToProps, null,
		options
	)(component);
};