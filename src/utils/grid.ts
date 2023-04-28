import { Grid, SectionBlockLayout, ViewType } from '@/utils/types';
import { useGridStore } from '@/store/grid';

export function calculatedGrid(viewType: ViewType): Grid {
	const gap = 11;
	const minRowCount = 8;
	const rowHeightRatio = 0.0215;
	const minContainerWidth = 1400;

	const viewPort = viewType === 'desktop' ? window.innerWidth : 390;
	const columnCount = viewType === 'desktop' ? 24 : 8;

	const guttersPercent = viewType === 'desktop' ? 0.02 : 0.06;
	const baseGutters = viewPort * guttersPercent - gap;
	const frGutters = (viewPort - minContainerWidth) / 2 - gap;

	const gutters = viewPort < minContainerWidth ? baseGutters : frGutters;

	const gapCount = (columnCount - 1) * gap;
	const containerWidth = viewPort - gutters * 2 - gap * 2;
	const width = Math.min(minContainerWidth, containerWidth);

	const cellWidth = (width - gapCount) / columnCount;
	const cellHeight = viewType === 'desktop' ? width * rowHeightRatio : 30;

	return {
		gap,
		gutters,
		cellWidth,
		cellHeight,
		columnCount,
		minRowCount,
	};
}

export function offsetToBlockLayout(
	x: number,
	y: number,
	columnSize: number,
	rowSize: number,
	zIndex: number
): SectionBlockLayout {
	const gridStore = useGridStore();
	const {
		gutters,
		gap,
		cellWidth,
		cellHeight,
		columnCount,
		activeSectionIndex,
	} = gridStore;

	const gridWrapper: HTMLElement | null = document.querySelector(
		`#gridWrapper${activeSectionIndex}`
	);

	const wrapperOffsetLeft = gridWrapper?.getBoundingClientRect().left || 0;
	const wrapperOffsetTop = gridWrapper?.getBoundingClientRect().top || 0;

	const offsetX = x - wrapperOffsetLeft - gutters + gap;
	const offsetY = y - wrapperOffsetTop;

	// Get grid row and column from grid item offset
	let gridColumn = Math.ceil(offsetX / (cellWidth + gap));
	const gridRow = Math.round(offsetY / (cellHeight + gap));

	if (gridColumn > 1 && gridColumn + columnSize > columnCount + 2) {
		gridColumn = columnCount + 2 - columnSize;
	}

	const columnStart = Math.max(1, gridColumn + 1);
	const rowStart = Math.max(1, gridRow + 1);
	const columnEnd = columnStart + columnSize;
	const rowEnd = rowStart + rowSize;

	return {
		start: {
			x: columnStart,
			y: rowStart,
		},
		end: {
			x: columnEnd,
			y: rowEnd,
		},
		zIndex,
	};
}
