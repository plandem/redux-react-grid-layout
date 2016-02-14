import * as types from './constants'

export function compact(grid) {
	return { type: types.COMPACT, grid}
}

export function add(grid, settings = { }) {
	return { type: types.ADD, grid, settings }
}

export function remove(grid, id) {
	return { type: types.REMOVE, grid, id }
}

export function update(grid, item) {
	return { type: types.UPDATE, grid, item }
}

export function select(grid, id) {
	return { type: types.SELECT, grid, id }
}

export function deselect(grid) {
	return { type: types.DESELECT, grid }
}

export function breakpointChange(grid, breakpoint, cols) {
	return { type: types.BREAKPOINT_CHANGE, grid, breakpoint, cols }
}

export function widthChange(grid, width, margin, cols) {
	return { type: types.WIDTH_CHANGE, grid, width, margin, cols }
}

export function layoutChange(grid, layout, allLayouts) {
	return { type: types.LAYOUT_CHANGE, grid, layout, allLayouts}
}

const commonEvent = (type) => (grid, layout, oldItem, newItem, placeholder, e, element) => { return { type: type, grid, layout, oldItem, newItem, placeholder, e, element } };

export const dragStart = commonEvent(types.DRAG_START);
export const dragStop = commonEvent(types.DRAG_STOP);
export const drag = commonEvent(types.DRAG);
export const resizeStart = commonEvent(types.RESIZE_START);
export const resizeStop = commonEvent(types.RESIZE_STOP);
export const resize = commonEvent(types.RESIZE);