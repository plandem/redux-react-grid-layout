export const autoincrement = state => { return (state.next || 0) + 1 };

function compact(layout, vertical, horizontal) {
	if(!vertical && !horizontal) {
		return layout;
	}

	const max_x = layout.reduce((max_x, item) => Math.max(max_x, item.x + item.w), 0);
	const max_y = layout.reduce((max_y, item) => Math.max(max_y, item.y + item.h), 0);
	const matrix = [];
	const updated = new Array(layout.length).fill(false);

	for(let y = 0; y < max_y; y++) {
		matrix.push(new Array(max_x).fill(undefined));
	}

	//fill layout matrix
	layout.forEach(function(item) {
		for(let i_y = item.y, i_y_max = item.y + item.h; i_y < i_y_max; i_y++) {
			for(let i_x = item.x, i_x_max = item.x + item.w; i_x < i_x_max; i_x++) {
				matrix[i_y][i_x] = item.i;
			}
		}
	});

	//compact vertical
	if(vertical) {
		let compressed = 0;
		for (let y = 0; y < max_y; y++) {
			let is_empty_row = true;
			for (let x = 0; x < max_x; x++) {
				if (matrix[y][x] !== undefined) {
					is_empty_row = false;
					break;
				}
			}

			if (is_empty_row) {
				const compressed_y = y - compressed;
				layout.forEach((item, i) => {
					if (item.y > compressed_y) {
						item.y--;
						updated[i] = true;
					}
				});

				compressed++;
			}
		}
	}

	//compact horizontal
	if(horizontal) {
		let compressed = 0;
		for (let x = 0; x < max_x; x++) {
			let is_empty_col = true;
			for (let y = 0; y < max_y; y++) {
				if (matrix[y][x] !== undefined) {
					is_empty_col = false;
					break;
				}
			}

			if (is_empty_col) {
				const compressed_x = x - compressed;
				layout.forEach((item, i) => {
					if (item.x > compressed_x) {
						item.x--;
						updated[i] = true;
					}
				});

				compressed++;
			}
		}
	}

	return layout.map((item, i) => updated[i] ? { ...item } : item);
}

export const compact_vertical = layout => compact(layout, true, false);
export const compact_horizontal = layout => compact(layout, false, true);
export const compact_full = layout => compact(layout, true, true);
export const compact_none = layout => layout;