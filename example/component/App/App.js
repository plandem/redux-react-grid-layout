import './App.css';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import DashboardGrid from 'component/DashboardGrid';

class App extends React.Component {
	getDashboard() {
		return this.refs.dashboard.getWrappedInstance();
	}

	onAddItem() {
		this.getDashboard().addDash();
	}

	stringifyLayout(items) {
		return items.map(function(l) {
			return <div className="layoutItem" key={l.i}><b>{l.i}</b>: [x={l.x}, y={l.y}, w={l.w}, h={l.h}]</div>;
		});
	}

	debugLayout() {
		const { layout } = this.props.dashboard;
		return (
			<div>
				<div className="columns">{this.stringifyLayout(layout)}</div>
				<hr/>
				<div className="json">{this.convertLayout(layout)}</div>
			</div>
		)
	}

	drawMatrix(matrix) {
		return matrix.map(function(row, row_i) {
			return <div key={row_i}>[{ row.join(',') }]</div>;
		});
	}

	convertLayout(items) {
		const matrix = [];
		const max_x = items.reduce(function(max_x, item) { return Math.max(max_x, item.x + item.w)}, 0);
		const max_y = items.reduce(function(max_y, item) { return Math.max(max_y, item.y + item.h)}, 0);

		//init matrix
		for(let y = 0; y < max_y; y++) {
			matrix.push(new Array(max_x).fill(0));
		}

		//fill layout matrix
		items.forEach(function(item) {
			for(let i_y = item.y, i_y_max = item.y + item.h; i_y < i_y_max; i_y++) {
				for(let i_x = item.x, i_x_max = item.x + item.w; i_x < i_x_max; i_x++) {
					matrix[i_y][i_x] = item.i;
				}
			}
		});

		return this.drawMatrix(matrix);
	}

	onSave() {
		this.getDashboard().compact();
	}

	render() {
		return (
			<div>
				<button onClick={this.onAddItem.bind(this)}>add dash</button>
				<button onClick={this.onSave.bind(this)}>save dashboard</button>
				<div>
					<div style={{ float: 'left', width: 600}}><DashboardGrid ref="dashboard"/></div>
					<div id="matrix">{this.debugLayout()}</div>
				</div>
			</div>
		)
	};
}

App.propTypes = {
};

App.defaultProps = {
};

//only for debug
export default connect(state => ({ dashboard: state.dashboard }))(App);