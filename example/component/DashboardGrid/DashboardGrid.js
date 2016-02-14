import './DashboardGrid.css';
import React, { PropTypes } from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import { reduxGrid } from 'redux-react-grid-layout';

const ReactGrid = WidthProvider(ReactGridLayout);

class DashboardGrid extends React.Component {
	compact() {
		this.props.compact();
	}

	removeDash(id) {
		this.props.removeItem(id);
	}

	addDash() {
		this.props.addItem({
			w: 4, h: 1
		});
	}

	selectDash(id) {
		if(this.props.selected == id) {
			this.props.deselect();
		} else {
			this.props.select(id);
		}
	}

	layoutDash(layout, oldItem, newItem) {
		const changed = !(oldItem.x == newItem.x && oldItem.y == newItem.y && oldItem.w == newItem.w && oldItem.h == newItem.h);

		if(changed) {
			this.props.onLayoutChange(layout);
		}
	}

	renderGrid() {
		var removeStyle = {
			position: 'absolute',
			right: '2px',
			top: 0,
			cursor: 'pointer'
		};

		const self = this;
		return this.props.layout.map(function(item) {
			let id = item.i;
			return (
				<div key={id} _grid={item} onDoubleClick={ self.selectDash.bind(self, id) }>
					<span className="text">{id}</span>
					<span className="remove" style={removeStyle} onClick={ self.removeDash.bind(self, id) }>x</span>
				</div>
			);
		});
	}

	render() {
		//const { gridWidth, gridCols, gridItemMargin } = this.props;
		return (
			<ReactGrid className="layout"
					   layout={this.props.layout}
					   cols={ 4 }
					   rowHeight={ 600 / 4 }
					   autoSize={true}
					   minH = {1}
					   minW = {1}
					   verticalCompact = {false}
					   isDraggable = {true}
					   isResizable = {true}
					   useCSSTransforms = {true}
					   margin = { [ 10, 10 ] }
					   onDragStop = { this.layoutDash.bind(this) }
					   onResizeStop = { this.layoutDash.bind(this) }
			>{this.renderGrid()}</ReactGrid>
		)
	};
}

export default reduxGrid('dashboard')(DashboardGrid);