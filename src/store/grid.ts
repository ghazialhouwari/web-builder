import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { IGridItem, IGridItemArea } from '@/utils/types';

export const useGridStore = defineStore('grid', () => {
	const items = ref<IGridItem[]>([
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

	const grid = computed(() => {
		const columnCount = 24;
		const gap = 11;
		const rowHeightRatio = 0.0215;
		const gutters = window.innerWidth * 0.02 - gap;
		const containerWidth = window.innerWidth - gutters * 2 - gap * 2;
		const width = Math.min(1400, containerWidth);
		const height = 8 * width * rowHeightRatio + gap * 7;
		const gapCount = (columnCount - 1) * gap;

		const cellWidth = (width - gapCount) / columnCount;
		const cellHeight = width * rowHeightRatio;

		return {
			columnCount,
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
	});

	function updateItemGridAreaByIndex(index: number, gridArea: IGridItemArea) {
		items.value[index].gridArea = gridArea;
	}

	return {
		grid,
		items,
		updateItemGridAreaByIndex,
	};
});
