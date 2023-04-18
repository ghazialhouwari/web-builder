import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { IGridItem } from '@/utils/types';
import { gridAreaToArray } from '@/utils';

export const useGridStore = defineStore('grid', () => {
	const items = ref<IGridItem[]>([
		{
			content: 'Item 1',
			style: {
				gridArea: '2/2/4/6',
				transform: 'translate(0, 0)',
			},
		},
		{
			content: 'Item 2',
			style: {
				gridArea: '4/8/6/14',
				transform: 'translate(0, 0)',
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

	function getItemGridAreaByIndex(index: number) {
		return gridAreaToArray(items.value[index].style.gridArea);
	}

	function updateItemTransformByIndex(index: number, x: number, y: number) {
		items.value[index].style.transform = `translate(${x}px, ${y}px)`;
	}
	function updateItemGridAreaByIndex(index: number, gridArea: string) {
		items.value[index].style.gridArea = gridArea;
	}

	return {
		grid,
		items,
		getItemGridAreaByIndex,
		updateItemTransformByIndex,
		updateItemGridAreaByIndex,
	};
});
