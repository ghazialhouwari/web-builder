import { defineStore } from 'pinia';
import { reactive, computed, readonly } from 'vue';
import { IGridItem, IGridItemArea } from '@/utils/types';

function calculateGrid(items: IGridItem[]) {
	const columnCount = 24;
	const minRowCount = 9;
	const gap = 11;
	const rowHeightRatio = 0.0215;
	const gutters = window.innerWidth * 0.02 - gap;
	const containerWidth = window.innerWidth - gutters * 2 - gap * 2;
	const width = Math.min(1400, containerWidth);
	const height = 8 * width * rowHeightRatio + gap * 7;
	const gapCount = (columnCount - 1) * gap;

	const cellWidth = (width - gapCount) / columnCount;
	const cellHeight = width * rowHeightRatio;

	const rowCount = items.reduce(
		(max, item) => Math.max(max, item.gridArea.rowEnd),
		minRowCount
	);

	return {
		columnCount,
		rowCount,
		gap,
		rowHeightRatio,
		gutters,
		containerWidth,
		width,
		height,
		gapCount,
		cellWidth,
		cellHeight,
	};
}

export const useGridStore = defineStore('grid', () => {
	const items = reactive<IGridItem[]>([
		{
			content: 'Item 1',
			gridArea: {
				rowStart: 2,
				columnStart: 2,
				rowEnd: 4,
				columnEnd: 6,
			},
		},
		{
			content: 'Item 2',
			gridArea: {
				rowStart: 4,
				columnStart: 8,
				rowEnd: 6,
				columnEnd: 14,
			},
		},
	]);

	const grid = computed(() => calculateGrid(items));

	function updateItemGridAreaByIndex(index: number, gridArea: IGridItemArea) {
		items[index].gridArea = gridArea;
	}

	return {
		grid: readonly(grid),
		items: readonly(items),
		updateItemGridAreaByIndex,
	};
});
